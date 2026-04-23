'use client';

import { useState } from 'react';
import * as motion from 'motion/react-client';
import Button from '../ui/Button';

export default function JobCard({ job }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-black/40 border border-white/10 rounded-lg overflow-hidden">
      {/* Summary row — always visible */}
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-1 text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30 rounded-full">
                Now Hiring
              </span>
              <span className="px-2 py-1 text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30 rounded-full">
                {job.type}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white leading-snug">{job.title}</h3>
            <p className="text-gray-400 text-sm mt-1">
              {job.company} &middot; {job.location}
            </p>
          </div>
          <div className="sm:text-right shrink-0">
            <p className="text-white font-bold text-lg">{job.salary}</p>
          </div>
        </div>

        <p className="text-gray-300 text-sm mt-4 line-clamp-2 leading-relaxed">{job.about}</p>

        <div className="flex flex-col sm:flex-row gap-3 mt-5">
          <Button href={`/apply?job=${job.id}`} variant="primary" size="md">
            Apply Now
          </Button>
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 border border-white/20 rounded-lg hover:border-red-500/50 hover:text-white transition-colors"
            aria-expanded={isExpanded}
          >
            {isExpanded ? 'Hide Details' : 'View Full Job Details'}
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Expandable full posting */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        <div className="border-t border-white/10 px-6 pb-8 pt-6 space-y-8">

          {/* About */}
          <section>
            <h4 className="text-lg font-semibold text-white mb-3">About the Job</h4>
            <p className="text-gray-300 leading-relaxed">{job.about}</p>
          </section>

          {/* Duties */}
          <section>
            <h4 className="text-lg font-semibold text-white mb-3">Duties</h4>
            <ul className="space-y-4">
              {job.duties.map((duty, i) => (
                <li key={i}>
                  <div className="flex items-start gap-3 text-gray-300">
                    <span className="text-red-500 mt-1 shrink-0" aria-hidden="true">▸</span>
                    <span className="leading-relaxed">{duty.text}</span>
                  </div>
                  {duty.subItems && (
                    <ul className="mt-2 ml-7 space-y-1">
                      {duty.subItems.map((sub, j) => (
                        <li key={j} className="flex items-start gap-2 text-gray-400 text-sm">
                          <span className="text-red-500/60 mt-1 shrink-0" aria-hidden="true">–</span>
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* Requirements */}
          <section>
            <h4 className="text-lg font-semibold text-white mb-3">Requirements</h4>
            <ul className="space-y-3">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                  <span className="text-red-500 mt-1 shrink-0" aria-hidden="true">✓</span>
                  <span className="leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Location */}
          <section>
            <h4 className="text-lg font-semibold text-white mb-3">Location</h4>
            <p className="text-gray-300 leading-relaxed">{job.locationDetail}</p>
          </section>

          {/* How to Apply */}
          <section>
            <h4 className="text-lg font-semibold text-white mb-3">How to Apply</h4>
            <p className="text-gray-300 leading-relaxed mb-5">{job.applyInstructions}</p>
            <Button href={`/apply?job=${job.id}`} variant="primary" size="md">
              Submit Application
            </Button>
          </section>

        </div>
      </motion.div>
    </div>
  );
}
