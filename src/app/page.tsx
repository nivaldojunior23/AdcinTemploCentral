import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Schedule from "@/components/Schedule";
import YouTubeSection from "@/components/YouTubeSection";
import Studies from "@/components/Studies";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Schedule />
        <YouTubeSection />
        <Studies />
        <Location />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
