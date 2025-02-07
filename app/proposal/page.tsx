'use client';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import ProposalPage from '../components/ProposalPage';
import { useRouter } from 'next/navigation';
import { cardType } from '../store/useFormData';

const page = () => {
    const searchParams = useSearchParams();
    const slug = searchParams.get('slug'); // Get the value of 'slug' from the query
    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState([]);
    const [cardType, setCardType] = useState<cardType>();
    const router = useRouter();
    useEffect(() => {
        // Fetch the page with the provided slug
        // Replace 'https://your-api-url.com' with your actual API endpoint
        fetch(`/api/page?unique_slug=${slug}`)
            .then(response => response.json())
            .then(data => {
                // Update the page state with the fetched data
                setCards(data.page.cards?.reverse());
                setCardType(data.page.cardType.name.toLowerCase());
            })
            .catch(error => {
                // Handle error if the fetch fails
                console.error(error);
                router.push('/');
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])


    if (!slug) {
        router.push('/');
    }

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

    return (
        <ProposalPage
            cards={cards}
            cardType={cardType}
        />
    )
};

export default page;
