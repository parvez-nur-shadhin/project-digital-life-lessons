"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaHandsHelping, FaHistory, FaHeartbeat } from "react-icons/fa";

export default function Benefits() {
  // The 4 Core Benefits
  const benefits = [
    {
      id: 1,
      title: "Personal Growth",
      description:
        "Writing down your lessons forces you to process your experiences, turning raw pain or joy into crystallized wisdom.",
      icon: <FaLeaf />,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      id: 2,
      title: "Guide Others",
      description:
        "A mistake you survived could be the exact roadmap someone else needs right now to navigate their own dark times.",
      icon: <FaHandsHelping />,
      color: "text-info",
      bg: "bg-info/10",
    },
    {
      id: 3,
      title: "Build Your Legacy",
      description:
        "Leave behind more than just photos. Build a digital library of your mind, your values, and the truths you've discovered.",
      icon: <FaHistory />,
      color: "text-warning",
      bg: "bg-warning/10",
    },
    {
      id: 4,
      title: "Radical Empathy",
      description:
        "Reading the vulnerable truths of strangers reminds us that despite our different lives, we are never truly alone.",
      icon: <FaHeartbeat />,
      color: "text-error",
      bg: "bg-error/10",
    },
  ];

  // Framer Motion Variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delays each card by 0.2s for a waterfall effect
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  return (
    <section className="py-20 bg-base-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black text-base-content tracking-tight mb-4">
            Why Preserving Wisdom Matters
          </h2>
          <p className="text-lg text-base-content/60 font-medium">
            We document our vacations, our meals, and our milestones. But what
            about the lessons that actually shape who we become?
          </p>
        </motion.div>

        {/* The 4 Benefit Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="card bg-base-200 border border-base-300 shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <div className="card-body items-center text-center p-8">
                {/* Icon Container */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 ${benefit.bg} ${benefit.color}`}
                >
                  {benefit.icon}
                </div>

                {/* Text Content */}
                <h3 className="card-title text-xl font-bold text-base-content mb-3">
                  {benefit.title}
                </h3>
                <p className="text-base-content/70 leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
