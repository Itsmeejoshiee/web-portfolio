import { AchievementsSection } from './components/AchievementsSection';
import { BlogPreview } from './components/BlogPreview';
import { ContactSection } from './components/ContactSection';
import { ExperienceSection } from './components/ExperienceSection';
import { HeroSection } from './components/HeroSection';
import { SelectedWorkPreview } from './components/SelectedWorkPreview';
import { StudioSection } from './components/StudioSection';
import { TemplatesPreview } from './components/TemplatesPreview';
import { ToolboxSection } from './components/ToolboxSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <SelectedWorkPreview />
      <StudioSection />
      <TemplatesPreview />
      <ExperienceSection />
      <AchievementsSection />
      <ToolboxSection />
      <BlogPreview />
      <ContactSection />
    </>
  );
}
