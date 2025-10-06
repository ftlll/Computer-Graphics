// Placeholder functions for Project 5
// You should modify these!

let curr_edge;
let vertices = [];
let edges = [];
let faces = [];
let is_random_color = false;

// class Vertex {
//   constructor(x, y, z, face) {
//     this.x = x;
//     this.y = y;
//     this.z = z;
//     this.one_face = face;
//   }
// }

// class Edge {
//   constructor(face, v_index) {
//     this.face = face;
//     this.v_index = v_index;
//   }
// }

// // we could have multiple vertices (it could be non-triangle)
// class Face {
//   constructor(num_vertices, verts, opposite_edge) {
//     this.num_vertices = num_vertices;
//     this.verts = verts;       // Vertex[]
//     this.opp = opposite_edge; // it is an array of edge
//   }
// }

// initialize a new mesh
function init_mesh()
{
  vertices = [];
  edges = [];
  faces = [];
  curr_edge = null;
}

// add a vertex to your mesh
function new_vertex(x, y, z)
{
  vertices.push({
    x, y, z
  });
}

// add a face to your mesh
function new_face(...args)
{
  let face = {
    num_vertices: args.length,
    verts: args.map(idx => vertices[idx]),
    vertices: args,
    color: {
      r: 255,
      g: 255,
      b: 255,
    }
  }

  for (let i = 0; i < args.length; i++) {
    let edge = {
      start: face.vertices[i],
      end: i === args.length - 1 ? face.vertices[0]: face.vertices[i+1],
      face: face,
    }
    edges.push(edge);
    curr_edge = edge;
  }

  faces.push(face);
}

// draw your mesh
function draw_mesh()
{
  if (faces.length === 0) return;

  for (let face of faces) {
    let face_vertices = face.verts;
    // E1 = B - A
    // E2 = C - A
    // N = (E1 * E2) / ||E1 * E2||
    let E1 = {
      x: face_vertices[1].x - face_vertices[0].x,
      y: face_vertices[1].y - face_vertices[0].y,
      z: face_vertices[1].z - face_vertices[0].z,
    }
    let E2 = {
      x: face_vertices[2].x - face_vertices[0].x,
      y: face_vertices[2].y - face_vertices[0].y,
      z: face_vertices[2].z - face_vertices[0].z,
    }
    let product = {
      x: E2.y * E1.z - E2.z * E1.y,
      y: E2.z * E1.x - E2.x * E1.z,
      z: E2.x * E1.y - E2.y * E1.x,
    }
    let magnitude = sqrt(product.x * product.x + product.y * product.y + product.z * product.z);
    let surface_normal = {
      nx: product.x / magnitude,
      ny: product.y / magnitude,
      nz: product.z / magnitude,
    }
    let {nx, ny, nz} = surface_normal;
    normal(nx, ny, nz);

    let {r, g, b} = face.color;
    fill(r, g, b);
    beginShape();
    for (let i = 0; i < face.num_vertices; i++) {
      let {x, y, z} = face.verts[i];
      vertex(x, y, z);
    }
    endShape(CLOSE);

    if (show_directed_edge && curr_edge.face === face) {
      let vtx_start = vertices[curr_edge.start];
      let vtx_end = vertices[curr_edge.end];

      let center = {x: 0, y: 0, z: 0};
      for (let i = 0; i < face.num_vertices; i++) {
        center.x = center.x + face.verts[i].x / face.num_vertices;
        center.y = center.y + face.verts[i].y / face.num_vertices;
        center.z = center.z + face.verts[i].z / face.num_vertices;
      }
      let move_to_center = {
        x: center.x - 0.5 * (vtx_end.x + vtx_start.x),
        y: center.y - 0.5 * (vtx_end.y + vtx_start.y),
        z: center.z - 0.5 * (vtx_end.z + vtx_start.z),
      }
      let mag_move = sqrt(pow(move_to_center.x, 2) + pow(move_to_center.y, 2) + pow(move_to_center.z, 2));
      move_to_center = {
        x: move_to_center.x / mag_move,
        y: move_to_center.y / mag_move,
        z: move_to_center.z / mag_move,
      }

      let dist = sqrt(pow(vtx_start.x - vtx_end.x, 2) + pow(vtx_start.y - vtx_end.y, 2) + pow(vtx_start.z - vtx_end.z, 2));
      let s1_r = 0.05 * dist;
      let s2_r = 0.04 * dist;
      let s3_r = 0.03 * dist;

      let s1 = linear_interpolation(vtx_start, vtx_end, -s1_r - s2_r);
      let s2 = linear_interpolation(vtx_start, vtx_end, 0.0);
      let s3 = linear_interpolation(vtx_start, vtx_end, s3_r + s2_r);

      fill(255, 165, 0);
      push();
        translate(0.05 * dist * nx, 0.05 * dist * ny, 0.05 * dist * nz);
        translate(0.05 * dist * move_to_center.x, 0.05 * dist * move_to_center.y, 0.05 * dist * move_to_center.z);
        push();
        translate(s1.x, s1.y, s1.z);
        sphere(s1_r);
        pop();

        push();
        translate(s2.x, s2.y, s2.z);
        sphere(s2_r);
        pop();

        push();
        translate(s3.x, s3.y, s3.z);
        sphere(s3_r);
        pop();
      pop();
    }
  }
}

function linear_interpolation(a, b, dist) {
  let diff = {
    x: b.x - a.x,
    y: b.y - a.y,
    z: b.z - a.z,
  };
  let magnitude = sqrt(pow(diff.x, 2) + pow(diff.y, 2) + pow(diff.z, 2));
  let unit_diff = {
    x: diff.x / magnitude,
    y: diff.y / magnitude,
    z: diff.z / magnitude,
  };
  return {
    x: a.x + (b.x - a.x) * 0.5 + unit_diff.x * dist,
    y: a.y + (b.y - a.y) * 0.5 + unit_diff.y * dist,
    z: a.z + (b.z - a.z) * 0.5 + unit_diff.z * dist,
  }
}

// assign random colored to each face
function random_colors()
{
  for (face of faces) {
    face.color = {
      r: 255 * Math.random(),
      g: 255 * Math.random(),
      b: 255 * Math.random(),
    }
  }
  is_random_color = true;
}

// switch all the face colors to white
function solid_color()
{
  for (face of faces) {
    face.color = {
      r: 255,
      g: 255,
      b: 255,
    }
  }
  is_random_color = false;
}

// go to the next edge in a face
function next_edge()
{
  curr_edge = edges.find(edge => edge.face === curr_edge.face && edge.start === curr_edge.end);
}

// go to the previous edge in a face
function previous_edge()
{
  curr_edge = edges.find(edge => edge.face === curr_edge.face && edge.end === curr_edge.start);
}

// go to the opposite edge
function opposite_edge()
{
  curr_edge = edges.find(edge => edge.start === curr_edge.end && edge.end === curr_edge.start);
}

// swing to another edge around a vertex
function swing_edge()
{
  opposite_edge();
  next_edge();
}

// truncate the vertices of a mesh
function truncate_mesh()
{
  let new_vertices = [];
  let new_edges = [];
  let new_faces = [];

  edges.forEach(edge => {
    let start = vertices[edge.start];
    let end = vertices[edge.end];
    if (new_vertices.find(vtx => edge.end === vtx.prev[0] && edge.start === vtx.prev[1])) return;
    new_vertices.push({
      x: (start.x + end.x) / 2,
      y: (start.y + end.y) / 2,
      z: (start.z + end.z) / 2,
      prev: [edge.start, edge.end]
    });
  });

  // new faces from old face (one old face create a new one)
  faces.forEach(face => {
    let new_v = [];
    let new_verts = [];
    for (let i = 0; i < face.num_vertices; i++) {
      let vtx1 = face.vertices[i];
      let vtx2 = i === face.num_vertices - 1 ? face.vertices[0]: face.vertices[i+1];
      let v_index = new_vertices.findIndex(vtx => vtx.prev.includes(vtx1) && vtx.prev.includes(vtx2));
      new_v.push(v_index);
      new_verts.push(new_vertices[v_index]);
    }

    new_faces.push({
      num_vertices: face.num_vertices,
      verts: new_verts,
      vertices: new_v,
      color: face.color
    });
  });

  // new faces from vertex
  vertices.forEach((_, idx) => {
    curr_edge = edges.find(edge => edge.start === idx);
    let {start, end} = curr_edge;
    let v_index = new_vertices.findIndex(vtx => vtx.prev.includes(start) && vtx.prev.includes(end));
    let num_vertices = 1;
    let f_vertices = [v_index];
    let f_verts = [new_vertices[v_index]];
    swing_edge();
    while (curr_edge.end !== end) {
      let {start, end} = curr_edge;
      let v_index = new_vertices.findIndex(vtx => vtx.prev.includes(start) && vtx.prev.includes(end));
      f_vertices.unshift(v_index);
      f_verts.unshift(new_vertices[v_index]);
      swing_edge();
      num_vertices++;
    }

    new_faces.push({
      num_vertices: num_vertices,
      verts: f_verts,
      vertices: f_vertices,
      color: is_random_color ? {
        r: 255 * Math.random(),
        g: 255 * Math.random(),
        b: 255 * Math.random(),
      } : {
        r: 255,
        g: 255,
        b: 255,
      }
    });
  });

  new_faces.forEach(face => {
    let num_vertices = face.num_vertices
    for (let i = 0; i < num_vertices; i++) {
      let edge = {
        start: face.vertices[i],
        end: i === num_vertices - 1 ? face.vertices[0]: face.vertices[i+1],
        face: face,
      }
      new_edges.push(edge);
      curr_edge = edge;
    }
  })

  vertices = new_vertices;
  faces = new_faces;
  edges = new_edges;
}
