'use client';

import React from 'react';
import { CoreNumberResult } from '@/lib/numerology';
import { Sparkles, Compass, Shield, SunMedium, Palette, Calendar } from 'lucide-react';

interface CoreNumberCardProps {
  data: CoreNumberResult;
  accentColor?: 'gold' | 'purple' | 'cyan' | 'emerald';
}

export default function CoreNumberCard({ data, accentColor = 'gold' }: CoreNumberCardProps) {
  const colorMap = {
    gold: {
      border: 'rgba(234, 179, 8, 0.25)',
      glow: 'rgba(234, 179, 8, 0.15)',
      badgeBg: 'rgba(234, 179, 8, 0.12)',
      badgeText: '#fde047',
      numGradient: 'linear-gradient(135deg, #fef08a 0%, #eab308 50%, #ca8a04 100%)',
    },
    purple: {
      border: 'rgba(168, 85, 247, 0.25)',
      glow: 'rgba(168, 85, 247, 0.15)',
      badgeBg: 'rgba(168, 85, 247, 0.12)',
      badgeText: '#d8b4fe',
      numGradient: 'linear-gradient(135deg, #f3e8ff 0%, #c084fc 50%, #9333ea 100%)',
    },
    cyan: {
      border: 'rgba(6, 182, 212, 0.25)',
      glow: 'rgba(6, 182, 212, 0.15)',
      badgeBg: 'rgba(6, 182, 212, 0.12)',
      badgeText: '#67e8f9',
      numGradient: 'linear-gradient(135deg, #cffafe 0%, #22d3ee 50%, #0891b2 100%)',
    },
    emerald: {
      border: 'rgba(16, 185, 129, 0.25)',
      glow: 'rgba(16, 185, 129, 0.15)',
      badgeBg: 'rgba(16, 185, 129, 0.12)',
      badgeText: '#6ee7b7',
      numGradient: 'linear-gradient(135deg, #d1fae5 0%, #34d399 50%, #059669 100%)',
    },
  }[accentColor];

  return (
    <div
      className="core-number-card"
      style={{
        borderColor: colorMap.border,
        boxShadow: `0 8px 30px ${colorMap.glow}`,
      }}
    >
      <div className="card-top-row">
        <div>
          <div className="hindi-badge" style={{ color: colorMap.badgeText, background: colorMap.badgeBg }}>
            {data.hindiTitle}
          </div>
          <h3 className="card-title">{data.title}</h3>
        </div>

        <div
          className="large-number-circle"
          style={{
            background: colorMap.badgeBg,
            borderColor: colorMap.border,
          }}
        >
          <span
            className="large-number-text"
            style={{ backgroundImage: colorMap.numGradient }}
          >
            {data.number}
          </span>
        </div>
      </div>

      <div className="calculation-pill">
        <Sparkles size={13} className="text-amber-400" />
        <span>Formula: {data.calculationSteps}</span>
      </div>

      <p className="card-description">{data.description}</p>

      <div className="meta-grid">
        <div className="meta-item">
          <div className="meta-label">
            <SunMedium size={14} /> Ruling Energy
          </div>
          <div className="meta-val font-semibold">{data.rulingPlanet}</div>
        </div>

        <div className="meta-item">
          <div className="meta-label">
            <Compass size={14} /> Element
          </div>
          <div className="meta-val font-semibold">{data.element}</div>
        </div>
      </div>

      <div className="strengths-section">
        <div className="section-label">
          <Shield size={13} /> Core Strengths
        </div>
        <div className="strengths-tags">
          {data.strengths.map((s, idx) => (
            <span key={idx} className="strength-tag">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="card-footer-info">
        <div className="footer-subitem">
          <Palette size={13} />
          <span>Colors: {data.luckyColors.join(', ')}</span>
        </div>
        <div className="footer-subitem">
          <Calendar size={13} />
          <span>Days: {data.luckyDays.join(', ')}</span>
        </div>
      </div>
    </div>
  );
}
