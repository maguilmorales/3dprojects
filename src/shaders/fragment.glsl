varying vec2 vUv;
uniform float uTime;
uniform sampler2D uTexture;

void main() {
  float time = uTime;

  vec2 uv = vUv;
 
  vec2 repeat = vec2(3.0, 6.0);
  uv = fract(uv * repeat);
  
  vec4 color = texture2D(uTexture, uv);
  
  gl_FragColor = color;
}