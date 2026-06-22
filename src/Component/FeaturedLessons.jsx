"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import { gettingLessons } from "@/lib/actions/lessons";

export default function FeaturedLessons() {
  const [AllLessons, setAllLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await gettingLessons();
        setAllLessons(data);
      } catch (error) {
        console.error("Failed to load featured lessons", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeatured();
  }, []);

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

  const lessons = AllLessons.filter((lesson) => lesson.isFeatured === true);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-100 bg-primary/5">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (lessons.length === 0) return null;

  return (
    <section className="py-20 bg-primary/5 border-y border-primary/10">
      <div className="max-w-7xl mx-auto px-6">
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {lessons.map((lesson) => {
            const wordCount = lesson.description
              ? lesson.description.split(" ").length
              : 0;
            const readTime =
              Math.max(1, Math.ceil(wordCount / 200)) + " min read";

            return (
              <motion.div
                key={lesson._id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="card bg-base-100 shadow-xl shadow-primary/5 border-t-4 border-t-primary transition-all duration-300 relative group flex flex-col h-full"
              >
                <div className="absolute top-6 right-6 text-base-200/50 text-6xl pointer-events-none group-hover:text-primary/10 transition-colors duration-500">
                  <FaQuoteLeft />
                </div>

                <div className="card-body p-8 flex flex-col grow z-10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="badge badge-primary badge-outline font-bold">
                      {lesson.category}
                    </span>
                    <span className="text-xs font-bold text-base-content/40 uppercase tracking-wider">
                      {readTime}
                    </span>
                  </div>

                  <h3 className="card-title text-2xl font-bold mb-4 leading-tight group-hover:text-primary transition-colors">
                    <Link
                      href={`/lessons/${lesson._id}`}
                      className="before:absolute before:inset-0"
                    >
                      {lesson.title}
                    </Link>
                  </h3>

                  <p className="text-base-content/70 leading-relaxed mb-8 grow line-clamp-4">
                    "{lesson.description}"
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-base-200">
                    <div className="flex items-center gap-3 relative z-20">
                      <div className="avatar">
                        <div className="w-10 h-10 rounded-full ring-2 ring-primary/20 overflow-hidden relative">
                          <Image
                            src={
                              lesson.creatorProfileImage ||
                              `https://ui-avatars.com/api/?name=${lesson.creatorName}&background=random`
                            }
                            alt={lesson.creatorName}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <span className="font-bold text-sm text-base-content">
                        {lesson.creatorName}
                      </span>
                    </div>

                    <div className="text-primary transform group-hover:translate-x-2 transition-transform duration-300">
                      <FaArrowRight />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
