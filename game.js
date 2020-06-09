var gridSize = 25;

var looping = true;
var showFieldLinesCheckBox, showFieldVectorsCheckBox, showEquipotentialLinesCheckBox, showVoltageCheckBox, createTestChargeCheckBox, createGridCheckBox, createWallsCheckBox, snapChargeToGridCheckBox;

var gameTestCharge;

// const k = 8.99 * Math.pow(10, 9) adjusted because all charges are in micro coulombs;
const k = 8990;


function setup()
{
  createCanvas(windowWidth - 280, windowHeight);
  angleMode(DEGREES);
  frameRate(60);


  select('canvas').attribute('oncontextmenu', 'return false;rightClick(true);');

  createTrack();
  gameTestCharge = new TestCharge(createVector(200, 200), testChargeCharge);
  gameTestCharge.moving = false;

  createInitialCharges();
}

function draw()
{
  background(0);
  //background("rgba(0,0,0,1)");
  //select('canvas').createLinearGradient(0, 0, 200, 0);



  moveKeys();
  displayDataFromMenu();


  displayCharges();

  displayFrameRate();
}



function displayDataFromMenu()
{
  noPositiveCharges = true;
  for (var charge of charges)
  {
    if (charge.charge > 0)
    {
      noPositiveCharges = false;
    }
  }

  displayTrack();

  snapChargeToGrid = snapChargeToGridCheckBox;

  if (snapChargeToGridCheckBox)
  {
     select("#createGrid").checked(true);
  }

  if (createGridCheckBox)
  {
    displayGrid();
  }


  if (showVoltageCheckBox)
  {
    displayVoltage();
  }

  if (showEquipotentialLinesCheckBox)
  {
    displayEquipotentialLines();
  }

  if (showFieldLinesCheckBox)
  {
    displayFieldLines();
  }

  if (showFieldVectorsCheckBox)
  {
    displayFieldVectors();
  }

  if (createWallsCheckBox)
  {
    displayWalls();
  }

  displayGameTestCharges();
}

function createDataFromMenu()
{
  getDataFromMenu();
  if (showVoltageCheckBox)
  {
    createVoltageMap();
  }
  if (showFieldLinesCheckBox)
  {
    createFieldLines();
  }
  if (showFieldVectorsCheckBox)
  {
    createFieldVectors();
  }
  if (showEquipotentialLinesCheckBox)
  {
    showEquipotentialLinesAt = [];
  }
}



function netForceAtPoint(position)
{
  for (var charge of charges)
  {
    var chargePosition = createVector(charge.position.x, charge.position.y);

    //F = KQ / (r^2)
    var kq = charge.charge  * k;
    var r = p5.Vector.dist(position, chargePosition) / gridSize;
    var rSquared = Math.pow(r,2);
    var force = kq / rSquared;

    var theta = chargePosition.sub(position).heading();
    var forceX = force * cos(theta);
    var forceY = force * sin(theta);

    var forceVectors = createVector(forceX, forceY).mult(-1);
    charge.force = forceVectors;
  }

  prevoiusFinalVector = finalVector;
  finalVector = createVector(0,0);

  for (var charge of charges)
  {
    finalVector.add(charge.force);
  }

  // if (finalVector.mag() == Infinity)
  // {
  //   console.log("Infinity");
  // }
  return finalVector;
}









function mouseReleased()
{
  if (mouseButton === LEFT)
  {
    var chargeClicked;
    var mousePosition = createVector(mouseX, mouseY);
    for (var i = charges.length - 1; i >= 0; i--)
    {
      charges[i].selected = false;
      charges[i].dragging = false;
      var distance = mousePosition.dist(charges[i].position);
      if (distance < (chargeSize/2) && chargeClicked == null)
      {
        chargeClicked = charges[i];
      }
    }
    if (chargeClicked != null && !chargeClicked.dragging)
    {
      chargeClicked.selected = true;
    }
    rightClick(false);
  }
  else
  {
    rightClick(true);
  }

  for (var i = charges.length - 1; i >= 0; i--)
  {
    charges[i].dragging = false;
  }

  if (showEquipotentialLinesCheckBox)
  {
    showEquipotentialLinesAt.push(createVector(mouseX, mouseY));
  }
}







function roundToNearestGrid(number)
{
  return Math.round(number / gridSize) * gridSize;
}

function floorToNearestGrid(number)
{
  return Math.floor(number / gridSize) * gridSize;
}



function createInitialCharges()
{
  removeAllCharges();
  // charges.push(new Charge(gameTestCharge.position.x - 50, gameTestCharge.position.y - 25, 3));
  // charges.push(new Charge(gameTestCharge.position.x - 50, gameTestCharge.position.y + 25, 3));

  createDataFromMenu();
}






function displayFrameRate()
{
  push();
  noStroke();
  fill(255);
  textSize(20);
  text(round(frameRate()),10,25);
  pop();
}



function getDataFromMenu()
{
  showFieldLinesCheckBox = select("#fieldLines").checked();
  showFieldVectorsCheckBox = select("#fieldVectors").checked();
  showEquipotentialLinesCheckBox = select("#equi").checked();
  showVoltageCheckBox = select("#voltage").checked();
  createTestChargeCheckBox = true;
  createGridCheckBox = select("#createGrid").checked();
  createWallsCheckBox = select("#walls").checked();
  snapChargeToGridCheckBox = select("#snapChargesToGrid").checked();
}

function keyPressed()
{
  var chargeSelected = false;
  for (var i = 0; i < charges.length; i++)
  {
    if (charges[i].selected)
    {
      chargeSelected = true;
      if (keyCode === DELETE)
      {
        removeCharge(i);
      }
      if (keyCode === 107)
      {
        // plus key pressed
        charges[i].slider.value(charges[i].slider.value() + 1);
      }
      if (keyCode === 109)
      {
        // minus key pressed
        charges[i].slider.value(charges[i].slider.value() - 1);
      }
    }
  }
  if (!chargeSelected && keyCode == CONTROL)
  {
    createCharge(createVector(mouseX,mouseY),-4);
  }
  if (!chargeSelected && keyCode == SHIFT)
  {
    createCharge(createVector(mouseX,mouseY),4);
  }
  createDataFromMenu();
}

function moveKeys()
{
  // for (var charge of charges)
  // {
  //   if (charge.selected)
  //   {
  //     if (keyIsDown(RIGHT_ARROW))
  //     {
  //       charge.position.x += 3;
  //     }
  //     if (keyIsDown(LEFT_ARROW))
  //     {
  //       charge.position.x -= 3;
  //     }
  //     if (keyIsDown(DOWN_ARROW))
  //     {
  //       charge.position.y += 3;
  //     }
  //     if (keyIsDown(UP_ARROW))
  //     {
  //       charge.position.y -= 3;
  //     }
  //   }
  // }
}


function doubleClicked()
{
  var notTouching = true;
  var mousePosition = createVector(mouseX, mouseY);
  for (var charge of charges)
  {
    var distance = mousePosition.dist(charge.position);
    if (distance < chargeSize)
  {
      notTouching = false;
    }
  }
  if (notTouching && mouseX < windowWidth - (200 + chargeSize))
  {
    createCharge(mousePosition);
  }
}



function mouseDragged()
{
  var chargeDragged = null;
  for (var charge of charges)
  {
    if (charge.dragging)
    {
      chargeDragged = charge;
    }
  }

  if (chargeDragged == null)
  {
    var mousePosition = createVector(mouseX, mouseY);
    for (var i = charges.length - 1; i >= 0; i--)
    {
      charges[i].dragging = false;
      var distance = mousePosition.dist(charges[i].position);
      if (distance < (chargeSize/2) && chargeDragged == null)
      {
        chargeDragged = charges[i];
        chargeDragged.dragging = true;
      }
    }
    if (chargeDragged != null && chargeDragged.dragging)
    {
      if (snapChargeToGrid)
      {
        chargeDragged.x = constrain(roundToNearestGrid(mouseX), 0, width);
        chargeDragged.y = constrain(roundToNearestGrid(mouseY), 0, height);
        chargeDragged.position = createVector(roundToNearestGrid(mouseX), roundToNearestGrid(mouseY));
      }
      else
      {
        chargeDragged.x = constrain(mouseX,0,width);
        chargeDragged.y = constrain(mouseY,0,height);
        chargeDragged.position = createVector(mouseX, mouseY);
      }
      chargeDragged.dragging = true;
    }
  }
  else
  {
    for (var i = charges.length - 1; i >= 0; i--)
    {
      charges[i].selected = false;
    }
    if (snapChargeToGrid)
    {
      chargeDragged.x = constrain(roundToNearestGrid(mouseX), 0, width);
      chargeDragged.y = constrain(roundToNearestGrid(mouseY), 0, height);
      chargeDragged.position = createVector(roundToNearestGrid(mouseX), roundToNearestGrid(mouseY));
    }
    else
    {
      chargeDragged.x = constrain(mouseX,0,width);
      chargeDragged.y = constrain(mouseY,0,height);
      chargeDragged.position = createVector(mouseX, mouseY);
    }
    chargeDragged.dragging = true;
  }

  if (createWallsCheckBox)
  {
    var wallThere = false;
    for (var wall of walls)
    {
      if (wall.x == floorToNearestGrid(mouseX) && wall.y == floorToNearestGrid(mouseY))
      {
          wallThere = true;
      }
    }
    if (!wallThere)
    {
      walls.push(new Wall(floorToNearestGrid(mouseX), floorToNearestGrid(mouseY), 1, 1));
    }

  }
}

function displayGrid()
{
  push();
    for (var x = 0; x <= windowWidth; x+= gridSize)
    {
      stroke("rgba(255, 255, 255, 0.15)");
      line(x, 15, x, windowHeight);

      noStroke();
      fill("rgb(55,55,55)")
      text(x/gridSize, x - ((x/gridSize).toString().length * 4), 13);
    }
    for (var y = 0; y < windowHeight; y+= gridSize)
    {
      stroke("rgba(255, 255, 255, 0.15)");
      line(15, y, windowWidth, y);

      noStroke();
      fill("rgb(55,55,55)")
      text(y/gridSize, (2 / (y/gridSize).toString().length), y + 4);
    }
  pop();
}





function windowResized()
{
  resizeCanvas(windowWidth - 280, windowHeight);
}
