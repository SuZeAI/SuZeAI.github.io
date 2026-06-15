import React, { useState, useEffect } from 'react';
import { Sun, Moon, Mail, ShieldAlert, Menu, X } from 'lucide-react';

// Import Pages
import About from './pages/About';
import Projects from './pages/Projects';
import Products from './pages/Products';
import Academia from './pages/Academia';
import Blog from './pages/Blog';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Navigation State: 'about' | 'projects' | 'products' | 'academia' | 'blog'
  const [activeTab, setActiveTab] = useState('about');
  
  // Mobile Menu State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Theme State
  const [theme, setTheme] = useState('light');

  // Load theme and tab hash on mount
  useEffect(() => {
    // 1. Theme initialization
    const savedTheme = localStorage.getItem('suzeai_theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // 2. Hash routing initialization
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validTabs = ['about', 'projects', 'products', 'academia', 'blog'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      } else {
        setActiveTab('about');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Trigger on mount

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Fetch and merge GitHub data
  const fetchAndMergeGitHub = async (baseData) => {
    if (!baseData) return;
    try {
      setData(prev => ({ ...prev, githubStatus: 'syncing' }));

      // 1. Fetch SuZeAI public repos
      const reposResponse = await fetch('https://api.github.com/users/SuZeAI/repos?per_page=100');
      if (!reposResponse.ok) {
        throw new Error('GitHub API response not OK');
      }
      const suzeRepos = await reposResponse.json();

      // 2. Identify external projects and fetch them
      const originalProjects = baseData.originalProjects || baseData.projects || [];
      const externalProjects = originalProjects.filter(proj => {
        if (!proj.url) return false;
        const match = proj.url.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (match) {
          const owner = match[1];
          return owner.toLowerCase() !== 'suzeai';
        }
        return false;
      });

      const externalReposData = {};
      await Promise.all(
        externalProjects.map(async (proj) => {
          const match = proj.url.match(/github\.com\/([^/]+)\/([^/]+)/);
          if (match) {
            const owner = match[1];
            const repo = match[2];
            try {
              const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
              if (res.ok) {
                const rData = await res.json();
                externalReposData[proj.url.toLowerCase()] = rData;
              }
            } catch (e) {
              console.warn(`Failed to fetch external repo ${owner}/${repo}:`, e);
            }
          }
        })
      );

      // 3. Merging logic
      const mergedProjects = [];
      const mergedRepoIds = new Set();

      originalProjects.forEach(localProj => {
        let matchedRepo = null;

        // Try matching by external URL
        if (localProj.url && externalReposData[localProj.url.toLowerCase()]) {
          matchedRepo = externalReposData[localProj.url.toLowerCase()];
        }

        // Try matching from suzeRepos by specific URL name
        if (!matchedRepo && localProj.url && localProj.url.includes('github.com/suzeai/')) {
          const urlParts = localProj.url.replace(/\/$/, '').split('/');
          const repoName = urlParts[urlParts.length - 1];
          matchedRepo = suzeRepos.find(r => r.name.toLowerCase() === repoName.toLowerCase());
        }

        // Try matching by name or id fuzzy
        if (!matchedRepo) {
          const id = localProj.id.toLowerCase();
          matchedRepo = suzeRepos.find(r => {
            const name = r.name.toLowerCase();
            return name === id || 
                   name === id.replace(/-/g, '_') || 
                   name === id.replace(/_/g, '-') ||
                   name.includes(id) || 
                   id.includes(name);
          });
        }

        // Fallback manual mappings for outliers
        if (!matchedRepo) {
          const manualMapping = {
            'adm-permissions': 'Detect_Androi_Malware',
            'contrastive-adm': 'Graph_reduce_Contrastive_Learning_ADM',
            'tts-text-normalization': 'text-normalization',
            'job-recommender': 'Jobs_Recommend_Core'
          };
          const targetName = manualMapping[localProj.id];
          if (targetName) {
            matchedRepo = suzeRepos.find(r => r.name.toLowerCase() === targetName.toLowerCase());
          }
        }

        // Merge if found
        if (matchedRepo) {
          mergedRepoIds.add(matchedRepo.id);
          
          const localTech = localProj.tech || [];
          const repoTech = matchedRepo.language ? [matchedRepo.language] : [];
          const repoTopics = matchedRepo.topics || [];
          const mergedTech = Array.from(new Set([
            ...localTech,
            ...repoTech,
            ...repoTopics.map(t => t.replace(/-/g, ' '))
          ].filter(Boolean)));

          mergedProjects.push({
            ...localProj,
            stars: matchedRepo.stargazers_count,
            url: matchedRepo.html_url || localProj.url,
            tech: mergedTech,
            description: localProj.description || matchedRepo.description,
            isFork: matchedRepo.fork,
            isDynamic: false
          });
        } else {
          mergedProjects.push({
            ...localProj,
            isDynamic: false
          });
        }
      });

      // Add remaining repositories as dynamic projects
      suzeRepos.forEach(repo => {
        if (!mergedRepoIds.has(repo.id)) {
          const tech = Array.from(new Set([
            repo.language,
            ...(repo.topics || []).map(t => t.replace(/-/g, ' '))
          ].filter(Boolean)));

          if (repo.name.toLowerCase() === 'suzeai.github.io') return;

          mergedProjects.push({
            id: repo.id.toString(),
            name: repo.name,
            description: repo.description || 'No description provided on GitHub.',
            tech: tech,
            stars: repo.stargazers_count,
            url: repo.html_url,
            featured: false,
            role: repo.fork ? 'Fork / Contributor' : 'Creator',
            isFork: repo.fork,
            isDynamic: true
          });
        }
      });

      setData(prev => ({
        ...prev,
        projects: mergedProjects,
        githubStatus: 'synced'
      }));
    } catch (err) {
      console.warn('Failed to sync with GitHub API:', err);
      setData(prev => ({
        ...prev,
        githubStatus: 'failed'
      }));
    }
  };

  // Fetch portfolio data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // We load the data from the relative path
        const response = await fetch('./data.json');
        if (!response.ok) {
          throw new Error('Could not load portfolio data database.');
        }
        const jsonData = await response.json();
        
        // Add status tracking and keep original projects copy
        jsonData.originalProjects = JSON.parse(JSON.stringify(jsonData.projects));
        jsonData.githubStatus = 'syncing';
        setData(jsonData);
        
        // Asynchronously fetch GitHub data in the background
        fetchAndMergeGitHub(jsonData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Toggle Theme
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('suzeai_theme', nextTheme);
    
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Nav handler helper
  const navigateTo = (tab) => {
    window.location.hash = tab;
    setActiveTab(tab);
    setIsMenuOpen(false);
  };


  // Render Loader
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9fafb] dark:bg-[#0f0f11] flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
        <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-xs font-bold uppercase tracking-widest animate-pulse">Loading Portfolio...</span>
      </div>
    );
  }

  // Render Error
  if (error) {
    return (
      <div className="min-h-screen bg-[#f9fafb] dark:bg-[#0f0f11] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-12 h-12 bg-red-50 dark:bg-red-950/20 text-red-500 rounded-full flex items-center justify-center mb-4">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">Error Loading Portfolio Database</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-sm font-bold shadow transition-colors"
        >
          Retry Load
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] dark:bg-[#0f0f11] text-gray-800 dark:text-gray-200 transition-colors duration-300 flex flex-col font-sans">
      
      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#f9fafb]/90 dark:bg-[#0f0f11]/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-900/60 transition-colors">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between relative">
          {/* Logo brand */}
          <button
            onClick={() => navigateTo('about')}
            className="text-sm font-black tracking-widest text-gray-900 dark:text-white hover:text-rose-650 dark:hover:text-rose-450 transition-colors cursor-pointer uppercase"
          >
            SUZEAI
          </button>

          {/* Desktop & Mobile Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {['about', 'projects', 'products', 'academia', 'blog'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => navigateTo(tab)}
                  className={`px-2.5 py-1.5 text-xs font-extrabold tracking-wider rounded uppercase transition-colors ${
                    activeTab === tab
                      ? 'text-rose-600 dark:text-rose-400 font-black'
                      : 'text-gray-550 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>

            {/* Dark Mode Switcher */}
            <button
              onClick={toggleTheme}
              className="p-1.5 ml-1 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded transition-colors"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 shrink-0" />
              ) : (
                <Sun className="w-4 h-4 shrink-0" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded transition-colors md:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 shrink-0" />
              ) : (
                <Menu className="w-5 h-5 shrink-0" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Dropdown Drawer */}
          {isMenuOpen && (
            <div className="absolute top-16 left-0 right-0 bg-[#f9fafb]/95 dark:bg-[#0f0f11]/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-900/60 p-4 flex flex-col gap-1.5 md:hidden shadow-lg animate-fade-in z-50">
              {['about', 'projects', 'products', 'academia', 'blog'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => navigateTo(tab)}
                  className={`px-4 py-2.5 text-left text-xs font-extrabold tracking-wider rounded uppercase transition-colors ${
                    activeTab === tab
                      ? 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-455 font-black'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/30'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-8 md:py-12">
        {activeTab === 'about' && (
          <About
            profile={data.profile}
            journey={data.journey}
            academia={data.academia}
            skills={data.skills}
            publications={data.publications}
            competitions={data.competitions}
            setActiveTab={navigateTo}
          />
        )}
        {activeTab === 'projects' && (
          <Projects 
            projects={data.projects} 
            githubStatus={data.githubStatus} 
            refreshGithub={() => fetchAndMergeGitHub(data)} 
          />
        )}
        {activeTab === 'products' && <Products products={data.products} />}
        {activeTab === 'academia' && <Academia academia={data.academia} />}
        {activeTab === 'blog' && <Blog blogs={data.blogs} />}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 dark:border-gray-900/60 py-6 text-center text-xs text-gray-400 dark:text-gray-550 transition-colors">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Vu Thanh Tuyen. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${data.profile?.email || 'tuyenvuthanh.work@gmail.com'}`}
              className="hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1 font-semibold"
            >
              <Mail className="w-3.5 h-3.5" />
              Get in touch
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
