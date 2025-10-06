// Vertex shader
// The vertex shader is run once for every vertex
// It can change the (x,y,z) of the vertex, as well as its normal for lighting.

#define PROCESSING_TEX_SHADER

// Set automatically by Processing
uniform mat4 transform;
uniform mat3 normalMatrix;
uniform vec3 lightNormal;
uniform mat4 texMatrix;
uniform sampler2D texture;

// Come from the geometry/material of the object
//attribute vec4 position;
attribute vec4 vertex;
attribute vec4 color;
attribute vec3 normal;
attribute vec2 texCoord;

// These values will be sent to the fragment shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;
varying vec4 vertTexCoordR;
varying vec4 vertTexCoordL;

varying float offset;

void main() {
  vertColor = color;
  vertNormal = normalize(normalMatrix * normal);
  vertLightDir = normalize(-lightNormal);
  vertTexCoord = texMatrix * vec4(texCoord, 1.0, 1.0);

  // d_center: distance to center
  float d_center = sqrt(pow(vertTexCoord.x - .5, 2.) + pow(vertTexCoord.y - .5, 2.));

  float damp_dist = 1. / 40.;

  // corners:
  float x_dist = min(vertTexCoord.x, 1. - vertTexCoord.x);
  float y_dist = min(vertTexCoord.y, 1. - vertTexCoord.y);
  float d_center_last = sqrt(pow(damp_dist - .5, 2.) + pow(damp_dist - .5, 2.));
  float offset_last = 10. * sin(60. * d_center_last - 3.14 / 2.);

  // dampening
  if(x_dist < damp_dist && y_dist < damp_dist) {
    // corners
    offset = offset_last / damp_dist * min(x_dist, y_dist);
  } else if(vertTexCoord.x < damp_dist) {
    offset = offset_last / damp_dist * x_dist;
  } else if(vertTexCoord.y < damp_dist) {
    offset = offset_last / damp_dist * y_dist;
  } else if(vertTexCoord.x > 1. - damp_dist) {
    offset = offset_last / damp_dist * (1. - vertTexCoord.x);
  } else if(vertTexCoord.y > 1. - damp_dist) {
    offset = offset_last / damp_dist * (1. - vertTexCoord.y);
  } else {
    offset = 10. * sin(60. * d_center - 3.14 / 2.);
  }

  // push the vertex outward in the normal direction
  vec4 vertex_new = vertex + vec4(offset * normal, 0.0);
  gl_Position = transform * vertex_new;
}
