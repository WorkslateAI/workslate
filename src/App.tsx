import { lazy, Suspense } from 'react';
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
  return (
    <div className="min-h-screen flex flex-col">
      <StructuredData />
      <Header />
      <main className="flex-1">
        <Home />
      </main>
      <Suspense fallback={<div className="h-20" />}>
        <LazyFooter />
      </Suspense>
    </div>
  );
}

export default App;
