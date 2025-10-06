// Fragment shader

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() {

  vec4 diffuse_color = vec4 (0.0, 1.0, 1.0, 1.0);
  float diffuse = clamp(dot (vertNormal, vertLightDir),0.0,1.0);

  gl_FragColor = vec4(diffuse * diffuse_color.rgb, 0.8);

  // change the transparency based on the texture coordinates
  // gl_FragColor.a = vertTexCoord.y;

  // if (vertTexCoord.x < 0.6 && vertTexCoord.x > 0.4 && vertTexCoord.y < 0.6 && vertTexCoord.y > 0.4) {
  //   gl_FragColor.a = 0.;
  // }
  float x_mid = 0.5;
  float y_mid = 0.5;
  float width = 0.005;
  for (float i = 0.; i < 25.; i++) {
    float loop_width = width * (i + 1.);
    float loop_x_mid = x_mid + sin((i + 1.) * 30. / 180. * 3.14) * i / 60.;
    float loop_y_mid = y_mid + cos((i + 1.) * 30. / 180. * 3.14) * i / 60.;
    if (vertTexCoord.x - loop_width / 2. < loop_x_mid && vertTexCoord.x + loop_width / 2. > loop_x_mid
    && vertTexCoord.y - loop_width / 2. < loop_y_mid && vertTexCoord.y + loop_width / 2. > loop_y_mid) {
      gl_FragColor.a = 0.;
    }
  }
}
