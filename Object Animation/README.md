# 3D Scene with Instanced Geometry and Animation

## Overview

This project creates a dynamic and detailed **3D scene** using **p5.js** and **WEBGL**. The scene includes:

- A textured platform and surrounding walls
- Three instanced **stone pillars**
- A fully rigged and animated **Link character**
- A dynamic **sword drop animation**
- Realistic textures and lighting

The goal was to explore **instancing**, **modular design**, and **custom shapes** within an animated 3D environment.

## 🎥 Demo

[![Watch the video](https://img.youtube.com/vi/Y3eTAcClMsM/0.jpg)](https://www.youtube.com/watch?v=Y3eTAcClMsM)

### Link Character (Modular)

The character is broken down into modular components:

- **Head**: Includes eyes, eyebrows, ears, hat, nose, mouth, and dynamic hair (`hair(time)`).
- **Body**: Trapezoidal torso with belt and emblem.
- **Arms**: Articulated shoulder, elbow, hand, and fingers (separate functions for `left_arm()` and `right_arm()`).
- **Legs & Boots**: Boot geometry using layered cones, ellipsoids, and boxes.

Link moves dynamically into the scene, pauses, and performs an action based on time progression.

---
