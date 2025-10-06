// Fragment shader

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

uniform float cx;
uniform float cy;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() {
  vec4 diffuse_color = vec4(1.0, 1.0, 1.0, 1.0); // white

  float diffuse = abs(dot(vertNormal, vertLightDir));
  gl_FragColor = vec4(diffuse * diffuse_color.rgb, 1.0);
  gl_FragColor.a = 1.0;

  // c = c_x + c_y i
  // map z.real is in the range [-3.14, 3.14] and z.imaginary is in [-3.14, 3.14]
  float z_re = (vertTexCoord.x - 0.5) * 2. * 3.14;
  float z_im = (vertTexCoord.y - 0.5) * 2. * 3.14;

  // z_0 = x + y i
  // sin(z_0) = sin(z.re) * cosh(z.im) + i * cos(z.re) * sinh(z.im);
  // z_1 = c * sin(z_0)
  float sin_z_re = sin(z_re) * cosh(z_im);
  float sin_z_im = cos(z_re) * sinh(z_im);
  for(int i = 0; i < 20; i++) {
    z_re = cx * sin_z_re - cy * sin_z_im;
    z_im = cx * sin_z_im + cy * sin_z_re;

    sin_z_re = sin(z_re) * cosh(z_im);
    sin_z_im = cos(z_re) * sinh(z_im);

    float dist = sqrt(pow(z_re, 2.) + pow(z_im, 2.));
    if(dist > 50.) {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  }
}
