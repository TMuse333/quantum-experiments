import React, { useRef, useEffect } from "react";
import brain from '/focusFlow-brain-nobg.webp';

const ElectricContainer = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const c = canvas.getContext("2d");
        if (!c) return;
    
        const width = canvas.width = canvas.offsetWidth;
        const height = canvas.height = canvas.offsetHeight;
    
        let offset = 0;
    
        const drawElectricArc = () => {
            c.clearRect(0, 0, width, height);
    
            // Style for the electric outline
            c.lineWidth = 20;
            c.strokeStyle = "#e0f7ff";
            c.shadowBlur = 50;
            c.shadowColor = "#e0f7ff";
    
            // Define path for rounded rectangle with wavy effect
            const radius = 25; // Radius for the rounded corners
            const waveAmplitude = 2; // Amplitude of the waviness
            const waveFrequency = 0.1; // Frequency of the waviness
    
            c.beginPath();
    
            // Top edge with waviness
            for (let x = radius; x < width - radius; x++) {
                const yOffset = Math.sin((x + offset) * waveFrequency) * waveAmplitude;
                c.lineTo(x, yOffset);
            }
    
            // Top-right corner
            c.quadraticCurveTo(width, 0, width, radius);
    
            // Right edge with waviness
            for (let y = radius; y < height - radius; y++) {
                const xOffset = Math.sin((y + offset) * waveFrequency) * waveAmplitude;
                c.lineTo(width + xOffset, y);
            }
    
            // Bottom-right corner
            c.quadraticCurveTo(width, height, width - radius, height);
    
            // Bottom edge with waviness
            for (let x = width - radius; x > radius; x--) {
                const yOffset = Math.sin((x + offset) * waveFrequency) * waveAmplitude;
                c.lineTo(x, height - yOffset);
            }
    
            // Bottom-left corner
            c.quadraticCurveTo(0, height, 0, height - radius);
    
            // Left edge with waviness
            for (let y = height - radius; y > radius; y--) {
                const xOffset = Math.sin((y + offset) * waveFrequency) * waveAmplitude;
                c.lineTo(xOffset, y);
            }
    
            // Top-left corner
            c.quadraticCurveTo(0, 0, radius, 0);
    
            c.closePath();
            c.stroke();
    
            offset += 0.5; // Speed of the wave animation
        };
    
        const animate = () => {
            drawElectricArc();
            requestAnimationFrame(animate);
        };
    
        animate();
    }, []);
    

    
    

    return (
        <section className="relative  text-gray-200 bg-gradient-to-b from-[#00bfff] to-[#2985a3] w-[80vw] mx-auto max-w-[900px]
         rounded-2xl overflow-hidden h-[60vh]">
            <h2 className="text-2xl sm:text-3xl md:text-4xl pt-4">title here</h2>
            <img src={brain} alt="brain" className='w-[50%] mx-auto object-contain' />
            <p className="pb-8">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio hic laborum fugit illo odit. Tenetur similique velit harum necessitatibus porro.</p>

            {/* Canvas overlay for electric effect */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 rounded-2xl pointer-events-none
              w-[80vw] h-[60vh]"
                style={{ zIndex: 1 }}
            ></canvas>
        </section>
    );
};

export default ElectricContainer;
