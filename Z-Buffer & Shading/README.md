# Z-Buffer and Shading

## Overview

This project implements basic 3D rendering techniques including z-buffering and multiple shading models. The rendering engine supports wireframe, constant, flat, Gouraud, and Phong shading modes. It can draw basic 3D shapes such as triangles, spheres, cubes, and tori, both in orthographic and perspective projections.

## Demo

| Scene | Wireframe (a)            | Constant (b)             | Flat (c)                 | Gouraud (d)              | Phong (e)                |
| ----- | ------------------------ | ------------------------ | ------------------------ | ------------------------ | ------------------------ |
| 1     | ![1a](/output/img1a.jpg) | ![1b](/output/img1b.jpg) | ![1c](/output/img1c.jpg) | ![1d](/output/img1d.jpg) | ![1e](/output/img1e.jpg) |
| 2     | ![2a](/output/img2a.jpg) | ![2b](/output/img2b.jpg) | ![2c](/output/img2c.jpg) | ![2d](/output/img2d.jpg) | ![2e](/output/img2e.jpg) |
| 3     | ![3a](/output/img3a.jpg) | ![3b](/output/img3b.jpg) | ![3c](/output/img3c.jpg) | ![3d](/output/img3d.jpg) | ![3e](/output/img3e.jpg) |
| 4     | ![4a](/output/img4a.jpg) | ![4b](/output/img4b.jpg) | ![4c](/output/img4c.jpg) | ![4d](/output/img4d.jpg) | ![4e](/output/img4e.jpg) |
| 5     | ![5a](/output/img5a.jpg) | ![5b](/output/img5b.jpg) | ![5c](/output/img5c.jpg) | ![5d](/output/img5d.jpg) | ![5e](/output/img5e.jpg) |
| 6     | ![6a](/output/img6a.jpg) | ![6b](/output/img6b.jpg) | ![6c](/output/img6c.jpg) | ![6d](/output/img6d.jpg) | ![6e](/output/img6e.jpg) |
| 7     | ![7a](/output/img7a.jpg) | ![7b](/output/img7b.jpg) | ![7c](/output/img7c.jpg) | ![7d](/output/img7d.jpg) | ![7e](/output/img7e.jpg) |
| 8     | ![8a](/output/img8a.jpg) | ![8b](/output/img8b.jpg) | ![8c](/output/img8c.jpg) | ![8d](/output/img8d.jpg) | ![8e](/output/img8e.jpg) |
| 9     | ![9a](/output/img9a.jpg) | ![9b](/output/img9b.jpg) | ![9c](/output/img9c.jpg) | ![9d](/output/img9d.jpg) | ![9e](/output/img9e.jpg) |

## Features

- **Multiple shading options**: wireframe, constant, flat, Gouraud, and Phong shading.
- **Z-buffering** to handle overlapping geometry and proper depth rendering.
- Drawing primitives:
  - Equilateral triangles with transformation matrices
  - Overlapping triangles with z-buffer depth testing
  - Spheres with different coloring and lighting
  - Tori rendered in perspective projection
  - Cubes with multi-colored faces
- Adjustable lighting and field of view.
- Ability to save screenshots by pressing the 'w' key.

## Keyboard Controls\*\*

- Number keys `1` to `9` trigger different scenes:
  - `1`: Draw a single triangle (orthographic)
  - `2`: Draw two transformed triangles
  - `3`: Draw three overlapping triangles with depth
  - `4`: Draw a sphere with two colors
  - `5`: Draw two spheres side by side
  - `6`: Draw a single sphere with one color
  - `7`: Draw a torus with perspective projection
  - `8`: Draw three shapes (cube, sphere, torus)
  - `9`: Draw three tori with different shading
- Shading mode keys:
  - `a`: Wireframe
  - `s`: Constant shading (default)
  - `d`: Flat shading
  - `f`: Gouraud shading
  - `g`: Phong shading
- Press `w` to save a screenshot (`image_file.jpg`).

## Code Structure

- **Classes and Data Structures**

  - `Vrt` class represents a vertex with position `(x, y, z)` and normal `(nx, ny, nz)`.

- **Key Functions**
  - `Init_Scene()`, `Set_Field_Of_View()`, `Set_Light()`, `Set_Matrix()`, `Normal()`, `Set_Color()`, `Begin_Shape()`, `Vertex()`, `End_Shape()` — core rendering pipeline functions (assumed implemented elsewhere).
  - `draw_sphere()`, `draw_cube()`, `draw_torus()` — routines to generate and draw complex shapes.
  - Multiple test scenes triggered by keyboard for visual validation.
