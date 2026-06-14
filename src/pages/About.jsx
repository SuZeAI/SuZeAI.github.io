import React from 'react';
import { Briefcase, MapPin, Mail, ChevronRight, GraduationCap, Award, BookOpen, Cpu, Settings } from 'lucide-react';

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

export default function About({ profile, journey, academia, skills, publications, competitions, setActiveTab }) {
  if (!profile) return null;

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Top Intro Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 pt-4">
        {/* Left Side: Avatar */}
        <div className="w-48 h-48 md:w-56 md:h-56 shrink-0 rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-800 shadow-md">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://avatars.githubusercontent.com/u/105658607?v=4';
            }}
          />
        </div>

        {/* Right Side: Details */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="space-y-1.5">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              {profile.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-gray-600 dark:text-gray-400 font-medium">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <span>{profile.title}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-sm text-gray-500 dark:text-gray-400 mt-1">
              <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
              <span>{profile.location}</span>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed text-[15px] text-justify">
            {profile.bio}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {profile.tags && profile.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
            <a
              href={`mailto:${profile.email}`}
              className="px-5 py-2.5 text-sm font-bold bg-gray-900 text-white dark:bg-white dark:text-gray-950 rounded hover:bg-gray-850 dark:hover:bg-gray-100 transition-colors shadow-sm"
            >
              CONTACT ME
            </a>
            <a
              href={profile.cvUrl}
              download
              className="px-5 py-2.5 text-sm font-bold bg-white text-gray-900 border border-gray-200 dark:bg-transparent dark:text-white dark:border-gray-800 rounded hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-colors"
            >
              VIEW RESUME
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center md:justify-start gap-4 pt-3 text-gray-500 dark:text-gray-400">
            {profile.socials.github && (
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-950 dark:hover:text-white transition-colors"
                title="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            )}
            {profile.socials.linkedin && (
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0077b5] dark:hover:text-[#00a0dc] transition-colors"
                title="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            )}
            {profile.socials.x && (
              <a
                href={profile.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-950 dark:hover:text-white transition-colors"
                title="X (Twitter)"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            )}
            {profile.socials.facebook && (
              <a
                href={profile.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1877f2] dark:hover:text-[#4267B2] transition-colors"
                title="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            )}
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              title="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <hr className="border-gray-200/80 dark:border-gray-800/80" />

      {/* Featured Journey Intro Text */}
      {profile.journeyIntro && (
        <div className="space-y-4 w-full">
          <p className="text-gray-700 dark:text-gray-300 text-md leading-relaxed whitespace-pre-line text-justify">
            {profile.journeyIntro}
          </p>
        </div>
      )}

      {/* Professional Journey List */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">
          Professional Journey
        </h2>
        <div className="space-y-6 border-l-2 border-gray-100 dark:border-gray-800/80 pl-6 ml-2">
          {journey && journey.map((item, idx) => (
            <div key={idx} className="relative space-y-1.5">
              {/* Dot decoration */}
              <div className="absolute -left-[33px] top-1.5 w-4.5 h-4.5 rounded-full bg-white dark:bg-[#0f0f11] border-2 border-rose-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="font-bold text-gray-900 dark:text-white text-[16px]">
                  {item.role} <span className="text-rose-500 font-semibold">@ {item.company}</span>
                </h3>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-55 dark:bg-gray-850 px-2 py-0.5 rounded border border-gray-100 dark:border-gray-800">
                  {item.period}
                </span>
              </div>
              <p className="text-sm text-gray-650 dark:text-gray-400 leading-relaxed whitespace-pre-line text-justify">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-200/80 dark:border-gray-800/80" />

      {/* Skills & Core Competencies */}
      {profile.skills && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Skills & Core Competencies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(profile.skills).map(([category, skillList]) => (
              <div
                key={category}
                className="p-5 bg-white dark:bg-[#16171d] rounded-xl border border-gray-150 dark:border-gray-800/80 space-y-3"
              >
                <div className="flex items-center gap-2 text-rose-550 dark:text-rose-400">
                  {category.includes('ML') || category.includes('Deep') ? (
                    <Cpu className="w-4.5 h-4.5 shrink-0" />
                  ) : (
                    <Settings className="w-4.5 h-4.5 shrink-0" />
                  )}
                  <h3 className="font-extrabold text-[14px] uppercase tracking-wider">
                    {category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skillList.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs font-semibold bg-gray-50 dark:bg-gray-850 text-gray-650 dark:text-gray-350 rounded border border-gray-100 dark:border-gray-800/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {profile.skills && <hr className="border-gray-200/80 dark:border-gray-800/80" />}

      {/* Research & Publications Section */}
      {publications && publications.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Research & Publications
          </h2>
          <div className="space-y-4">
            {publications.map((pub, idx) => (
              <div
                key={idx}
                className="p-5 bg-white dark:bg-[#16171d] rounded-xl border border-gray-150 dark:border-gray-800/80 space-y-2 flex gap-4 items-start"
              >
                <div className="p-2.5 bg-rose-50 dark:bg-rose-950/20 text-rose-500 rounded-lg shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-left">
                  <h3 className="font-extrabold text-gray-900 dark:text-white text-[15px] leading-snug">
                    {pub.title}
                  </h3>
                  <span className="inline-block text-[11px] font-bold text-rose-600 dark:text-rose-455 uppercase tracking-wider">
                    {pub.venue}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed pt-1 text-justify">
                    {pub.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {publications && publications.length > 0 && <hr className="border-gray-200/80 dark:border-gray-800/80" />}

      {/* Honors, Competitions & Certifications Section */}
      {competitions && competitions.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Honors, Competitions & Certifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {competitions.map((comp, idx) => (
              <div
                key={idx}
                className="p-4 bg-white dark:bg-[#16171d] rounded-xl border border-gray-150 dark:border-gray-800/80 flex gap-3.5 items-start"
              >
                <div className="p-2 bg-amber-50 dark:bg-amber-950/20 text-amber-500 rounded-lg shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 text-left">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{comp.year}</span>
                  <h3 className="font-extrabold text-gray-900 dark:text-white text-[14px]">
                    {comp.title}
                  </h3>
                  <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                    {comp.award}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {competitions && competitions.length > 0 && <hr className="border-gray-200/80 dark:border-gray-800/80" />}

      {/* Academic Background List */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">
          Academic Background
        </h2>
        <div className="space-y-6 border-l-2 border-gray-100 dark:border-gray-800/80 pl-6 ml-2">
          {academia && academia.map((item, idx) => (
            <div key={idx} className="relative space-y-1.5">
              {/* Dot decoration */}
              <div className="absolute -left-[33px] top-1.5 w-4.5 h-4.5 rounded-full bg-white dark:bg-[#0f0f11] border-2 border-gray-400 dark:border-gray-600 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="font-bold text-gray-900 dark:text-white text-[16px]">
                  {item.degree}
                </h3>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-850 px-2 py-0.5 rounded border border-gray-100 dark:border-gray-800">
                  {item.period}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-655 dark:text-gray-300">
                {item.school}
              </p>
              <div className="text-sm text-gray-550 dark:text-gray-400 leading-relaxed text-justify">
                {renderFormattedText(item.details)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-200/80 dark:border-gray-800/80" />

      {/* Let's Connect Call Section */}
      <div className="bg-gray-50 dark:bg-gray-900/30 rounded-xl p-6 md:p-8 border border-gray-100 dark:border-gray-850/60 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">Let's Connect</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Have an interesting AI project or researcher role? Let's book a call and talk.
          </p>
        </div>
        <div className="self-center md:self-auto shrink-0">
          <button
            onClick={() => setActiveTab('blog')}
            className="px-6 py-3 text-sm font-bold bg-rose-600 hover:bg-rose-700 text-white rounded transition-colors shadow-sm inline-flex items-center gap-2 group"
          >
            READ MY BLOG
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
