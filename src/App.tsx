import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import './styles/global.css';
import { Header } from './components/sections/Header';
import { Hero } from './components/sections/Hero';
import { Footer } from './components/sections/Footer';
import { StructuredData } from './seo/StructuredData';

// Below-fold sections are lazy: the streaming SSG render still emits their
// full HTML (SEO/paint unaffected), but they leave the entry bundle and React
// hydrates each Suspense boundary on demand — smaller eval, smaller TBT.
const LazyBusinessProblem = lazy(() =>
  import('./components/sections/BusinessProblem').then((module) => ({ default: module.BusinessProblem })),
);
const LazyHowItWorks = lazy(() =>
  import('./components/sections/HowItWorks').then((module) => ({ default: module.HowItWorks })),
);
const LazySideSection = lazy(() =>
  import('./components/sections/SideSection').then((module) => ({ default: module.SideSection })),
);
const LazyFeatures = lazy(() =>
  import('./components/sections/Features').then((module) => ({ default: module.Features })),
);
const LazyPromptSection = lazy(() =>
  import('./components/sections/PromptSection').then((module) => ({ default: module.PromptSection })),
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
      <Suspense fallback={null}>
        <LazyBusinessProblem />
      </Suspense>
      <Suspense fallback={null}>
        <LazyHowItWorks />
      </Suspense>
      <Suspense fallback={null}>
        <LazySideSection />
      </Suspense>
      <Suspense fallback={null}>
        <LazyFeatures />
      </Suspense>
      <Suspense fallback={null}>
        <LazyPromptSection />
      </Suspense>
    </>
  );
}

function App() {
  // For /#/docs the first client render selects Docs while the prerendered
  // DOM is Home. React logs #418 and discards hydration, but a single client
  // render is far cheaper than hydrating all of Home only to discard it.
  const [route, setRoute] = useState<Route>(getRoute);
  const [visible, setVisible] = useState(true);
  // The opacity fade-in must only run on real in-app route swaps. Applying it
  // on initial load suppresses LCP candidates inside <main> until a later
  // repaint (the hero typing completion), inflating LCP to ~3s.
  const [didNavigate, setDidNavigate] = useState(false);
  const routeRef = useRef(route);
  const pendingRouteRef = useRef<Route | null>(null);

  // Mark the app as booted so the .docs-route pre-paint hide rule (index.html)
  // stops applying once React has mounted.
  useEffect(() => {
    document.documentElement.classList.add('booted');
  }, []);

  // Fade-out -> swap -> fade-in on hash route changes (covers back/forward too)
  useEffect(() => {
    if (typeof window === 'undefined') return;

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
    // Reconcile once on mount: bootstrap is deferred past first paint, so a
    // hash change (e.g. navigating to /#/docs) may fire before this listener
    // is attached. Without this the route captured at render time goes stale.
    handleHashChange();
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
      setDidNavigate(true);
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
      <main key={route} className={`flex-1 page-transition${visible ? (didNavigate ? ' page-fade-in' : '') : ' page-fade-out'}`}>
        {route === 'docs' ? (
          <Suspense fallback={<div className="h-20" />}>
            <LazyDocs />
          </Suspense>
        ) : (
          <Home />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
