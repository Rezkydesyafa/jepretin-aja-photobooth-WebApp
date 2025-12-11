import React from 'react';
import { ShieldCheck, Palette, Zap } from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-8 h-8 text-white" />,
    title: "Instant Processing",
    description: "Zero latency. Your photos are processed instantly in your browser using advanced Canvas API."
  },
  {
    icon: <Palette className="w-8 h-8 text-white" />,
    title: "Premium Aesthetics",
    description: "Curated selection of minimalist frames designed to make your photos look professional and elegant."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-white" />,
    title: "Privacy First",
    description: "Client-side only. Your photos never leave your device until you choose to download them."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 px-4 bg-dark-surface border-t border-dark-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-dark-text-primary">Why Choose SparkleBooth?</h2>
          <p className="text-dark-text-secondary max-w-2xl mx-auto">Designed for those who appreciate simplicity and privacy.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-dark-bg border border-dark-border hover:border-dark-text-secondary/30 transition-colors duration-300 group">
              <div className="w-16 h-16 rounded-full bg-dark-card flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-dark-border">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium text-dark-text-primary mb-3">{feature.title}</h3>
              <p className="text-dark-text-secondary leading-relaxed text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
