"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { cn, useWindowSize } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { getEventBySharebleLink } from "@/lib/repository/events.repository";
import { insertAnswer } from "@/lib/repository/answers.repository";
import Confetti from 'react-confetti'

export default function CreateEventPage({ params }: { params: { id: string } }) {
    const { width, height } = useWindowSize();

    const [loading, setLoading] = useState(true);
    const [loadingAnswer, setLoadingAnswer] = useState(false);
    const [answerProcessed, setAnswerProcessed] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [eventData, setEventData] = useState<{
        id: string;
        name: string;
        admin_link: string;
        shareble_link: string;
    } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setEventData(await getEventBySharebleLink(`/${params.id}`));
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingAnswer(true);
        try {
            await insertAnswer(name, email, eventData!.shareble_link);
        } catch (error) {
            console.error("Failed to create event:", error);
        } finally {
            setLoadingAnswer(false);
            setAnswerProcessed(true);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center w-full flex-col px-4 font-mono bg-slate-950 text-white">
                <ShootingStars />
                <StarsBackground />
            </div>
        );
    }

    return (
        <div className="flex h-screen items-center justify-center w-full flex-col px-4 font-mono bg-slate-950 text-white">
            <ShootingStars />
            <StarsBackground />
            {!answerProcessed && (<div className="relative z-20 justify-center flex-col max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    {eventData?.name}
                </h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Escreva seu nome e email para confirmar sua presença no evento!
                </p>

                <form className="my-8 text-black" onSubmit={handleSubmit}>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" placeholder="Michael Scott" type="text" onChange={(e) => setName(e.target.value)} />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="michaelscott@dunder.com" type="email" onChange={(e) => setEmail(e.target.value)} />
                    </LabelInputContainer>

                    <Button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                        disabled={loadingAnswer}
                    >
                        {loading ? "Carregando..." : "Confirmar Presença"}
                    </Button>
                </form>
            </div>)}

            {answerProcessed && (
                <div>
                    <Confetti
                        width={width}
                        height={height}
                        recycle={false}
                    />
                    <div className="relative z-20 justify-center flex-col max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                            Sua presença foi confirmada!
                        </h2>
                        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                            Obrigado por confirmar sua presença no evento, te esperamos lá!
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
