import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_scroll;
  uniform float u_quality;

  // Hash sem seno (Dave Hoskins)
  float hash(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 74.27);
    return fract(p.x * p.y);
  }

  // Value noise suave
  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1,0)), u.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
      u.y
    );
  }

  // FBM orgânico
  float fbm(vec2 p, int oct) {
    float v = 0.0, amp = 0.5, freq = 1.0;
    for (int i = 0; i < 5; i++) {
      if (i >= oct) break;
      v   += amp * vnoise(p * freq);
      amp  *= 0.48;
      freq *= 2.1;
    }
    return v;
  }

  // Domain warp — névoa de floresta
  float warp(vec2 p, float t, int oct) {
    // Mouse perturba o centro do warp como vento
    vec2 wind = u_mouse * 0.25;
    vec2 q = vec2(
      fbm(p + vec2(0.0, 0.0) + t * 0.018 + wind, oct),
      fbm(p + vec2(4.8, 1.7) + t * 0.014, oct)
    );
    vec2 r = vec2(
      fbm(p + 3.5 * q + vec2(1.7, 9.2) + t * 0.012 + wind * 0.5, oct),
      fbm(p + 3.5 * q + vec2(8.3, 2.8) + t * 0.010, oct)
    );
    return fbm(p + 4.2 * r, oct);
  }

  // Paleta MAR PROFUNDO — abissal, azul-petróleo, teal, espuma fria
  vec3 oceanPalette(float t) {
    // t ∈ [0, 1] — quase preto no fundo, subindo pro azul-oceano
    vec3 abyss   = vec3(0.004, 0.012, 0.024); // azul abissal quase preto
    vec3 deep    = vec3(0.015, 0.055, 0.090); // azul profundo
    vec3 sea     = vec3(0.030, 0.110, 0.150); // azul-mar médio
    vec3 teal    = vec3(0.040, 0.170, 0.180); // teal — crista de onda
    vec3 foam    = vec3(0.120, 0.240, 0.250); // espuma fria — ponto mais claro

    vec3 col = abyss;
    col = mix(col, deep, smoothstep(0.00, 0.42, t));
    col = mix(col, sea,  smoothstep(0.35, 0.68, t));
    col = mix(col, teal, smoothstep(0.62, 0.84, t));
    col = mix(col, foam, smoothstep(0.80, 0.97, t));
    return col;
  }

  void main() {
    vec2 uv = vUv;
    float t = u_time * 0.16;

    int oct = int(mix(2.0, 4.0, u_quality));

    // Ondulação: comprime o eixo vertical em faixas que "sobem" com o tempo
    // dá a sensação de ondas rolando na superfície
    vec2 p = uv * 2.2 + vec2(-1.1, -0.7);
    p.y += sin(uv.x * 3.0 + t * 0.8) * 0.12;      // crista horizontal
    p.x += sin(uv.y * 2.0 - t * 0.5) * 0.06;

    float f = warp(p, t, oct);

    // Bandas de onda — realça linhas de crista
    float bands = 0.5 + 0.5 * sin(f * 6.2831 + uv.y * 5.0 - t * 1.2);
    f = mix(f, f * (0.75 + bands * 0.5), 0.35);

    vec3 col = oceanPalette(f);

    // Reflexos de luz na superfície — brilhos frios pontuais (como sol na água)
    float glint = smoothstep(0.80, 0.92, f) * 0.14;
    col += vec3(0.15, 0.32, 0.36) * glint;

    // Vinheta orgânica — mais intensa nas bordas
    float vig = 1.0 - smoothstep(0.10, 1.3, length((uv - 0.5) * vec2(1.4, 1.0)));
    col *= vig;

    // Escurecimento central atrás do texto — mantém o nome legível
    float centerDim = smoothstep(0.0, 0.55, length((uv - vec2(0.5, 0.52)) * vec2(1.1, 1.4)));
    col *= mix(0.35, 1.0, centerDim);

    // Grão sutil (microtextura da água)
    float grain = hash(vUv * 380.0 + t * 0.5) - 0.5;
    col += grain * 0.016;

    // Fade com scroll
    col *= max(0.0, 1.0 - u_scroll * 0.9);

    // Tone-mapping suave
    col = col / (col + 0.22);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export const AuroraMaterial = shaderMaterial(
  {
    u_time:    0,
    u_mouse:   new THREE.Vector2(0, 0),
    u_scroll:  0,
    u_quality: 1.0,
  },
  vertexShader,
  fragmentShader
);

declare module "@react-three/fiber" {
  interface ThreeElements {
    auroraMaterial: React.ComponentPropsWithRef<"mesh"> & {
      u_time?:    number;
      u_mouse?:   THREE.Vector2;
      u_scroll?:  number;
      u_quality?: number;
    };
  }
}
