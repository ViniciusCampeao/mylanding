import { createFileRoute } from "@tanstack/react-router";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { GsapProvider } from "@/components/providers/gsap-provider";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { SkillsSection } from "@/components/sections/skills";
import { PortfolioSection } from "@/components/sections/portfolio";
import { InfraSection } from "@/components/sections/infra";
import { ContactSection } from "@/components/sections/contact";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <SmoothScrollProvider>
      {/* Navbar e Hero não dependem de ScrollTrigger — montam imediatamente */}
      <Navbar />
      <main>
        <HeroSection />
        {/* GsapProvider envolve só as seções que usam ScrollTrigger/DrawSVG.
            Os plugins carregam antes delas montarem, eliminando a race condition. */}
        <GsapProvider>
          <AboutSection />
          <SkillsSection />
          <PortfolioSection />
          <InfraSection />
        </GsapProvider>
        {/* Contact não usa GSAP diretamente */}
        <ContactSection />
      </main>
    </SmoothScrollProvider>
  );
}
