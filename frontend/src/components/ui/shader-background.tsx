"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

export interface ShaderBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
  speed?: number;
  waveCount?: number;
  primaryColor?: string;
  glowColor?: string;
  backgroundColor?: string;
  particleCount?: number;
  interactive?: boolean;
  children?: React.ReactNode;
}

interface WaveStrand {
  freq1: number;
  freq2: number;
  freq3: number;
  speed: number;
  phase: number;
  amp1: number;
  amp2: number;
  yOffset: number;
  width: number;
  alpha: number;
  color: string;
  coreColor: string;
}

interface WaveParticle {
  strandIndex: number;
  xRatio: number;
  speed: number;
  size: number;
  opacity: number;
  pulsePhase: number;
}

/**
 * ShaderBackground
 * Recreates the exact glowing neon-purple audio wave strand visual with
 * multi-frequency harmonics, glowing core energy, gliding spark particles,
 * and mouse interactivity.
 */
export default function ShaderBackground({
  className = "",
  style,
  speed = 1.0,
  waveCount = 10,
  primaryColor = "#c084fc", // Radiant light purple
  glowColor = "#9333ea",    // Rich neon purple
  backgroundColor = "#090514", // Deep dark violet
  particleCount = 14,
  interactive = true,
  children,
}: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovered: false });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.isHovered = true;
    },
    [interactive]
  );

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.isHovered = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animId: number;
    let time = 0;
    let lastTime = performance.now();

    // Generate distinct harmonized strands
    const strands: WaveStrand[] = [];
    const strandTints = [
      { core: "#ffffff", stroke: "#e879f9", alpha: 0.95, width: 2.4 }, // Hot magenta-purple
      { core: "#f5d0fe", stroke: "#c084fc", alpha: 0.9, width: 2.2 },  // Electric lavender
      { core: "#f3e8ff", stroke: "#a855f7", alpha: 0.85, width: 1.9 }, // Deep purple
      { core: "#ede9fe", stroke: "#818cf8", alpha: 0.75, width: 1.6 }, // Indigo-purple
      { core: "#fae8ff", stroke: "#d946ef", alpha: 0.8, width: 2.0 },  // Fuchsia
      { core: "#e0e7ff", stroke: "#a855f7", alpha: 0.7, width: 1.5 },  // Violet
      { core: "#ffffff", stroke: "#c084fc", alpha: 0.85, width: 1.8 },
      { core: "#fdf4ff", stroke: "#9333ea", alpha: 0.65, width: 1.4 },
      { core: "#f5d0fe", stroke: "#a855f7", alpha: 0.6, width: 1.3 },
      { core: "#ede9fe", stroke: "#c084fc", alpha: 0.75, width: 1.7 },
      { core: "#ffffff", stroke: "#e879f9", alpha: 0.7, width: 1.5 },
      { core: "#fae8ff", stroke: "#a855f7", alpha: 0.6, width: 1.2 },
    ];

    for (let i = 0; i < waveCount; i++) {
      const tint = strandTints[i % strandTints.length];
      strands.push({
        freq1: 0.0018 + (i * 0.00018),
        freq2: 0.0036 + (i * 0.00025),
        freq3: 0.0009 + (i * 0.00012),
        speed: 0.8 + (i * 0.08),
        phase: (i * Math.PI) / 4.5,
        amp1: 65 + (i * 4.5),
        amp2: 32 + (i * 2.8),
        yOffset: (i - waveCount / 2) * 5.5,
        width: tint.width,
        alpha: tint.alpha,
        color: tint.stroke,
        coreColor: tint.core,
      });
    }

    // Generate gliding luminous particles
    const particles: WaveParticle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        strandIndex: Math.floor(Math.random() * strands.length),
        xRatio: Math.random(),
        speed: 0.04 + Math.random() * 0.06,
        size: 1.8 + Math.random() * 2.2,
        opacity: 0.7 + Math.random() * 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const resize = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      setDimensions({ width, height });

      if (!mouseRef.current.isHovered) {
        mouseRef.current.targetX = width * 0.5;
        mouseRef.current.targetY = height * 0.5;
        mouseRef.current.x = width * 0.5;
        mouseRef.current.y = height * 0.5;
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    window.addEventListener("resize", resize);

    // Calculate wave Y coordinate at a given X
    const getWaveY = (
      x: number,
      strand: WaveStrand,
      w: number,
      h: number,
      t: number,
      mouseInfluence: number
    ) => {
      const centerY = h * 0.52 + strand.yOffset;

      // Bell envelope: peaks in center-left, tapers at horizontal edges
      const normalizedX = x / w;
      // Asymmetrical envelope shaped like the image (high peak around 0.38)
      const envelope =
        Math.pow(Math.sin(normalizedX * Math.PI), 0.75) *
        (1.2 - 0.4 * normalizedX);

      // Multi-harmonic sine waves
      const w1 = Math.sin(x * strand.freq1 - t * strand.speed * 1.2 + strand.phase);
      const w2 = Math.sin(x * strand.freq2 + t * strand.speed * 0.9 + strand.phase * 1.4);
      const w3 = Math.cos(x * strand.freq3 - t * strand.speed * 0.6);

      let displacement = (w1 * strand.amp1 + w2 * strand.amp2 * 0.6 + w3 * 18) * envelope;

      // Mouse interactivity
      if (mouseInfluence > 0) {
        const dx = x - mouseRef.current.x;
        const dist = Math.abs(dx);
        const radius = w * 0.35;
        if (dist < radius) {
          const factor = Math.cos((dist / radius) * (Math.PI * 0.5));
          const targetDy = (mouseRef.current.y - centerY) * 0.28;
          displacement += targetDy * factor * mouseInfluence;
        }
      }

      return centerY + displacement;
    };

    // Render loop
    const render = (now: number) => {
      animId = requestAnimationFrame(render);

      const dt = (now - lastTime) * 0.001;
      lastTime = now;
      time += dt * speed;

      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;

      // Smooth mouse interpolation
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.06;
      m.y += (m.targetY - m.y) * 0.06;
      const mouseInfluence = m.isHovered ? 1.0 : 0.4;

      // 1. Draw atmospheric background gradient
      // Left deep navy, center rich glowing purple/violet, right deep twilight
      const bgGrad = ctx.createLinearGradient(0, 0, w, h);
      bgGrad.addColorStop(0, "#080415");
      bgGrad.addColorStop(0.3, "#0e0624");
      bgGrad.addColorStop(0.55, "#1c093e");
      bgGrad.addColorStop(0.85, "#12062b");
      bgGrad.addColorStop(1, "#070312");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. Central ambient glowing purple haze behind the waves (like image)
      const centerHaze = ctx.createRadialGradient(
        w * 0.48,
        h * 0.5,
        20,
        w * 0.48,
        h * 0.5,
        w * 0.45
      );
      centerHaze.addColorStop(0, "rgba(147, 51, 234, 0.28)");
      centerHaze.addColorStop(0.35, "rgba(126, 34, 206, 0.16)");
      centerHaze.addColorStop(0.7, "rgba(88, 28, 135, 0.07)");
      centerHaze.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = centerHaze;
      ctx.fillRect(0, 0, w, h);

      // Use lighter composite operation for brilliant glowing additive energy
      ctx.globalCompositeOperation = "lighter";

      const step = 8; // Smooth bezier sampling interval

      // 3. Render each wave strand
      strands.forEach((strand, idx) => {
        // Collect points across screen width
        const points: { x: number; y: number }[] = [];
        for (let x = 0; x <= w + step; x += step) {
          points.push({
            x,
            y: getWaveY(x, strand, w, h, time, mouseInfluence),
          });
        }

        if (points.length < 2) return;

        // Path generator
        const tracePath = () => {
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          for (let i = 1; i < points.length - 1; i++) {
            const xc = (points[i].x + points[i + 1].x) * 0.5;
            const yc = (points[i].y + points[i + 1].y) * 0.5;
            ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
          }
          const last = points[points.length - 1];
          ctx.lineTo(last.x, last.y);
        };

        // Pass 1: Wide neon purple bloom halo
        ctx.save();
        ctx.shadowColor = strand.color;
        ctx.shadowBlur = 18;
        ctx.strokeStyle = strand.color;
        ctx.lineWidth = strand.width * 1.8;
        ctx.globalAlpha = strand.alpha * 0.45;
        tracePath();
        ctx.stroke();
        ctx.restore();

        // Pass 2: Defined saturated neon strand
        ctx.save();
        ctx.shadowColor = strand.color;
        ctx.shadowBlur = 8;
        ctx.strokeStyle = strand.color;
        ctx.lineWidth = strand.width;
        ctx.globalAlpha = strand.alpha * 0.85;
        tracePath();
        ctx.stroke();
        ctx.restore();

        // Pass 3: Brilliant white-hot luminous core
        ctx.save();
        ctx.strokeStyle = strand.coreColor;
        ctx.lineWidth = Math.max(0.7, strand.width * 0.45);
        ctx.globalAlpha = strand.alpha * 0.95;
        tracePath();
        ctx.stroke();
        ctx.restore();
      });

      // 4. Render gliding glowing particles / fiber-optic sparks
      particles.forEach((p) => {
        p.xRatio += dt * p.speed * speed;
        if (p.xRatio > 1.0) p.xRatio -= 1.0;

        const strand = strands[p.strandIndex % strands.length];
        const px = p.xRatio * w;
        const py = getWaveY(px, strand, w, h, time, mouseInfluence);

        // Pulse intensity
        p.pulsePhase += dt * 3.0;
        const pulse = 0.8 + 0.3 * Math.sin(p.pulsePhase);
        const radius = p.size * pulse;

        // Particle flare
        const flare = ctx.createRadialGradient(px, py, 0, px, py, radius * 3.5);
        flare.addColorStop(0, "rgba(255, 255, 255, 1.0)");
        flare.addColorStop(0.3, "rgba(232, 121, 249, 0.9)");
        flare.addColorStop(0.7, "rgba(168, 85, 247, 0.35)");
        flare.addColorStop(1, "rgba(147, 51, 234, 0)");

        ctx.fillStyle = flare;
        ctx.beginPath();
        ctx.arc(px, py, radius * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // White core bead
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.8, radius * 0.5), 0, Math.PI * 2);
        ctx.fill();
      });

      // Reset composite operation
      ctx.globalCompositeOperation = "source-over";
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [speed, waveCount, particleCount, interactive, primaryColor, glowColor, backgroundColor]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "400px",
        overflow: "hidden",
        backgroundColor,
        ...style,
      }}
      className={`shader-background-wrapper ${className}`}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />

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

/**
 * DemoOne usecase export requested by user:
 * ```tsx
 * import ShaderBackground from "@/components/ui/shader-background";
 * const DemoOne = () => { return <ShaderBackground />; };
 * export { DemoOne };
 * ```
 */
export const DemoOne = () => {
  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <ShaderBackground interactive={true} />
    </div>
  );
};

export { ShaderBackground };
