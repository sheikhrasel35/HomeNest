import HeroSlider from "./home/HeroSlider";
import FeaturedRealEstate from "./home/FeaturedRealEstate";
import WhyChooseUs from "./home/WhyChooseUs";
import CustomerTestimonials from "./home/CustomerTestimonials";
import HowItWorks from "./home/HowItWorks";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <FeaturedRealEstate />
      <WhyChooseUs />
      <CustomerTestimonials />
      <HowItWorks />
    </div>
  );
}
