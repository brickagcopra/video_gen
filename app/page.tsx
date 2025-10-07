import Hero from "@/components/landing-page/hero";
import Features from "@/components/landing-page/features";
import Footer from "@/components/landing-page/footer";
import Parallax from "@/components/landing-page/parallax";
import Pricing from "@/components/landing-page/pricing";
import Reviews from "@/components/landing-page/reviews";
import FAQ from "@/components/landing-page/faq";
import CTA from "@/components/landing-page/cta";
import HowItWorks from "@/components/landing-page/how-it-works";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Hero />

      <Parallax
        url="/dashboard.jpg"
        paddingTop="pt-5"
        paddingBottom="pb-5"
      ></Parallax>

      <Features />

      <Parallax url="/dashboard.jpg"></Parallax>

      <HowItWorks />

      <Parallax url="/create-video.jpg"></Parallax>

      <Pricing />

      <Parallax
        url="/uhd-laser.jpg"
        paddingTop="pt-5"
        paddingBottom="pb-5"
      ></Parallax>

      <Reviews />

      <Parallax
        url="/create-video.jpg"
        paddingTop="pt-20"
        paddingBottom="pb-20"
      ></Parallax>

      <FAQ />

      <CTA />

      <Footer />
    </div>
  );
}
