// Provided code for Project 5

let animate_flag = 1;        // rotate the model?
let mesh_scale = 1;          // scale amount of mesh
let show_directed_edge = 0;  // visualize the current edge in a mesh?

let time = 0;  // records the passage of time, used to rotate the objects

// this is called once at the start of the program
function setup() {
  createCanvas(600, 600, WEBGL);

  let fov = 60.0;  // 60 degrees field of view
  perspective(PI * fov / 180.0, width / height, 0.1, 2000);

}

function keyPressed() {
  console.log ("key pressed\n");
  switch(key) {
    case ' ':  animate_flag = 1 - animate_flag; break;
    case '[':  mesh_scale *= 0.8; break;
    case ']':  mesh_scale *= 1.25; break;
    case 'e':  show_directed_edge = 1 - show_directed_edge; break;
    case '1':  tetrahedron(); break;
    case '2':  octahedron(); break;
    case '3':  cube(); break;
    case '4':  icosahedron(); break;
    case '5':  dodecahedron(); break;
    case 'n':  next_edge(); break;
    case 'p':  previous_edge(); break;
    case 'o':  opposite_edge(); break;
    case 's':  swing_edge(); break;
    case 't':  truncate_mesh(); break;
    case 'r':  random_colors(); break;
    case 'w':  solid_color(); break;
    case 'q':  debugger; break;
  }
}

// this is called repeatedly to create new per-frame images
function draw() {

  background(180, 180, 255);  // light blue background

  // set the virtual camera position
  camera(0, 0, 85, 0, 0, 0, 0, 1, 0);  // from, at, up

  // include a little bit of light even in shadows
  ambientLight(40, 40, 40);

  // set the light position
  pointLight(255, 255, 255, 100, -100, 300);

  noStroke();  // don't draw polygon outlines

  fill(255,255,255);

  push();
  let mesh_axis = createVector (0, 1, 0);
  rotate (-time, mesh_axis);
  scale (mesh_scale);
  // example of drawing a quad with normals

  // (Remove these lines!!!)
  // normal (0, 0, 1);
  // beginShape();
  // vertex (-25, -25, 0);
  // vertex (-25, 25, 0);
  // vertex (25, 25, 0);
  // vertex (25, -25, 0);
  // endShape (CLOSE);
  // (Remove these lines!!!)

  // this is where you should draw your collection of polygons
  draw_mesh();

  pop();

  // maybe update time
    if (animate_flag)
      time += 0.02;
}

function tetrahedron()
{
  init_mesh();

  new_vertex (-1.0, -1.0, -1.0);
  new_vertex (1.0, 1.0, -1.0);
  new_vertex (1.0, -1.0, 1.0);
  new_vertex (-1.0, 1.0, 1.0);

  new_face (1, 2, 3);
  new_face (1, 0, 2);
  new_face (3, 2, 0);
  new_face (0, 1, 3);
}

function octahedron()
{
  init_mesh();

  new_vertex (1.0, 0.0, 0.0);
  new_vertex (0.0, -1.0, 0.0);
  new_vertex (-1.0, 0.0, 0.0);
  new_vertex (0.0, 1.0, 0.0);
  new_vertex (0.0, 0.0, 1.0);
  new_vertex (0.0, 0.0, -1.0);

  new_face (4, 0, 1);
  new_face (4, 1, 2);
  new_face (4, 2, 3);
  new_face (4, 3, 0);
  new_face (5, 1, 0);
  new_face (5, 2, 1);
  new_face (5, 3, 2);
  new_face (5, 0, 3);
}

function cube()
{
  init_mesh();

  new_vertex (-1.0, -1.0, -1.0);
  new_vertex (1.0, -1.0, -1.0);
  new_vertex (1.0, 1.0, -1.0);
  new_vertex (-1.0, 1.0, -1.0);
  new_vertex (-1.0, -1.0, 1.0);
  new_vertex (1.0, -1.0, 1.0);
  new_vertex (1.0, 1.0, 1.0);
  new_vertex (-1.0, 1.0, 1.0);

  new_face (0, 1, 2, 3);
  new_face (5, 4, 7, 6);
  new_face (6, 2, 1, 5);
  new_face (3, 7, 4, 0);
  new_face (7, 3, 2, 6);
  new_face (5, 1, 0, 4);
}

function icosahedron()
{
  init_mesh();

  new_vertex (0.0, -0.525731, 0.850651);
  new_vertex (0.850651, 0.0, 0.525731);
  new_vertex (0.850651, 0.0, -0.525731);
  new_vertex (-0.850651, 0.0, -0.525731);
  new_vertex (-0.850651, 0.0, 0.525731);
  new_vertex (-0.525731, 0.850651, 0.0);
  new_vertex (0.525731, 0.850651, 0.0);
  new_vertex (0.525731, -0.850651, 0.0);
  new_vertex (-0.525731, -0.850651, 0.0);
  new_vertex (0.0, -0.525731, -0.850651);
  new_vertex (0.0, 0.525731, -0.850651);
  new_vertex (0.0, 0.525731, 0.850651);

  new_face (6, 2, 1);
  new_face (2, 7, 1);
  new_face (5, 4, 3);
  new_face (8, 3, 4);
  new_face (11, 5, 6);
  new_face (10, 6, 5);
  new_face (2, 10, 9);
  new_face (3, 9, 10);
  new_face (9, 8, 7);
  new_face (0, 7, 8);
  new_face (1, 0, 11);
  new_face (4, 11, 0);
  new_face (10, 2, 6);
  new_face (11, 6, 1);
  new_face (10, 5, 3);
  new_face (11, 4, 5);
  new_face (9, 7, 2);
  new_face (0, 1, 7);
  new_face (8, 9, 3);
  new_face (0, 8, 4);
}

function dodecahedron()
{
 init_mesh();

  new_vertex (-0.57735, -0.57735, 0.57735);
  new_vertex (0.934172, 0.356822, 0.0);
  new_vertex (0.934172, -0.356822, 0.0);
  new_vertex (-0.934172, 0.356822, 0.0);
  new_vertex (-0.934172, -0.356822, 0.0);
  new_vertex (0.0, 0.934172, 0.356822);
  new_vertex (0.0, 0.934172, -0.356822);
  new_vertex (0.356822, 0.0, -0.934172);
  new_vertex (-0.356822, 0.0, -0.934172);
  new_vertex (0.0, -0.934172, -0.356822);
  new_vertex (0.0, -0.934172, 0.356822);
  new_vertex (0.356822, 0.0, 0.934172);
  new_vertex (-0.356822, 0.0, 0.934172);
  new_vertex (0.57735, 0.57735, -0.57735);
  new_vertex (0.57735, 0.57735, 0.57735);
  new_vertex (-0.57735, 0.57735, -0.57735);
  new_vertex (-0.57735, 0.57735, 0.57735);
  new_vertex (0.57735, -0.57735, -0.57735);
  new_vertex (0.57735, -0.57735, 0.57735);
  new_vertex (-0.57735, -0.57735, -0.57735);

  new_face (1, 2, 18, 11, 14);
  new_face (1, 13, 7, 17, 2);
  new_face (3, 4, 19, 8, 15);
  new_face (3, 16, 12, 0, 4);
  new_face (3, 15, 6, 5, 16);
  new_face (1, 14, 5, 6, 13);
  new_face (2, 17, 9, 10, 18);
  new_face (4, 0, 10, 9, 19);
  new_face (7, 8, 19, 9, 17);
  new_face (6, 15, 8, 7, 13);
  new_face (5, 14, 11, 12, 16);
  new_face (10, 0, 12, 11, 18);
}

