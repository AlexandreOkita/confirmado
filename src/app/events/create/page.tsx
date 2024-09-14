"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { createEvent } from "./controller";
import { ClipboardIcon } from "@radix-ui/react-icons";


export default function CreateEventPage() {
    const [eventName, setEventName] = useState("");
    const [loading, setLoading] = useState(false);
    const [eventData, setEventData] = useState<{
        adminLink: string;
        sharebleLink: string;
    } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await createEvent(eventName);
            setEventData(data);
        } catch (error) {
            console.error("Failed to create event:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center w-full flex-col px-4 font-mono bg-slate-950 text-white">
            <ShootingStars />
            <StarsBackground />
            {!eventData && (<div className="relative z-20 justify-center flex-col max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    Bem vindo!
                </h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Para criar seu evento é simples, basta preencher o nome e armazenar os links gerados posteriormente.
                </p>

                <form className="my-8 text-black" onSubmit={handleSubmit}>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="eventname">Nome do Evento</Label>
                        <Input
                            id="eventname"
                            placeholder="Corrida Naruto"
                            type="text"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                        />
                    </LabelInputContainer>
                    <Button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Carregando..." : "Criar →"}
                    </Button>
                </form>
            </div>)}

            {eventData && (
                <div className="relative z-20 justify-center flex-col max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                    <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                        Evento criado com sucesso
                    </h2>
                    <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                        Não se esqueça de salvar com carinho os seguintes links. Eles não podem ser recuperados!
                    </p>
                    <form className="my-8 text-gray-600">
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="adminlink">Link para as métricas (privado):</Label>
                            <div className="flex items-center">
                                <div className="flex-grow">
                                    <Input
                                        id="adminlink"
                                        value={window.location.origin + '/events/admin' + eventData.adminLink}
                                        readOnly
                                    />
                                </div>
                                <div className="w-1/6 flex justify-center">
                                    <CopyButton textToCopy={window.location.origin + '/events/admin' + eventData.adminLink} />
                                </div>
                            </div>
                        </LabelInputContainer>

                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="sharelink">Link para responder (público):</Label>
                            <div className="flex items-center">
                                <div className="flex-grow">
                                    <Input
                                        id="sharelink"
                                        value={window.location.origin + '/events' + eventData.sharebleLink}
                                        readOnly
                                    />
                                </div>
                                <div className="w-1/6 flex justify-center">
                                    <CopyButton textToCopy={window.location.origin + '/events' + eventData.sharebleLink} />
                                </div>
                            </div>
                        </LabelInputContainer>
                    </form>
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

const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
        } catch (error) {
            console.error("Failed to copy text:", error);
        }
    };

    return (
        <button type="button" onClick={handleCopy} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
            <ClipboardIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
    );
};