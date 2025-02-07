import { create } from 'zustand'
import { ProposalCard } from '../create-page/page'

export type cardType = 'simple' | 'elegant' | 'premium' | undefined;
export type FormData = {
    cardsType: cardType;
    proposalTitle: string;
    setProposalTitle: (value: string) => void;
    setCardsType: (value: cardType) => void;
    cards: ProposalCard[];
    setCards: (newVal: ProposalCard[]) => void;
    resetFormData: () => void;
}

export const useFormData = create<FormData>((set) => ({
    cardsType: undefined,
    proposalTitle: '',
    setProposalTitle: (newVal: string) => set({ proposalTitle: newVal }),
    setCardsType: (newVal: cardType) => set({ cardsType: newVal }),
    cards: [],
    setCards: (newVal) => set({ cards: newVal }),
    resetFormData: () => set({
        cards: [],
        cardsType: undefined,
        proposalTitle: ''
    }),
}))