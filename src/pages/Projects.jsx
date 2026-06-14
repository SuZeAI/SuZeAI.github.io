import React, { useState, useMemo } from 'react';
import { Search, Star, ExternalLink, RefreshCw } from 'lucide-react';

export default function Projects({ projects, githubStatus, refreshGithub }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('stars'); // 'stars' or 'name'
  const [showMode, setShowMode] = useState('featured'); // 'featured' or 'all'
  const [showAllTags, setShowAllTags] = useState(false);

  // Get all unique tags sorted by frequency and handle folding
  const allTagsData = useMemo(() => {
    if (!projects) return { visible: [], hiddenCount: 0 };

    let baseProjects = [...projects];
    if (showMode === 'featured') {
      baseProjects = baseProjects.filter(p => !p.isDynamic && !(p.isFork || (p.role && p.role.includes('Fork'))));
    }

    // Count tag frequencies
    const counts = {};
    baseProjects.forEach(project => {
      if (project.tech) {
        project.tech.forEach(t => {
          counts[t] = (counts[t] || 0) + 1;
        });
      }
    });

    // Sort tags by frequency (descending) and then alphabetically
    const sortedTags = Object.keys(counts).sort((a, b) => {
      if (counts[b] !== counts[a]) {
        return counts[b] - counts[a];
      }
      return a.localeCompare(b);
    });

    // Limit visible tags to top 15 by default
    const limit = 15;
    if (sortedTags.length <= limit || showAllTags) {
      return { visible: sortedTags, hiddenCount: 0 };
    } else {
      return {
        visible: sortedTags.slice(0, limit),
        hiddenCount: sortedTags.length - limit
      };
    }
  }, [projects, showMode, showAllTags]);

  // Filter & sort projects
  const filteredAndSortedProjects = useMemo(() => {
    if (!projects) return [];
    
    let result = [...projects];

    // Filter by Featured vs All (Featured excludes forks)
    if (showMode === 'featured') {
      result = result.filter(p => !p.isDynamic && !(p.isFork || (p.role && p.role.includes('Fork'))));
    }

    // Search query filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        (p.tech && p.tech.some(t => t.toLowerCase().includes(query)))
      );
    }

    // Tag filter
    if (selectedTag) {
      result = result.filter(p => p.tech && p.tech.includes(selectedTag));
    }

    // Sorting
    if (sortBy === 'stars') {
      result.sort((a, b) => (b.stars || 0) - (a.stars || 0));
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [projects, searchQuery, selectedTag, sortBy, showMode]);

  const toggleTag = (tag) => {
    if (selectedTag === tag) {
      setSelectedTag('');
    } else {
      setSelectedTag(tag);
    }
  };

  // Reset tag selection when changing show mode
  const handleShowModeChange = (mode) => {
    setShowMode(mode);
    setSelectedTag('');
    setShowAllTags(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header section with GitHub Sync Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-900/60 pb-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Projects
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            A showcase of my projects in AI, Machine Learning, Web Development, and developer utilities.
          </p>
        </div>

        {/* GitHub Sync Status Badge */}
        {githubStatus && (
          <div className="flex items-center gap-2 self-start sm:self-center bg-white dark:bg-[#16171d] px-3.5 py-1.5 rounded-lg border border-gray-150 dark:border-gray-800/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] text-xs font-semibold shrink-0">
            {githubStatus === 'syncing' && (
              <>
                <RefreshCw className="w-3.5 h-3.5 text-rose-500 animate-spin" />
                <span className="text-gray-550 dark:text-gray-400">Syncing with GitHub...</span>
              </>
            )}
            {githubStatus === 'synced' && (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-gray-650 dark:text-gray-350 mr-1.5">Live GitHub stars synced</span>
                <button 
                  onClick={refreshGithub} 
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors text-gray-450 hover:text-gray-700 dark:hover:text-white"
                  title="Force refresh stats"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </>
            )}
            {githubStatus === 'failed' && (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-gray-650 dark:text-gray-350 mr-1.5">GitHub API rate-limited</span>
                <button 
                  onClick={refreshGithub} 
                  className="px-2 py-0.5 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-450 rounded hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors"
                >
                  Retry
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Project Source and Type Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Featured vs All tab selection */}
        <div className="flex p-1 bg-gray-100 dark:bg-gray-900/40 rounded-xl border border-gray-200/50 dark:border-gray-800/60 max-w-max">
          <button
            onClick={() => handleShowModeChange('featured')}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
              showMode === 'featured'
                ? 'bg-white dark:bg-[#16171d] text-rose-600 dark:text-rose-455 shadow-[0_2px_8px_rgba(0,0,0,0.05)]'
                : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            Featured Projects
          </button>
          <button
            onClick={() => handleShowModeChange('all')}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
              showMode === 'all'
                ? 'bg-white dark:bg-[#16171d] text-rose-600 dark:text-rose-455 shadow-[0_2px_8px_rgba(0,0,0,0.05)]'
                : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            All GitHub Repos ({projects ? projects.length : 0})
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-gray-50 dark:bg-gray-900/30 p-4 rounded-xl border border-gray-100 dark:border-gray-850">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects, tags, description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-[#0f0f11] text-gray-900 dark:text-white rounded border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
          />
        </div>
        
        {/* Sorting controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 shrink-0">SORT BY</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 text-sm bg-white dark:bg-[#0f0f11] text-gray-900 dark:text-white rounded border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-rose-500 transition-colors"
          >
            <option value="stars">Most Stars</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Tags List */}
      {allTagsData.visible.length > 0 && (
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mr-1.5">FILTER TAGS:</span>
          <button
            onClick={() => setSelectedTag('')}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
              !selectedTag
                ? 'bg-rose-600 text-white font-bold'
                : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-750 text-gray-700 dark:text-gray-300'
            }`}
          >
            All
          </button>
          {allTagsData.visible.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                selectedTag === tag
                  ? 'bg-rose-600 text-white font-bold'
                  : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-750 text-gray-700 dark:text-gray-300'
              }`}
            >
              {tag}
            </button>
          ))}
          
          {/* Show More / Show Less Toggle Button */}
          {allTagsData.hiddenCount > 0 ? (
            <button
              onClick={() => setShowAllTags(true)}
              className="px-2.5 py-1 text-xs font-bold rounded bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-900/30 text-rose-600 dark:text-rose-400 transition-colors cursor-pointer"
            >
              + {allTagsData.hiddenCount} more
            </button>
          ) : (
            showAllTags && (
              <button
                onClick={() => setShowAllTags(false)}
                className="px-2.5 py-1 text-xs font-bold rounded bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-900/30 text-rose-600 dark:text-rose-400 transition-colors cursor-pointer"
              >
                Show Less
              </button>
            )
          )}
        </div>
      )}

      {/* Projects Grid */}
      {filteredAndSortedProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedProjects.map(project => (
            <div
              key={project.id || project.name}
              className="flex flex-col justify-between p-5 bg-white dark:bg-[#16171d] rounded-xl border border-gray-150 dark:border-gray-800/80 hover:border-gray-300 dark:hover:border-gray-700/80 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] group"
            >
              <div className="space-y-3">
                {/* Title and Stars */}
                <div className="flex items-start justify-between gap-4 min-w-0">
                  <h3 className="font-extrabold text-gray-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors text-[16px] leading-snug break-words break-all min-w-0 flex-1">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 bg-gray-55 dark:bg-gray-800/50 px-2 py-0.5 rounded text-xs font-semibold shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400 animate-pulse" />
                    <span>{project.stars || 0}</span>
                  </div>
                </div>

                {/* Role and Badges */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {project.role && (
                    <span className="inline-block text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider bg-rose-50 dark:bg-rose-950/20 px-2 py-0.5 rounded">
                      {project.role}
                    </span>
                  )}
                  {project.isDynamic && (
                    <span className="inline-block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-100 dark:bg-gray-800/60 px-2 py-0.5 rounded">
                      GitHub Repo
                    </span>
                  )}
                  {project.isFork && (
                    <span className="inline-block text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/20 px-2 py-0.5 rounded">
                      Forked
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Technology and Link Footer */}
              <div className="mt-5 space-y-4">
                <div className="flex flex-wrap gap-1">
                  {project.tech && project.tech.slice(0, 8).map(t => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[11px] font-semibold bg-gray-100 dark:bg-gray-800 text-gray-650 dark:text-gray-350 rounded"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech && project.tech.length > 8 && (
                    <span className="px-2 py-0.5 text-[11px] font-semibold bg-gray-50 dark:bg-gray-800/40 text-gray-450 rounded">
                      +{project.tech.length - 8} more
                    </span>
                  )}
                </div>

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-gray-900 dark:text-white hover:text-rose-600 dark:hover:text-rose-450 transition-colors pt-1"
                  >
                    View Repository
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl space-y-2">
          <p className="text-gray-500 dark:text-gray-400 font-medium">No projects found matching the criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTag('');
            }}
            className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
