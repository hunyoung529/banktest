'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

function isModifiedClick(e: MouseEvent) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
}

export default function GlobalNavigationLoader() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (loading) return;
      if (isModifiedClick(e)) return;

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      const targetAttr = anchor.getAttribute('target');
      if (!href) return;
      if (targetAttr === '_blank') return;
      if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      if (!href.startsWith('/')) return;

      e.preventDefault();
      setLoading(true);

      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        router.push(href);
      }, 1000);
    }

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [router, loading]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <div
        className="w-14 h-14 rounded-full border-4 border-gray-200 border-t-gray-500 animate-spin"
        aria-label="로딩"
      />
    </div>
  );
}
