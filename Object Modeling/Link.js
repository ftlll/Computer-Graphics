// Sample code for Project 2A
// Draws 3D Simple Shapes (box, cylinder, sphere, cone, torus)


let time = 0;  // track time passing, used to move the objects

function setup() {
  createCanvas(600, 600, WEBGL);

  let fov = 60.0;  // 60 degrees FOV
  perspective(PI * fov / 180.0, width / height, 0.1, 2000);
}

// called repeatedly to draw new per-frame images
function draw() {

  background(255, 255, 255);  //  white background

  // set the virtual camera position
  camera(0, 0, 85, 0, 0, 0, 0, 1, 0);  // from, at, up

  // include some light even in shadows
  ambientLight(60, 60, 60);

  // set light position
  pointLight(255, 255, 255, 100, -100, 300);

  noStroke();  // don't draw polygon outlines

  push();
  let box_axis = createVector (0.0, 1.0, 1.0);
  rotate (-time * 0.5, box_axis);
  link();
  pop();

  time += 0.03;  // update the time
}

/////////////////////
//
// Unused
//
/////////////////////
// function heimisphere(radius) {
//   beginShape();
//   for (let lat = 0; lat <= PI / 2; lat += 0.01) {
//     let r = sin(lat) * radius;
//     let y = cos(lat) * radius;
//     beginShape();
//     for (let lon = 0; lon <= TWO_PI; lon += 0.01) {
//       let x = r * cos(lon);
//       let z = r * sin(lon);
//       vertex(x, -y, z);
//     }
//     endShape(CLOSE);
//   }
//   endShape();
// }

function eyes() {
  fill("#000000")
  push();
  translate(4.5, 0, 19);
  ellipsoid(2, 4);
  pop();
  push();
  translate(-4.5, 0, 19);
  ellipsoid(2, 4);
  pop();
}

function eyebrows() {
  fill("#5F2D01")
  push();
  translate(4, 4, 13.5);
  rotateX(-PI/4);
  rotateZ(0.12 * PI);
  cylinder(6, 2);
  pop();
  push();
  translate(-4, 4, 13.5);
  rotateX(-PI/4);
  rotateZ(-0.12 * PI);
  cylinder(6, 2);
  pop();
}

function hair() {
  fill("#CB9306");
  // main hair
  push();
  translate(0, -10, -4);
  sphere(16);
  pop();
  // mid ellipsoid
  push();
  translate(0, 0, 8);
  ellipsoid(7 * 1.6, 7, 16);
  pop();
  // right-top-side hair
  push();
  translate(12, -4, 0);
  rotateZ(-1/3 * PI);
  ellipsoid(10, 6);
  pop();
  // left-top-side hair
  push();
  translate(-12, -4, 0);
  rotateZ(1/3 * PI);
  ellipsoid(10, 6);
  pop();
  // right-side hair
  push();
  translate(18, -20, 2);
  ellipsoid(2, 12, 4);
  pop();
  // left-side hair
  push();
  translate(-18, -20, 2);
  ellipsoid(2, 12, 4);
  pop();
  // bottom hair
  push();
  translate(0, -28, -16);
  rotateZ(PI);
  scale(2, 1.5, 1);
  cone(4, 8);
  pop();
  push();
  translate(4, -28, -16);
  rotateZ(PI);
  scale(2, 1.5, 1);
  cone(3, 6);
  pop();
  push();
  translate(-4, -28, -16);
  rotateZ(PI);
  scale(2, 1.5, 1);
  cone(3, 6);
  pop();
}

function unbalancedCone(r, h, s) {
  beginShape();
  let angleStep = TWO_PI / s;
  for (let i = 0; i < s; i++) {
    let angle = i * angleStep;
    let x = r * cos(angle);
    let y = 0;
    let z = r * sin(angle);
    vertex(x, y, z);
  }
  endShape(CLOSE);

  for (let i = 0; i < s; i++) {
    let angle = i * angleStep;
    let x = r * cos(angle);
    let y = 0;
    let z = r * sin(angle);

    beginShape();
    vertex(0, h, 2/3 * r);
    vertex(x, y, z);
    let nextAngle = (i + 1) % s * angleStep;
    let nextX = r * cos(nextAngle);
    let nextZ = r * sin(nextAngle);
    vertex(nextX, y, nextZ);
    endShape(CLOSE);
  }
}

function hat() {
  fill("#12EB46");
  push();
  cylinder(20, 5);
  pop();
  fill("#20D42B");
  push();
  // translate(0, 12.5, 0);
  // cone(20, 30);
  translate(0, 2.5, 0);
  unbalancedCone(20, 30, 100);
  pop();
}

function head() {
  fill("#FFDAB9");
  // head sphere
  push();
  ellipsoid(18, 20, 20);
  pop();
  // eyes
  push();
  translate(0, 2, 0);
  eyes();
  pop();
  // eyebrow
  push();
  translate(0, 2, 0);
  eyebrows();
  pop();
  // nose
  push();
  translate(0, -4, 18);
  rotateX(0.6 * PI);
  cone(6, 6);
  pop();
  // mouth
  fill("#000000");
  push();
  translate(0, -12, 13.5);
  rotateX(0.3 * PI);
  torus(5, 0.3);
  pop();
  // hair
  push();
  translate(0, 18, 0)
  hair();
  pop();
  // ears
  fill("#FFDAB9");
  push();
  translate(18, 0, -4);
  rotateZ(PI);
  rotateY(60/180 * PI);
  rotateX(-1/4 * PI);
  ellipsoid(2, 3, 10)
  pop();

  push();
  translate(-18, 0, -4);
  rotateY(60/180 * PI);
  rotateX(1/4 * PI);
  ellipsoid(2, 3, 10)
  pop();
  // hat
  push();
  translate(0, 10,-10);
  rotateX(-1/3*PI);
  rotateY(PI);
  hat();
  pop();
}

function trapezoid(top_r, bot_r, h) {
  let faces = 50;

  let angleStep = TWO_PI / faces;
  beginShape();
  for (let i = 0; i < faces; i++) {
    let angle = i * angleStep;
    let x = top_r * cos(angle);
    let y = h;
    let z = top_r * sin(angle);
    vertex(x, y, z);
  }
  endShape(CLOSE);

  beginShape();
  for (let i = 0; i < faces; i++) {
    let angle = i * angleStep;
    let x = bot_r * cos(angle);
    let y = 0;
    let z = bot_r * sin(angle);
    vertex(x, y, z);
  }
  endShape(CLOSE);

  for (let i = 0; i < faces; i++) {
    let angle = i * angleStep;
    let nextAngle = (i + 1) % faces * angleStep;

    let tx = top_r * cos(angle);
    let ty = h;
    let tz = top_r * sin(angle);

    let bx = bot_r * cos(angle);
    let by = 0;
    let bz = bot_r * sin(angle);

    let nextX = top_r * cos(nextAngle);
    let nextZ = top_r * sin(nextAngle);
    let nextBX = bot_r * cos(nextAngle);
    let nextBZ = bot_r * sin(nextAngle);

    beginShape();
    vertex(tx, ty, tz);
    vertex(bx, by, bz);
    vertex(nextBX, by, nextBZ);
    vertex(nextX, ty, nextZ);
    endShape(CLOSE);
  }
}

function body() {
  fill("#137F36");
  push();
  trapezoid(13, 15, 24);
  pop();
  push();
  translate(0, 26, 0);
  cone(13, 4);
  pop();
  // belt
  fill("#562000");
  push();
  translate(0, 7, 0);
  cylinder(15, 4)
  pop();
  fill("#EAEA06");
  push();
  translate(0, 7, 14.5);
  box(8, 4, 1);
  pop();
  fill("#562000");
  push();
  translate(0, 7, 14.6);
  box(6, 3, 1);
  pop();
}

function arm() {
  let arm_length = 17;
  fill("#914701");
  push();
  translate(0, 1/2 * arm_length, 0);
  sphere(3);
  pop();
  push();
  cylinder(3, arm_length);
  pop();
  fill("#FFDAB9");
  push();
  translate(0, -1/2 * arm_length, 0);
  sphere(3);
  pop();
  push();
  translate(0, -1/2 * arm_length - 3, 0);
  ellipsoid(3, 5, 3);
  pop();
  push();
  translate(2.5, -1/2 * arm_length - 3.5, 0);
  rotateZ(1/6 * PI);
  ellipsoid(1, 3, 2);
  pop();
}

function boot() {
  // bottom layer
  fill("#562000");
  push();
  cylinder(4, 1);
  pop();
  push();
  translate(0, 0, 4);
  box(8, 1, 8);
  pop();
  push();
  translate(0, 0, 8);
  cylinder(4, 1);
  pop();
  // second layer
  fill("#EAEA06");
  push();
  translate(0, 1, 0);
  cylinder(4, 1);
  pop();
  push();
  translate(0, 1, 4);
  box(8, 1, 8);
  pop();
  push();
  translate(0, 1, 8);
  cylinder(4, 1);
  pop();
  // shoe face
  fill("#562000");
  push();
  translate(0, 2, 0);
  cylinder(4, 2);
  pop();
  push();
  translate(0, 2, 4);
  box(8, 2, 8);
  pop();
  push();
  translate(0, 2, 8);
  cylinder(4, 2);
  pop();
  push();
  translate(0, 3, 4);
  ellipsoid(4, 2, 8);
  pop();
  // shaft
  push();
  translate(0, 5.5, 8);
  cylinder(4, 7.5);
  pop();
}

function foot() {
  // leg
  fill("#FFFFFF");
  push();
  cylinder(3.5, 8);
  pop();
  // shoe
  push();
  translate(0, -9, -8)
  boot();
  pop();
}

function link() {
  push();
  scale(0.9, 0.9, 0.9);
  rotateZ(PI);
  // head
  push();
  translate(0, 10, 0);
  scale(1, 0.88, 1);
  head();
  pop();
  // body
  push();
  translate(0, -32, 0);
  body();
  pop();
  // left arm
  push();
  translate(-15, -15, 0);
  rotateZ(-1/3 * PI);
  arm();
  pop();
  // right arm
  push();
  translate(15, -15, 0);
  rotateY(PI);
  rotateZ(-1/3 * PI);
  arm();
  pop();
  // left foot
  push();
  translate(7, -36, 0);
  rotateY(PI);
  foot();
  pop();
  // right foot
  push();
  translate(-7, -36, 0);
  rotateY(PI);
  foot();
  pop();
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('your_object.jpg');
  }
}

