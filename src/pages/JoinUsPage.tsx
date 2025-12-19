import React from 'react';
import { JoinUs } from '../components/JoinUs';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
export function JoinUsPage() {
  return <div className="min-h-screen bg-brand-white flex flex-col">
      <Navbar />
      <div className="pt-20 flex-1 flex items-center justify-center">
        <JoinUs />
      </div>
      <Footer />
    </div>;
}