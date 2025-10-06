// Placeholder routines for Project 3B - Z-Buffer and Shading
//
// These (currently incomplete) functions are for you to write.  You should incorporate
// your rasterization code from part A of this project.
//
// Pay close attention to those parts marked !!!, which indicate some of the places where
// you will need to add to the code.

const width = 500;
const height = 500;

let field_of_view = 0;  // non-zero value indicates perspective projection
let z_buffer; // 500 * 500 2D array with z values
let light = {};
let diffuse = {};
let ambient = {};
let specular = {};
let spec_pow = 1;

// vertex type: [3]{}
// vertex attributes:
// x, y, z for position
// r, g, b for color
// normal
let vertices = [];
// global_color type: [3] or [] as not defined
let global_color = {};

// current transformation matrix
let ctm = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1]
];

// matrix for transforming normals
let ctm_adj;

// current surface normal
let normal_x = 0;
let normal_y = 0;
let normal_z = 1;

// set the current transformation matrix and its adjoint
function Set_Matrix (
m00, m01, m02, m03,
m10, m11, m12, m13,
m20, m21, m22, m23,
m30, m31, m32, m33)
{
  // update the current transformation matrix
  ctm = [
    [m00, m01, m02, m03],
    [m10, m11, m12, m13],
    [m20, m21, m22, m23],
    [m30, m31, m32, m33]
  ];

  ctm_adj = inverseTranspose (ctm);
}

// create adjoint of matrix (returns 3x3 matrix)
function inverseTranspose (M) {
  // Extract the 3x3 submatrix (ignoring translation column)
  let a = M[0][0], b = M[0][1], c = M[0][2];
  let d = M[1][0], e = M[1][1], f = M[1][2];
  let g = M[2][0], h = M[2][1], i = M[2][2];

  // Compute the determinant of the 3x3 submatrix
  let det = a * (e * i - f * h) -
            b * (d * i - f * g) +
            c * (d * h - e * g);

  if (Math.abs(det) < 1e-8) {
    throw new Error("Matrix is not invertible.");
  }

  let invDet = 1.0 / det;

  // Compute the inverse of the 3x3 matrix
  let inv = [
    [(e * i - f * h) * invDet, (c * h - b * i) * invDet, (b * f - c * e) * invDet],
    [(f * g - d * i) * invDet, (a * i - c * g) * invDet, (c * d - a * f) * invDet],
    [(d * h - e * g) * invDet, (b * g - a * h) * invDet, (a * e - b * d) * invDet]
  ];

  // Transpose the inverse
  return [
    [inv[0][0], inv[1][0], inv[2][0]],
    [inv[0][1], inv[1][1], inv[2][1]],
    [inv[0][2], inv[1][2], inv[2][2]]
  ];
}

function Set_Field_Of_View (fov)
{
  field_of_view = fov;
}

// !!! this routine is not finished !!!
// !!! use your own data structures !!!
function Init_Scene() {

  // initialize the current transformation matrix
  ctm = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];

  // calculate ctm adjoint

  ctm_adj = inverseTranspose (ctm);

  // !!! initialize your z-buffer here !!!

  z_buffer = Array.from({ length: height }, () => Array(width).fill(Number.NEGATIVE_INFINITY));

  // !!! set default values to material colors here !!!
  light = {};
  diffuse = {r: 0, g: 0, b: 0};
  ambient =  {r: 0, g: 0, b: 0};
  specular = {r: 0, g: 0, b: 0};
}

function Set_Light (x, y, z, r, g, b)
{
  // set light value here
  // don't forget to normaize the direction of the light vector
  let magnitude = sqrt(x * x + y * y + z * z);
  light = {
    x: x / magnitude,
    y: y / magnitude,
    z: z / magnitude,
    r, g, b,
  };
}

function Set_Color (r, g, b) {
  global_color = {
    r, g, b
  };
}

function Ambient_Specular (ar, ag, ab, sr, sg, sb, pow)
{
  spec_pow = pow;
  specular = {
    r: sr,
    g: sg,
    b: sb,
  }
  ambient = {
    r: ar,
    g: ag,
    b: ab,
  }
}

function Normal(nx, ny, nz)
{
  let magnitude = sqrt(nx * nx + ny * ny + nz * nz);
  normal_x = nx / magnitude;
  normal_y = ny / magnitude;
  normal_z = nz / magnitude;
}

// !!! this routine is not finished !!!
// !!! use your own data structures !!!
function Vertex(x, y, z) {

  // transform x, y, z using the CTM here !!!
  let [tx, ty, tz, _] = MatrixMultiplyVector(ctm, [x, y, z, 1])

  //  transform the surface normal

  let nx = ctm_adj[0][0] * normal_x + ctm_adj[0][1] * normal_y + ctm_adj[0][2] * normal_z;
  let ny = ctm_adj[1][0] * normal_x + ctm_adj[1][1] * normal_y + ctm_adj[1][2] * normal_z;
  let nz = ctm_adj[2][0] * normal_x + ctm_adj[2][1] * normal_y + ctm_adj[2][2] * normal_z;

  let magnitude = sqrt(nx * nx + ny * ny + nz * nz);

  // field of view greater than zero means use perspective projection
  if (field_of_view == 0) {
     // !!! store the transformed vertex and normal in your vertex data structure !!!!

     vertices.push({
      x: round(tx, 6),
      y: round(ty, 6),
      z: round(tz, 6),
      r: global_color.r,
      g: global_color.g,
      b: global_color.b,
      normal: {
        x: nx / magnitude,
        y: ny / magnitude,
        z: nz / magnitude
      }
    });
  }
  else {
    // perform perspective projection and mapping to screen
    let theta = field_of_view * PI / 180.0;  // convert to radians
    let k = tan (theta / 2);
    xx = tx / abs(tz);
    yy = ty / abs(tz);
    xx = (xx + k) * width  / (2 * k);
    yy = (yy + k) * height / (2 * k);
    zz = tz;
    // !!! store the transformed vertex and normal in your vertex data structure !!!!
    vertices.push({
      x: round(xx, 6),
      y: round(yy, 6),
      z: round(zz, 6),
      r: global_color.r,
      g: global_color.g,
      b: global_color.b,
      normal: {
        x: nx / magnitude,
        y: ny / magnitude,
        z: nz / magnitude
      }
    });
  }
}

function Begin_Shape() {
  in_begin_shape = true;
  vertices = [];
}

// !!! perform triangle rasterization (with shading) here !!!
function End_Shape() {

  // make wireframe (line) drawing if that is the current shading mode
  if (shade == "wireframe") {
    stroke (0, 0, 0);
    strokeWeight (2.0);
    // !!! draw lines between your stored vertices (adjust to your data structures) !!!
    let v0 = vertices[0];
    let v1 = vertices[1];
    let v2 = vertices[2];
    line (v0.x, height - v0.y, v1.x, height - v1.y);
    line (v0.x, height - v0.y, v2.x, height - v2.y);
    line (v1.x, height - v1.y, v2.x, height - v2.y);

    vertices = [];
    return;
  }

  if (shade == "flat") {
    // overwrite normals of each vtx
    // E1 = B - A
    // E2 = C - A
    // N = (E1 * E2) / ||E1 * E2||
    let E1 = {
      x: vertices[1].x - vertices[0].x,
      y: vertices[1].y - vertices[0].y,
      z: vertices[1].z - vertices[0].z,
    }
    let E2 = {
      x: vertices[2].x - vertices[0].x,
      y: vertices[2].y - vertices[0].y,
      z: vertices[2].z - vertices[0].z,
    }
    let product = {
      x: E1.y * E2.z - E1.z * E2.y,
      y: E1.z * E2.x - E1.x * E2.z,
      z: E1.x * E2.y - E1.y * E2.x,
    }
    let magnitude = sqrt(product.x * product.x + product.y * product.y + product.z * product.z);
    let surface_normal = {
      x: product.x / magnitude,
      y: product.y / magnitude,
      z: product.z / magnitude,
    }
    // Update color
    let V = {
      x: 0,
      y: 0,
      z: 1,
    };
    // H = (V + L) / 2
    let H = {
      x: (V.x + light.x) / 2,
      y: (V.y + light.y) / 2,
      z: (V.z + light.z) / 2,
    };
    // normalize H
    let H_magnitude = sqrt(H.x * H.x + H.y * H.y + H.z * H.z);
    H = {
      x: H.x / H_magnitude,
      y: H.y / H_magnitude,
      z: H.z / H_magnitude,
    }

    vertices.forEach(vtx => {
      let {r, g, b} = vtx;
      let C_r = r * (ambient.r + light.r * max(dot(surface_normal, light), 0)) + light.r * specular.r * pow(dot(H, surface_normal), spec_pow);
      let C_g = g * (ambient.g + light.g * max(dot(surface_normal, light), 0)) + light.g * specular.g * pow(dot(H, surface_normal), spec_pow);
      let C_b = b * (ambient.b + light.b * max(dot(surface_normal, light), 0)) + light.b * specular.b * pow(dot(H, surface_normal), spec_pow);
      vtx.r = C_r;
      vtx.g = C_g;
      vtx.b = C_b;
    })
  }

  if (shade == "gouraud") {
    let V = {
      x: 0,
      y: 0,
      z: 1,
    };
    // H = (V + L) / 2
    let H = {
      x: (V.x + light.x) / 2,
      y: (V.y + light.y) / 2,
      z: (V.z + light.z) / 2,
    };
    // normalize H
    let H_magnitude = sqrt(H.x * H.x + H.y * H.y + H.z * H.z);
    H = {
      x: H.x / H_magnitude,
      y: H.y / H_magnitude,
      z: H.z / H_magnitude,
    }

    vertices.forEach(vtx => {
      let {r, g, b} = vtx;
      let C_r = r * (ambient.r + light.r * max(dot(vtx.normal, light), 0)) + light.r * specular.r * pow(dot(H, vtx.normal), spec_pow);
      let C_g = g * (ambient.g + light.g * max(dot(vtx.normal, light), 0)) + light.g * specular.g * pow(dot(H, vtx.normal), spec_pow);
      let C_b = b * (ambient.b + light.b * max(dot(vtx.normal, light), 0)) + light.b * specular.b * pow(dot(H, vtx.normal), spec_pow);
      vtx.r = C_r;
      vtx.g = C_g;
      vtx.b = C_b;
    })
  }

  // if we get here, you need to rasterize the triangle (including color and shading)
  let [min_idx, mid_idx, max_idx, left_vtx, right_vtx, y_max, y_min, x_left, x_right, dx_left, dx_right] = define_edges();

  // for color, do the same process as position
  let r_left = vertices[min_idx].r;
  let g_left = vertices[min_idx].g;
  let b_left = vertices[min_idx].b;

  let r_right = vertices[min_idx].r;
  let g_right = vertices[min_idx].g;
  let b_right = vertices[min_idx].b;

  let dr_left = (vertices[left_vtx].r - r_left) / (vertices[left_vtx].y - y_min);
  let dg_left = (vertices[left_vtx].g - g_left) / (vertices[left_vtx].y - y_min);
  let db_left = (vertices[left_vtx].b - b_left) / (vertices[left_vtx].y - y_min);

  let dr_right = (vertices[right_vtx].r - r_right) / (vertices[right_vtx].y - y_min);
  let dg_right = (vertices[right_vtx].g - g_right) / (vertices[right_vtx].y - y_min);
  let db_right = (vertices[right_vtx].b - b_right) / (vertices[right_vtx].y - y_min);

  // New: do the same process to z
  let z_left = vertices[min_idx].z;
  let z_right = vertices[min_idx].z;

  let dz_left = (vertices[left_vtx].z - z_left) / (vertices[left_vtx].y - y_min);
  let dz_right = (vertices[right_vtx].z - z_right) / (vertices[right_vtx].y - y_min);

  // New: Phong shading interpolate vertex normal
  let nx_left, ny_left, nz_left, nx_right, ny_right, nz_right, dnx_left, dny_left, dnz_left, dnx_right, dny_right, dnz_right;
  if (shade === "phong") {
    nx_left = vertices[min_idx].normal.x;
    nx_left = round(nx_left, 6);
    ny_left = vertices[min_idx].normal.y;
    ny_left = round(ny_left, 6);
    nz_left = vertices[min_idx].normal.z;
    nz_left = round(nz_left, 6);
    nx_right = vertices[min_idx].normal.x;
    nx_right = round(nx_right, 6);
    ny_right = vertices[min_idx].normal.y;
    ny_right = round(ny_right, 6);
    nz_right = vertices[min_idx].normal.z;
    nz_right = round(nz_right, 6);

    dnx_left = (vertices[left_vtx].normal.x - nx_left) / (vertices[left_vtx].y - y_min);
    dnx_left = round(dnx_left, 6);
    dny_left = (vertices[left_vtx].normal.y - ny_left) / (vertices[left_vtx].y - y_min);
    dny_left = round(dny_left, 6);
    dnz_left = (vertices[left_vtx].normal.z - nz_left) / (vertices[left_vtx].y - y_min);
    dnz_left = round(dnz_left, 6);
    dnx_right = (vertices[right_vtx].normal.x - nx_right) / (vertices[right_vtx].y - y_min);
    dnx_right = round(dnx_right, 6);
    dny_right = (vertices[right_vtx].normal.y - ny_right) / (vertices[right_vtx].y - y_min);
    dny_right = round(dny_right, 6);
    dnz_right = (vertices[right_vtx].normal.z - nz_right) / (vertices[right_vtx].y - y_min);
    dnz_right = round(dnz_right, 6);
  }

  // we ignore edge does not cross scanline
  // and here checks if it is a flat triangle
  if (floor(vertices[mid_idx].y) === floor(vertices[min_idx].y)) {
      if (vertices[min_idx].x < vertices[mid_idx].x) {
          left_vtx = min_idx;
          right_vtx = mid_idx;
      } else {
          left_vtx = mid_idx;
          right_vtx = min_idx;
      }

      x_left = vertices[left_vtx].x;
      x_right = vertices[right_vtx].x;
      dx_left = (vertices[max_idx].x - x_left) / (vertices[max_idx].y - vertices[min_idx].y);
      dx_right = (vertices[max_idx].x - x_right) / (vertices[max_idx].y - vertices[min_idx].y);

      z_left = vertices[left_vtx].z;
      z_right = vertices[right_vtx].z;
      dz_left = (vertices[max_idx].z - z_left) / (vertices[max_idx].y - vertices[min_idx].y);
      dz_right = (vertices[max_idx].z - z_right) / (vertices[max_idx].y - vertices[min_idx].y);

      // New: Phong shading interpolate vertex normal
      if (shade === "phong") {
        nx_left = vertices[left_vtx].normal.x;
        ny_left = vertices[left_vtx].normal.y;
        nz_left = vertices[left_vtx].normal.z;
        nx_right = vertices[right_vtx].normal.x;
        ny_right = vertices[right_vtx].normal.y;
        nz_right = vertices[right_vtx].normal.z;

        nx_left = round(nx_left, 6);
        ny_left = round(ny_left, 6);
        nz_left = round(nz_left, 6);
        nx_right = round(nx_right, 6);
        ny_right = round(ny_right, 6);
        nz_right = round(nz_right, 6);

        dnx_left = (vertices[max_idx].normal.x - nx_left) / (vertices[max_idx].y - vertices[min_idx].y);
        dny_left = (vertices[max_idx].normal.y - ny_left) / (vertices[max_idx].y - vertices[min_idx].y);
        dnz_left = (vertices[max_idx].normal.z - nz_left) / (vertices[max_idx].y - vertices[min_idx].y);
        dnx_right = (vertices[max_idx].normal.x - nx_right) / (vertices[max_idx].y - vertices[min_idx].y);
        dny_right = (vertices[max_idx].normal.y - ny_right) / (vertices[max_idx].y - vertices[min_idx].y);
        dnz_right = (vertices[max_idx].normal.z - nz_right) / (vertices[max_idx].y - vertices[min_idx].y);

        dnx_left = round(dnx_left, 6);
        dny_left = round(dny_left, 6);
        dnz_left = round(dnz_left, 6);
        dnx_right = round(dnx_right, 6);
        dny_right = round(dny_right, 6);
        dnz_right = round(dnz_right, 6);
      }

      r_left = vertices[left_vtx].r;
      dr_left = (vertices[max_idx].r - r_left) / (vertices[max_idx].y - vertices[min_idx].y);
      g_left = vertices[left_vtx].g;
      dg_left = (vertices[max_idx].g - g_left) / (vertices[max_idx].y - vertices[min_idx].y);
      b_left = vertices[left_vtx].b;
      db_left = (vertices[max_idx].b - b_left) / (vertices[max_idx].y - vertices[min_idx].y);

      r_right = vertices[right_vtx].r;
      dr_right = (vertices[max_idx].r - r_right) / (vertices[max_idx].y - vertices[min_idx].y);
      g_right = vertices[right_vtx].g;
      dg_right = (vertices[max_idx].g - g_right) / (vertices[max_idx].y - vertices[min_idx].y);
      b_right = vertices[right_vtx].b;
      db_right = (vertices[max_idx].b - b_right) / (vertices[max_idx].y - vertices[min_idx].y);
  }

  for (let y = ceil(y_min); y <= y_max; y++) {
    for (let x = ceil(x_left); x < x_right; x++) {
      let r = r_left + (r_right - r_left) / (x_right - x_left) * (x - x_left);
      let g = g_left + (g_right - g_left) / (x_right - x_left) * (x - x_left);
      let b = b_left + (b_right - b_left) / (x_right - x_left) * (x - x_left);

      // New: Phong shading interpolate vertex normal
      if (shade === "phong") {
        let nx = nx_left + (nx_right - nx_left) / (x_right - x_left) * (x - x_left);
        let ny = ny_left + (ny_right - ny_left) / (x_right - x_left) * (x - x_left);
        let nz = nz_left + (nz_right - nz_left) / (x_right - x_left) * (x - x_left);
        nx = round(nx, 6);
        ny = round(ny, 6);
        nz = round(nz, 6);
        let N_magnitude = sqrt(nx * nx + ny * ny + nz * nz);
        let vtx_normal = {
          x: nx / N_magnitude,
          y: ny / N_magnitude,
          z: nz / N_magnitude,
        }
        let V = {
          x: 0,
          y: 0,
          z: 1,
        };
        let L = light;
        // H = (V + L) / 2
        let H = {
          x: (V.x + L.x) / 2,
          y: (V.y + L.y) / 2,
          z: (V.z + L.z) / 2,
        };
        // normalize H
        let H_magnitude = sqrt(H.x * H.x + H.y * H.y + H.z * H.z);
        H = {
          x: H.x / H_magnitude,
          y: H.y / H_magnitude,
          z: H.z / H_magnitude,
        }
        r = r * (ambient.r + light.r * max(dot(vtx_normal, light), 0)) + light.r * specular.r * pow(dot(H, vtx_normal), spec_pow);
        g = g * (ambient.g + light.g * max(dot(vtx_normal, light), 0)) + light.g * specular.g * pow(dot(H, vtx_normal), spec_pow);
        b = b * (ambient.b + light.b * max(dot(vtx_normal, light), 0)) + light.b * specular.b * pow(dot(H, vtx_normal), spec_pow);
      }

      let z = z_left + (z_right - z_left) / (x_right - x_left) * (x - x_left);

      if (z > z_buffer[x][height - y]) {
        set(x, height - y, color(r * 255, g * 255, b * 255));
        z_buffer[x][height - y] = z;
      }
    }

    x_left += dx_left;
    x_right += dx_right;
    z_left += dz_left;
    z_right += dz_right;
    r_left += dr_left;
    r_right += dr_right;
    g_left += dg_left;
    g_right += dg_right;
    b_left += db_left;
    b_right += db_right;

    if (shade === "phong") {
      nx_left += dnx_left;
      nx_right += dnx_right;
      ny_left += dny_left;
      ny_right += dny_right;
      nz_left += dnz_left;
      nz_right += dnz_right;
    }

    if (y >= floor(vertices[left_vtx].y) && left_vtx === mid_idx) {
      x_left = vertices[mid_idx].x;
      dx_left = (vertices[max_idx].x - x_left) / (vertices[max_idx].y - y);
      dx_left = round(dx_left, 6);
      left_vtx = max_idx;

      z_left = vertices[mid_idx].z;
      dz_left = (vertices[max_idx].z - z_left) / (vertices[max_idx].y - y);
      r_left = vertices[mid_idx].r;
      dr_left = (vertices[max_idx].r - r_left) / (vertices[max_idx].y - y);
      g_left = vertices[mid_idx].g;
      dg_left = (vertices[max_idx].g - g_left) / (vertices[max_idx].y - y);
      b_left = vertices[mid_idx].b;
      db_left = (vertices[max_idx].b - b_left) / (vertices[max_idx].y - y);

      // New: Phong shading interpolate vertex normal
      if (shade === "phong") {
        nx_left = vertices[mid_idx].normal.x;
        nx_left = round(nx_left, 6);
        dnx_left = (vertices[max_idx].normal.x - nx_left) / (vertices[max_idx].y - y);
        ny_left = vertices[mid_idx].normal.y;
        ny_left = round(ny_left, 6);
        dny_left = (vertices[max_idx].normal.y - ny_left) / (vertices[max_idx].y - y);
        nz_left = vertices[mid_idx].normal.z;
        nz_left = round(nz_left, 6);
        dnz_left = (vertices[max_idx].normal.z - nz_left) / (vertices[max_idx].y - y);
        dnx_left = round(dnx_left, 6);
        dny_left = round(dny_left, 6);
        dnz_left = round(dnz_left, 6);
      }
    } else if (y >= floor(vertices[right_vtx].y) && right_vtx === mid_idx) {
      x_right = vertices[mid_idx].x;
      dx_right = (vertices[max_idx].x - x_right) / (vertices[max_idx].y - y);
      dx_right = round(dx_right, 6);
      right_vtx = max_idx;

      z_right = vertices[mid_idx].z;
      dz_right = (vertices[max_idx].z - z_right) / (vertices[max_idx].y - y);
      r_right = vertices[mid_idx].r;
      dr_right = (vertices[max_idx].r - r_right) / (vertices[max_idx].y - y);
      g_right = vertices[mid_idx].g;
      dg_right = (vertices[max_idx].g - g_right) / (vertices[max_idx].y - y);
      b_right = vertices[mid_idx].b;
      db_right = (vertices[max_idx].b - b_right) / (vertices[max_idx].y - y);

      // New: Phong shading interpolate vertex normal
      if (shade === "phong") {
        nx_right = vertices[mid_idx].normal.x;
        nx_right = round(nx_right, 6);
        dnx_right = (vertices[max_idx].normal.x - nx_right) / (vertices[max_idx].y - y);
        ny_right = vertices[mid_idx].normal.y;
        ny_right = round(ny_right, 6);
        dny_right = (vertices[max_idx].normal.y - ny_right) / (vertices[max_idx].y - y);
        nz_right = vertices[mid_idx].normal.z;
        nz_right = round(nz_right, 6);
        dnz_right = (vertices[max_idx].normal.z - nz_right) / (vertices[max_idx].y - y);
        dnx_right = round(dnx_right, 6);
        dny_right = round(dny_right, 6);
        dnz_right = round(dnz_right, 6);
      }
    }
  }
  updatePixels();
}

//////////////////////////////////////////
//
// Helper functions
//
//////////////////////////////////////////

function MatrixMultiplyVector(a, v) {
  return a.map((row, i) => {
    let sum = 0;
    for (let col = 0; col < v.length; col++) {
      sum += a[i][col] * v[col];
    }
    return sum;
  })
}

function dot(A, B) {
  return A.x * B.x + A.y * B.y + A.z * B.z;
}

function define_edges() {
  let y_min = min(vertices[0].y, vertices[1].y, vertices[2].y);
  let y_max = max(vertices[0].y, vertices[1].y, vertices[2].y);
  let min_idx = vertices.findIndex(v => v.y === y_min);
  let max_idx = vertices.findIndex(v => v.y === y_max);

  // trick: idx could be 0,1,2 and we already have rest idx
  let mid_idx = 3 - min_idx - max_idx;
  // find x_left, dx_left, x_right, dx_right
  let x_left = round(vertices[min_idx].x, 6);
  let x_right = round(vertices[min_idx].x, 6);

  // store left vertex index and right index here
  let left_vtx = max_idx;
  let right_vtx = mid_idx;
  let dx_left = 0;
  let dx_right = 0;

  let dx_y_max = (vertices[max_idx].x - x_left) / (vertices[max_idx].y - y_min);
  let dx_y_mid = (vertices[mid_idx].x - x_left) / (vertices[mid_idx].y - y_min);
  if (dx_y_max > dx_y_mid) {
      left_vtx = mid_idx;
      right_vtx = max_idx;
      dx_left = dx_y_mid;
      dx_right = dx_y_max;
  } else {
      dx_left = dx_y_max;
      dx_right = dx_y_mid;
  }

  return [min_idx, mid_idx, max_idx, left_vtx, right_vtx, y_max, y_min, round(x_left, 6), round(x_right, 6), round(dx_left, 6), round(dx_right, 6)];
}