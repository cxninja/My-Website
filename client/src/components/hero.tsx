import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FadeIn } from "./motion/fade-in";
import { Link } from "wouter";

const heroImages = [
  {
    src: "/images/varun.webp",
    alt: "Varun Goel",
    service: "varun"
  }
];

const rotatingWords = ["Scale.", "Grow.", "Excel.", "Succeed.", "Transform."];

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);

    return () => clearInterval(wordInterval);
  }, []);

  const handleIndicatorClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Removed handleStartConversation - using Link component now

  

  return (
    <section id="home" className="hero-bg flex items-center pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Hero Content */}
        <div className="space-y-8">
          <FadeIn>
            <div className="space-y-4">
              <h1 className="heading-xl">
                <span className="text-[#121212]">Strategy.</span><br />
                <span className="text-[#121212]">Systems.</span><br />
                <span className="text-accent inline-block relative">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentWordIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="inline-block"
                    >
                      {rotatingWords[currentWordIndex]}
                    </motion.span>
                  </AnimatePresence>
                  <div className="absolute -bottom-2 left-0 w-full h-1 rounded-full" style={{background: 'linear-gradient(to right, hsl(var(--accent)), hsl(var(--accent) / 0.5))'}}></div>
                </span>
              </h1>
              <p className="text-large text-muted-foreground max-w-xl leading-relaxed">
                I'm <span className="font-semibold text-foreground">Varun Goel</span>. Across 19+ years in diverse industries I've led transformations, from startup sprints to enterprise overhauls, using street-smart tactics and AI to deliver outsized wins. <span className="text-emphasis">Practical insights for real results</span>.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-6 mt-8">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="magnetic-button bg-accent hover:bg-accent/90 text-accent-foreground px-12 py-4 text-lg font-semibold rounded-xl"
                  data-testid="button-start-conversation"
                >
                  Start a Conversation
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Portrait */}
        <FadeIn delay={0.4} className="relative h-96 lg:h-[560px] group">
          {/* Soft circular backdrop so the cutout has visual ground */}
          <div
            className="absolute inset-x-0 bottom-0 w-[85%] aspect-square mx-auto rounded-full bg-gradient-to-br from-accent/20 via-accent/5 to-transparent blur-2xl"
            aria-hidden="true"
          />
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[78%] aspect-square rounded-full bg-gradient-to-br from-accent/10 to-transparent"
            aria-hidden="true"
          />
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={heroImages[currentImageIndex].src}
              alt={heroImages[currentImageIndex].alt}
              className="relative z-10 w-full h-full object-contain object-bottom filter grayscale group-hover:grayscale-0 transition-all duration-500 drop-shadow-2xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              data-testid={`hero-image-${heroImages[currentImageIndex].service}`}
            />
          </AnimatePresence>
        </FadeIn>
      </div>
    </section>
  );
}
