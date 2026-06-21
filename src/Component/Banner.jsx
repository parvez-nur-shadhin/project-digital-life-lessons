"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowRight, FaLightbulb, FaUsers, FaBookOpen } from "react-icons/fa";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 0,
      title: "Discover Digital Life Lessons",
      subtitle:
        "Learn from the lived experiences, mistakes, and triumphs of people all around the world.",
      icon: <FaLightbulb className="text-5xl lg:text-7xl mb-4 opacity-80" />,
      buttonText: "Start Exploring",
      buttonLink: "/lessons",
      bgGradient:
        "bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800",
    },
    {
      id: 1,
      title: "Share Your Own Story",
      subtitle:
        "Your biggest mistakes and greatest realizations could be exactly what someone else needs to hear today.",
      icon: <FaBookOpen className="text-5xl lg:text-7xl mb-4 opacity-80" />,
      buttonText: "Write a Lesson",
      buttonLink: "/add-lessons",
      bgGradient: "bg-gradient-to-br from-rose-900 via-orange-800 to-red-900",
    },
    {
      id: 2,
      title: "Join a Growing Community",
      subtitle:
        "Connect with thousands of learners and creators. Save your favorites and build your personal library of wisdom.",
      icon: <FaUsers className="text-5xl lg:text-7xl mb-4 opacity-80" />,
      buttonText: "Join for Free",
      buttonLink: "/sign-up",
      bgGradient: "bg-gradient-to-br from-teal-900 via-emerald-800 to-teal-900",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Manual Navigation
  const nextSlide = () =>
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  const prevSlide = () =>
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);

  return (
    <div className="p-4 mt-5">
      <div className="relative max-w-[1600px] mx-auto w-full h-[500px] lg:h-[600px] overflow-hidden rounded-none lg:rounded-3xl shadow-2xl mb-12 group">
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className={`min-w-full h-full flex flex-col items-center justify-center text-center px-6 lg:px-24 text-white ${slide.bgGradient}`}
            >
              {/* Subtle background overlay pattern */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent mix-blend-overlay pointer-events-none"></div>

              <div className="z-10 flex flex-col items-center max-w-3xl transform transition-all duration-700 translate-y-0 opacity-100">
                {slide.icon}
                <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-6 drop-shadow-md">
                  {slide.title}
                </h1>
                <p className="text-lg lg:text-2xl text-white/80 font-medium mb-10 leading-relaxed max-w-2xl">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.buttonLink}
                  className="btn btn-lg border-none bg-white text-neutral-900 hover:bg-neutral-200 hover:scale-105 transition-transform shadow-xl font-bold rounded-full px-10 gap-3"
                >
                  {slide.buttonText} <FaArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex">
          <button
            onClick={prevSlide}
            className="btn btn-circle btn-ghost bg-black/20 hover:bg-black/40 text-white border-none backdrop-blur-sm"
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            className="btn btn-circle btn-ghost bg-black/20 hover:bg-black/40 text-white border-none backdrop-blur-sm"
          >
            ❯
          </button>
        </div>

        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === index
                  ? "w-8 h-2.5 bg-white shadow-md"
                  : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
