import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { CareerSection } from "@/components/sections/CareerSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { RecentWorkSection } from "@/components/sections/RecentWorkSection";
import { ToolkitSection } from "@/components/sections/ToolkitSection";

export default function Index() {
  return (
    <>
      <HeroSection />
      <ToolkitSection />
      <RecentWorkSection />
      <AboutSection />
      <CareerSection />
      <EducationSection />
      <ContactSection />
    </>
  );
}
