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
            {profile.socials.huggingface && (
              <a
                href={profile.socials.huggingface}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FFD21E] dark:hover:text-[#FFD21E] transition-colors"
                title="Hugging Face"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.025 1.13c-5.77 0-10.449 4.647-10.449 10.378 0 1.112.178 2.181.503 3.185.064-.222.203-.444.416-.577a.96.96 0 0 1 .524-.15c.293 0 .584.124.84.284.278.173.48.408.71.694.226.282.458.611.684.951v-.014c.017-.324.106-.622.264-.874s.403-.487.762-.543c.3-.047.596.06.787.203s.31.313.4.467c.15.257.212.468.233.542.01.026.653 1.552 1.657 2.54.616.605 1.01 1.223 1.082 1.912.055.537-.096 1.059-.38 1.572.637.121 1.294.187 1.967.187.657 0 1.298-.063 1.921-.178-.287-.517-.44-1.041-.384-1.581.07-.69.465-1.307 1.081-1.913 1.004-.987 1.647-2.513 1.657-2.539.021-.074.083-.285.233-.542.09-.154.208-.323.4-.467a1.08 1.08 0 0 1 .787-.203c.359.056.604.29.762.543s.247.55.265.874v.015c.225-.34.457-.67.683-.952.23-.286.432-.52.71-.694.257-.16.547-.284.84-.285a.97.97 0 0 1 .524.151c.228.143.373.388.43.625l.006.04a10.3 10.3 0 0 0 .534-3.273c0-5.731-4.678-10.378-10.449-10.378M8.327 6.583a1.5 1.5 0 0 1 .713.174 1.487 1.487 0 0 1 .617 2.013c-.183.343-.762-.214-1.102-.094-.38.134-.532.914-.917.71a1.487 1.487 0 0 1 .69-2.803m7.486 0a1.487 1.487 0 0 1 .689 2.803c-.385.204-.536-.576-.916-.71-.34-.12-.92.437-1.103.094a1.487 1.487 0 0 1 .617-2.013 1.5 1.5 0 0 1 .713-.174m-10.68 1.55a.96.96 0 1 1 0 1.921.96.96 0 0 1 0-1.92m13.838 0a.96.96 0 1 1 0 1.92.96.96 0 0 1 0-1.92M8.489 11.458c.588.01 1.965 1.157 3.572 1.164 1.607-.007 2.984-1.155 3.572-1.164.196-.003.305.12.305.454 0 .886-.424 2.328-1.563 3.202-.22-.756-1.396-1.366-1.63-1.32q-.011.001-.02.006l-.044.026-.01.008-.03.024q-.018.017-.035.036l-.032.04a1 1 0 0 0-.058.09l-.014.025q-.049.088-.11.19a1 1 0 0 1-.083.116 1.2 1.2 0 0 1-.173.18q-.035.029-.075.058a1.3 1.3 0 0 1-.251-.243 1 1 0 0 1-.076-.107c-.124-.193-.177-.363-.337-.444-.034-.016-.104-.008-.2.022q-.094.03-.216.087-.06.028-.125.063l-.13.074q-.067.04-.136.086a3 3 0 0 0-.135.096 3 3 0 0 0-.26.219 2 2 0 0 0-.12.121 2 2 0 0 0-.106.128l-.002.002a2 2 0 0 0-.09.132l-.001.001a1.2 1.2 0 0 0-.105.212q-.013.036-.024.073c-1.139-.875-1.563-2.317-1.563-3.203 0-.334.109-.457.305-.454m.836 10.354c.824-1.19.766-2.082-.365-3.194-1.13-1.112-1.789-2.738-1.789-2.738s-.246-.945-.806-.858-.97 1.499.202 2.362c1.173.864-.233 1.45-.685.64-.45-.812-1.683-2.896-2.322-3.295s-1.089-.175-.938.647 2.822 2.813 2.562 3.244-1.176-.506-1.176-.506-2.866-2.567-3.49-1.898.473 1.23 2.037 2.16c1.564.932 1.686 1.178 1.464 1.53s-3.675-2.511-4-1.297c-.323 1.214 3.524 1.567 3.287 2.405-.238.839-2.71-1.587-3.216-.642-.506.946 3.49 2.056 3.522 2.064 1.29.33 4.568 1.028 5.713-.624m5.349 0c-.824-1.19-.766-2.082.365-3.194 1.13-1.112 1.789-2.738 1.789-2.738s.246-.945.806-.858.97 1.499-.202 2.362c-1.173.864.233 1.45.685.64.451-.812 1.683-2.896 2.322-3.295s1.089-.175.938.647-2.822 2.813-2.562 3.244 1.176-.506 1.176-.506 2.866-2.567 3.49-1.898-.473 1.23-2.037 2.16c-1.564.932-1.686 1.178-1.464 1.53s3.675-2.511 4-1.297c.323 1.214-3.524 1.567-3.287 2.405.238.839 2.71-1.587 3.216-.642.506.946-3.49 2.056-3.522 2.064-1.29.33-4.568 1.028-5.713-.624" />
                </svg>
              </a>
            )}
            {profile.socials.codeforces && (
              <a
                href={profile.socials.codeforces}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1F8ACB] dark:hover:text-[#38A1DB] transition-colors"
                title="Codeforces"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.5 7.5A1.5 1.5 0 0 1 6 9v10.5A1.5 1.5 0 0 1 4.5 21h-3C.673 21 0 20.328 0 19.5V9c0-.828.673-1.5 1.5-1.5h3zm9-4.5A1.5 1.5 0 0 1 15 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-3c-.827 0-1.5-.672-1.5-1.5v-15c0-.828.673-1.5 1.5-1.5h3zm9 7.5A1.5 1.5 0 0 1 24 12v7.5a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5V12a1.5 1.5 0 0 1 1.5-1.5h3z" />
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
