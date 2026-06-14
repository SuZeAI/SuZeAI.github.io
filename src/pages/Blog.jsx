import React, { useState, useMemo } from 'react';
import { Search, Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import MarkdownRenderer from '../components/MarkdownRenderer';

export default function Blog({ blogs }) {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const activePost = useMemo(() => {
    if (!blogs) return null;
    return blogs.find(post => post.id === selectedPostId);
  }, [blogs, selectedPostId]);

  const filteredBlogs = useMemo(() => {
    if (!blogs) return [];
    if (searchQuery.trim() === '') return blogs;

    const query = searchQuery.toLowerCase();
    return blogs.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.snippet.toLowerCase().includes(query) ||
      (post.tags && post.tags.some(t => t.toLowerCase().includes(query)))
    );
  }, [blogs, searchQuery]);

  const handleShare = (post) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.snippet,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // IF AN ARTICLE IS OPENED
  if (activePost) {
    return (
      <div className="space-y-6 max-w-2xl mx-auto animate-fade-in pb-12">
        {/* Back Button */}
        <button
          onClick={() => setSelectedPostId(null)}
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO ARTICLES</span>
        </button>

        {/* Article Metadata */}
        <div className="space-y-4 pt-2">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
            {activePost.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-4">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {activePost.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activePost.readTime}
              </span>
            </div>
            
            <button
              onClick={() => handleShare(activePost)}
              className="inline-flex items-center gap-1.5 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              title="Share Article"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Article Content */}
        <article className="prose prose-rose dark:prose-invert max-w-none">
          <MarkdownRenderer content={activePost.content} />
        </article>

        {/* Article Tags Footer */}
        <div className="flex flex-wrap gap-1.5 pt-6 border-t border-gray-100 dark:border-gray-800/80">
          {activePost.tags && activePost.tags.map(tag => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-xs font-semibold bg-gray-50 dark:bg-gray-850 text-gray-650 dark:text-gray-350 rounded border border-gray-100 dark:border-gray-800"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // DEFAULT LIST VIEW
  return (
    <div className="space-y-8 max-w-2xl mx-auto animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Blog
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Thoughts, technical guides, and articles about software development, AI, and systems design.
        </p>
      </div>

      {/* Search Blogs */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search articles by title, tag, or snippet..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-900/30 text-gray-900 dark:text-white rounded border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
        />
      </div>

      {/* Blog List */}
      {filteredBlogs.length > 0 ? (
        <div className="space-y-8 pt-2">
          {filteredBlogs.map(post => (
            <div
              key={post.id}
              onClick={() => setSelectedPostId(post.id)}
              className="group cursor-pointer space-y-2.5 p-4 -mx-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-colors"
            >
              <div className="flex items-center gap-3 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>

              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors leading-tight">
                {post.title}
              </h2>

              <p className="text-sm text-gray-550 dark:text-gray-400 leading-relaxed">
                {post.snippet}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {post.tags && post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[11px] font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-350 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
          <p className="text-gray-500 dark:text-gray-400 font-medium">No articles found matching the search query.</p>
        </div>
      )}
    </div>
  );
}
