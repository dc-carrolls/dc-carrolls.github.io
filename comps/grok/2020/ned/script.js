function hide(target) {
  target.classList.add("hidden");
}

function show(target) {
  target.classList.remove("hidden");
}

function getName(row, column) {
  return row.toString() + " " + column.toString();
}

function getLongName(x, y, vx, vy) {
  return x.toString() + " " + y.toString() + " " + vx.toString() + " " + vy.toString();
}

function getRow(str) {
 return Number(str.charAt(0)); 
}

function getColumn(str) {
 return Number(str.charAt(2)); 
}

function getX(str) {
 return Number(str.charAt(0)); 
}

function getY(str) {
 return Number(str.charAt(2)); 
}

function getVX(str) {
 return Number(str.charAt(4)); 
}

function getVY(str) {
 return Number(str.charAt(6)); 
}

function getState(str) {
  if (str == "left") {
      return "left";
  }
  return "empty";
}

function loadLevel(lvldata) { //used to load the passed level data
  let str = null;
  let cell = null;
  let xMove = 0;
  let yMove = 0;
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      str = getName(x, y);
      cell = document.getElementById(str);
      removeDirection(cell);
      cell.onclick = tryMove;
      xMove = lvldata.charAt((x + y * 5) * 3);
      yMove = lvldata.charAt((x + y * 5) * 3 + 1);
      cell.value = getLongName(x, y, xMove, yMove);
      setVisuals(cell, xMove, yMove);
    }
  }
}

function print(str) { //just for debugging during development
  label.textContent = label.textContent + " " + str;
}

function setVisuals(cell, xMove, yMove) { //sets cell visuals based on direction state
  if (xMove == 1) {
    
    if (yMove == 1) {
      cell.classList.add("downRight");
    } else if (yMove == 2) {
      cell.classList.add("upRight");
    } else {
      cell.classList.add("right");
    }
    
  } else if (xMove == 2) {
    
      if (yMove == 1) {
      cell.classList.add("downLeft");
    } else if (yMove == 2) {
      cell.classList.add("upLeft");
    } else {
      cell.classList.add("left");
    }    
    
  } else {
      cell.classList.add("emptyX");
  }
  
  if (yMove == 1) {
      cell.classList.add("down");
  } else if (yMove == 2) {
      cell.classList.add("up");       
  } else {
      cell.classList.add("emptyY");
  }
  
  if (cell.classList.contains("emptyX") && cell.classList.contains("emptyY")) {
      cell.classList.add("empty");
  } else {
    cell.classList.add("enabled");
  }
}

function isValid(x, y) { //returns whether the passed cell is in the grid's range
  return ((0 <= x) && (x < 5)) && ((0 <= y) && (y < 5));
}

function removeDirection(target) { //removes all relevant decorational classes from the passed target
  let list = target.classList;
  
  if (list.contains("empty")) {
      list.remove("empty");
  }
  if (list.contains("emptyX")) {
      list.remove("emptyX");
  }
  if (list.contains("emptyY")) {
      list.remove("emptyY");
  }
  if (list.contains("enabled")) {
      list.remove("enabled");
  }
  
  if (list.contains("upRight")) {
      list.remove("upRight");
  }
  if (list.contains("downRight")) {
      list.remove("downRight");
  }
  if (list.contains("upLeft")) {
      list.remove("upLeft");
  }
  if (list.contains("downLeft")) {
      list.remove("downLeft");
  }
  if (list.contains("down")) {
      list.remove("down");
  }
  if (list.contains("right")) {
      list.remove("right");
  }
  if (list.contains("left")) {
      list.remove("left");
  }
  if (list.contains("up")) {
      list.remove("up");
  }
  
}

function tryMove(event) { //the arrow within the cell attempts to move
  let cell = event.target;
  if (!cell.classList.contains("emptyX") || !cell.classList.contains("emptyY")) {
      let values = cell.value;
      let vx = getVX(values);
      let vy = getVY(values);
    
      if (vx == 2) {
          vx = -1;
      }
      if (vy == 2) {
          vy = -1;
      }
    
      let finalX = getX(values) + vx;
      let finalY = getY(values) + vy
      
      if (isValid(finalX, finalY)) {
          let cell2 = document.getElementById(getName(finalX, finalY));
          let values2 = cell2.value;
          let vx2 = getVX(values2);
          let vy2 = getVY(values2);
          let finalVx = 0;
          let finalVy = 0;
          
         //convert 2 to what it represents: -1
          if (vx2 == 2) {
            vx2 = -1;
          }
          if (vy2 == 2) {
              vy2 = -1;
          }
        
          if (!((vx == vx2 && vx != 0) || (vy == vy2  && vy != 0))) { //if no x or y-components are identical, then the move is valid
            finalVx = vx + vx2;
            finalVy = vy + vy2;
            
            //convert -1 to 2 so that it only occupies a single character
            if (finalVx == -1) {
              finalVx = 2;
            }
            if (finalVy == -1) {
                finalVy = 2;
            }
            
            //update the cells based on the outcome
            removeDirection(cell);
            cell.classList.add("emptyX");
            cell.classList.add("emptyY");
            cell.classList.add("empty");
            cell.value = getLongName(getX(values), getY(values), 0, 0);
            
            removeDirection(cell2);
            setVisuals(cell2, finalVx, finalVy);
            cell2.value = getLongName(finalX, finalY, finalVx, finalVy);
             
            
          }

          if (checkGrid() == true) {
            hide(reloadButton); 
            show(proceedButton);
          }
        
      }
  }
}

//returns whether the whole grid has been cleared
function checkGrid() {
 let done = true;
 let cell = null;
 let str = null;
 for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      str = getName(x, y);
      cell = document.getElementById(str);
      done = done && (cell.classList.contains("emptyX") && cell.classList.contains("emptyY"));
    }
 }
 return done;
}

//the below functions load different scenes/views/levels

function loadTut(event) {
  hide(event.target);
  hide(start);
  show(nextButton0);
  show(instruct);
}

function loadLvl1(event) {
  hide(event.target);
  hide(instruct);
  hide(proceedButton);
  show(theTable);
  show(level1);
  show(reloadButton);
  loadLevel("00 00 00 00 00 00 10 20 01 00 00 01 00 02 00 00 02 10 20 00 00 00 00 00 ");
}

function loadLvl2(event) {
  hide(event.target);
  hide(beat1);
  hide(proceedButton);
  show(theTable);
  show(level2);
  show(reloadButton);
  loadLevel("10 01 00 00 01 00 00 22 00 02 00 00 00 00 00 00 00 00 00 00 10 00 00 00 20 ");
}

function loadLvl3(event) {
  print("loadLvl3()");
  hide(event.target);
  hide(beat2);
  hide(proceedButton);
  show(theTable);
  show(level3);
  show(reloadButton);
  loadLevel("00 00 01 00 01 10 00 00 00 22 00 00 10 00 00 00 00 00 00 00 00 00 00 00 22 ");
}

function loadLvl4(event) {
  print("loadLvl4()");
  hide(event.target);
  hide(beat3);
  hide(proceedButton);
  show(theTable);
  show(level4);
  show(reloadButton);
  loadLevel("10 10 01 20 20 01 00 00 00 01 00 10 00 20 20 10 00 00 10 20 02 02 00 00 02 ");
}

function loadBeat1()  {
  hide(proceedButton);
  hide(level1);
  hide(theTable);
  hide(reloadButton);
  hide(proceedButton);
  show(beat1);
  proceedButton.onclick = loadBeat2;
  reloadButton.onclick = loadLvl2;
  show(nextButton1);
}

function loadBeat2()  {
  hide(proceedButton);
  hide(level2);
  hide(theTable);
  hide(reloadButton);
  hide(proceedButton);
  show(beat2);
  proceedButton.onclick = loadBeat3;
  reloadButton.onclick = loadLvl3;
  show(nextButton2);
}

function loadBeat3()  {
  hide(proceedButton);
  hide(level3);
  hide(theTable);
  hide(reloadButton);
  hide(proceedButton);
  show(beat3);
  proceedButton.onclick = loadBeat4;
  reloadButton.onclick = loadLvl4;
  show(nextButton3);
}

function loadBeat4()  {
  hide(level4);
  hide(theTable);
  hide(reloadButton);
  hide(proceedButton);
  show(beat4);
  show(nextButton4);
}

function loadEnd() {
  hide(beat4);
  show(win);
  show(menuButton);
  hide(nextButton4);
}

//called to prepare the main menu
function menu() {
  hide(menuButton);
  hide(win);
  show(start);
  show(playButton);
  playButton.onclick = loadTut;
  nextButton0.onclick = loadLvl1;
  nextButton1.onclick = loadLvl2;
  nextButton2.onclick = loadLvl3;
  nextButton3.onclick = loadLvl4;
  nextButton4.onclick = loadEnd;
  reloadButton.onclick = loadLvl1;
  menuButton.onclick = menu;
  proceedButton.onclick = loadBeat1;
}

//the initial function call
menu();
