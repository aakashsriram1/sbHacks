"use client";
import ArrowIcon from "@/assets/arrow-right.svg";
import fireImage from "@/assets/fire.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import React from "react";

export const Hero = () => {
  const heroRef = useRef(null); // Reference for the hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  const handleLearnMoreClick = () => {
    window.scrollTo({
      top: document.body.scrollHeight, // Scrolls to the very bottom of the page
      behavior: "smooth", // Smooth scrolling effect
    });
  };

  return (
    <section
      ref={heroRef}
      className="pt-8 pb-20 md:pt-5 md:pb-10 overflow-x-clip bg-gradient-to-b from-[#D2DCFF] to-white"
    >
      <div className="container">
        <div className="md:flex items-center">
          <div className="md:w-[478px]">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6">
              Spearheading your success
            </h1>
            <p className="text-xl text-[#010D3E] tracking-tight mt-6">
              Enjoy the bliss of accomplishment with the first app designed to hold you accountable, track your progress, 
              and celebrate your wins.
            </p>
            <div className="flex gap-1 items-center mt-[30px]">
              <button className="btn btn-primary" onClick={handleLearnMoreClick}>
                Learn More
              </button>
            </div>
          </div>
          <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
            <motion.img
              src={fireImage.src}
              alt="Fire"
              className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0"
              animate={{
                translateY: [-30, 30],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 3,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
