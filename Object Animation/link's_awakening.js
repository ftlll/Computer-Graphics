// Sample code for Project 2B
// Draws 3D Simple Shapes (box, cylinder, sphere, cone, torus)

// In this project, I am using instancing for creating 3 stone_pillar()

let wall_texture;
let stone_texture;

// preload texture from imgur
function preload() {
  stone_texture = loadImage('https://i.imgur.com/SYxuXO4.jpg');
  wall_texture = loadImage('https://i.imgur.com/U0ldnnd.jpg');
}

let time = 0;  // track time passing, used to move the objects

function setup() {
  createCanvas(800, 800, WEBGL);

  let fov = 60.0;  // 60 degrees FOV
  perspective(PI * fov / 180.0, width / height, 0.1, 2000);
}

// called repeatedly to draw new per-frame images
function draw() {
  //////////////////
  // edit mode
  // orbitControl();
  //////////////////

  background(255, 255, 255);  //  white background

  // set the virtual camera position
  if (time < 50) {
    let t = min(time / 50, 1);
    let x = bezierPoint(80, 100, 100, 0, t);
    let z = bezierPoint(-150, -100, 100, 150, t);
    camera(x, -120, z, 0, 0, 0, 0, 1, 0);
  } else if (time < 150) {
    let x = 150 * sin((50 - time) * 0.02 * PI);
    let z = 150 * cos((50 - time) * 0.02 * PI);
    camera(x, -120 + (time - 50) * 0.5, z, 0, 0, 0, 0, 1, 0);
  } else {
    camera(0, -120 + 100 * 0.5, 150, 0, 0, 0, 0, 1, 0);
  }

  // include some light even in shadows
  ambientLight(60, 60, 60);

  // set light position
  pointLight(255, 255, 255, 100, -100, 100);

  noStroke();  // don't draw polygon outlines

  texture(wall_texture);
  push();
  translate(0, 2, 0);
  rotateX(1/2* PI);
  plane(600, 600);
  pop();

  fill("#C32A2A");
  push();
  translate(0, 1.5, -165);
  rotateX(1/2* PI);
  plane(100, 270);
  pop();

  texture(wall_texture);
  push();
  translate(0, -298, 300);
  plane(600, 600);
  pop();

  push();
  translate(0, -298, -300);
  plane(600, 600);
  pop();

  push();
  translate(-300, -298, 0);
  rotateY(1/2 * PI);
  plane(600, 600);
  pop();

  push();
  translate(300, -298, 0);
  rotateY(1/2 * PI);
  plane(600, 600);
  pop();

  push();
  translate(0, -34, 0);
  if (time < 33) {
    translate(0, 0, 0);
  } else if (time < 36) {
    translate(0, - (time - 33), 0);
  } else if (time < 38) {
    translate(0, - (time - 36) * 2 - 3, 0);
  } else if (time < 41) {
    translate(0, - (time - 36) * 2 - 3, 0);
    rotateY(time - 38);
  } else if (time < 42.5) {
    translate(0, - 5 * 2 - 3, 0);
    rotateZ(2 / 3  * (time - 41) * PI);
  } else if (time < 43) {
    translate(0, - 5 * 2 - 3, 0);
    rotateZ(PI + sin((time - 43) * 10) * 5 / 180 * PI);
  } else if (time < 53) {
    x = lerp(0, -8.5, 0.1 * (time - 43));
    y = lerp(-13, 9, 0.1 * (time - 43));
    z = lerp(0, -2, 0.1 * (time - 43));
    translate(x, y, z);
    rotateZ(PI);
  } else if (time < 56) {
    translate(-8.5, 9, -2 + (time - 53) * 3);
    rotateZ(PI);
  } else {
    translate(-8.5, 9, -2 + 9);
    rotateZ(PI);
  }
  scale(0.33);
  rotateZ(PI);
  sword();
  pop();

  texture(stone_texture);
  push();
  rotateY(1/6 * PI);
  platform();
  pop();

  push();
  translate(60 * cos(1/2 * PI), 0, 60 * sin(1/2 * PI) + 4);
  stone_pillar();
  pop();

  push();
  translate(60 * cos(7/6 * PI), 0, 60 * sin(7/6 * PI));
  stone_pillar();
  pop();

  push();
  translate(60 * cos(11/6 * PI), 0, 60 * sin(11/6 * PI));
  stone_pillar();
  pop();

  push();
  translate(0, -21, -46);
  link(time);
  pop();

  time += 0.05;  // update the time
}

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

function hair(time) {
  fill("#CB9306");
  // main hair
  push();
  translate(0, -10, -4);
  sphere(16);
  pop();
  // mid ellipsoid
  push();
  rotateX(sin(time) * (2 / 180) * PI);
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
  rotateZ(sin(time) * (1 / 180) * PI);
  translate(18, -20, 2);
  ellipsoid(2, 12, 4);
  pop();
  // left-side hair
  push();
  rotateZ(sin(time) * (1 / 180) * PI);
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
  translate(0, 2.5, 0);
  unbalancedCone(20, 30, 100);
  pop();
}

function head(time) {
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
  hair(time);
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

function tri_prism(r, h, prism_texture) {
  // apply stone texture
  texture(prism_texture);
  textureMode(NORMAL);
  // bottom triangle
  beginShape();
  vertex(r * sin(1/2 * PI), 0, r * cos(1/2 * PI), 0, 0);
  vertex(r * sin(7/6 * PI), 0, r * cos(7/6 * PI), 0, 1);
  vertex(r * sin(11/6 * PI), 0, r * cos(11/6 * PI), 1, 1);
  endShape(CLOSE)

  // upper triangle
  beginShape();
  vertex(r * sin(1/2 * PI), h, r * cos(1/2 * PI), 0, 0);
  vertex(r * sin(7/6 * PI), h, r * cos(7/6 * PI), 0, 1);
  vertex(r * sin(11/6 * PI), h, r * cos(11/6 * PI), 1, 1);
  endShape(CLOSE)

  // side triangles
  beginShape();
  vertex(r * sin(1/2 * PI), 0, r * cos(1/2 * PI), 0, 0);
  vertex(r * sin(1/2 * PI), h, r * cos(1/2 * PI), 0, 1);
  vertex(r * sin(7/6 * PI), h, r * cos(7/6 * PI), 1, 1);
  vertex(r * sin(7/6 * PI), 0, r * cos(7/6 * PI), 1, 0);
  endShape(CLOSE)

  beginShape();
  vertex(r * sin(1/2 * PI), 0, r * cos(1/2 * PI), 0, 0);
  vertex(r * sin(1/2 * PI), h, r * cos(1/2 * PI), 0, 1);
  vertex(r * sin(11/6 * PI), h, r * cos(11/6 * PI), 1, 1);
  vertex(r * sin(11/6 * PI), 0, r * cos(11/6 * PI), 1, 0);
  endShape(CLOSE)

  beginShape();
  vertex(r * sin(7/6 * PI), 0, r * cos(7/6 * PI), 0, 0);
  vertex(r * sin(7/6 * PI), h, r * cos(7/6 * PI), 0, 1);
  vertex(r * sin(11/6 * PI), h, r * cos(11/6 * PI), 1, 1);
  vertex(r * sin(11/6 * PI), 0, r * cos(11/6 * PI), 1, 0);
  endShape(CLOSE)
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

function left_arm(time) {
  let arm_length = 16;
  fill("#914701");
  push();
  translate(0, 0, 0);
  sphere(3);
  pop();
  // upper arm
  push();
  translate(0, 1/4 * arm_length, 0);
  cylinder(3, 1/2 * arm_length);
  pop();

  push();
    translate(0, 1/2 * arm_length, 0);
    if (time < 28.3) {
      rotateZ(0);
    } else if (time < 30) {
      rotateZ(-(time - 28.3) * 20 / 180 * PI)
    } else if (time < 43) {
      rotateZ(-(30 - 28.3) * 20 / 180 * PI)
    } else if (time < 44.5) {
      rotateZ((22.6 * (time - 43) - 34) / 180 * PI);
    } else {
      rotateZ(0);
    }
    // joint
    push();
    translate(0, 0, 0);
    sphere(3);
    pop();
    // lower arm
    push();
    translate(0, 1/4 * arm_length, 0);
    cylinder(3, 1/2 * arm_length);
    pop();
    // hand
    fill("#FFDAB9");
    push();
    translate(0, 1/2 * arm_length, 0);
    sphere(3);
    pop();
    push();
    translate(0, 1/2 * arm_length + 3, 0);
    ellipsoid(3, 5, 3);
    pop();
    // finger
    push();
    translate(2.5, 1/2 * arm_length + 3.5, 0);
    rotateZ(-1/6 * PI);
    ellipsoid(1, 3, 2);
    pop();
  pop();
}

function right_arm(time) {
  let arm_length = 16;
  fill("#914701");
  push();
  translate(0, 0, 0);
  sphere(3);
  pop();
  // upper arm
  push();
  translate(0, 1/4 * arm_length, 0);
  cylinder(3, 1/2 * arm_length);
  pop();

  push();
    translate(0, 1/2 * arm_length, 0);
    if (time < 28.3) {
      rotateZ(0);
    } else if (time < 30) {
      rotateZ(-(time - 28.3) * 15 / 180 * PI)
    } else {
      rotateZ(-(30 - 28.3) * 15 / 180 * PI)
    }
    // joint
    push();
    translate(0, 0, 0);
    sphere(3);
    pop();
    // lower arm
    push();
    translate(0, 1/4 * arm_length, 0);
    cylinder(3, 1/2 * arm_length);
    pop();
    // hand
    fill("#FFDAB9");
    push();
    translate(0, 1/2 * arm_length, 0);
    sphere(3);
    pop();
    push();
    translate(0, 1/2 * arm_length + 3, 0);
    ellipsoid(3, 5, 3);
    pop();
    // finger
    push();
    translate(2.5, 1/2 * arm_length + 3.5, 0);
    rotateZ(-1/6 * PI);
    ellipsoid(1, 3, 2);
    pop();
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
  translate(0, 2.5, 0);
  cylinder(4, 2);
  pop();
  push();
  translate(0, 2.5, 4);
  box(8, 2, 8);
  pop();
  push();
  translate(0, 2.5, 8);
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

function link(time) {
  push();
  scale(0.5);
  // animation for link movement
  if (time < 18) {
    translate(0, sin(time) * 1.0, time * 6 - 100);
  } else if (time < 20) {
    translate(0, -4 * (time - 18), time * 6 - 100);
  } else if (time < 25) {
    translate(0, -8, time * 6 - 100);
  } else if (time < 27) {
    translate(0, -8 - 11.25 / 2 * (time - 25), time * 6 - 100);
  } else if (time < 28) {
    translate(0, -8 - 11.25, time * 6 - 100);
  } else if (time < 53) {
    translate(0, -8 - 11.25, 28 * 6 - 100);
  } else if (time < 56) {
    translate(0, -8 - 11.25, (time - 53) * 6 + 68);
  } else {
    translate(0, -8 - 11.25, 86);
  }
  rotateZ(PI);
  // head
  push();
  translate(0, 10, -3);
  scale(1, 0.88, 1);
  head(time);
  pop();
  // body
  push();
  translate(0, -32, 0);
  body();
  pop();
  // left arm
  push();
  translate(-13, -12, 0);
  if (time < 28.3) {
    rotateX(sin(time) * (10 / 180) * PI);
    rotateX(7/8 * PI);
    rotateZ(1/6 * PI);
  } else if (time < 30) {
    rotateX(-(time - 28.3) * 45 / 180 * PI);
    rotateX(7/8 * PI);
    rotateZ(1/6 * PI);
  } else if (time < 33) {
    rotateX(-(30 - 28.3) * 45 / 180 * PI);
    rotateX(7/8 * PI);
    rotateZ((1/6 - 1/27 * (time - 30)) * PI);
  } else if (time < 43) {
    rotateX(-(30 - 28.3) * 45 / 180 * PI);
    rotateX(7/8 * PI);
    rotateZ(1/18 * PI);
  } else if (time < 44.5) {
    rotateX((time - 43) * 45 / 180 * PI);
    rotateX(-(30 - 28.3) * 45 / 180 * PI);
    rotateX(7/8 * PI);
    rotateZ((1/18 + 2/27 * (time - 43)) * PI);
  } else {
    rotateX((44.5 - 43) * 45 / 180 * PI);
    rotateX(-(30 - 28.3) * 45 / 180 * PI);
    rotateX(7/8 * PI);
    rotateZ(1/6 * PI);
  }
  left_arm(time);
  pop();
  // right arm
  push();
  translate(13, -12, 0);
  if (time < 28.3) {
    rotateX(-sin(time) * (10 / 180) * PI);
    rotateX(7/8 * PI);
    rotateZ(-1/6 * PI);
    rotateY(PI);
  } else if (time < 30) {
    rotateX(-(time - 28.3) * 45 / 180 * PI);
    rotateX(7/8 * PI);
    rotateZ(-1/6 * PI);
    rotateY(PI);
  } else if (time < 33) {
    rotateX(-(30 - 28.3) * 45 / 180 * PI);
    rotateX(7/8 * PI);
    rotateZ((-1/6 + 1/27 * (time - 30)) * PI);
    rotateY(PI);
  } else if (time < 43) {
    rotateX(-(30 - 28.3) * 45 / 180 * PI);
    rotateX(7/8 * PI);
    rotateZ(-1/18 * PI);
    rotateY(PI);
  } else if (time < 44.5) {
    rotateX(-(time - 43) * 10 / 180 * PI);
    rotateX(-(30 - 28.3) * 45 / 180 * PI);
    rotateX(7/8 * PI);
    rotateZ((-1/18 - 2/27 * (time - 43)) * PI);
    rotateY(PI);
  } else {
    rotateX(-(44.5 - 43) * 10 / 180 * PI);
    rotateX(-(30 - 28.3) * 45 / 180 * PI);
    rotateX(7/8 * PI);
    rotateZ(-1/6 * PI);
    rotateY(PI);
  }
  right_arm(time);
  pop();
  // left foot
  push();
  if (time < 28.0 || (time > 53 && time < 56)) rotateX(sin(time) * (10 / 180) * PI);
  translate(7, -36, 0);
  rotateY(PI);
  foot();
  pop();
  // right foot
  push();
  if (time < 28.0 || (time > 53 && time < 56)) rotateX(-sin(time) * (1 / 18) * PI);
  translate(-7, -36, 0);
  rotateY(PI);
  foot();
  pop();
}

function sword() {
  // bottom of sword
  fill("#2A5CC5");
  push();
  rotateY(PI);
  cone(6, 6);
  pop();
  // hilt
  push();
  translate(0, -5, 0);
  rotateX(PI);
  cone(6, 4);
  pop();
  push();
  translate(0, -13, 0);
  cylinder(3, 16);
  pop();
  // cross guard
  push();
  translate(0, -21, 0);
  scale(1, 1, 0.5);
  rotateZ(PI);
  trapezoid(18, 12, 9);
  pop();
  push();
  translate(0, -31, 0);
  scale(1, 1, 0.5);
  cylinder(7.5, 3);
  pop();
  // blade
  fill("#CBCBC2")
  push();
  translate(0, -56, 0);
  scale(1, 1, 0.5);
  cylinder(6, 50);
  pop();
  push();
  translate(0, -56 - 24 - 5.5, 0);
  scale(1, 1, 0.5);
  rotateX(PI);
  cone(6, 11);
  pop();
}

function stone_pillar() {
  push();
  cylinder(10, 6);
  pop();
  push();
  translate(0, -3, 0);
  cylinder(8, 4);
  pop();
  push();
  translate(0, -8, 0);
  ellipsoid(6, 12, 6);
  pop();
}

function platform() {
  push();
  translate(0, -2.5, 0);
  tri_prism(60, 5, stone_texture);
  pop();
  push();
  translate(0, -8.5, 0);
  rotateY(1/3 * PI);
  tri_prism(15, 8, stone_texture);
  pop();
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('link\'s_awakening.jpg');
  }
}

