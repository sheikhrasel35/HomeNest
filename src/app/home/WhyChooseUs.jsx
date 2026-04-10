import { ShieldCheck, Headphones, BadgeCheck, Home } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-center text-primary mb-4">
        Why Choose Us
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-base-100 p-6 rounded-xl border shadow-md">
          <ShieldCheck className="w-12 h-12 text-primary mx-auto" />
          <h3 className="text-xl text-center mt-4">Verified Listings</h3>
        </div>

        <div className="bg-base-100 p-6 rounded-xl border shadow-md">
          <Home className="w-12 h-12 text-primary mx-auto" />
          <h3 className="text-xl text-center mt-4">Best Properties</h3>
        </div>

        <div className="bg-base-100 p-6 rounded-xl border shadow-md">
          <Headphones className="w-12 h-12 text-primary mx-auto" />
          <h3 className="text-xl text-center mt-4">24/7 Support</h3>
        </div>

        <div className="bg-base-100 p-6 rounded-xl border shadow-md">
          <BadgeCheck className="w-12 h-12 text-primary mx-auto" />
          <h3 className="text-xl text-center mt-4">Trusted Agents</h3>
        </div>
      </div>
    </div>
  );
}
