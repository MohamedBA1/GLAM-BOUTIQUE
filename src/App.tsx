import React, { useEffect } from 'react';
import { BoutiqueProvider, useBoutique } from './context/BoutiqueContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';

// Pages
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { DressDetailsPage } from './pages/DressDetailsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { AdminDashboard } from './pages/AdminDashboard';

// Floating WhatsApp Widget
import { MessageCircle } from 'lucide-react';

const MainRouter: React.FC = () => {
  const { currentRoute, settings } = useBoutique();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute.page, currentRoute.params]);

  const renderPage = () => {
    switch (currentRoute.page) {
      case 'home':
        return <HomePage />;
      case 'collection':
        return <CollectionPage />;
      case 'search':
        return <SearchResultsPage />;
      case 'dress-details':
        return <DressDetailsPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FaqPage />;
      case 'terms-and-conditions':
        return <TermsPage />;
      case 'privacy-policy':
        return <PrivacyPolicyPage />;
      case 'admin-dashboard':
      case 'admin-dresses':
      case 'admin-customers':
      case 'admin-settings':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  const isDetailsPage = currentRoute.page === 'dress-details';

  return (
    <div className="min-h-screen flex flex-col bg-[#F4E8D2] text-[#A48F70] selection:bg-[#C3A684] selection:text-[#F4E8D2]">
      <Header />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
      <ToastContainer />

      {/* Floating WhatsApp Concierge Button (Only on non-details or desktop so mobile bottom bar isn't obscured) */}
      <a
        href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
          'Hello GLAM Boutique, I would like to inquire about dress rentals in New Damietta.'
        )}`}
        target="_blank"
        rel="noreferrer"
        className={`fixed z-40 right-4 sm:right-6 bottom-6 w-12 h-12 sm:w-14 sm:h-14 bg-[#C3A684] hover:bg-[#B99263] text-[#4A382B] hover:text-white shadow-2xl border border-[#B99263]/40 flex items-center justify-center transition-all hover:scale-110 group ${
          isDetailsPage ? 'hidden lg:flex' : 'flex'
        }`}
        aria-label="Chat with GLAM on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-[#4A382B] group-hover:text-white transition-colors" />
        <span className="sr-only">WhatsApp GLAM Boutique</span>
      </a>
    </div>
  );
};

export default function App() {
  return (
    <BoutiqueProvider>
      <MainRouter />
    </BoutiqueProvider>
  );
}
