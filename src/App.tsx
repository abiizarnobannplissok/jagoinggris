import { lazy, Suspense, useEffect, useState, memo } from 'react';
import { trackPageView } from './utils/tracking';

const Hero = lazy(() => import('./components/Hero'));
const ThankYou = lazy(() => import('./components/ThankYou'));
const FutureSuccess = lazy(() => import('./components/FutureSuccess'));
const BenefitsSection = lazy(() => import('./components/BenefitsSection'));
const SocialProof = lazy(() => import('./components/SocialProof'));
const PricingSection = lazy(() => import('./components/PricingSection'));
const FAQ = lazy(() => import('./components/FAQ'));
const StoryAfterFAQ = lazy(() => import('./components/StoryAfterFAQ'));
const Guarantee = lazy(() => import('./components/Guarantee'));
const FinalCTA = lazy(() => import('./components/FinalCTA'));

const LoadingFallback = memo(function LoadingFallback() {
  return (
    <div style={{ 
      minHeight: '100px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: '#666',
      fontSize: '14px'
    }}>
      Loading...
    </div>
  );
});

const App = memo(function App() {
  const [currentPage, setCurrentPage] = useState<'main' | 'thankyou'>('main');

  useEffect(() => {
    trackPageView();
    
    const checkPath = () => {
      const path = window.location.pathname;
      if (path === '/terima-kasih' || path === '/thankyou') {
        setCurrentPage('thankyou');
      } else {
        setCurrentPage('main');
      }
    };

    checkPath();
    window.addEventListener('popstate', checkPath);
    
    return () => {
      window.removeEventListener('popstate', checkPath);
    };
  }, []);

  if (currentPage === 'thankyou') {
    return (
      <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
        <Suspense fallback={<LoadingFallback />}>
          <ThankYou />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Suspense fallback={<LoadingFallback />}>
        <Hero />
      </Suspense>
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
});

export default App;
