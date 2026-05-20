import CTA from "@/Components/CTA";
import Hero from "@/Components/Hero";
import HowItWorks from "@/Components/HowItWorks";
import Testimonials from "@/Components/Testimonials";
import TopratedPage from "@/Components/Toprated";
import WhyChooseUs from "@/Components/WhyChooseUs";


export default function Home() {
  return (
    <div>
      <Hero />
      <TopratedPage />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </div>
  );
}
