import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/layout';
import { HeroSection } from './components/hero';
import { SolarTermWheel } from './components/wheel';
import { Timeline } from './components/timeline';
import { TermSection } from './components/term-detail';
import { ScrollProgress, Footer } from './components/ui';
import { solarTerms } from './data/solarTerms';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--color-background)] overflow-x-hidden">
        <Header />
        <ScrollProgress />
        
        <main>
          <HeroSection />
          <SolarTermWheel />
          <Timeline />
          
          {/* All 24 Term Detail Sections */}
          <div id="terms">
            {solarTerms.map((term, index) => (
              <TermSection key={term.id} term={term} index={index} />
            ))}
          </div>
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
