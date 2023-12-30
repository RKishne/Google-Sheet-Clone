const selectedCellElement = document.querySelector(".left-section");
const form = document.querySelector("form");

let totalSheets = 1, activeSheetName = "sheet1";

let state = {};

const defaultStyledValues = {
  fontFamily: "Arial",
  fontSize: 16,
  bold: false,
  italic: false,
  underline: false,
  align: "left",
  bgColor: "#ffffff",
  textColor: "#000000",
};

function applyStylesToElement(element,styles){
  element.style.fontFamily = styles.fontFamily;
  element.style.fontSize = `${styles.fontSize}px`;
  element.style.textAlign = styles.align;
  element.style.fontWeight = styles.bold
    ? "bold"
    : "lighter";
  element.style.fontStyle = styles.italic
    ? "italic"
    : "normal";
  element.style.textDecoration = styles.underline
    ? "underline"
    : "none";
  element.style.color = styles.textColor;
  element.style.backgroundColor = styles.bgColor;
}
form.addEventListener("change", () => {
  const selectedValues = {
    fontFamily: form.fontFamily.value,
    fontSize: Number(form.fontSize.value),
    bold: form.bold.checked,
    italic: form.italic.checked,
    underline: form.underline.checked,
    align: form.align.value,
    textColor: form.textColor.value,
    bgColor: form.bgColor.value,
  };

  const selectedCellElement = document.getElementById(selectedCell);
  applyStylesToElement(selectedCellElement,selectedValues);
  // selectedCellElement.style.fontFamily = selectedValues.fontFamily;
  // selectedCellElement.style.fontSize = `${selectedValues.fontSize}px`;
  // selectedCellElement.style.textAlign = selectedValues.align;
  // selectedCellElement.style.fontWeight = selectedValues.bold
  //   ? "bold"
  //   : "lighter";
  // selectedCellElement.style.fontStyle = selectedValues.italic
  //   ? "italic"
  //   : "normal";
  // selectedCellElement.style.textDecoration = selectedValues.underline
  //   ? "underline"
  //   : "none";
  // selectedCellElement.style.color = selectedValues.textColor;
  // selectedCellElement.style.backgroundColor = selectedValues.bgColor;

  state[selectedCell] = selectedValues;
});

let selectedCell = null;

function oncellFocus(event) {
  selectedCell = event.target.id;
  selectedCellElement.innerText = selectedCell;

  if (!state[selectedCell]) {
    state[selectedCell] = defaultStyledValues;
  }
  applyCurrentCellStylesToForm();
}

function applyCurrentCellStylesToForm() {
  for (let key in state[selectedCell]) {
    form[key].type === "checkbox"
      ? (form[key].checked = state[selectedCell][key])
      : (form[key].value = state[selectedCell][key]);
  }
}
//evalutation expression
const fx=document.getElementById("fx");

fx.addEventListener("keyup",(event)=>{
  if("Enter"===event.code && selectedCell){
    let expression=fx.value;
    let result=eval(expression);
    document.getElementById(selectedCell).innerText=result;
    fx.value="";
  }
})


// sheets switch

const footForm=document.querySelector(".foot-form");

footForm.addEventListener("change",(event)=>{
  let newSheetName=event.target.value;

  localStorage.setItem(activeSheetName,JSON.stringify(state));

  for(let cellid in state){
    clearCell(cellid);
  }

  let existingData=localStorage.getItem(newSheetName);
  if(existingData){
    state=JSON.parse(existingData);

    for(let cellid in state){
      const cellElement=document.getElementById(cellid);
      applyStylesToElement(cellElement,state[cellid]);
    }
  }
  else{
    state={};
  }
  activeSheetName=newSheetName;
})

function createNewSheet(){
  totalSheets++;

  let newSheetName=`sheet${totalSheets}`;
  const inputContainer=document.createElement("div");
  inputContainer.innerHTML=`<input type="radio" name="sheet" id="${newSheetName}" value="${newSheetName}" />
  <label for="${newSheetName}" class="foot-input">${newSheetName[0].toUpperCase() + newSheetName.slice(1)}</label>`;
  inputContainer
  footForm.appendChild(inputContainer);
}

function clearCell(cellid){
  let cell=document.getElementById(cellid);
  cell.innerText="";
  cell.removeAttribute("style");
  cell.classList.remove("active-ceil");
}