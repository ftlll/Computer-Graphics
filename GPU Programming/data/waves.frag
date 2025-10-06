// Fragment shader

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEX_SHADER

// Set in Processing
uniform sampler2D texture;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

varying float offset;

void main() {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  vec4 diffuse_color = vec4(1.0, 1.0, 1.0, 1.0);
  float diffuse = clamp(dot(vertNormal, vertLightDir), 0.0, 1.0);
  // gl_FragColor.rgb = diffuse * diffuse_color.rgb + vec3(0.2,0.2,0.2);//,0.0);

  float intensity = (offset / 10.) / 2. + 0.5;
  vec3 rippleColor = mix(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0), intensity);

  gl_FragColor.rgb = diffuse * diffuse_color.rgb * rippleColor + vec3(0.2, 0.2, 0.2);
  gl_FragColor.a = 1.0;
}
