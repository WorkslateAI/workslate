import { lazy, Suspense, useEffect, useState } from 'react';
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

function Home() {
  return (
    <>
      <h1 className="sr-only">Workslate AI - From Market to Market. Your Token. Everywhere.</h1>
      <Hero />
      <HowItWorks />
      <SideSection />
      <Features />
    </>
  );
}

function App() {
  const [isDocsPage, setIsDocsPage] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkDocsPage = () => {
        setIsDocsPage(window.location.hash === '#/docs');
      };
      checkDocsPage();
      window.addEventListener('hashchange', checkDocsPage);
      return () => window.removeEventListener('hashchange', checkDocsPage);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <StructuredData />
      {!isDocsPage && <Header />}
      <main className="flex-1">
        {isDocsPage ? (
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
