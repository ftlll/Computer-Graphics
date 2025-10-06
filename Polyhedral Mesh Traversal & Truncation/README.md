# Mesh Manipulation and Rendering

## Overview

This project focuses on manipulating and rendering polygonal meshes using JavaScript. It provides foundational structures and functions to build, modify, and visualize 3D meshes consisting of vertices, edges, and faces. The code implements basic mesh operations such as adding vertices and faces, computing surface normals, coloring faces, navigating edges, and performing mesh truncation.

## Controls and Commands

Use the following keys to interact with the mesh and modify its properties:

### Mesh Creation

- **1**: Create a **tetrahedron** mesh.
- **2**: Create an **octahedron** mesh.
- **3**: Create a **cube** mesh.
- **4**: Create an **icosahedron** mesh.
- **5**: Create a **dodecahedron** mesh.

### Mesh Manipulation

- **t**: Create a truncated version of the current mesh.
  _You can truncate a mesh multiple times consecutively._

### Edge Visualization & Navigation

- **e**: Toggle visualization of the **current directed edge**.
- **n**: Move to the **next edge** in the current face.
- **p**: Move to the **previous edge** in the current face.
- **o**: Move to the **opposite edge**.
- **s**: Perform the **swing** operation to change edge around a vertex.

### Color Controls

- **r**: Randomize the colors of all faces.
- **w**: Set all faces to white color.

### Display Controls

- **Space bar**: Start or stop mesh rotation.
- **[** : Shrink the displayed mesh.
- **]** : Grow the displayed mesh.

---

Use these commands to explore mesh topologies interactively, observe edge relationships, and apply geometric transformations like truncation.

## Features

- **Mesh Initialization**
  Resets the mesh by clearing vertices, edges, and faces.

- **Vertex and Face Creation**
  Add vertices with 3D coordinates and create polygonal faces connecting those vertices.

- **Edge Management**
  Stores edges associated with faces and allows traversal through next, previous, opposite, and "swing" edge operations.

- **Mesh Rendering**
  Calculates surface normals for faces to support lighting and renders polygons using the vertex data.

- **Color Management**
  Toggle between random face colors or a solid white color for all faces.

- **Mesh Truncation**
  Subdivides edges and reconstructs faces to generate a truncated version of the original mesh.

## Code Structure

### Data Structures

- `vertices`: Array of vertex objects `{x, y, z}` representing 3D points.
- `edges`: Array of edge objects, each with a `start` vertex index, `end` vertex index, and associated face.
- `faces`: Array of face objects containing vertex indices, vertex references, number of vertices, and color.

### Core Functions

- `init_mesh()`: Clears the current mesh.
- `new_vertex(x, y, z)`: Adds a new vertex.
- `new_face(...args)`: Creates a new face using the given vertex indices.
- `draw_mesh()`: Renders the mesh with surface normals and face colors.
- `random_colors()`: Assigns random colors to all faces.
- `solid_color()`: Resets all face colors to white.
- `next_edge()`, `previous_edge()`, `opposite_edge()`, `swing_edge()`: Navigate edges around the mesh.
- `truncate_mesh()`: Generates a truncated mesh by subdividing edges and reconstructing faces.

## Usage Notes

- The `draw_mesh` function calculates surface normals for lighting effects based on the first three vertices of each face.
- Edge navigation functions facilitate interactive traversal of mesh topology.
- Mesh truncation follows a standard geometric approach to subdivide edges and create new faces, supporting both randomized and solid coloring.
- The code uses linear interpolation for positioning auxiliary points on edges, especially useful for visualizing edge properties.
