var track;
var finishLine;
var trackColor = "rgba(255,255,255,0.5)";

function createTrack()
{
  track = new Track(4);
}

function displayTrack()
{
  track.display();
}

function trackRect(x, y, rectWidth, rectHeight)
{
    rect(x * gridSize, y * gridSize, rectWidth * gridSize, rectHeight * gridSize);
}

function trackEllipse(x, y, radiusX, radiusY)
{
  ellipse(x * gridSize, y * gridSize, radiusX * gridSize, radiusY * gridSize);
}

class Track
{
  constructor(level)
  {
    this.level = level;

    if (this.level == 1)
    {
      this.finishLine = new FinishLine(createVector(25, 6), createVector(2,4));
    }
    else if (this.level == 2)
    {
      this.finishLine = new FinishLine(createVector(23, 20), createVector(4,2));
    }
    else if (this.level == 3)
    {
      this.finishLine = new FinishLine(createVector(7, 22), createVector(2,4));
    }
    else if (this.level == 4)
    {
      this.finishLine = new FinishLine(createVector(6, 23), createVector(2,4));
    }
    else
    {

    }


    this.display = function()
    {
      // beginShape();
      // //beginShape(POINTS);
      //   noFill();
      //   stroke(255);
      //   for (var i = 0; i < this.fieldLinePoints.length; i++)
      //   {
      //     curveVertex(this.fieldLinePoints[i].x, this.fieldLinePoints[i].y);
      //   }
      // endShape();



      if (this.level == 1)
      {
        push();
          noStroke();
          fill(trackColor);
          trackRect(7, 6, 20, 4);
        pop();
        this.finishLine.display();
        this.finishLine.checkFinished();
      }
      else if (this.level == 2)
      {
        push();
          noStroke();
          fill(trackColor);
          trackRect(7, 6, 20, 4);
          trackRect(23, 10, 4, 12);
        pop();
        this.finishLine.display();
        this.finishLine.checkFinished();
      }
      else if (this.level == 3)
      {
        push();
          noStroke();
          fill(trackColor);
          trackRect(7, 6, 20, 4);
          trackRect(23, 10, 4, 12);
          trackRect(7, 22, 20, 4);
        pop();
        this.finishLine.display();
        this.finishLine.checkFinished();
      }
      else if (this.level == 4)
      {
        push();
          noStroke();
          fill(trackColor);
          trackEllipse(17, 16.5, 21, 21);

          fill(0);
          trackEllipse(17, 16.5, 13, 13);
          trackRect(6, 6, 12, 24);

          fill(trackColor);
          trackRect(6, 6, 12, 4);
          trackRect(6, 23, 12, 4);
        pop();
        this.finishLine.display();
        this.finishLine.checkFinished();
      }
      else
      {

      }






      //
      //
      //   translate(50, 50);
      //   fill(255)
      //   stroke(255, 0, 0);
      //   beginShape();
      //     // Exterior part of shape, clockwise winding
      //     vertex(-40, -40);
      //     vertex(40, -40);
      //     vertex(40, 40);
      //     vertex(-40, 40);
      //     // Interior part of shape, counter-clockwise winding
      //     beginContour();
      //       vertex(-20, -20);
      //       vertex(-20, 40);
      //       vertex(20, 40);
      //       vertex(20, -20);
      //     endContour();
      //   endShape(CLOSE);
      // pop();


    }
  }
}

class FinishLine
{
  constructor(position, size)
  {
    this.position = createVector(position.x * gridSize, position.y * gridSize);
    this.size = createVector(size.x * gridSize, size.y * gridSize);

    this.display = function()
    {
      push();
        noFill();
        stroke(trackColor);
        rect(this.position.x, this.position.y, this.size.x, this.size.y);
      pop();

      var offset;
      for (var y = 0; y < this.size.y; y+=5)
      {
        for (var x = 0; x < this.size.x - 5; x+=5)
        {
          push();

            noStroke();
            if (offset == 0)
            {
              fill(trackColor);
              rect(this.position.x + x + 5, this.position.y + y, 5, 5);
              offset = 1;
            }
            else
            {
              fill(0);
              rect(this.position.x + x, this.position.y + y, 5, 5);
              offset = 0;
            }
          pop();
        }
      }
    }

    this.checkFinished = function()
    {
      if (gameTestCharge.position.x > this.position.x && gameTestCharge.position.x < this.position.x + this.size.x && gameTestCharge.position.y > this.position.y && gameTestCharge.position.y < this.position.y + this.size.y)
      {
        gameTestCharge.moving = false;
      }
    }
  }
}
