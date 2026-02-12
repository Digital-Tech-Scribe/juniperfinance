import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, CheckCircle, Shield } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import GlassCard from '../components/ui/GlassCard';
import GradientText from '../components/ui/GradientText';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import consultImage from '../assets/images/juniper_consult.webp';
import portraitImage from '../assets/images/juniper_portrait_1.webp';

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { insights, profile } = useData();
  const navigate = useNavigate();
  
  const article = insights.find(i => i.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
          <Button onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        {/* Article Hero */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={consultImage} 
              alt={article.title}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>
          
          <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
            <Link to="/" className="inline-flex items-center text-accent hover:text-accent/80 transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Insights
            </Link>
            
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20 px-3 py-1">
              {article.category}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight font-poppins">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-foreground-secondary text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                {article.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                {article.readTime}
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                Verified Insights
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-12">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12">
            {/* Main Column */}
            <article className="glass-card p-8 md:p-12 rounded-3xl relative">
              {/* Share & Actions Sidebar - Desktop only */}
              <div className="hidden lg:flex flex-col gap-4 absolute -left-16 top-12">
                <button className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground-secondary hover:text-accent border border-accent/10 hover:border-accent/40 transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground-secondary hover:text-accent border border-accent/10 hover:border-accent/40 transition-all">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>

              <div 
                className="prose prose-lg dark:prose-invert max-w-none 
                  prose-headings:font-poppins prose-headings:font-bold prose-headings:text-foreground
                  prose-p:text-foreground-secondary prose-p:leading-relaxed
                  prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-accent/5 prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6"
                dangerouslySetInnerHTML={{ __html: article.content || '<p>Content coming soon...</p>' }}
              />

              {/* End of article footer */}
              <div className="mt-16 pt-12 border-t border-border">
                <div className="flex flex-wrap items-center justify-between gap-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-accent/20">
                      <img src={portraitImage} alt={profile.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground font-poppins">{profile.name}</p>
                      <p className="text-sm text-foreground-muted">{profile.title}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                     <Button variant="outline" className="rounded-full">Share Article</Button>
                     <Button className="bg-accent text-white rounded-full px-8">Follow for Updates</Button>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Quick Profile */}
              <GlassCard className="p-6" hover>
                <h4 className="font-bold text-lg mb-4 font-poppins">About Author</h4>
                <p className="text-sm text-foreground-secondary mb-6 italic">
                   "Helping investors build disciplined wealth strategies for over 12 years."
                </p>
                <Link to="/">
                  <Button variant="outline" className="w-full border-accent/30 text-accent hover:bg-accent/10">
                    View My Expertise
                  </Button>
                </Link>
              </GlassCard>

              {/* Newsletter */}
              <GlassCard className="p-6 bg-accent/5" glow>
                 <h4 className="font-bold text-lg mb-2 font-poppins">Market Weekly</h4>
                 <p className="text-sm text-foreground-muted mb-4">Join 5,000+ investors receiving our premium analysis.</p>
                 <div className="space-y-3">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none text-sm transition-all"
                    />
                    <Button className="w-full bg-accent text-white shadow-lg shadow-accent/20">
                      Subscribe Now
                    </Button>
                 </div>
              </GlassCard>

              {/* Legal Note */}
              <div className="text-[10px] text-foreground-muted uppercase tracking-widest leading-loose">
                <div className="flex items-center gap-1 mb-2 font-bold text-accent">
                   <Shield className="w-3 h-3" />
                   Disclaimer
                </div>
                The analysis provided in this article represents our professional viewpoint at the time of publication and is subject to change. It does not constitute specific investment advice.
              </div>
            </aside>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticlePage;
