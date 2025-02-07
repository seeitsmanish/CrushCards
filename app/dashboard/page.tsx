'use client';
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Heart, Trash2, AlertCircle, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toast, ToastProvider, ToastViewport } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Alert } from "@/components/ui/alert";
import { ProposalCard } from "../create-page/page";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CopyItem from "../components/CopyItem";

export type DashboardCard = {
    id: number;
    title: string;
    cardTypeId: number;
    createdAt: string;
    uniqueSlug: string;
    views: number;
    cards: ProposalCard[];
    cardType: { id: number, name: string }
}

export default function Dashboard() {
    const [cards, setCards] = useState<DashboardCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [cardToDelete, setCardToDelete] = useState<number | null>(null);
    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch('/api/pages');
                if (!response.ok) throw new Error('Failed to load cards');
                const data = await response.json();
                setCards(data.pages);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, []);

    const handleDeleteCard = (id: number) => {
        setCardToDelete(id);
        setShowAlert(true);
    };

    const confirmDelete = async () => {
        if (cardToDelete !== null) {
            try {
                const response = await fetch(`/api/pages?pageId=${cardToDelete}`, {
                    method: 'DELETE',
                });
                if (!response.ok) throw new Error('Failed to delete card');
                setCards(cards.filter(card => card.id !== cardToDelete));
            } catch (error: any) {
                setError(error.message);
            } finally {
                setShowAlert(false);
                setCardToDelete(null);
            }
        }
    };

    const cancelDelete = () => {
        setShowAlert(false);
        setCardToDelete(null);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 flex items-center justify-center min-h-[50vh]">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="relative w-16 h-16 mx-auto mb-4">
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [1, 0.8, 1]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Heart className="w-16 h-16 text-red-500" fill="#ef4444" />
                        </motion.div>
                        <motion.div
                            className="absolute top-0 left-0"
                            animate={{
                                scale: [1, 1.5],
                                opacity: [1, 0]
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeOut"
                            }}
                        >
                            <Heart className="w-16 h-16 text-red-500" />
                        </motion.div>
                    </div>
                    <p className="text-lg font-medium bg-gradient-to-r from-red-600 to-pink-600 text-transparent bg-clip-text">
                        Loading Cards...
                    </p>
                </motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-md">
                <Alert variant="destructive" className="border-red-500/50 bg-red-500/10">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <p className="text-red-500 font-medium">Failed to load cards</p>
                    </div>
                    <Button
                        onClick={() => window.location.reload()}
                        className="w-full mt-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white"
                    >
                        Retry
                    </Button>
                </Alert>
            </div>
        );
    }

    return (
        <ToastProvider>
            <div className="container mx-auto px-4 py-4 sm:py-8">
                {/* Header Section */}
                <div className="mb-6 sm:mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-red-600 dark:from-red-400 dark:via-pink-400 dark:to-red-400 text-transparent bg-clip-text text-center sm:text-left"
                    >
                        My Proposal Cards
                    </motion.h1>
                </div>

                {/* Cards Grid */}
                <AnimatePresence>
                    {cards?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            <Link href="/select-card" className="block h-full">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-background/50 backdrop-blur-sm border border-pink-500/20 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-200 h-full flex flex-col items-center justify-center cursor-pointer group"
                                >
                                    <Plus className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 mb-3 sm:mb-4 group-hover:rotate-90 transition-transform duration-200" />
                                    <h3 className="font-semibold text-lg sm:text-xl text-foreground mb-2">Create New Card</h3>
                                    <p className="text-xs sm:text-sm text-muted-foreground text-center">Start crafting your perfect proposal</p>
                                </motion.div>
                            </Link>
                            {cards.map((card) => (
                                <motion.div
                                    onClick={() => {
                                        router.push(`/proposal?slug=${card.uniqueSlug}`)
                                    }}
                                    key={card.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-background/50 cursor-pointer backdrop-blur-sm border border-pink-500/20 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                                        <div>
                                            <h3 className="font-semibold text-lg sm:text-xl text-foreground mb-1 sm:mb-2">{card.title}</h3>
                                        </div>
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            className="flex-shrink-0"
                                        >
                                            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 animate-pulse" />
                                        </motion.div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                                        <span>Card Type: {card.cardType.name}</span>
                                        <span>•</span>
                                        <span>Views: {card.views}</span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-1 sm:gap-2 items-center">
                                            <CopyItem
                                                size="15"
                                                className="text-muted-foreground hover:text-foreground"
                                                content={`${window.location.origin}/proposal?slug=${card.uniqueSlug}`}
                                            />
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteCard(card.id)
                                                }}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-8 sm:py-16"
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.5, 1, 0.5]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="mb-4"
                            >
                                <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-red-500/50 mx-auto" />
                            </motion.div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">No Cards Yet</h3>
                            <p className="text-sm text-muted-foreground mb-4">Create your first proposal card!</p>
                            <Link href="/select-card">
                                <Button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white">
                                    Create Your First Card
                                </Button>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Delete Confirmation Dialogue */}
                {showAlert && (
                    <Dialog open={showAlert} onOpenChange={cancelDelete}>
                        <DialogContent className="max-w-[95vw]">
                            <div className="rounded-lg shadow-lg p-6">
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 text-red-500" />
                                    <p className="text-red-500 font-medium">Delete this card?</p>
                                </div>
                                <div className="flex gap-2 mt-3">
                                    <Button onClick={confirmDelete} className="bg-red-600 text-white">Yes</Button>
                                    <Button onClick={cancelDelete} className="bg-gray-300 text-black">No</Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
                <ToastViewport />
            </div>
        </ToastProvider>
    );
}