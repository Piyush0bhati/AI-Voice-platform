"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

export type StarshipShaderPreset =
  | "nebula"
  | "starship"
  | "aurora"
  | "cyberpunk"
  | "light-prism";

export interface StarshipShaderProps {
  className?: string;
  style?: React.CSSProperties;
  speed?: number;
  streakDensity?: number;
  preset?: StarshipShaderPreset;
  interactive?: boolean;
  showControls?: boolean;
  children?: React.ReactNode;
}

const PRESET_MAP: Record<StarshipShaderPreset, { id: number; label: string; accent: string }> = {
  nebula: { id: 0, label: "Deep Nebula", accent: "#38bdf8" },
  starship: { id: 1, label: "Starship Reentry", accent: "#f97316" },
  aurora: { id: 2, label: "Aurora Borealis", accent: "#34d399" },
  cyberpunk: { id: 3, label: "Cyberpunk FTL", accent: "#ec4899" },
  "light-prism": { id: 4, label: "Light Prism", accent: "#6366f1" },
};

const VERTEX_SHADER_SRC = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = (a_position + 1.0) * 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SRC = `
  precision highp float;
  varying vec2 v_uv;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform int u_preset;
  uniform float u_speed;
  uniform float u_density;

  mat2 rot(float a) {
    float c = cos(a);
    float s = sin(a);
    return mat2(c, -s, s, c);
  }

  vec3 fastTanh(vec3 x) {
    vec3 clamped = clamp(x, 0.0, 10.0);
    vec3 exp2x = exp(2.0 * clamped);
    return (exp2x - 1.0) / (exp2x + 1.0);
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    
    // Smooth mouse parallax warp
    vec2 m = (u_mouse * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    uv -= m * 0.15;

    float t = u_time * (0.32 * u_speed);
    float r = length(uv);
    float angle = atan(uv.y, uv.x);

    // Volumetric raymarching accumulation
    vec3 rayOrigin = vec3(0.0, 0.0, -2.6);
    vec3 rayDir = normalize(vec3(uv, 1.35));
    
    // Viewport tilt
    rayDir.yz = rot(m.y * 0.28) * rayDir.yz;
    rayDir.xz = rot(-m.x * 0.28) * rayDir.xz;

    float depth = 0.0;
    vec3 accum = vec3(0.0);

    for (int i = 0; i < 42; i++) {
      vec3 p = rayOrigin + rayDir * depth;
      p.z += t * 3.4;

      // Space warp domain frequency
      vec3 q = sin(p * 0.85 + sin(p.yzx * 0.55 + t));
      float dist = length(q) - 0.74;
      float glow = exp(-max(dist, 0.0) * 9.2) * 0.025;

      vec3 tint = vec3(0.0);
      if (u_preset == 0) {
        // Nebula: deep space cyan, neon violet, azure, magenta
        tint = 0.5 + 0.5 * cos(vec3(0.0, 1.3, 2.5) + p.z * 0.22 + float(i) * 0.04);
        tint = mix(tint, vec3(0.2, 0.75, 1.0), 0.45);
      } else if (u_preset == 1) {
        // Starship Reentry: SpaceX fiery plasma, solar amber, incandescent gold
        tint = vec3(1.0, 0.48, 0.12) * (0.65 + 0.35 * sin(p.z * 0.28 + float(i) * 0.09));
        tint += vec3(0.45, 0.15, 0.08) * cos(p.x * 2.1);
        tint = mix(tint, vec3(1.0, 0.92, 0.55), 0.3);
      } else if (u_preset == 2) {
        // Aurora: emerald green, celestial turquoise, soft bioluminescence
        tint = 0.5 + 0.5 * cos(vec3(1.1, 0.25, 1.9) + p.z * 0.17 + float(i) * 0.035);
        tint = mix(tint, vec3(0.12, 0.95, 0.65), 0.52);
      } else if (u_preset == 3) {
        // Cyberpunk FTL: hot pink, electric violet, vibrant cyan
        tint = vec3(0.95, 0.12, 0.85) * sin(p.z * 0.22) + vec3(0.05, 0.88, 1.0) * cos(p.z * 0.22);
        tint = abs(tint);
      } else {
        // Light-Prism: iridescent crystal tones, soft azure, opal lavender
        tint = 0.65 + 0.35 * cos(vec3(0.3, 1.4, 2.7) + p.z * 0.16 + float(i) * 0.03);
        tint = mix(tint, vec3(0.35, 0.65, 0.95), 0.35);
      }

      accum += tint * glow;
      depth += max(abs(dist) * 0.32, 0.065);
      if (depth > 19.0) break;
    }

    // High-speed radial streak shards (FTL hyperspace trails)
    float streakAngle = angle * (20.0 * u_density);
    float streakNoise = sin(streakAngle + sin(streakAngle * 2.0 + t * 4.2)) * 0.5 + 0.5;
    streakNoise = pow(streakNoise, 8.5);
    float radialFade = exp(-r * 1.75);

    vec3 streakColor = vec3(0.35, 0.75, 1.0);
    if (u_preset == 1) streakColor = vec3(1.0, 0.65, 0.25);
    if (u_preset == 2) streakColor = vec3(0.2, 1.0, 0.75);
    if (u_preset == 3) streakColor = vec3(1.0, 0.25, 0.85);
    if (u_preset == 4) streakColor = vec3(0.4, 0.65, 0.95);

    accum += streakColor * (streakNoise * radialFade * 0.85);

    // Center focal bloom
    float coreBloom = 0.04 / (r * r + 0.06);
    accum += streakColor * coreBloom * 0.42;

    vec3 finalColor;
    if (u_preset == 4) {
      // Light-prism mode: render beautifully atop a clean bright light canvas
      vec3 lightBase = vec3(0.97, 0.98, 1.0);
      finalColor = mix(lightBase, accum * 1.85 + vec3(0.12, 0.22, 0.45), clamp(length(accum) * 0.75, 0.0, 0.85));
    } else {
      // Dark space hull: glowing cosmic shades
      finalColor = accum * 1.4;
      finalColor = fastTanh(finalColor);
    }

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

/**
 * StarshipShader / Component
 * GPU-accelerated WebGL fragment shader rendering cosmic FTL warp streaks and atmospheric shades.
 * Compatible with `import { Component } from "@/components/ui/starship-shader"`.
 */
export function Component({
  className = "",
  style,
  speed = 1.0,
  streakDensity = 1.0,
  preset: initialPreset = "nebula",
  interactive = true,
  showControls = false,
  children,
}: StarshipShaderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activePreset, setActivePreset] = useState<StarshipShaderPreset>(initialPreset);
  const [isPaused, setIsPaused] = useState(false);
  const [fps, setFps] = useState(60);

  const stateRef = useRef({
    preset: activePreset,
    speed,
    streakDensity,
    isPaused,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
  });

  useEffect(() => {
    stateRef.current.preset = activePreset;
    stateRef.current.speed = speed;
    stateRef.current.streakDensity = streakDensity;
    stateRef.current.isPaused = isPaused;
  }, [activePreset, speed, streakDensity, isPaused]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = rect.height - (e.clientY - rect.top);
      stateRef.current.mouse.targetX = x;
      stateRef.current.mouse.targetY = y;
    },
    [interactive]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        powerPreference: "high-performance",
        depth: false,
        stencil: false,
      }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      console.warn("WebGL not supported for StarshipShader");
      return;
    }

    const compileShader = (type: number, src: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vert = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const frag = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
    if (!vert || !frag) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Full-screen clip quad
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    const quadVertices = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

    const aPosLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPosLoc);
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

    const uResLoc = gl.getUniformLocation(program, "u_resolution");
    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uMouseLoc = gl.getUniformLocation(program, "u_mouse");
    const uPresetLoc = gl.getUniformLocation(program, "u_preset");
    const uSpeedLoc = gl.getUniformLocation(program, "u_speed");
    const uDensityLoc = gl.getUniformLocation(program, "u_density");

    let animId: number;
    let startTime = performance.now();
    let accumulatedTime = 0;
    let lastTimestamp = performance.now();
    let frameCount = 0;
    let lastFpsUpdate = performance.now();

    const resize = () => {
      const container = containerRef.current;
      if (!container) return;
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // Balance sharpness & 60fps performance
      const targetW = Math.floor(width * dpr);
      const targetH = Math.floor(height * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        gl.viewport(0, 0, targetW, targetH);
        stateRef.current.mouse.targetX = targetW * 0.5;
        stateRef.current.mouse.targetY = targetH * 0.5;
        stateRef.current.mouse.x = targetW * 0.5;
        stateRef.current.mouse.y = targetH * 0.5;
      }
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    window.addEventListener("resize", resize);

    const render = (now: number) => {
      animId = requestAnimationFrame(render);

      const delta = (now - lastTimestamp) * 0.001;
      lastTimestamp = now;

      // FPS tracking
      frameCount++;
      if (now - lastFpsUpdate >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastFpsUpdate)));
        frameCount = 0;
        lastFpsUpdate = now;
      }

      if (!stateRef.current.isPaused) {
        accumulatedTime += delta;
      }

      // Smooth mouse interpolation
      const m = stateRef.current.mouse;
      m.x += (m.targetX - m.x) * 0.08;
      m.y += (m.targetY - m.y) * 0.08;

      gl.useProgram(program);

      if (uResLoc) gl.uniform2f(uResLoc, canvas.width, canvas.height);
      if (uTimeLoc) gl.uniform1f(uTimeLoc, accumulatedTime);
      if (uMouseLoc) gl.uniform2f(uMouseLoc, m.x, m.y);
      if (uPresetLoc) gl.uniform1i(uPresetLoc, PRESET_MAP[stateRef.current.preset]?.id ?? 0);
      if (uSpeedLoc) gl.uniform1f(uSpeedLoc, stateRef.current.speed);
      if (uDensityLoc) gl.uniform1f(uDensityLoc, stateRef.current.streakDensity);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      gl.deleteBuffer(quadBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: activePreset === "light-prism" ? "#f8fafc" : "#02040a",
        ...style,
      }}
      className={`starship-shader-container ${className}`}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      />

      {/* Optional Interactive Preset Controls */}
      {showControls && (
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 30,
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            alignItems: "center",
            padding: "8px 14px",
            borderRadius: "9999px",
            background: "rgba(10, 15, 30, 0.75)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.7)",
              textTransform: "uppercase",
              paddingRight: "6px",
              borderRight: "1px solid rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: PRESET_MAP[activePreset].accent,
                boxShadow: `0 0 10px ${PRESET_MAP[activePreset].accent}`,
              }}
            />
            Shades
          </div>

          {(Object.keys(PRESET_MAP) as StarshipShaderPreset[]).map((key) => {
            const p = PRESET_MAP[key];
            const isActive = activePreset === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActivePreset(key)}
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "6px 12px",
                  borderRadius: "9999px",
                  border: isActive ? `1px solid ${p.accent}` : "1px solid transparent",
                  background: isActive ? "rgba(255,255,255,0.15)" : "transparent",
                  color: isActive ? "#ffffff" : "rgba(255,255,255,0.7)",
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: p.accent,
                  }}
                />
                {p.label}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            style={{
              marginLeft: "4px",
              padding: "6px 10px",
              fontSize: "11px",
              fontWeight: 600,
              borderRadius: "9999px",
              background: isPaused ? "rgba(239, 68, 68, 0.25)" : "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            {isPaused ? "▶ Resume" : "⏸ Pause"}
          </button>

          <span
            style={{
              fontSize: "10px",
              fontFamily: "monospace",
              color: "rgba(255,255,255,0.5)",
              paddingLeft: "4px",
            }}
          >
            {fps} FPS
          </span>
        </div>
      )}

      {/* Embedded children (content rendered over the shader) */}
      {children && (
        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            height: "100%",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default Component;
