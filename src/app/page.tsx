import EnvelopeIntro from "@/components/intro/EnvelopeIntro";
import Hero from "@/components/Hero";
import Legend from "@/components/Legend";
import Invitation from "@/components/Invitation";
import EventBook from "@/components/EventBook";
import Countdown from "@/components/Countdown";
import RSVP from "@/components/RSVP";
import Footer from "@/components/Footer";
import MusicToggle from "@/components/audio/MusicToggle";
import ScrollCue from "@/components/ScrollCue";

export default function Home() {
  return (
    <main>
      <EnvelopeIntro />
      <Hero />
      <Legend />
      <Invitation />
      <EventBook />
      <Countdown />
      <RSVP />
      <Footer />
      <MusicToggle />
      <ScrollCue />
    </main>
  );
}
