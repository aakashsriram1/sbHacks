"use client";
import ArrowRight from "@/assets/arrow-right.svg";
import starImage from "@/assets/star.png";
import springImage from "@/assets/spring.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const CallToAction = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section ref={sectionRef} className="bg-gradient-to-b from-white to-[#D2DCFF] py-24 overflow-x-clip">
      <div className="container">
        <div className="section-heading relative">
          <h2 className="section-title">Lock in now with LockedIn AI.</h2>
          <p className="section-des mt-5">
            Utilize top-engineered AI capabilities to revolutionize your workflow. Sign 
            up today and join countless others in their journey to success!
          </p>
        </div>

        <div className="flex gap-2 mt-10 justify-center">
        </div>
      </div>
    </section>
  );
};
