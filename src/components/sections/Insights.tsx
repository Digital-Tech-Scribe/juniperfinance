import React from 'react';
import { Clock, ArrowRight, BookOpen, FileText, Lightbulb, TrendingUp } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import GlassCard from '../ui/GlassCard';
import GradientText from '../ui/GradientText';
import type { Insight } from '../../data/mockData';

const categoryIcons: Record<string, React.ElementType> = {
  'Market Insights': TrendingUp,
  'White Paper': FileText,
  'Education': BookOpen,
  'Strategy': Lightbulb
};

// Simplified category colors - using only accent color variations
const categoryColors: Record<string, string> = {
  'Market Insights': 'bg-accent/10 text-accent border-accent/30',
  'White Paper': 'bg-accent/10 text-accent border-accent/30',
  'Education': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  'Strategy': 'bg-accent/10 text-accent border-accent/30'
};

const Insights: React.FC = () => {
  const { insights } = useData();
  
  if (!insights || insights.length === 0) {
    return null;
  }
  
  const featuredInsight: Insight = insights[0];
  
  return (
    <section id="insights" className="py-20 lg:py-28 bg-background-secondary relative overflow-hidden">
      {/* Background Elements - Subtle accent color */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
              Insights & Education
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-poppins">
              Latest <GradientText>Market Analysis</GradientText>
            </h2>
          </div>
          <Button variant="outline" className="border-border text-foreground-secondary hover:bg-background-tertiary hover:border-accent/50 self-start sm:self-auto">
            View All Articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Featured Article */}
        <div className="mb-8">
          <GlassCard className="group overflow-hidden" hover>
            <div className="grid lg:grid-cols-2">
              {/* Image */}
              <div className="aspect-video lg:aspect-auto bg-background-secondary relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center border border-accent/20">
                    <TrendingUp className="w-10 h-10 text-accent" />
                  </div>
                </div>
                {/* Glass Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <Badge className={`absolute top-4 left-4 border ${categoryColors[featuredInsight.category]}`}>
                  {featuredInsight.category}
                </Badge>
              </div>
              
              {/* Content */}
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-foreground-muted mb-4">
                  <span>{featuredInsight.date}</span>
                  <span className="w-1 h-1 bg-border rounded-full" />
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredInsight.readTime}
                  </div>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 font-poppins group-hover:text-accent transition-colors">
                  {featuredInsight.title}
                </h3>
                <p className="text-foreground-secondary mb-6 leading-relaxed">
                  {featuredInsight.excerpt}
                </p>
                <Button className="bg-accent hover:bg-accent/90 text-white self-start shadow-lg">
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Article Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {insights.slice(1).map((article) => {
            const IconComponent = categoryIcons[article.category] || BookOpen;
            return (
              <article
                key={article.id}
                className="group"
              >
                <GlassCard className="overflow-hidden h-full" hover>
                  {/* Image */}
                  <div className="aspect-video bg-background-secondary relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <IconComponent className="w-10 h-10 text-foreground-muted" />
                    </div>
                    {/* Glass Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Badge className={`absolute top-3 left-3 text-xs border ${categoryColors[article.category]}`}>
                      {article.category}
                    </Badge>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-foreground-muted mb-3">
                      <span>{article.date}</span>
                      <span className="w-1 h-1 bg-border rounded-full" />
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors font-poppins">
                      {article.title}
                    </h3>
                    <p className="text-sm text-foreground-secondary line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </GlassCard>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Insights;
