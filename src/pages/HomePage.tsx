import React from 'react';
import { Hero } from '../components/Hero';
import { Navbar } from '../components/Navbar';
export function HomePage() {
  return <main className="min-h-screen w-full bg-[#f5f5f5] selection:bg-[#e63946] selection:text-white flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Hero />
      </div>
    </main>;
}