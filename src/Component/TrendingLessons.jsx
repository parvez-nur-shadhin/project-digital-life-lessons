"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaFire, FaBookmark, FaArrowRight } from "react-icons/fa";
import Image from "next/image";

export default function TrendingLessons() {
  // FAKE DATA: Replace with backend fetch later
  // e.g., fetch('/api/lessons/trending')
  const trendingLessons = [
    {
      id: "101",
      title: "The power of saying No to good opportunities",
      author: "Sarah Connor",
      category: "Career",
      saves: 342,
      excerpt:
        "I spent 5 years saying yes to everything. I got promoted, but I lost myself. Here is how I learned to decline.",
    },
    {
      id: "102",
      title: "Finding peace after a massive failure",
      author: "Alex Smith",
      category: "Mindset",
      saves: 289,
      excerpt:
        "My startup went to zero. It took me a year to realize my self-worth wasn't tied to my net worth.",
    },
    {
      id: "103",
      title: "Why perfectionism is just masked fear",
      author: "Parvez Nur",
      category: "Personal Growth",
      saves: 215,
      excerpt:
        "Waiting for the perfect moment is the best way to ensure nothing ever happens. Start messy.",
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
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold flex items-center gap-3 text-base-content">
              <FaFire className="text-error" /> Most Saved Lessons
            </h2>
            <p className="text-base-content/60 mt-2 font-medium">
              The wisdom our community relies on the most.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link href="/lessons" className="btn btn-ghost text-primary gap-2">
              Explore All <FaArrowRight />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {trendingLessons.map((lesson) => (
            <motion.div
              key={lesson.id}
              variants={cardVariants}
              className="card bg-base-100 shadow-sm hover:shadow-xl border border-base-200 transition-all duration-300 group flex flex-col h-full"
            >
              <div className="card-body p-6 flex flex-col grow">
                {/* Meta Row */}
                <div className="flex justify-between items-start mb-4">
                  <span className="badge badge-ghost badge-sm font-semibold">
                    {lesson.category}
                  </span>
                  <div className="flex items-center gap-1 text-primary font-bold text-sm bg-primary/10 px-2 py-1 rounded-md">
                    <FaBookmark /> {lesson.saves}
                  </div>
                </div>

                {/* Content */}
                <h3 className="card-title text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  <Link href={`/lessons/${lesson.id}`}>{lesson.title}</Link>
                </h3>
                <p className="text-base-content/60 text-sm line-clamp-3 mb-6 grow">
                  {lesson.excerpt}
                </p>

                {/* Author Footer */}
                <div className="flex items-center gap-3 pt-4 border-t border-base-200 mt-auto">
                  <div className="avatar">
                    <div className="w-8 rounded-full bg-base-300">
                      <Image
                        src={`https://ui-avatars.com/api/?name=${lesson.author}&background=random`}
                        alt={lesson.author}
                        width={32}
                        height={32}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-base-content/80">
                    {lesson.author}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
