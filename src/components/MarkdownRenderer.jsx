import React from 'react';

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
          codeContent = [];
          elements.push(
            <pre key={`code-${keyIdx}`} className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg overflow-x-auto my-4 font-mono text-sm text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-800/80">
              <code>{codeText}</code>
            </pre>
          );
        } else {
          inCodeBlock = true;
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
