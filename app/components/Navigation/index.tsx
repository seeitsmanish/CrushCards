import React from "react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { headers } from "next/headers";
import { SignInButton, UserButton } from "@clerk/nextjs";

export async function Navigation() {
    const { userId } = await auth();
    const pathname = headers().get("next-url") || "";
    const isProposalPage = pathname.startsWith("/proposal");

    if (isProposalPage) {
        return null;
    }

    return (
        <nav className="bg-background/50 backdrop-blur-sm border-b border-pink-500/20 relative w-full z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center space-x-2">
                        <Heart className="w-8 h-8 text-red-500 animate-pulse" />
                        <span className="text-xl hidden md:block font-bold bg-gradient-to-r from-red-600 to-pink-600 text-transparent bg-clip-text">
                            CrushCards
                        </span>
                    </Link>

                    <div className="flex items-center gap-4">
                        {userId ? (
                            <>
                                <Link href="/dashboard">
                                    <Button variant="ghost" className="text-red-500 hover:text-red-600">
                                        My Cards
                                    </Button>
                                </Link>
                                {/* Client-side UserButton needs a wrapper */}
                                <UserButton
                                    afterSignOutUrl="/"
                                    appearance={{
                                        elements: {
                                            avatarBox: "w-10 h-10 rounded-full border-2 border-red-500",
                                            card: "bg-background",
                                            headerTitle: "text-foreground",
                                            headerSubtitle: "text-muted-foreground",
                                            profileSectionPrimaryButton: "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white",
                                            profileSectionSecondaryButton: "text-red-500 hover:text-red-600"
                                        }
                                    }}
                                />
                            </>
                        ) : (
                            <SignInButton mode="modal">
                                <Button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white">
                                    <Heart className="w-4 h-4 mr-2" />
                                    Sign In
                                </Button>
                            </SignInButton>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}