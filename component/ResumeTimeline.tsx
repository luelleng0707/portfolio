// Scroll-triggered vertical timeline animation with Next.js + Tailwind + Framer Motion
// Inspired by https://www.youtube.com/watch?v=t5AE66WgQD0, adapted for your resume timeline

'use client';
import ResumeTimeline from "@/components/ResumeTimeline";
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollTimeline() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={container} className="relative h-[300vh] bg-white">
      {/* Timeline vertical bar */}
      <div className="fixed left-1/2 top-0 h-screen flex justify-center">
        <motion.div
          style={{ scaleY }}
          className="w-1 origin-top bg-teal-500"
        />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 space-y-[100vh] flex flex-col items-center">
        <YearCircle year="2019" />
        <YearCircle year="2020" />
        <YearCircle year="2021" />
        <YearCircle year="2022" />
        <YearCircle year="2023" />
        <YearCircle year="2024" />
        {/* 2025 stop point with partial line */}
        <YearCircle year="2025" stop />
      </div>
    </div>
  );
}

function YearCircle({ year, stop }) {
  return (
    <div className="relative flex flex-col items-center">
      <div
        className={`rounded-full border-4 ${stop ? 'border-red-500' : 'border-teal-500'} w-24 h-24 flex items-center justify-center text-xl font-bold text-gray-700 bg-white shadow-lg`}
      >
        {year}
      </div>
    </div>
  );
}