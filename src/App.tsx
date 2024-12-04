import React, { useState } from "react";
import WaveAnimation from "./WaveAnimation";

const WaveControl: React.FC = () => {
  const [shadowColor, setShadowColor] = useState("rgba(0, 255, 0, 0.8)");
  const [shadowBlur, setShadowBlur] = useState(10);
  const [gradientStart, setGradientStart] = useState("rgba(0, 255, 0, 0)");
  const [gradientEnd, setGradientEnd] = useState("rgba(0, 255, 0, 1)");
  const [shadowX, setX] = useState(0);
  const [shadowY, setY] = useState(3);
  const [amplitude, setAmplitude] = useState(35);
  const [showCode, setShowCode] = useState(false);

  const codeSnippet = `
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

    // Usage example
    <WaveAnimation
      shadowColor="${shadowColor}"
      shadowBlur={${shadowBlur}}
      gradientStart="${gradientStart}"
      gradientEnd="${gradientEnd}"
      shadowOffsetX={${shadowX}}
      shadowOffsetY={${shadowY}}
      amplitude={${amplitude}}
    />;
  `;

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <WaveAnimation
        shadowColor={shadowColor}
        shadowBlur={shadowBlur}
        gradientStart={gradientStart}
        gradientEnd={gradientEnd}
        shadowOffsetX={shadowX}
        shadowOffsetY={shadowY}
        amplitude={amplitude}
      />

      {/* Controls */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          backgroundColor: "#fff",
          borderRadius: 8,
          padding: 16,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <div>
          <label>Shadow Color:</label>
          <input
            type="color"
            value={shadowColor}
            onChange={(e) => setShadowColor(e.target.value)}
          />
        </div>
        <div>
          <label>Shadow Blur:</label>
          <input
            type="range"
            min="0"
            max="10"
            value={shadowBlur}
            onChange={(e) => setShadowBlur(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Shadow Offset X:</label>
          <input
            type="range"
            min="-50"
            max="50"
            value={shadowX}
            onChange={(e) => setX(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Shadow Offset Y:</label>
          <input
            type="range"
            min="-50"
            max="50"
            value={shadowY}
            onChange={(e) => setY(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Amplitude:</label>
          <input
            type="range"
            min="10"
            max="1000"
            step={5}
            value={amplitude}
            onChange={(e) => setAmplitude(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Gradient Start:</label>
          <input
            type="color"
            value={gradientStart}
            onChange={(e) => setGradientStart(e.target.value)}
          />
        </div>
        <div>
          <label>Gradient End:</label>
          <input
            type="color"
            value={gradientEnd}
            onChange={(e) => setGradientEnd(e.target.value)}
          />
        </div>
        <div style={{ padding: "20px" }}>
          <button
            onClick={() => setShowCode(!showCode)}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {showCode ? "Hide Code" : "Show Code"}
          </button>
          {showCode && (
            <pre
              style={{
                marginTop: "20px",
                padding: "20px",
                background: "#f4f4f4",
                borderRadius: "5px",
                fontSize: "14px",
                overflowX: "auto",
                maxHeight: "300px",
                whiteSpace: "pre-wrap",
                boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <code>{codeSnippet}</code>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaveControl;
