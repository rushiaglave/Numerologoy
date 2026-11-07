'use client';

import React, { useState } from 'react';
import { LoShuCell, LoShuPlane } from '@/lib/numerology';
import { Grid, Sparkles, CheckCircle2, AlertCircle, HelpCircle, Eye, Flame, Compass } from 'lucide-react';

interface LoShuGridCardProps {
  cells: Record<number, LoShuCell>;
  planes: LoShuPlane[];
  allBirthDigits: number[];
}

export default function LoShuGridCard({ cells, planes, allBirthDigits }: LoShuGridCardProps) {
  // Canonical 3x3 grid layout row by row
  // Row 1: 4, 9, 2
  // Row 2: 3, 5, 7
  // Row 3: 8, 1, 6
  const gridMatrix = [
    [4, 9, 2],
    [3, 5, 7],
    [8, 1, 6],
  ];

  const [activeCellNumber, setActiveCellNumber] = useState<number>(5);
  const [activeTab, setActiveTab] = useState<'all' | 'horizontal' | 'vertical' | 'diagonal'>('all');

  const selectedCell = cells[activeCellNumber] || cells[5];

  const filteredPlanes = planes.filter((plane) => {
    if (activeTab === 'all') return true;
    return plane.type === activeTab;
  });

  return (
    <div className="loshu-section-container">
      <div className="section-header-row">
        <div>
          <div className="section-eyebrow">
            <Grid size={14} /> Ancient Vedic & Chinese Magic Square
          </div>
          <h2 className="section-title">Lo Shu Grid Analysis (लो-शू चक्र)</h2>
          <p className="section-subtitle">
            The 3x3 celestial matrix maps the vibration of your birth chart numbers into Mental,
            Emotional, and Practical Planes.
          </p>
        </div>

        <div className="digits-pill">
          <span>Active Chart Digits:</span>
          <div className="digits-list">
            {allBirthDigits.map((d, i) => (
              <span key={i} className="digit-bubble">
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="loshu-main-layout">
        {/* The 3x3 Magic Square */}
        <div className="grid-square-wrapper">
          <div className="matrix-headings">
            <span className="matrix-col-label">Thought</span>
            <span className="matrix-col-label">Will</span>
            <span className="matrix-col-label">Action</span>
          </div>

          <div className="loshu-grid-matrix">
            {gridMatrix.map((row, rowIdx) => (
              <div key={rowIdx} className="grid-row">
                <span className="matrix-row-label">
                  {rowIdx === 0 ? 'Mental' : rowIdx === 1 ? 'Heart' : 'Practical'}
                </span>

                {row.map((cellNum) => {
                  const cell = cells[cellNum];
                  const isPresent = cell && cell.count > 0;
                  const isSelected = activeCellNumber === cellNum;

                  return (
                    <button
                      key={cellNum}
                      type="button"
                      onClick={() => setActiveCellNumber(cellNum)}
                      className={`loshu-cell-btn ${isPresent ? 'cell-active' : 'cell-empty'} ${
                        isSelected ? 'cell-selected' : ''
                      }`}
                      aria-label={`Position ${cellNum}`}
                    >
                      <div className="cell-top-index">{cellNum}</div>
                      
                      <div className="cell-content">
                        {isPresent ? (
                          <div className="present-numbers">
                            {cell.presentDigits.map((d, idx) => (
                              <span key={idx} className="glowing-digit">
                                {d}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div className="missing-marker">-</div>
                        )}
                      </div>

                      <div className="cell-footer-label">
                        {isPresent ? (
                          <span className="freq-badge">{cell.count}x present</span>
                        ) : (
                          <span className="missing-badge">Missing</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="grid-interactive-hint">
            <HelpCircle size={14} /> Click any cell in the grid to inspect its deeper planetary meaning
          </div>
        </div>

        {/* Selected Cell Deep Dive Inspector */}
        <div className="cell-inspector-card">
          <div className="inspector-header">
            <div className="inspector-num-badge">
              <span>Position {selectedCell.positionNumber}</span>
            </div>
            <div className="inspector-status">
              {selectedCell.count > 0 ? (
                <span className="status-badge-green">
                  <CheckCircle2 size={13} /> Present ({selectedCell.count} time{selectedCell.count > 1 ? 's' : ''})
                </span>
              ) : (
                <span className="status-badge-neutral">
                  <AlertCircle size={13} /> Missing in Chart
                </span>
              )}
            </div>
          </div>

          <h3 className="inspector-title">{selectedCell.label}</h3>

          <div className="inspector-plane-tag">
            <Compass size={13} /> Plane: <strong>{selectedCell.plane}</strong>
          </div>

          <div className="inspector-element-tag">
            <Flame size={13} /> Element & Direction: <strong>{selectedCell.element}</strong>
          </div>

          <div className="inspector-desc-box">
            <div className="inspector-desc-title">Core Significance:</div>
            <p className="inspector-desc-text">{selectedCell.significance}</p>
          </div>

          <div className="inspector-interpretation">
            <div className="inspector-desc-title">Chart Influence:</div>
            <p className="inspector-desc-text">
              {selectedCell.count > 0 ? (
                <>
                  Having <strong>Number {selectedCell.positionNumber}</strong> appearing{' '}
                  <strong>{selectedCell.count} time{selectedCell.count > 1 ? 's' : ''}</strong>{' '}
                  amplifies positive energetic flow across the {selectedCell.plane}. It provides natural
                  strengths in {selectedCell.significance.toLowerCase()}.
                </>
              ) : (
                <>
                  Number {selectedCell.positionNumber} is currently missing in your basic chart. This suggests
                  an area of growth or life balance to consciously cultivate and harmonize through favorable
                  lifestyle choices, colors, or spiritual alignment.
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Planes of Lo Shu Grid */}
      <div className="planes-section">
        <div className="planes-header-bar">
          <div>
            <h3 className="planes-heading">Planes & Raj Yog Analysis</h3>
            <p className="planes-sub">Horizontal, Vertical, and Diagonal alignments formed by your chart</p>
          </div>

          <div className="plane-filter-tabs">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`filter-tab-btn ${activeTab === 'all' ? 'active-tab' : ''}`}
            >
              All Planes
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('horizontal')}
              className={`filter-tab-btn ${activeTab === 'horizontal' ? 'active-tab' : ''}`}
            >
              Horizontal
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('vertical')}
              className={`filter-tab-btn ${activeTab === 'vertical' ? 'active-tab' : ''}`}
            >
              Vertical
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('diagonal')}
              className={`filter-tab-btn ${activeTab === 'diagonal' ? 'active-tab' : ''}`}
            >
              Raj Yogs
            </button>
          </div>
        </div>

        <div className="planes-cards-grid">
          {filteredPlanes.map((plane, idx) => {
            const isFull = plane.status === 'Complete';
            const isPartial = plane.status === 'Partial';

            return (
              <div
                key={idx}
                className={`plane-card ${isFull ? 'plane-complete' : isPartial ? 'plane-partial' : 'plane-missing'}`}
              >
                <div className="plane-card-top">
                  <span className="plane-type-pill">{plane.type}</span>
                  <span
                    className={`plane-status-pill ${
                      isFull ? 'pill-gold' : isPartial ? 'pill-blue' : 'pill-gray'
                    }`}
                  >
                    {plane.status === 'Complete' && <Sparkles size={12} />}
                    {plane.status} ({plane.percentage}%)
                  </span>
                </div>

                <h4 className="plane-name">{plane.name}</h4>

                <div className="plane-digits-track">
                  {plane.numbers.map((num) => {
                    const hasNum = cells[num]?.count > 0;
                    return (
                      <span
                        key={num}
                        className={`plane-digit-badge ${hasNum ? 'digit-present' : 'digit-absent'}`}
                      >
                        {num}
                      </span>
                    );
                  })}
                </div>

                {/* Progress bar */}
                <div className="plane-progress-track">
                  <div
                    className="plane-progress-fill"
                    style={{
                      width: `${plane.percentage}%`,
                      background: isFull
                        ? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                        : isPartial
                        ? 'linear-gradient(90deg, #3b82f6, #60a5fa)'
                        : '#374151',
                    }}
                  />
                </div>

                <p className="plane-interpretation">{plane.interpretation}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
