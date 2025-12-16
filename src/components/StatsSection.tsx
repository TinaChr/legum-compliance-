import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  {
    category: "Financial Impact",
    items: [
      { value: "3-5x", label: "Increase in enterprise deal closures" },
      { value: "15-30%", label: "Valuation premium for certified companies" },
      { value: "50-70%", label: "Reduction in security incident costs" },
    ],
  },
  {
    category: "Operational Excellence",
    items: [
      { value: "85%+", label: "First-time certification success rate" },
      { value: "1-6", label: "Months to certification" },
      { value: "100%", label: "Client retention rate" },
    ],
  },
  {
    category: "Market Access",
    items: [
      { value: "Fortune 500", label: "Partnerships unlocked" },
      { value: "4+", label: "Continents covered" },
      { value: "15+", label: "Regulatory frameworks" },
    ],
  },
];

export const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Proven Results
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Client Success Metrics
          </h2>
          <p className="text-lg text-muted-foreground">
            Real impact delivered to businesses across Africa and beyond.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((section, sectionIndex) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: sectionIndex * 0.15 }}
              className="bg-card backdrop-blur-sm rounded-2xl p-8 border border-border shadow-md"
            >
              <h3 className="text-primary font-bold text-lg mb-6">{section.category}</h3>
              <div className="space-y-6">
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: sectionIndex * 0.15 + itemIndex * 0.1 }}
                  >
                    <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                      {item.value}
                    </div>
                    <div className="text-muted-foreground text-sm">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};