import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FadeIn } from "./motion/fade-in";

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    alt: "Digital marketing strategy session",
    service: "digital-marketing"
  },
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    alt: "Manufacturing analytics dashboard",
    service: "manufacturing"
  },
  {
    src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    alt: "Digital transformation technology workspace",
    service: "transformation"
  },
  {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    alt: "Customer success team meeting",
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
              <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-tight">
                Strategy.<br />
                Systems.<br />
                <span className="text-accent inline-block">
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
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                Consulting across Digital Marketing, Manufacturing Analytics, Digital Transformation, and Customer Success—rooted in outcomes.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleStartConversation}
                className="magnetic-button bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3"
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
