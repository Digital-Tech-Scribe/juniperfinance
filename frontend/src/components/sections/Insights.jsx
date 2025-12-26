import React from 'react';
import { Clock, ArrowRight, BookOpen, FileText, Lightbulb, TrendingUp } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const categoryIcons = {
  'Market Insights': TrendingUp,
  'White Paper': FileText,
  'Education': BookOpen,
  'Strategy': Lightbulb
};

const categoryColors = {
  'Market Insights': 'bg-blue-100 text-blue-700',
  'White Paper': 'bg-purple-100 text-purple-700',
  'Education': 'bg-emerald-100 text-emerald-700',
  'Strategy': 'bg-amber-100 text-amber-700'
};

const Insights = () => {
  const { insights } = useData();
  
  if (!insights || insights.length === 0) {
    return null;
  }
  
  return (
    <section id="insights" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Insights & Education
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Latest Market Analysis
            </h2>
          </div>
          <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-white self-start sm:self-auto">
            View All Articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Featured Article */}
        <div className="mb-8">
          <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="grid lg:grid-cols-2">
              {/* Image */}
              <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-slate-200 to-slate-300 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-slate-400/50 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-10 h-10 text-slate-600" />
                  </div>
                </div>
                <Badge className={`absolute top-4 left-4 ${categoryColors[insights[0].category]}`}>
                  {insights[0].category}
                </Badge>
              </div>
              
              {/* Content */}
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                  <span>{insights[0].date}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {insights[0].readTime}
                  </div>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 group-hover:text-slate-700 transition-colors">
                  {insights[0].title}
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {insights[0].excerpt}
                </p>
                <Button className="bg-slate-900 hover:bg-slate-800 text-white self-start">
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {insights.slice(1).map((article) => {
            const IconComponent = categoryIcons[article.category] || BookOpen;
            return (
              <article
                key={article.id}
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <IconComponent className="w-10 h-10 text-slate-400" />
                  </div>
                  <Badge className={`absolute top-3 left-3 text-xs ${categoryColors[article.category]}`}>
                    {article.category}
                  </Badge>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span>{article.date}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </div>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-slate-700 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Insights;
