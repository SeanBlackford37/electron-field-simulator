var walls = [];

function displayWalls()
{
  for (wall of walls)
  {
    wall.display();
  }
}

class Wall
{
  constructor(x, y, width, height)
  {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = 255;

    this.display = function()
    {
        push();
          fill(this.color);
          noStroke();
          rect(this.x, this.y, this.width * gridSize, this.height * gridSize);
        pop();
    }
  }
}
