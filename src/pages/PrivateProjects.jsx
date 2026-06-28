import React, { useState, useMemo } from 'react';
import { Search, Lock, FlaskConical } from 'lucide-react';

// Preferred display order for category sections
const CATEGORY_ORDER = [
  'AI Agents & Orchestration',
  'LLM Training & Fine-Tuning',
  'Computer Vision',
  'NLP & Text',
  'Security & Code Analysis',
  'Content Generation',
  'Web & Full-Stack Apps',
  'Game AI',
  'Tools & Automation',
];

export default function PrivateProjects({ privateProjects }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [showAllTags, setShowAllTags] = useState(false);

  // Unique tags sorted by frequency, with folding past a limit
  const allTagsData = useMemo(() => {
    if (!privateProjects) return { visible: [], hiddenCount: 0 };

    const counts = {};
    privateProjects.forEach(project => {
      if (project.tech) {
        project.tech.forEach(t => {
          counts[t] = (counts[t] || 0) + 1;
        });
      }
    });

    const sortedTags = Object.keys(counts).sort((a, b) => {
      if (counts[b] !== counts[a]) return counts[b] - counts[a];
      return a.localeCompare(b);
    });

    const limit = 15;
    if (sortedTags.length <= limit || showAllTags) {
      return { visible: sortedTags, hiddenCount: 0 };
    }
    return {
      visible: sortedTags.slice(0, limit),
      hiddenCount: sortedTags.length - limit,
    };
  }, [privateProjects, showAllTags]);

  // Filter by search + tag
  const filteredProjects = useMemo(() => {
    if (!privateProjects) return [];
    let result = [...privateProjects];

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        (p.category && p.category.toLowerCase().includes(query)) ||
        (p.tech && p.tech.some(t => t.toLowerCase().includes(query)))
      );
    }

    if (selectedTag) {
      result = result.filter(p => p.tech && p.tech.includes(selectedTag));
    }

    return result;
  }, [privateProjects, searchQuery, selectedTag]);

  // Group the filtered projects by category, in preferred order
  const groupedProjects = useMemo(() => {
    const groups = {};
    filteredProjects.forEach(p => {
      const cat = p.category || 'Other';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(p);
    });

    const orderedCats = [
      ...CATEGORY_ORDER.filter(c => groups[c]),
      ...Object.keys(groups).filter(c => !CATEGORY_ORDER.includes(c)).sort(),
    ];

    return orderedCats.map(cat => ({ category: cat, items: groups[cat] }));
  }, [filteredProjects]);

  const toggleTag = (tag) => {
    setSelectedTag(prev => (prev === tag ? '' : tag));
  };

  const totalCount = privateProjects ? privateProjects.length : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-900/60 pb-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Lab
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Private &amp; experimental projects not published to GitHub — research prototypes, internal tools and coursework.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center bg-white dark:bg-[#16171d] px-3.5 py-1.5 rounded-lg border border-gray-150 dark:border-gray-800/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] text-xs font-semibold shrink-0">
          <FlaskConical className="w-3.5 h-3.5 text-rose-500" />
          <span className="text-gray-650 dark:text-gray-350">{totalCount} private projects</span>
        </div>
      </div>

      {/* Search bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-gray-50 dark:bg-gray-900/30 p-4 rounded-xl border border-gray-100 dark:border-gray-850">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects, categories, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-[#0f0f11] text-gray-900 dark:text-white rounded border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
          />
        </div>
      </div>

      {/* Tag filter */}
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

      {/* Grouped project sections */}
      {groupedProjects.length > 0 ? (
        <div className="space-y-10">
          {groupedProjects.map(({ category, items }) => (
            <section key={category} className="space-y-4">
              <div className="flex items-center gap-2.5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {category}
                </h2>
                <span className="text-[11px] font-semibold text-gray-400 bg-gray-100 dark:bg-gray-800/60 px-1.5 py-0.5 rounded">
                  {items.length}
                </span>
                <span className="flex-1 h-px bg-gray-100 dark:bg-gray-900/60" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(project => (
                  <div
                    key={project.id || project.name}
                    className="flex flex-col justify-between p-5 bg-white dark:bg-[#16171d] rounded-xl border border-gray-150 dark:border-gray-800/80 hover:border-gray-300 dark:hover:border-gray-700/80 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] group"
                  >
                    <div className="space-y-3">
                      {/* Title */}
                      <div className="flex items-start justify-between gap-4 min-w-0">
                        <h3 className="font-extrabold text-gray-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors text-[16px] leading-snug break-words min-w-0 flex-1">
                          {project.name}
                        </h3>
                        <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400 bg-gray-55 dark:bg-gray-800/50 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0">
                          <Lock className="w-3 h-3" />
                          Private
                        </span>
                      </div>

                      {/* Category badge */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="inline-block text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider bg-rose-50 dark:bg-rose-950/20 px-2 py-0.5 rounded">
                          {project.category}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech pills */}
                    <div className="mt-5">
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
                    </div>
                  </div>
                ))}
              </div>
            </section>
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
