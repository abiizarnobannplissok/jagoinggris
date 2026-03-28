import Hero from './components/Hero';
import { lazy, Suspense, useEffect } from 'react';
import { trackPageView } from './utils/tracking';

const FutureSuccess = lazy(() => import('./components/FutureSuccess'));
const BenefitsSection = lazy(() => import('./components/BenefitsSection'));
const SocialProof = lazy(() => import('./components/SocialProof'));
const PricingSection = lazy(() => import('./components/PricingSection'));
const FAQ = lazy(() => import('./components/FAQ'));
const StoryAfterFAQ = lazy(() => import('./components/StoryAfterFAQ'));
const Guarantee = lazy(() => import('./components/Guarantee'));
const FinalCTA = lazy(() => import('./components/FinalCTA'));

function LoadingFallback() {
  return (
    <div style={{ 
      minHeight: '200px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: '#666',
      fontSize: '14px'
    }}>
      Loading...
    </div>
  );
}

function App() {
  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Hero />
      <Suspense fallback={<LoadingFallback />}>
        <FutureSuccess />
        <BenefitsSection />
        <SocialProof />
        <PricingSection />
        <FAQ />
        <StoryAfterFAQ />
        <Guarantee />
        <FinalCTA />
      </Suspense>
    </div>
  );
}

export default App;
