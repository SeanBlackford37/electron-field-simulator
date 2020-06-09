var voltageMap = [];
var voltageBlockSize = 10;

function displayVoltage()
{
  for (var charge of charges)
  {
    var color = "rgba(255,0,0," + Math.abs(charge.charge / 10) + ")";
    if (charge.charge < 0)
    {
        color = "rgba(0,0,255," + Math.abs(charge.charge / 10) + ")";
    }
    if (charge.charge == 0)
    {
        color = "rgba(0,0,0,0)";
    }
    //createGradient(charge.position, Math.abs(charge.charge) * 20, color);
    var voltage = (voltageAtPoint(charge.x - 5, charge.y - 5) + voltageAtPoint(charge.x + 5, charge.y - 5) + voltageAtPoint(charge.x - 5, charge.y + 5) + voltageAtPoint(charge.x + 5, charge.y + 5)) / 4;
    createGradient(charge.position, Math.abs(voltage) / 1000, color);
  }

}

function createGradient(position, radius, color)
{
  var ctx = document.getElementById('defaultCanvas0').getContext("2d");
  var grd = ctx.createRadialGradient(position.x, position.y, 0, position.x, position.y, radius);
  grd.addColorStop(0, color);
  grd.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grd;
  ctx.fillRect(position.x - (width / 2), position.y - (height / 2), width, height);
}

function createVoltageMap()
{

}

function voltageAtPoint(x, y)
{
  var position = createVector(x,y);

  var voltage = 0;

  for (charge of charges)
  {
    //V = KQ / r
    var kq = charge.charge * k;
    var r = p5.Vector.dist(position, charge.position) / gridSize;
    var v = kq / r;

    voltage += v;
  }

  // if (voltage == Infinity)
  // {
  //   console.log("Infinity");
  // }
  return voltage;
}
