// home/page.tsx

import { AnimatedContent } from "./home/clientAnimation";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-red-50 to-pink-100 dark:from-pink-950 dark:via-red-900 dark:to-pink-900 relative overflow-hidden">
      {/* Decorative elements */}
      {/* <CrushCardsNav /> */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-gradient-to-br from-pink-200/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-red-200/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto py-4 px-4 sm:px-4 sm:py-20 flex flex-col items-center justify-center min-h-screen text-center relative z-10">
        <AnimatedContent />
      </div>
    </main>
  );
}
