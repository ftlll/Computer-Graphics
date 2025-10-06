// Shader Project

PShader blank_shader;  // top and bottom of cube

// shaders for the four sides of the cube (you will modify these!)
PShader pattern_shader;
PShader fractal_chain_shader;
PShader magnify_shader;
PShader waves_shader;

PImage example_texture;  // used by edges shader

float zoom = 400;
boolean locked = false;
float dirY = 0;
float dirX = 0;
float time = 9;
float delta_time = 0.02;

// initialize variables and load shaders
void setup() {

  size (800, 800, P3D);

  frameRate (30);

  noStroke();

  // load a texture
  example_texture = loadImage("data/initial_pic.jpg");

  // load the shaders
  blank_shader = loadShader("data/blank.frag", "data/blank.vert");
  pattern_shader = loadShader("data/spiral.frag", "data/spiral.vert");
  fractal_chain_shader = loadShader("data/fractal_chain.frag", "data/fractal_chain.vert");
  magnify_shader = loadShader("data/mag.frag", "data/mag.vert");
  waves_shader = loadShader("data/waves.frag", "data/waves.vert");
}

void draw() {

  background (0);

  // create a single directional light
  directionalLight (190, 190, 190, 0, 0, -1);

  pushMatrix();

  camera (0, 0, zoom, 0, 0, 0, 0, 1, 0);

  // control the scene rotation via the current mouse location
  if (!locked) {
    dirY = (mouseY / float(height) - 0.5) * 2;
    dirX = (mouseX / float(width) - 0.5) * 2;
  }

  rotateX (-dirY);
  rotateY (dirX * 3.5);

  // top of cube
  shader (blank_shader);
  pushMatrix();
  rotateX (0.5 * PI);
  translate (0, 0, 100);
  one_square();
  popMatrix();

  // bottom of cube
  shader (blank_shader);
  pushMatrix();
  rotateX (1.5 * PI);
  translate (0, 0, 100);
  one_square();
  popMatrix();

  // four sides of cube
  cube_four_walls();

  popMatrix();

  // update the time variable
  time += delta_time;
}

// create various textured sides of the cube
void cube_four_walls()
{
  // Render the four-fold fractal shader
  shader(fractal_chain_shader);

  // vary the complex number c = (cx, cy) and hand it to the shader
  float r = 0.2;
  float mx = 1.0;
  float my = 0.1;
  float cx = mx + r * sin(time);
  float cy = my + r * cos(time);

  fractal_chain_shader.set ("cx", cx);
  fractal_chain_shader.set ("cy", cy);

  textureMode(NORMAL);
  pushMatrix();
  rotateY (PI);
  translate (0, 0, 100);
  one_square();
  popMatrix();

  // Render the image manipulation shader
  magnify_shader.set("my_texture", example_texture);

  // include here motion for cx and cy (similar to fractal shader above)
  // change here:
  float start_x = 0.2;
  float start_y = 0.2;
  float time_mod = time % 3.;
  if (time_mod < .6) {
    cx = start_x + time_mod;
    cy = start_y;
  } else if (time_mod < .6 + .9) {
    cx = 0.8 - (0.6 / .9) * (time_mod - 0.6);
    cy = start_y + (0.6 / .9) * (time_mod - 0.6);
  } else if (time_mod < .6 + .9 + 0.6) {
    cx = 0.2 + (time_mod - .6 - .9);
    cy = 0.8;
  } else {
    cx = 0.8 - (0.6 / .9) * (time_mod - (.6 + .9 + 0.6));
    cy = 0.8 - (0.6 / .9) * (time_mod - (.6 + .9 + 0.6));
  }

  magnify_shader.set ("cx", cx);
  magnify_shader.set ("cy", cy);

  shader(magnify_shader);
  textureMode(NORMAL);

  pushMatrix();
  rotateY (0.5 * PI);
  translate (0, 0, 100);
  beginShape();
  texture(example_texture);
  vertex(-100, -100, 0, 0, 0);
  vertex( 100, -100, 0, 1, 0);
  vertex( 100,  100, 0, 1, 1);
  vertex(-100,  100, 0, 0, 1);
  endShape();
  popMatrix();

  // Render the waves shader

  shader(waves_shader);
  pushMatrix();
  rotateY (1.5 * PI);
  translate (0, 0, 100);
  float resolution = 120.;
  // replace this square with lots of little ones that your
  // vertex shader can move around to make waves
  for (float i = 0.; i < resolution; i++) {
    for (float j = 0.; j < resolution; j++) {
      pushMatrix();
      translate(200 / resolution * (i + .5) - 100, 200 / resolution * (j + .5) - 100, 0);
      scale(1./ resolution, 1./ resolution, 1);
      small_square(i / resolution, j / resolution, resolution);
      popMatrix();
    }
  }
  popMatrix();

  // Render the circles shader
  shader(pattern_shader);
  pushMatrix();
  rotateY (0);
  translate (0, 0, 100);
  one_square();
  popMatrix();
}

// changes: create square that could pass u,v values
void small_square(float u, float v, float resolution)
{
  beginShape();
  vertex(-100, -100, 0, u, v);
  vertex( 100, -100, 0, u + 1./ resolution, v);
  vertex( 100,  100, 0, u + 1./ resolution, v + 1./ resolution);
  vertex(-100,  100, 0, u, v + 1./ resolution);
  endShape();
}

// a square that is used several times to make the cube
void one_square()
{
  beginShape();
  vertex(-100, -100, 0, 0, 0);
  vertex( 100, -100, 0, 1, 0);
  vertex( 100,  100, 0, 1, 1);
  vertex(-100,  100, 0, 0, 1);
  endShape();
}

void keyPressed() {
  if (key == ' ') {
    locked = !locked;
  }
}

void mouseWheel(MouseEvent event) {
  zoom += event.getCount() * 12.0;
}
