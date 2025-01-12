"use client";
import CheckIcon from "@/assets/check.svg";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import MasterProg from "@/assets/master_prog.png";
import IntermediateProg from "@/assets/intermediate_prog.png";
import NoviceProg from "@/assets/novice_prog.jpg";
import Image from "next/image";
import { Ms_Madi } from "next/font/google";

const pricingTiers = [
  {
    title: "Novice",
    daysAmount: 5,
    popular: false,
    inverse: false,
    image: NoviceProg,
    features: [
      "Up to 5 project members",
      "Unlimited tasks and projects",
      "2GB storage",
      "Integrations",
      "Basic support",
    ],
  },
  {
    title: "Intermediate",
    daysAmount: 15,
    popular: false,
    inverse: false,
    image: IntermediateProg,
    features: [
      "Up to 50 project members",
      "Unlimited tasks and projects",
      "50GB storage",
      "Integrations",
      "Priority support",
      "Advanced support",
      "Export support",
    ],
  },
  {
    title: "Expert",
    daysAmount: 30,
    popular: false,
    inverse: false,
    image: MasterProg,
    features: [
      "Up to 5 project members",
      "Unlimited tasks and projects",
      "200GB storage",
      "Integrations",
      "Dedicated account manager",
      "Custom fields",
      "Advanced analytics",
      "Export capabilities",
      "API access",
      "Advanced security features",
    ],
  },
];

export const Pricing = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title">Level Up</h2>
          <p className="section-des mt-5"></p>
        </div>

        <div className="flex flex-col gap-6 items-center mt-10 lg:flex-row lg:items-end lg:justify-center">
          {pricingTiers.map(({ title, daysAmount, image }) => (
            <div
              key={title}
              className="p-10 rounded-3xl border border-[#F1F1F1] shadow-[0_7px_14px_#EAEAEA] max-w-xs w-full"
            >
              {/* Title */}
              <div className="flex justify-between">
                <h3 className="text-lg font-bold text-black/50">{title}</h3>
              </div>

              {/* Number of Days */}
              <div className="flex items-baseline gap-1 mt-[30px]">
                <span className="text-4xl font-bold tracking-tighter leading-none">{daysAmount}</span>
                <span className="tracking-tight font-bold text-black/50"> days</span>
              </div>

              {/* Box-Specific Image */}
              <div className="flex justify-center mt-6">
                <Image
                  src={image}
                  alt={`${title} icon`}
                  className="h-24 w-24"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};