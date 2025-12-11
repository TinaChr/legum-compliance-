import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Rocket, TrendingUp } from "lucide-react";

const valueCards = [
  {
    icon: Briefcase,
    title: "For CEOs",
    subtitle: "Unlock Market Access",
    points: [
      "Fortune 500 demand SOC 2, ISO 27001",
      "GDPR, NDPR unlocks EU & African markets",
      "Compliance badges convert enterprise prospects",
      "Focus on core business—we handle compliance",
    ],
  },
  {
    icon: Rocket,
    title: "For Founders",
    subtitle: "De-Risk Your Vision",
    points: [
      "Security certifications accelerate funding",
      "Compliance readiness shortens due diligence",
      "Exit acceleration with certified operations",
      "Premium valuations for compliant companies",
    ],
  },
  {
    icon: TrendingUp,
    title: "For Investors",
    subtitle: "Protect Portfolio Value",
    points: [
      "Proactive compliance prevents exposure",
      "15-30% higher multiples for certified companies",
      "Governance frameworks improve metrics",
      "Risk mitigation across portfolio",
    ],
  },
];

export const ValueProposition = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            The Business Case
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Strategic Compliance = Competitive Advantage
          </h2>
          <p className="text-lg text-muted-foreground">
            Compliance is not a barrier to innovation—it's the foundation for sustainable growth 
            and institutional adoption.
          </p>
        </motion.div>

        {/* Value Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {valueCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="bg-card rounded-2xl p-8 h-full border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <card.icon className="h-7 w-7 text-accent" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-1">{card.title}</h3>
                <p className="text-accent font-semibold mb-6">{card.subtitle}</p>

                {/* Points */}
                <ul className="space-y-3">
                  {card.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="h-2 w-2 rounded-full bg-accent mt-2 shrink-0" />
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Decorative gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
