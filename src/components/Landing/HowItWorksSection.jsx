import React from 'react';

const steps = [
  {
    num: "01",
    title: "Snap",
    text: "Allow camera access and strike your best pose. Our mirror mode ensures you look your best."
  },
  {
    num: "02",
    title: "Style",
    text: "Browse our collection of frames. From retro vibes to minimal borders, find your perfect match."
  },
  {
    num: "03",
    title: "Save",
    text: "Download instantly to your device or save to your local gallery for safekeeping."
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
        <div className="md:w-1/3 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
            Simple.<br/>Fast.<br/><span className="text-dark-text-secondary font-light">Beautiful.</span>
          </h2>
          <p className="text-dark-text-secondary">Three steps to your perfect photo.</p>
        </div>

        <div className="md:w-2/3 grid gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-6 p-6 rounded-xl hover:bg-dark-surface/50 transition-colors">
              <span className="text-4xl font-thin text-dark-text-secondary/30">{step.num}</span>
              <div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-dark-text-secondary text-sm">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
