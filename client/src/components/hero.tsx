import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FadeIn } from "./motion/fade-in";

const heroImages = [
  {
    src: "images/IMG1.webp",
    alt: "Meet Varun - Digital Marketing Strategy",
    service: "digital-marketing"
  },
  {
    src: "images/IMG3.webp",
    alt: "Meet Varun - Manufacturing Floor",
    service: "manufacturing"
  },
  {
    src: "images/IMG2.webp",
    alt: "Meet Varun - Informal Coffee",
    service: "transformation"
  },
  {
    src: "images/IMG4.webp",
    alt: "Meet Varun - Customer success",
    service: "customer-success"
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

  const handleStartConversation = () => {
    window.location.href = '/contact';
  };

  

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
                Consulting across <span className="font-semibold text-foreground">Digital Marketing</span>, <span className="font-semibold text-foreground">Manufacturing Analytics</span>, <span className="font-semibold text-foreground">Digital Transformation</span>, and <span className="font-semibold text-foreground">Customer Success</span>—<span className="text-emphasis">rooted in outcomes</span>.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-6 mt-8">
              <Button
                onClick={handleStartConversation}
                size="lg"
                className="magnetic-button bg-accent hover:bg-accent/90 text-accent-foreground px-12 py-4 text-lg font-semibold rounded-xl"
                data-testid="button-start-conversation"
              >
                Start a Conversation
              </Button>
            </div>
          </FadeIn>
        </div>

        {/* Rotating Service Images */}
        <FadeIn delay={0.4} className="relative h-96 lg:h-[500px]">
          <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={heroImages[currentImageIndex].src}
                alt={heroImages[currentImageIndex].alt}
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                data-testid={`hero-image-${heroImages[currentImageIndex].service}`}
              />
            </AnimatePresence>

            {/* Service indicators */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleIndicatorClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-accent' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  data-testid={`image-indicator-${index}`}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
