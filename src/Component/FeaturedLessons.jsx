"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";

export default function FeaturedLessons() {
  // FAKE DATA: Replace with backend fetch later
  // e.g., fetch('/api/lessons/featured') -> Lessons where { isFeatured: true }
  const featuredLessons = [
    {
      id: "201",
      title: "The subtle art of outgrowing your old dreams",
      author: "Elena Rodriguez",
      category: "Personal Growth",
      excerpt:
        "I spent my 20s chasing a title that made me miserable in my 30s. Here is how I learned to grieve a dream that no longer fit who I became.",
      readTime: "5 min read",
    },
    {
      id: "202",
      title: "How I rebuilt trust after breaking it completely",
      author: "Marcus Chen",
      category: "Relationships",
      excerpt:
        "Apologies are just words. Rebuilding trust takes a framework, brutal honesty, and time. This is the exact process that saved my marriage.",
      readTime: "8 min read",
    },
    {
      id: "203",
      title: "You are not an impostor, you are just a beginner",
      author: "Aisha Khan",
      category: "Career",
      excerpt:
        "We constantly confuse the discomfort of learning with the fear of being exposed as a fraud. Here is how to reframe that anxiety.",
      readTime: "4 min read",
    },
  ];

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  return (
    <section className="py-20 bg-primary/5 border-y border-primary/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm uppercase tracking-widest mb-6 border border-primary/20"
          >
            <FaStar className="text-warning" /> Editor's Choice
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-base-content tracking-tight mb-4"
          >
            Featured Life Lessons
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-base-content/60 font-medium"
          >
            Hand-picked stories and insights that left a profound impact on our
            moderation team this week.
          </motion.p>
        </div>

        {/* Featured Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {featuredLessons.map((lesson) => (
            <motion.div
              key={lesson.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="card bg-base-100 shadow-xl shadow-primary/5 border-t-4 border-t-primary transition-all duration-300 relative group flex flex-col h-full"
            >
              {/* Quote Icon watermark */}
              <div className="absolute top-6 right-6 text-base-200/50 text-6xl pointer-events-none group-hover:text-primary/10 transition-colors duration-500">
                <FaQuoteLeft />
              </div>

              <div className="card-body p-8 flex flex-col grow z-10">
                <div className="flex justify-between items-center mb-6">
                  <span className="badge badge-primary badge-outline font-bold">
                    {lesson.category}
                  </span>
                  <span className="text-xs font-bold text-base-content/40 uppercase tracking-wider">
                    {lesson.readTime}
                  </span>
                </div>

                <h3 className="card-title text-2xl font-bold mb-4 leading-tight group-hover:text-primary transition-colors">
                  <Link
                    href={`/lessons/${lesson.id}`}
                    className="before:absolute before:inset-0"
                  >
                    {lesson.title}
                  </Link>
                </h3>

                <p className="text-base-content/70 leading-relaxed mb-8 grow line-clamp-4">
                  "{lesson.excerpt}"
                </p>

                {/* Author Info */}
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-base-200">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 rounded-full ring-2 ring-primary/20">
                        <Image
                          src={`https://ui-avatars.com/api/?name=${lesson.author}&background=random`}
                          alt={lesson.author}
                          width={40}
                          height={40}
                        />
                      </div>
                    </div>
                    <span className="font-bold text-sm text-base-content">
                      {lesson.author}
                    </span>
                  </div>

                  {/* Subtle Arrow that moves on hover */}
                  <div className="text-primary transform group-hover:translate-x-2 transition-transform duration-300">
                    <FaArrowRight />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
