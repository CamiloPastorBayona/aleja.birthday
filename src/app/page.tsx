import EnvelopeIntro from "@/components/intro/EnvelopeIntro";
import Hero from "@/components/Hero";
import Legend from "@/components/Legend";
import Invitation from "@/components/Invitation";
import Story from "@/components/story/Story";
import EventDetails from "@/components/EventDetails";
import Countdown from "@/components/Countdown";
import RSVP from "@/components/RSVP";
import Footer from "@/components/Footer";
import MusicToggle from "@/components/audio/MusicToggle";

export default function Home() {
  return (
    <main>
      <EnvelopeIntro />
      <Hero />
      <Legend />
      <Invitation />
      <Story />
      <EventDetails />
      <Countdown />
      <RSVP />
      <Footer />
      <MusicToggle />
    </main>
  );
}
