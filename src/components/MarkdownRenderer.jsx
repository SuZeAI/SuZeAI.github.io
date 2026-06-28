import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import hljs from 'highlight.js/lib/common';
import Mermaid from './Mermaid';

// Small copy-to-clipboard button shown on each code block
function CopyCodeButton({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider transition-colors ${
        copied
          ? 'text-green-600 dark:text-green-400'
          : 'text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300'
      }`}
      title="Copy code"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" />
          Copied
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          Copy
        </>
      )}
    </button>
  );
}

// Highlight a code block, returning the highlighted HTML and the resolved language
const highlightCode = (code, lang) => {
  if (lang && hljs.getLanguage(lang)) {
    try {
      const { value } = hljs.highlight(code, { language: lang, ignoreIllegals: true });
      return { html: value, language: lang };
    } catch (e) {
      console.warn('Highlight failed for language', lang, e);
    }
  }
  // Fall back to auto-detection when the language is unknown/unspecified
  const { value, language } = hljs.highlightAuto(code);
  return { html: value, language: language || 'plaintext' };
};

export default function MarkdownRenderer({ content }) {
  if (!content) return null;

  const parseBold = (text, keyPrefix) => {
    const boldRegex = /\*\*([^*]+)\*\*/g;
    const matches = [...text.matchAll(boldRegex)];
    if (matches.length > 0) {
      let elements = [];
      let lastIndex = 0;
      matches.forEach((m, idx) => {
        const textBefore = text.slice(lastIndex, m.index);
        const boldText = m[1];
        if (textBefore) {
          elements.push(textBefore);
        }
        elements.push(<strong key={`${keyPrefix}-bold-${idx}`} className="font-semibold text-gray-900 dark:text-white">{boldText}</strong>);
        lastIndex = m.index + m[0].length;
      });
      const textAfter = text.slice(lastIndex);
      if (textAfter) {
        elements.push(textAfter);
      }
      return elements;
    }
    return text;
  };

  const parseInline = (text, lineIdx) => {
    // Parse links: [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const matches = [...text.matchAll(linkRegex)];
    if (matches.length > 0) {
      let elements = [];
      let lastIndex = 0;
      matches.forEach((m, idx) => {
        const textBefore = text.slice(lastIndex, m.index);
        const linkText = m[1];
        const linkUrl = m[2];
        
        if (textBefore) {
          elements.push(parseBold(textBefore, `line-${lineIdx}-part-${idx}`));
        }
        elements.push(
          <a key={`line-${lineIdx}-link-${idx}`} href={linkUrl} target="_blank" rel="noopener noreferrer" className="text-rose-600 dark:text-rose-400 hover:underline font-medium">
            {linkText}
          </a>
        );
        lastIndex = m.index + m[0].length;
      });
      const textAfter = text.slice(lastIndex);
      if (textAfter) {
        elements.push(parseBold(textAfter, `line-${lineIdx}-part-after`));
      }
      return elements;
    }

    return parseBold(text, `line-${lineIdx}`);
  };

  const parseMarkdown = (text) => {
    const lines = text.split('\n');
    let inCodeBlock = false;
    let codeContent = [];
    let codeLang = '';
    let keyIdx = 0;
    const elements = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      keyIdx++;

      // Handle code block
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          inCodeBlock = false;
          const codeText = codeContent.join('\n');
          const lang = codeLang;
          codeContent = [];
          codeLang = '';
          if (lang === 'mermaid') {
            elements.push(<Mermaid key={`mermaid-${keyIdx}`} chart={codeText} />);
          } else {
            const { html, language } = highlightCode(codeText, lang);
            elements.push(
              <div key={`code-${keyIdx}`} className="my-4 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800/80">
                <div className="flex items-center justify-between px-4 py-1.5 bg-gray-100/80 dark:bg-gray-850 border-b border-gray-100 dark:border-gray-800/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    {language}
                  </span>
                  <CopyCodeButton code={codeText} />
                </div>
                <pre className="bg-gray-50 dark:bg-gray-900/50 p-4 overflow-x-auto font-mono text-sm leading-relaxed">
                  <code
                    className={`hljs language-${language}`}
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                </pre>
              </div>
            );
          }
        } else {
          inCodeBlock = true;
          codeLang = line.slice(3).trim().toLowerCase();
        }
        continue;
      }

      if (inCodeBlock) {
        codeContent.push(line);
        continue;
      }

      // Headers
      if (line.startsWith('### ')) {
        elements.push(<h3 key={`h3-${keyIdx}`} className="text-lg font-bold text-gray-900 dark:text-white mt-5 mb-2">{line.slice(4)}</h3>);
        continue;
      }
      if (line.startsWith('## ')) {
        elements.push(<h2 key={`h2-${keyIdx}`} className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">{line.slice(3)}</h2>);
        continue;
      }
      if (line.startsWith('# ')) {
        elements.push(<h1 key={`h1-${keyIdx}`} className="text-2xl font-extrabold text-gray-900 dark:text-white mt-8 mb-4">{line.slice(2)}</h1>);
        continue;
      }

      // Blockquote
      if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={`bq-${keyIdx}`} className="border-l-4 border-rose-500 pl-4 py-1 my-4 italic text-gray-600 dark:text-gray-400">
            {line.slice(2)}
          </blockquote>
        );
        continue;
      }

      // List items
      if (line.startsWith('- ')) {
        elements.push(
          <li key={`li-${keyIdx}`} className="ml-6 list-disc text-gray-700 dark:text-gray-300 my-1">
            {parseInline(line.slice(2), keyIdx)}
          </li>
        );
        continue;
      }

      // Empty line
      if (line.trim() === '') {
        elements.push(<div key={`empty-${keyIdx}`} className="h-3" />);
        continue;
      }

      // Normal paragraph
      elements.push(
        <p key={`p-${keyIdx}`} className="my-2.5 text-gray-700 dark:text-gray-300 leading-relaxed text-[15px]">
          {parseInline(line, keyIdx)}
        </p>
      );
    }

    return elements;
  };

  return <div className="markdown-body space-y-1">{parseMarkdown(content)}</div>;
}
