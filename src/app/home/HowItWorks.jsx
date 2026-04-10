import { Search, Home, Handshake } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Search size={48} className="text-primary" />,
      title: "Find Your Property",
      desc: "Search from thousands of verified listings.",
    },
    {
      icon: <Home size={48} className="text-primary" />,
      title: "Visit & Verify",
      desc: "Check all details easily.",
    },
    {
      icon: <Handshake size={48} className="text-primary" />,
      title: "Buy or Rent Safely",
      desc: "Make secure deals.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-center text-primary mb-4">
        How It Works
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {steps.map((s, i) => (
          <div key={i} className="p-8 bg-base-100 rounded-xl shadow border text-center">
            <div className="flex justify-center">{s.icon}</div>
            <h3 className="text-xl font-bold mt-4">{s.title}</h3>
            <p className="text-gray-400 mt-2">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
