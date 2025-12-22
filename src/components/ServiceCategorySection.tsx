import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  CheckCircle2, 
  Building2,
  MapPin,
  Clock,
  DollarSign,
  Star
} from "lucide-react";

export interface ServiceEntity {
  id: string;
  name: string;
  jurisdiction: string;
  type: string;
  description: string;
  features: string[];
  price: string;
  timeline: string;
  popular?: boolean;
  category: string;
}

interface ServiceCategorySectionProps {
  categoryName: string;
  categoryDescription: string;
  entities: ServiceEntity[];
  index: number;
}

export function ServiceCategorySection({ 
  categoryName, 
  categoryDescription, 
  entities,
  index
}: ServiceCategorySectionProps) {
  if (entities.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-16"
    >
      {/* Category Header */}
      <div className="mb-8">
        <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/20">
          {entities.length} {entities.length === 1 ? 'option' : 'options'}
        </Badge>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          {categoryName}
        </h2>
        <p className="text-muted-foreground max-w-2xl">
          {categoryDescription}
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entities.map((entity, entityIndex) => (
          <motion.div
            key={entity.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: entityIndex * 0.05 }}
          >
            <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border-border/50 hover:border-accent/50 group relative overflow-hidden">
              {entity.popular && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-accent text-accent-foreground">
                    <Star className="h-3 w-3 mr-1" />
                    Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg group-hover:text-accent transition-colors pr-16">
                      {entity.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {entity.jurisdiction}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="w-fit mt-2">
                  {entity.type}
                </Badge>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground mb-4">
                  {entity.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  {entity.features.slice(0, 4).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </div>
                  ))}
                  {entity.features.length > 4 && (
                    <span className="text-sm text-muted-foreground">
                      +{entity.features.length - 4} more features
                    </span>
                  )}
                </div>

                <div className="mt-auto pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{entity.timeline}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-accent">
                      <DollarSign className="h-4 w-4" />
                      <span>{entity.price}</span>
                    </div>
                  </div>
                  <Button className="w-full group/btn" asChild>
                    <Link to={`/contact?service=${entity.id}`}>
                      Build Your Quote
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
