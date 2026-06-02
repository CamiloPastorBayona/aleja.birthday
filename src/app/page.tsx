import Hero from "@/components/Hero";
import Invitation from "@/components/Invitation";
import EventDetails from "@/components/EventDetails";
import Countdown from "@/components/Countdown";
import RSVP from "@/components/RSVP";
import Footer from "@/components/Footer";
import Sparkles from "@/components/Sparkles";

export default function Home() {
  return (
    <main>
      <Sparkles />
      <Hero />
      <Invitation />
      <EventDetails />
      <Countdown />
      <RSVP />
      <Footer />
    </main>
  );
}
