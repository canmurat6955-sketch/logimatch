"use client";

import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eraser, Check } from "lucide-react";

interface SignaturePadProps {
    onSave: (signatureDataUrl: string) => void;
    onCancel: () => void;
}

export default function SignaturePad({ onSave, onCancel }: SignaturePadProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasSignature, setHasSignature] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Set canvas size to parent container
        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Context setup
        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.lineWidth = 2;
            ctx.lineCap = "round";
            ctx.strokeStyle = "#000000"; // Black ink
        }

        return () => window.removeEventListener("resize", resizeCanvas);
    }, []);

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        setIsDrawing(true);
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const { offsetX, offsetY } = getCoordinates(e, canvas);
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        e.preventDefault(); // Prevent scrolling on touch
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const { offsetX, offsetY } = getCoordinates(e, canvas);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
        setHasSignature(true);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const getCoordinates = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
        let offsetX = 0, offsetY = 0;
        if ('touches' in e) {
            const rect = canvas.getBoundingClientRect();
            offsetX = e.touches[0].clientX - rect.left;
            offsetY = e.touches[0].clientY - rect.top;
        } else {
            offsetX = (e as React.MouseEvent).nativeEvent.offsetX;
            offsetY = (e as React.MouseEvent).nativeEvent.offsetY;
        }
        return { offsetX, offsetY };
    };

    const clear = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setHasSignature(false);
        }
    };

    const save = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        onSave(canvas.toDataURL("image/png"));
    };

    return (
        <div className="flex flex-col h-full bg-white rounded-xl overflow-hidden">
            <div className="p-3 bg-zinc-100 border-b flex justify-between items-center">
                <span className="text-zinc-500 text-sm font-medium">Lütfen imzalayınız</span>
                <Button variant="ghost" size="sm" onClick={clear} className="h-8 text-zinc-500 hover:text-red-500">
                    <Eraser className="w-4 h-4 mr-1" /> Temizle
                </Button>
            </div>

            <div className="flex-1 relative bg-white touch-none">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full cursor-crosshair"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                />
                {!hasSignature && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-zinc-200 text-4xl font-handwriting select-none">İmza Alanı</span>
                    </div>
                )}
            </div>

            <div className="p-4 bg-zinc-50 border-t flex gap-3">
                <Button variant="outline" className="flex-1 text-zinc-600" onClick={onCancel}>
                    İptal
                </Button>
                <Button
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={save}
                    disabled={!hasSignature}
                >
                    <Check className="w-4 h-4 mr-2" /> Onayla
                </Button>
            </div>
        </div>
    );
}
