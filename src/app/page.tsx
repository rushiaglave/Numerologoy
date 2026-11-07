'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import InputHero from '@/components/InputHero';
import ReportView from '@/components/ReportView';
import { generateNumerologyReport, NumerologyReportData } from '@/lib/numerology';
import { Sparkles, Compass } from 'lucide-react';

export default function Home() {
  const [report, setReport] = useState<NumerologyReportData | null>(null);

  const handleGenerate = (name: string, dob: string, gender: 'male' | 'female' | 'other') => {
    const generated = generateNumerologyReport(name, dob, gender);
    setReport(generated);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setReport(null);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="app-wrapper">
      <Navbar onNewReading={handleReset} hasReport={Boolean(report)} />

      <main className="main-content">
        {!report ? (
          <InputHero onGenerate={handleGenerate} />
        ) : (
          <ReportView report={report} onReset={handleReset} />
        )}
      </main>

      <footer className="footer-bar">
        <div className="footer-inner">
          <div className="footer-brand">
            <Compass size={18} className="text-amber-400" />
            <span>Aura Numerology Portal • Vedic & Lo Shu Computational Engine</span>
          </div>
          {/* <div className="footer-note">
            Ready to integrate custom calculation logic on demand.
          </div> */}
        </div>
      </footer>
    </div>
  );
}
