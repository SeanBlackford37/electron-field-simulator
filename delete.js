var voltageMap = [];
var voltageBlockSize = 10;

function displayVoltage()
{
  // for (var x = 0; x < voltageMap.length; x++)
  // {
  //   for (var y = 0; y < voltageMap[x].length; y++)
  //   {
  //     var voltageColor = color(voltageMap[x][y].r, voltageMap[x][y].g, voltageMap[x][y].b, voltageMap[x][y].a);
  //     push();
  //       if (voltageMap[x][y].r > 100 || voltageMap[x][y].b > 100)
  //       {
  //         fill(voltageColor);
  //         noStroke();
  //         rect(x * voltageBlockSize, y * voltageBlockSize,voltageBlockSize,voltageBlockSize);
  //       }
  //     pop();
  //   }
  // }

  // var ctx = document.getElementById('defaultCanvas0').getContext("2d");
  // var grd = ctx.createRadialGradient(charges[1].position.x, charges[1].position.y, 5, charges[1].position.x, charges[1].position.y, 100);
  // grd.addColorStop(0, "rgba(255,0,0,1)");
  // grd.addColorStop(1, "rgba(0,0,0,0)");
  // ctx.fillStyle = grd;
  // ctx.fillRect(charges[1].position.x - 100, charges[1].position.y - 100, 200, 200);
  //
  // var grd = ctx.createRadialGradient(charges[0].position.x, charges[0].position.y, 5, charges[0].position.x, charges[0].position.y, 100);
  // grd.addColorStop(0, "rgba(0,0,255,1)");
  // grd.addColorStop(1, "rgba(0,0,0,0)");
  // ctx.fillStyle = grd;
  // ctx.fillRect(charges[0].position.x - 100, charges[0].position.y - 100, 200, 200);

  for (var charge of charges)
  {
    var color = "rgba(255,0,0,1)";
    if (charge.charge < 0 )
    {
        color = "rgba(0,0,255,1)";
    }
    createGradient(charge.position, Math.abs(charge.charge) * 20, color);
  }

}

function createGradient(position, radius, color)
{
  var ctx = document.getElementById('defaultCanvas0').getContext("2d");
  var grd = ctx.createRadialGradient(position.x, position.y, 0, position.x, position.y, radius);
  grd.addColorStop(0, color);
  grd.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grd;
  ctx.fillRect(position.x - 250, position.y - 250, 500, 500);
}

function createVoltageMap()
{
  // for (var x = 0; x < width; x += voltageBlockSize)
  // {
  //   voltageMap[x /voltageBlockSize] = [];
  //   for (var y = 0; y < height; y += voltageBlockSize)
  //   {
  //     var voltage = voltageAtPoint(x + (voltageBlockSize/2), y + (voltageBlockSize/2))
  //     var intensity = Math.round(map(Math.abs(voltage), 0, 15475, 0, 200));
  //
  //     var r = 0;
  //     var g = 0;
  //     var b = 0;
  //     var a = intensity / 4;
  //
  //     if (voltage > 0)
  //     {
  //       r = intensity;
  //     }
  //     else if (voltage < 0)
  //     {
  //       b = intensity;
  //     }
  //     var voltageColor = {r: r, g: g, b: b, a: a};
  //
  //     voltageMap[x / voltageBlockSize][y / voltageBlockSize] = voltageColor;
  //   }
  // }
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
