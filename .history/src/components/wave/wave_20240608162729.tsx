import React, { useRef, useEffect, useState } from 'react';

const SineWave: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const handleResize = () => {
            const container = containerRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            setCanvasSize({ width: rect.width, height: rect.height });
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const c = canvas.getContext('2d');
        if (!c) return;

        const draw = () => {
            c.clearRect(0, 0, canvas.width, canvas.height);
            // Draw your sine wave here using canvas
        };

        draw();

        const resizeHandler = () => {
            const container = containerRef.current;
            if (!container) return;
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            setCanvasSize({ width: rect.width, height: rect.height });
        };

        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    return (
        <div className="w-screen bg-green-200 h-1/2" ref={containerRef}>
            <canvas className="" ref={canvasRef} width={canvasSize.width} height={canvasSize.height} />
        </div>
    );
};

export default SineWave;
