import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

let mermaidId = 0;

export default function Mermaid({ chart }) {
  const ref = useRef(null);
  const [svg, setSvg] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      const isDark = document.documentElement.classList.contains('dark');
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: isDark ? 'dark' : 'default',
        fontFamily: 'inherit',
      });

      try {
        const id = `mermaid-${mermaidId++}`;
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled) {
          setSvg(svg);
          setError(false);
        }
      } catch (e) {
        if (!cancelled) {
          setError(true);
        }
      }
    };

    render();

    // Re-render when the color theme toggles
    const observer = new MutationObserver(() => render());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [chart]);

  if (error) {
    return (
      <pre className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg overflow-x-auto my-4 font-mono text-sm text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-800/80">
        <code>{chart}</code>
      </pre>
    );
  }

  return (
    <div
      ref={ref}
      className="my-4 flex justify-center overflow-x-auto rounded-lg border border-gray-100 dark:border-gray-800/80 bg-gray-50 dark:bg-gray-900/50 p-4 [&_svg]:max-w-full [&_svg]:h-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
