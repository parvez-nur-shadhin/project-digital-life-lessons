"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaMedal, FaPenNib } from "react-icons/fa";

export default function TopContributors() {
  // FAKE DATA: Replace with backend fetch later
  // e.g., fetch('/api/users/top-contributors')
  const contributors = [
    {
      id: 1,
      name: "Sarah Connor",
      role: "Mindset Coach",
      lessons: 12,
      image: "",
    },
    { id: 2, name: "Alex Smith", role: "Entrepreneur", lessons: 9, image: "" },
    { id: 3, name: "Parvez Nur", role: "Developer", lessons: 7, image: "" },
    { id: 4, name: "Emma Watson", role: "Designer", lessons: 5, image: "" },
  ];

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <section className="py-16 bg-base-200/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold flex items-center gap-3 text-base-content">
              <FaMedal className="text-warning" /> Top Contributors
            </h2>
            <p className="text-base-content/60 mt-2 font-medium">
              The voices shaping our community this week.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {contributors.map((user, index) => (
            <motion.div
              key={user.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="card bg-base-100 shadow-sm border border-base-200 relative overflow-hidden"
            >
              {/* Rank Badge */}
              <div className="absolute top-0 right-0 bg-primary text-primary-content font-black text-xs px-3 py-1 rounded-bl-xl z-10">
                #{index + 1}
              </div>

              <div className="card-body items-center text-center pt-8 p-6">
                <div className="avatar mb-3">
                  <div className="w-20 rounded-full ring ring-primary/20 ring-offset-base-100 ring-offset-2">
                    <img
                      src={
                        user.image ||
                        `https://ui-avatars.com/api/?name=${user.name}&background=random&size=150`
                      }
                      alt={user.name}
                    />
                  </div>
                </div>
                <h3 className="card-title text-lg mb-0">{user.name}</h3>
                <p className="text-xs text-base-content/50 font-semibold uppercase tracking-wider mb-4">
                  {user.role}
                </p>
                <div className="badge badge-primary badge-outline gap-2 font-bold py-3 px-4">
                  <FaPenNib /> {user.lessons} Lessons
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
