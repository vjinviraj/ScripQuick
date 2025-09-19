import { useEffect, useRef } from "react";
import { NeatGradient } from "@firecms/neat";

const config = {
  colors: [
    { color: "#000000", enabled: true },
    { color: "#FFFFFF", enabled: true },
    { color: "#000000", enabled: true },
    { color: "#FFFFFF", enabled: true },
    { color: "#000000", enabled: true },
  ],
  speed: 3,
  horizontalPressure: 3,
  verticalPressure: 5,
  waveFrequencyX: 1,
  waveFrequencyY: 3,
  waveAmplitude: 8,
  shadows: 0,
  highlights: 2,
  colorBrightness: 1,
  colorSaturation: 6,
  wireframe: false,
  colorBlending: 7,
  backgroundColor: "#003FFF",
  backgroundAlpha: 1,
  grainScale: 2,
  grainSparsity: 0,
  grainIntensity: 0.175,
  grainSpeed: 1,
  resolution: 1,
  yOffset: 0,
};

export default function Neatbackground() {
  const canvasRef = useRef(null);
  const neatInstance = useRef(null);

  useEffect(() => {
    if (canvasRef.current && !neatInstance.current) {
      // Pass the canvas element itself
      neatInstance.current = new NeatGradient({
        ref: canvasRef.current,
        ...config,
      });
    }

    return () => {
      neatInstance.current?.destroy();
      neatInstance.current = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}