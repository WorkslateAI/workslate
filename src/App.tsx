import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import './styles/global.css';
import { Header } from './components/sections/Header';
import { Hero } from './components/sections/Hero';
import { HowItWorks } from './components/sections/HowItWorks';
import { SideSection } from './components/sections/SideSection';
import { Features } from './components/sections/Features';
import { StructuredData } from './seo/StructuredData';

const LazyFooter = lazy(() =>
  import('./components/sections/Footer').then((module) => ({ default: module.Footer })),
);
const LazyDocs = lazy(() =>
  import('./pages/Docs').then((module) => ({ default: module.Docs })),
);

const FADE_OUT_MS = 250;

type Route = 'home' | 'docs';

function getRoute(): Route {
  if (typeof window === 'undefined') return 'home';
  return window.location.hash === '#/docs' ? 'docs' : 'home';
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <SideSection />
      <Features />
    </>
  );
}

function App() {
  const [route, setRoute] = useState<Route>(getRoute);
  const [visible, setVisible] = useState(true);
  const routeRef = useRef(route);
  const pendingRouteRef = useRef<Route | null>(null);

  // Fade-out -> swap -> fade-in on hash route changes (covers back/forward too)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Reconcile in case the hash changed before this listener was attached
    // (e.g. navigation during hydration) — otherwise the app stays on 'home'.
    const current = getRoute();
    if (current !== routeRef.current) {
      pendingRouteRef.current = null;
      routeRef.current = current;
      window.scrollTo(0, 0);
      setRoute(current);
      setVisible(true);
    }

    const handleHashChange = () => {
      const next = getRoute();
      if (next === routeRef.current) return;

      if (prefersReducedMotion()) {
        routeRef.current = next;
        window.scrollTo(0, 0);
        setRoute(next);
        return;
      }

      pendingRouteRef.current = next;
      setVisible(false);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // After the fade-out completes, commit the pending route and fade in
  useEffect(() => {
    if (visible || pendingRouteRef.current === null) return;
    const next = pendingRouteRef.current;
    const timeout = window.setTimeout(() => {
      pendingRouteRef.current = null;
      routeRef.current = next;
      window.scrollTo(0, 0);
      setRoute(next);
      setVisible(true);
    }, FADE_OUT_MS);
    return () => window.clearTimeout(timeout);
  }, [visible]);

  // Fade out before leaving the SPA for static (.html) pages
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleClick = (event: MouseEvent) => {
      const anchor = (event.target as Element).closest('a[href]');
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      if (!href.endsWith('.html')) return;
      if (anchor.getAttribute('target') === '_blank' || event.defaultPrevented) return;

      event.preventDefault();
      if (prefersReducedMotion()) {
        window.location.href = href;
        return;
      }
      document.body.classList.add('page-leaving');
      window.setTimeout(() => {
        window.location.href = href;
      }, FADE_OUT_MS);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Focus the page heading after each route swap; if it has not mounted yet
  // (lazy route inside Suspense), focus it as soon as it appears.
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const tryFocusHeading = () => {
      const heading = document.getElementById('page-heading');
      if (heading instanceof HTMLElement) {
        heading.focus({ preventScroll: true });
        return true;
      }
      return false;
    };

    if (tryFocusHeading()) return;

    const observer = new MutationObserver(() => {
      if (tryFocusHeading()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [route, visible]);

  return (
    <div className="min-h-screen flex flex-col">
      <StructuredData />
      <Header />
      <main key={route} className={`flex-1 page-transition${visible ? ' page-fade-in' : ' page-fade-out'}`}>
        {route === 'docs' ? (
          <Suspense fallback={<div className="h-20" />}>
            <LazyDocs />
          </Suspense>
        ) : (
          <Home />
        )}
      </main>
      <Suspense fallback={<div className="h-20" />}>
        <LazyFooter />
      </Suspense>
    </div>
  );
}

export default App;
