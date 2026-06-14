import React from 'react';
import { BookOpen, GraduationCap, Award, CheckCircle } from 'lucide-react';

const renderFormattedText = (text) => {
  if (!text) return null;
  return text.split('\n').map((line, lineIdx) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    const elements = [];
    let match;
    
    while ((match = linkRegex.exec(line)) !== null) {
      const matchIndex = match.index;
      if (matchIndex > lastIndex) {
        elements.push(line.substring(lastIndex, matchIndex));
      }
      elements.push(
        <a
          key={matchIndex}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-rose-600 hover:text-rose-700 dark:text-rose-455 dark:hover:text-rose-400 underline font-semibold transition-colors"
        >
          {match[1]}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }
    
    if (lastIndex < line.length) {
      elements.push(line.substring(lastIndex));
    }
    
    return (
      <div key={lineIdx} className={lineIdx > 0 ? "mt-1.5" : ""}>
        {elements}
      </div>
    );
  });
};

export default function Academia({ academia }) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Academia & Research
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          My academic foundation, coursework, certifications, and educational background.
        </p>
      </div>

      {academia && academia.length > 0 ? (
        <div className="space-y-8 max-w-3xl pt-2">
          {academia.map((edu, idx) => (
            <div
              key={idx}
              className="p-6 md:p-8 bg-white dark:bg-[#16171d] rounded-2xl border border-gray-150 dark:border-gray-800/80 space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.01)] relative overflow-hidden"
            >
              {/* Top Accent line decoration */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-rose-500" />

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-rose-500">
                    <GraduationCap className="w-5 h-5 shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider">Education & Research Roles</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-extrabold text-gray-900 dark:text-white leading-tight">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-semibold text-gray-650 dark:text-gray-300">
                    {edu.school}
                  </p>
                </div>

                <span className="px-3 py-1 text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-55 dark:bg-gray-850 rounded border border-gray-100 dark:border-gray-800 shrink-0 self-start sm:self-auto">
                  {edu.period}
                </span>
              </div>

              <div className="text-sm text-gray-550 dark:text-gray-400 leading-relaxed text-justify">
                {renderFormattedText(edu.details)}
              </div>

              {/* Course topics list, dynamically parsed if available or default points */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                  Key Focus Areas & Projects
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {edu.focusAreas ? (
                    edu.focusAreas.map((area, areaIdx) => (
                      <div key={areaIdx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{area}</span>
                      </div>
                    ))
                  ) : edu.degree.includes('Samsung') ? (
                    <>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Python Programming for AI</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Machine & Deep Learning</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Computer Vision Fundamentals</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Practical Projects & Exams</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>Data Structures & Algorithms</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>Artificial Intelligence Core</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>Object-Oriented Programming</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>Academic Research (VLM/LLM)</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Academic Honors Card */}
          <div className="p-6 md:p-8 bg-gray-50/50 dark:bg-gray-900/10 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 flex items-start gap-4">
            <div className="p-3 bg-white dark:bg-[#16171d] rounded-xl border border-gray-200 dark:border-gray-800 text-rose-500 shrink-0 shadow-sm">
              <Award className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-extrabold text-gray-900 dark:text-white text-[16px]">
                Research Interests & Dev Skills
              </h3>
              <p className="text-sm text-gray-550 dark:text-gray-400 leading-relaxed">
                My primary research focuses on utilizing **Vision-Language Models (VLM)** for UI layout analysis and structured automation (such as code generation and document presentation pipelines). I have hands-on experience developing LLM agents, utilizing model function-calling parameters, and building responsive React applications.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
          <p className="text-gray-500 dark:text-gray-400 font-medium">No education history available.</p>
        </div>
      )}
    </div>
  );
}
