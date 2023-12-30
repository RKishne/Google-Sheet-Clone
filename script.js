const mainHeader = document.querySelector(".main-header");
const snoContainer = document.querySelector(".sno-container");
const rowsContainer = document.querySelector(".rows-container");


let columns = 27,
  rows = 50;

for (let i = 0; i < columns; i++) {
  const cell = document.createElement("div");

  i != 0 && (cell.innerText = String.fromCharCode(64 + i));
  i === 0 ? (cell.className = "first-cell") : (cell.className = "cell");

  mainHeader.appendChild(cell);
}


function createRow(rowNumber){
    const row=document.createElement("div");
    row.className="row";

    for(let i=1;i<columns;i++){
        const cell=document.createElement("div");
        cell.className="cell";
        cell.contentEditable="true";
        cell.id=`${String.fromCharCode(64+i)}${rowNumber}`;
        cell.addEventListener("focus",oncellFocus);
        row.appendChild(cell);
    }
    return row;
}

for(let i= 1;i<=rows;i++){
    const snocell=document.createElement("div");
    snocell.innerText=i;
    snocell.className="sno";
    snoContainer.appendChild(snocell);

    let rowElement=createRow(i);
    rowsContainer.appendChild(rowElement);
}
