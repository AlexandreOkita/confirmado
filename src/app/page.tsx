'use client';

import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";
import { StarsBackground } from "@/components/ui/stars-background";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { useRouter } from 'next/navigation'
import React from "react";

export default function Home() {
  const words = [
    {
      text: "Convide pessoas com",
      className: "text-white",
    },
    {
      text: "Simplicidade",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  const router = useRouter()

  return (
    <BackgroundLines className="flex items-center justify-center w-full h-screen flex-col px-4 font-mono bg-slate-950 text-white">
      <StarsBackground />
      <div className="flex flex-col items-center justify-center h-[40rem] relative z-20">
        <p className="text-neutral-300 dark:text-neutral-200 text-xs sm:text-base">
          Coisas simples precisam de soluções simples
        </p>
        <TypewriterEffectSmooth words={words} />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <Button
            className="w-40 h-10 rounded-xl bg-white border border-transparent text-black text-sm hover:bg-blue-500"
            onClick={() => router.push('/events/create')}
          >
            Criar evento
          </Button>
        </div>
      </div>
    </BackgroundLines>
  );
}
