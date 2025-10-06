// Test code for Project 3A - Rasterization
//
// You should NOT modify the code in this file.  These are test routines that
// will exercise your implementation of Begin_Shape(), Vertex, End_Shape, and
// Set_Color, which should appear in a different .js file.

function setup() {
  createCanvas(500, 500);
  background (220, 220, 255);
}

function keyPressed() {

  if (key == 's') {
    saveCanvas('image_file.jpg');
    console.log ("Screen shot was saved in a JPG file.");
    return;
  }

  background (220, 220, 255);

  if (key == '1') { triangle_1_down(); }
  if (key == '2') { triangle_overlap(); }
  if (key == '3') { triangle_switch_edge(); }
  if (key == '4') { triangles_adjacent(); }
  if (key == '5') { triangle_1_up(); }
  if (key == '6') { triangle_wedges (4); }
  if (key == '7') { triangle_wedges (16); }
  if (key == '8') { triangle_rgb(); }
  if (key == '9') { triangle_cmy(); }
}

// not used
function draw() {
}

// Draw one triangle that points down.
function triangle_1_down()
{
  Set_Color (1, 0, 0);

  Begin_Shape();
  Vertex (250, 100, 0);
  Vertex (100, 400, 0);
  Vertex (400, 400, 0);
  End_Shape();
}

// Draw another triangle, one that requires switching edges.
function triangle_switch_edge()
{
  Set_Color (0, 1, 0);

  Begin_Shape();
  Vertex (200, 100, 0);
  Vertex (200, 400, 0);
  Vertex (350, 250, 0);
  End_Shape();
}

// Draw two adjacent triangles.
function triangles_adjacent()
{
  Set_Color (1, 0, 0);

  Begin_Shape();
  Vertex (123.4, 121.4, 0.0);
  Vertex (432.5, 420.8, 0.0);
  Vertex (314.1, 191.8, 0.0);
  End_Shape();

  Set_Color (0, 0, 1);

  Begin_Shape();
  Vertex (123.4, 121.4, 0.0);
  Vertex (250.3, 444.4, 0.0);
  Vertex (432.5, 420.8, 0.0);
  End_Shape();
}

// Draw three overlapping triangles.
function triangle_overlap()
{
  Set_Color (1, 0, 0);

  Begin_Shape();
  Vertex (200, 100, 0);
  Vertex (100, 300, 0);
  Vertex (300, 300, 0);
  End_Shape();

  Set_Color (0, 1, 0);

  Begin_Shape();
  Vertex (250, 150, 0);
  Vertex (150, 350, 0);
  Vertex (350, 350, 0);
  End_Shape();

  Set_Color (0, 0, 1);

  Begin_Shape();
  Vertex (300, 200, 0);
  Vertex (200, 400, 0);
  Vertex (400, 400, 0);
  End_Shape();
}

// Draw one triangle that points up.
function triangle_1_up()
{
  Set_Color (0, 0, 1);

  Begin_Shape();
  Vertex (250, 400, 0);
  Vertex (400, 100, 0);
  Vertex (100, 100, 0);
  End_Shape();
}

// Lots of thin triangle wedges that approximate a circle.
// num - number of wedges to make
function triangle_wedges(num)
{
  rad = 200;  // radius of circle

  // center of window
  cx = 0.5 * width;
  cy = 0.5 * height;

  for (var i = 0; i < num; i++) {

    // alternate colors of wedges
    if (i % 2 == 0)
      Set_Color (0.4, 0.7, 0.2);
    else
      Set_Color (0.9, 0.3, 0.5);

    // two consecutive angles around the circle
    theta1 = 2 * PI * i / num;
    theta2 = 2 * PI * (i +1) / num;

    // two consecutive points on the circle's boundary
    x1 = cx + rad * cos(theta1);
    y1 = cy + rad * sin(theta1);

    x2 = cx + rad * cos(theta2);
    y2 = cy + rad * sin(theta2);

    // draw triangle
    Begin_Shape();
    Vertex (cx, cy, 0);
    Vertex (x2, y2, 0);
    Vertex (x1, y1, 0);
    End_Shape();

  }
}

// Draw colorful RGB triangle.
function triangle_rgb()
{

  Begin_Shape();
  Set_Color (1, 0, 0);
  Vertex (250, 100, 0);
  Set_Color (0, 1, 0);
  Vertex (100, 400, 0);
  Set_Color (0, 0, 1);
  Vertex (400, 400, 0);
  End_Shape();
}

// Draw colorful CMY triangle.
function triangle_cmy()
{

  Begin_Shape();
  Set_Color (0, 1, 1);
  Vertex (250, 100, 0);
  Set_Color (1, 0, 1);
  Vertex (100, 400, 0);
  Set_Color (1, 1, 0);
  Vertex (400, 400, 0);
  End_Shape();
}

// Print where the mouse was clicked, hopefully useful for debugging.
function mousePressed() {
  if (mouseButton == LEFT) {
    x = mouseX;
    y = mouseY;
    console.log ("you clicked on pixel:");
    console.log ("  ("+x+", "+y+")   [origin upper left]");
    y = height - y - 1;
    console.log ("  ("+x+", "+y+")   [origin lower left]");
  }
}