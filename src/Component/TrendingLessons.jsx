"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaFire, FaBookmark, FaArrowRight } from "react-icons/fa";
import Image from "next/image";

import { gettingLessons } from "@/lib/actions/lessons";

export default function TrendingLessons() {
  const [trendingLessons, setTrendingLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndSortLessons = async () => {
      try {
        const rawLessons = await gettingLessons();

        const topThreeLessons = rawLessons
          .filter((lesson) => lesson.visibility === "public")
          .sort((a, b) => (b.savesCount || 0) - (a.savesCount || 0))
          .slice(0, 3);

        setTrendingLessons(topThreeLessons);
      } catch (error) {
        console.error("Failed to load and sort lessons", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSortLessons();
  }, []);

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px] bg-base-100">
        <span className="loading loading-spinner loading-lg text-error"></span>
      </div>
    );
  }

  if (trendingLessons.length === 0) return null;

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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {trendingLessons.map((lesson, index) => (
            <motion.div
              key={lesson._id}
              variants={cardVariants}
              className="card bg-base-100 shadow-sm hover:shadow-xl border border-base-200 transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
            >
              <div
                className={`absolute top-0 right-0 text-xs font-black px-4 py-1.5 rounded-bl-xl z-10 ${
                  index === 0
                    ? "bg-warning text-warning-content"
                    : index === 1
                      ? "bg-base-300 text-base-content"
                      : "bg-amber-700 text-white"
                }`}
              >
                #{index + 1}
              </div>

              <div className="card-body p-6 flex flex-col grow pt-8">
                <div className="flex justify-between items-start mb-4">
                  <span className="badge badge-ghost badge-sm font-semibold">
                    {lesson.category || "General"}
                  </span>
                  <div className="flex items-center gap-1 text-primary font-bold text-sm bg-primary/10 px-2 py-1 rounded-md">
                    <FaBookmark /> {lesson.savesCount || 0}
                  </div>
                </div>

                <h3 className="card-title text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  <Link
                    href={`/lessons/${lesson._id}`}
                    className="before:absolute before:inset-0"
                  >
                    {lesson.title}
                  </Link>
                </h3>
                <p className="text-base-content/60 text-sm line-clamp-3 mb-6 grow">
                  {lesson.description}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-base-200 mt-auto relative z-20">
                  <div className="avatar">
                    <div className="w-8 h-8 rounded-full bg-base-300 relative overflow-hidden">
                      <Image
                        src={
                          lesson.creatorProfileImage ||
                          `https://ui-avatars.com/api/?name=${lesson.creatorName || "User"}&background=random`
                        }
                        alt={lesson.creatorName || "Author"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-base-content/80">
                    {lesson.creatorName || "Anonymous"}
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
