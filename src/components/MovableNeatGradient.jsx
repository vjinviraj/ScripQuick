import { useEffect, useRef } from "react";
import { NeatGradient } from "@firecms/neat";

const config = {
    colors: [
        { color: "#000000", enabled: true },
        { color: "#5D6B7C", enabled: true },
        { color: "#000000", enabled: true },
        { color: "#000000", enabled: true },
        { color: "#040506", enabled: true },
    ],
    speed: 2,
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
    resolution: 1.8,
    yOffset: 0,
};

export default function MovableNeatGradient() {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // NeatGradient requires a canvas element
        const neat = new NeatGradient({
            ref: canvasRef.current,
            ...config,
        });

        return () => {
            neat.destroy();
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
                zIndex: 0, // behind everything
            }}
        />
    );
}
