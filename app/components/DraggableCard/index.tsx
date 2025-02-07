'use client';
import React, { useEffect, useRef } from 'react';

export type DraggableCardPropsType = {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const DraggableCard = ({ children, className = '', style = {} }: DraggableCardPropsType) => {
    const initialRotation = Math.random() * 6 - 3; // Random tilt between -3 and 3 degrees      
    const cardRef = useRef<HTMLDivElement>(null);
    const dragState = useRef({
        isDragging: false,
        prevX: 0,
        prevY: 0,
        currentX: 0,
        currentY: 0,
        initialRotation
    });

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        // Set initial rotation
        card.style.transform = `rotate(${dragState.current.initialRotation}deg)`;

        const handleMouseDown = (e: MouseEvent) => {
            dragState.current.isDragging = true;
            dragState.current.prevX = e.clientX;
            dragState.current.prevY = e.clientY;
            card.style.cursor = 'grabbing';
            // Remove rotation when dragging starts
            card.style.transform = `translate(${dragState.current.currentX}px, ${dragState.current.currentY}px)`;
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!dragState.current.isDragging) return;

            const dx = e.clientX - dragState.current.prevX;
            const dy = e.clientY - dragState.current.prevY;

            dragState.current.currentX += dx;
            dragState.current.currentY += dy;

            card.style.transform = `translate(${dragState.current.currentX}px, ${dragState.current.currentY}px)`;

            dragState.current.prevX = e.clientX;
            dragState.current.prevY = e.clientY;
        };

        const handleMouseUp = () => {
            if (!dragState.current.isDragging) return;
            dragState.current.isDragging = false;
            card.style.cursor = 'grab';
            card.style.transform = `translate(${dragState.current.currentX}px, ${dragState.current.currentY}px)`;
        };

        const handleTouchStart = (e: TouchEvent) => {
            e.preventDefault();
            dragState.current.isDragging = true;
            dragState.current.prevX = e.touches[0].clientX;
            dragState.current.prevY = e.touches[0].clientY;
            card.style.cursor = 'grabbing';
            card.style.transform = `translate(${dragState.current.currentX}px, ${dragState.current.currentY}px)`;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!dragState.current.isDragging) return;
            e.preventDefault();

            const dx = e.touches[0].clientX - dragState.current.prevX;
            const dy = e.touches[0].clientY - dragState.current.prevY;

            dragState.current.currentX += dx;
            dragState.current.currentY += dy;

            card.style.transform = `translate(${dragState.current.currentX}px, ${dragState.current.currentY}px)`;

            dragState.current.prevX = e.touches[0].clientX;
            dragState.current.prevY = e.touches[0].clientY;
        };

        card.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        card.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleMouseUp);

        return () => {
            card.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            card.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleMouseUp);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className={`transition-transform cursor-grab ${className}`}
            style={{ ...style, userSelect: 'none', touchAction: 'none' }}
        >
            {children}
        </div>
    );
};

export default DraggableCard;
