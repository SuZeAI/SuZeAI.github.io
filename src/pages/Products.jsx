import React from 'react';
import { ShoppingCart, Sparkles, Code2, Layers } from 'lucide-react';

export default function Products({ products }) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Products
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Commercial tools, templates, and SaaS products I build and support.
        </p>
      </div>

      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {products.map(product => (
            <div
              key={product.id}
              className="flex flex-col justify-between p-6 md:p-8 bg-white dark:bg-[#16171d] rounded-2xl border border-gray-150 dark:border-gray-800/80 hover:border-gray-300 dark:hover:border-gray-700/85 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.03)] group relative overflow-hidden"
            >
              {/* Product Badge Decorative */}
              {product.badge && (
                <div className="absolute top-0 right-0">
                  <span className="inline-block px-3 py-1.5 text-[10px] font-bold tracking-wider text-rose-700 bg-rose-50 dark:text-rose-350 dark:bg-rose-950/20 rounded-bl-xl uppercase">
                    {product.badge}
                  </span>
                </div>
              )}

              <div className="space-y-4">
                {/* Icon & Title */}
                <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800/60 flex items-center justify-center text-rose-500">
                  {product.id.includes('api') ? (
                    <Code2 className="w-6 h-6" />
                  ) : (
                    <Layers className="w-6 h-6" />
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-450 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {product.tech && product.tech.map(t => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 text-xs font-semibold bg-gray-50 dark:bg-gray-850 text-gray-600 dark:text-gray-400 rounded border border-gray-100 dark:border-gray-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Action button */}
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">PRICE</span>
                  <span className="text-lg font-black text-gray-900 dark:text-white">{product.price}</span>
                </div>

                <a
                  href={product.url}
                  className="px-5 py-2.5 bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:bg-gray-850 dark:hover:bg-gray-105 font-bold text-sm rounded-lg transition-colors flex items-center gap-2 group/btn shadow-sm"
                >
                  <ShoppingCart className="w-4 h-4 shrink-0" />
                  <span>Get Access</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
          <p className="text-gray-500 dark:text-gray-400 font-medium">No products listed at this time.</p>
        </div>
      )}
    </div>
  );
}
