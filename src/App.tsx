import { ThemeProvider } from './context/ThemeContext';
import { TermModalProvider } from './context/TermModalContext';
import { Header } from './components/layout';
import { HeroSection } from './components/hero';
import { SolarTermWheel } from './components/wheel';
import { Timeline } from './components/timeline';
import { CalendarSection } from './components/calendar';
import { TermDetailModal } from './components/term-detail';
import { ScrollProgress, Footer } from './components/ui';

function App() {
  return (
    <ThemeProvider>
      <TermModalProvider>
        <div className="min-h-screen bg-[var(--color-background)] overflow-x-hidden">
          <Header />
          <ScrollProgress />

          <main>
            <HeroSection />
            <SolarTermWheel />
            <Timeline />
            <CalendarSection />
          </main>

          <Footer />

          {/* Term Detail Modal */}
          <TermDetailModal />
        </div>
      </TermModalProvider>
    </ThemeProvider>
  );
}

export default App;
