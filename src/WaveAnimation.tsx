import React, { useEffect, useRef } from "react";

interface WaveAnimationProps {
  shadowColor: string;
  shadowBlur: number;
  gradientStart: string;
  gradientEnd: string;
  shadowOffsetX: number;
  shadowOffsetY: number;
  amplitude: number;
}

const WaveAnimation: React.FC<WaveAnimationProps> = ({
  shadowColor,
  shadowBlur,
  gradientStart,
  gradientEnd,
  shadowOffsetX,
  shadowOffsetY,
  amplitude,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;
    const speed = 0.009;
    const baseAmplitude = amplitude;

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, gradientStart);
      gradient.addColorStop(1, gradientEnd);

      ctx.beginPath();

      for (let x = 0; x < canvas.width; x++) {
        const amplitude = baseAmplitude + Math.sin(x * 0.01 + time) * 20;
        const y = canvas.height / 2 + Math.sin(x * 0.02 + time) * amplitude;
        ctx.lineTo(x, y);
      }

      ctx.shadowColor = shadowColor;
      ctx.shadowBlur = shadowBlur;
      ctx.shadowOffsetX = shadowOffsetX;
      ctx.shadowOffsetY = shadowOffsetY;

      ctx.lineWidth = 3;
      ctx.strokeStyle = gradient;
      ctx.stroke();
      ctx.closePath();

      ctx.shadowColor = "transparent";

      time += speed;
      requestAnimationFrame(drawWave);
    };

    drawWave();

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [
    shadowColor,
    shadowBlur,
    gradientStart,
    gradientEnd,
    shadowOffsetX,
    shadowOffsetY,
    amplitude,
  ]);
  

  return <canvas ref={canvasRef} />;
};

export default WaveAnimation;
