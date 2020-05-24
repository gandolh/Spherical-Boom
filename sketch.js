let spiral;
let semn = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  spiral = new Spiral();
  colorMode(HSL, 360);

}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  noStroke();
  spiral.spiralConstruct();
  spiral.SpiralDraw();
  spiral.SpiralAnimate(); 
   spiral.spiralPoints = [];
}
class Spiral {
  constructor() {
    this.spiralPoints = [];
    this.angle = 0;
    this.angleVelocity = 0.2;
    this.length = 75;
    this.ratio = 0.2;
  }
  spiralConstruct() {
    let hueColor = 0;
    for (let i = 0; i < this.length; i += this.ratio) {
      if (hueColor > 360) {
        hueColor = 0;
      } else {
        hueColor++;
      }
      let x = sin(this.angle) * i;
      let y = cos(this.angle) * i;
      this.spiralPoints.push(new SpiralPoint(x, y, 12, hueColor));
      this.angle += this.angleVelocity;
     
    } 
    //this.angle = 0;

  }
  SpiralDraw() {
    for (let p of this.spiralPoints) p.drawPoint();
  }
  SpiralAnimate() {
    if (this.angle < 5.5) this.angle += (semn * 0.5);
    this.length += (semn * 15);
    if (abs(this.ratio) > 0.2) this.ratio += (semn * 0.1);
    if (this.OutCanvas()) semn = -1;
    if (this.InCenter()) semn = 1;
  }
  OutCanvas() {

    return this.spiralPoints[int(this.spiralPoints.length - 1)].x < -width / 2+125 ||
      this.spiralPoints[int(this.spiralPoints.length - 1)].x > width / 2 -125 ||
      this.spiralPoints[int(this.spiralPoints.length - 1)].y < -height / 2 +125 ||
      this.spiralPoints[int(this.spiralPoints.length - 1)].y > height / 2-125
  }
  InCenter() {

    return this.length == 75
  }
}
class SpiralPoint {
  constructor(x, y, size, hueColor) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.hueColor = hueColor;
  }
  drawPoint() {
    fill(this.hueColor, 200, 200);
    ellipse(this.x, this.y, this.size, this.size);
  }
}