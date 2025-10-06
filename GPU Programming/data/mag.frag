// Fragment shader
// The fragment shader is run once for every pixel
// It can change the color and transparency of the fragment.

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXLIGHT_SHADER

// Set in Processing
uniform sampler2D my_texture;
uniform float cx;
uniform float cy;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() {
  vec2 circle_c = vec2(cx, cy);
  float circle_r = 0.2;

  float dist = sqrt((vertTexCoord.x - circle_c.x) * (vertTexCoord.x - circle_c.x) + (vertTexCoord.y - circle_c.y) * (vertTexCoord.y - circle_c.y));
  if (dist < circle_r) {
    vec2 new_xy = vec2(vertTexCoord.x / 2. + circle_c.x / 2., vertTexCoord.y / 2. + circle_c.y / 2.);
    vec4 diffuse_color = texture2D(my_texture, new_xy);
    float diffuse = abs(dot (vertNormal, vertLightDir));
    gl_FragColor = vec4(diffuse * diffuse_color.rgb, 1.0);
    float gray_scale = 1. / 3. * (gl_FragColor.r + gl_FragColor.g + gl_FragColor.b);
    gl_FragColor = vec4(gray_scale, gray_scale, gray_scale, 1.0);
  } else {
    vec4 diffuse_color = texture2D(my_texture, vertTexCoord.xy);
    float diffuse = abs(dot (vertNormal, vertLightDir));
    gl_FragColor = vec4(diffuse * diffuse_color.rgb, 1.0);
  }
}
