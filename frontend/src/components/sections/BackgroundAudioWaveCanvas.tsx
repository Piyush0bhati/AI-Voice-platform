"use client";

import { useEffect, useRef } from "react";

export function BackgroundAudioWaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let step = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = Math.max(canvas.parentElement?.clientHeight || 900, 600);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Multi-frequency sound wave definitions (simulating voice harmonics)
    const waves = [
      {
        frequency: 0.0035,
        speed: 0.022,
        amplitude: 65,
        offsetY: 0.52,
        color: "rgba(16, 141, 130, 0.18)",
        lineWidth: 2.2,
      },
      {
        frequency: 0.0055,
        speed: 0.016,
        amplitude: 85,
        offsetY: 0.56,
        color: "rgba(52, 211, 153, 0.16)",
        lineWidth: 1.8,
      },
      {
        frequency: 0.0028,
        speed: 0.028,
        amplitude: 50,
        offsetY: 0.48,
        color: "rgba(13, 148, 136, 0.22)",
        lineWidth: 2.6,
      },
      {
        frequency: 0.007,
        speed: 0.012,
        amplitude: 95,
        offsetY: 0.60,
        color: "rgba(16, 185, 129, 0.12)",
        lineWidth: 1.5,
      },
      {
        frequency: 0.0042,
        speed: 0.025,
        amplitude: 75,
        offsetY: 0.50,
        color: "rgba(45, 212, 191, 0.15)",
        lineWidth: 2.0,
      },
    ];

    const render = () => {
      step++;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle radial glow in the center matching Vozon teal
      const radialGlow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.52,
        20,
        width * 0.5,
        height * 0.52,
        Math.max(width * 0.5, 450)
      );
      radialGlow.addColorStop(0, "rgba(16, 141, 130, 0.07)");
      radialGlow.addColorStop(0.5, "rgba(52, 211, 153, 0.03)");
      radialGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Render each sine harmonic wave
      waves.forEach((w, waveIndex) => {
        ctx.beginPath();
        const baseCenterY = height * w.offsetY;

        for (let x = 0; x <= width; x += 3) {
          // Envelope: taper at the very left and right edges
          const envelope = Math.sin((x / width) * Math.PI);
          // Modulated frequency sine equation
          const y =
            baseCenterY +
            Math.sin(x * w.frequency + step * w.speed + waveIndex) *
              w.amplitude *
              envelope +
            Math.sin(x * (w.frequency * 2.2) - step * (w.speed * 0.7)) *
              (w.amplitude * 0.35) *
              envelope;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = w.color;
        ctx.lineWidth = w.lineWidth;
        ctx.lineCap = "round";
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
