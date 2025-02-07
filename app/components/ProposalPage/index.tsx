'use client';
import React, { useEffect, useRef } from 'react';
import SimpleCard, { SimpleBackground } from '../SimpleCard';
import ElegantCard, { ElegantBackground } from '../ElegantCard';
import PremiumCard, { PremiumBackground } from '../PremiumCard';
import { cn } from '@/lib/utils';
import { cardType } from '../../store/useFormData';
import { Sparkles } from 'lucide-react';

type ProposalCard = {
    imageUrl?: string;
    description?: string;
    className?: string;
}

let topZIndex = 1;


const getCardComponent = (type: cardType) => {
    switch (type) {
        case 'simple': return SimpleCard;
        case 'elegant': return ElegantCard;
        case 'premium': return PremiumCard;
        default: return SimpleCard;
    }
};

const getBackgroundComponent = (type: cardType) => {
    switch (type) {
        case 'simple': return SimpleBackground;
        case 'elegant': return ElegantBackground;
        case 'premium': return PremiumBackground;
        default: return SimpleBackground;
    }
}

const DragToSee = () => {
    return (<div className="absolute bottom-3 text-white flex flex-col justify-center items-center">
        <span>Drag to see more cards!</span>
        <Sparkles className="text-yellow-300" size={24} />
    </div>)
}
// const ProposalPage: React.FC<{ cards: ProposalCard[]; cardType: CardType }> = ({ cards, cardType }) => {
const ProposalPage = ({ cards, cardType }: { cards: ProposalCard[], cardType: cardType }) => {
    const CardComponent = getCardComponent(cardType);
    console.log(cardType);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const dragStates = useRef(cards.map(() => ({
        isDragging: false,
        prevX: 0,
        prevY: 0,
        currentX: 0,
        currentY: 0,
        rotation: Math.random() * 6 - 3, // Random rotation between -3 and 3 degrees
        zIndex: 1
    })));

    useEffect(() => {
        cardsRef.current.forEach((card, index) => {
            if (!card) return;

            // Apply initial position and rotation
            card.style.transform = `rotate(${dragStates.current[index].rotation}deg)`;

            const handleMouseDown = (e: MouseEvent) => {
                const state = dragStates.current[index];
                state.isDragging = true;
                state.prevX = e.clientX;
                state.prevY = e.clientY;
                state.zIndex = ++topZIndex;
                card.style.zIndex = `${state.zIndex}`;
                card.style.cursor = 'grabbing';
                card.style.transform = `translate(${state.currentX}px, ${state.currentY}px)`;
            };

            const handleMouseMove = (e: MouseEvent) => {
                const state = dragStates.current[index];
                if (!state.isDragging) return;

                const dx = e.clientX - state.prevX;
                const dy = e.clientY - state.prevY;

                state.currentX += dx;
                state.currentY += dy;
                card.style.transform = `translate(${state.currentX}px, ${state.currentY}px)`;

                state.prevX = e.clientX;
                state.prevY = e.clientY;
            };

            const handleMouseUp = () => {
                const state = dragStates.current[index];
                if (!state.isDragging) return;
                state.isDragging = false;
                card.style.cursor = 'grab';
            };

            const handleTouchStart = (e: TouchEvent) => {
                e.preventDefault();
                const state = dragStates.current[index];
                state.isDragging = true;
                state.prevX = e.touches[0].clientX;
                state.prevY = e.touches[0].clientY;
                state.zIndex = ++topZIndex;
                card.style.zIndex = `${state.zIndex}`;
                card.style.cursor = 'grabbing';
                card.style.transform = `translate(${state.currentX}px, ${state.currentY}px)`;
            };

            const handleTouchMove = (e: TouchEvent) => {
                const state = dragStates.current[index];
                if (!state.isDragging) return;
                e.preventDefault();

                const dx = e.touches[0].clientX - state.prevX;
                const dy = e.touches[0].clientY - state.prevY;

                state.currentX += dx;
                state.currentY += dy;
                card.style.transform = `translate(${state.currentX}px, ${state.currentY}px)`;

                state.prevX = e.touches[0].clientX;
                state.prevY = e.touches[0].clientY;
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
        });
    }, []);

    const Background = getBackgroundComponent(cardType);

    return (
        <div className={cn('h-[100dvh] overflow-hidden flex justify-center items-center relative')}>
            <Background />
            {cards.map((card, index) => (
                <div
                    key={index}
                    ref={el => cardsRef.current[index] = el}
                    className="absolute cursor-grab transition-transform max-w-[80vw]"
                    style={{
                        userSelect: 'none',
                        touchAction: 'none',
                    }}
                >
                    <CardComponent
                        imageUrl={card.imageUrl}
                        description={card.description}
                        className={card?.className}
                    />
                </div>
            ))}
            <DragToSee />
        </div>
    );

};

export default ProposalPage;


