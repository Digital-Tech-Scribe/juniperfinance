// Mock data for Juniper Broz Investment Portfolio

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  description: string;
  finraLink: string;
  email: string;
  whatsapp: string;
  telegram: string;
  yearsExperience: number;
  clientsServed: number;
  assetsManaged: string;
  instagram?: string;
  linkedin?: string;
}

export interface PhilosophyPoint {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export interface PerformanceSummary {
  ytdReturn: string;
  avgAnnualReturn: string;
  sharpeRatio: string;
  maxDrawdown: string;
}

export interface ChartDataPoint {
  month: string;
  portfolio: number;
  benchmark: number;
}

export interface AllocationItem {
  asset: string;
  percentage: number;
  color: string;
}

export interface PerformanceData {
  summary: PerformanceSummary;
  disclaimer: string;
  chartData: ChartDataPoint[];
  allocation: AllocationItem[];
}

export interface Insight {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface NavLink {
  label: string;
  href: string;
}

export const profileData: ProfileData = {
  name: "Juniper Broz",
  title: "Investment Specialist",
  tagline: "Strategic Wealth Building Through Disciplined Investment",
  description: "Registered investment professional specializing in forex, cryptocurrency, and stock options with a proven track record of data-driven portfolio management.",
  finraLink: "https://brokercheck.finra.org/individual/summary/6740971",
  email: "contact@juniperbroz.com",
  whatsapp: "+1 6834250603",
  telegram: "@juniperbrozforex",
  yearsExperience: 12,
  clientsServed: 500,
  assetsManaged: "$45M+",
  instagram: "https://www.instagram.com/juniper_broz?igsh=MXgzeWQzMncwM3dnOA%3D%3D&utm_source=qr",
  linkedin: "https://www.linkedin.com/in/juniper-broz-4bb244261?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
};

export const philosophyPoints: PhilosophyPoint[] = [
  {
    id: 1,
    title: "Long-Term Value Investing",
    description: "We focus on identifying undervalued assets with strong fundamentals, building positions designed to compound over time rather than chase short-term gains.",
    icon: "TrendingUp"
  },
  {
    id: 2,
    title: "Disciplined Risk Management",
    description: "Every investment decision is backed by rigorous risk assessment. We protect capital first, ensuring sustainable growth through market cycles.",
    icon: "Shield"
  },
  {
    id: 3,
    title: "Data-Driven Decisions",
    description: "Our strategies are built on quantitative analysis, market research, and economic indicators—not speculation or emotion.",
    icon: "BarChart3"
  },
  {
    id: 4,
    title: "Transparent Communication",
    description: "Clients receive regular updates, clear reporting, and direct access. We believe trust is built through consistent, honest communication.",
    icon: "MessageSquare"
  }
];

export const services: Service[] = [
  {
    id: 1,
    title: "Discretionary Portfolio Management",
    description: "Full-service portfolio management tailored to your risk tolerance and financial goals. We handle the day-to-day decisions while keeping you informed.",
    features: ["Personalized asset allocation", "Quarterly rebalancing", "Tax-efficient strategies", "Monthly performance reports"],
    icon: "Briefcase"
  },
  {
    id: 2,
    title: "Wealth Planning",
    description: "Comprehensive financial planning that integrates investments with your broader life goals—retirement, education, estate planning, and more.",
    features: ["Retirement projections", "Risk assessment", "Goal-based planning", "Insurance review"],
    icon: "Target"
  },
  {
    id: 3,
    title: "Active Trading Strategies",
    description: "For qualified investors seeking higher returns, we offer managed forex, crypto, and options strategies with strict risk controls.",
    features: ["Forex signals & execution", "Crypto portfolio management", "Options strategies", "Real-time alerts"],
    icon: "LineChart"
  }
];

export const performanceData: PerformanceData = {
  summary: {
    ytdReturn: "+18.4%",
    avgAnnualReturn: "+14.2%",
    sharpeRatio: "1.85",
    maxDrawdown: "-8.3%"
  },
  disclaimer: "Past performance does not guarantee future results. All investments involve risk, including loss of principal.",
  chartData: [
    { month: "Jan", portfolio: 100, benchmark: 100 },
    { month: "Feb", portfolio: 103.2, benchmark: 101.5 },
    { month: "Mar", portfolio: 101.8, benchmark: 99.2 },
    { month: "Apr", portfolio: 106.5, benchmark: 102.8 },
    { month: "May", portfolio: 109.1, benchmark: 104.1 },
    { month: "Jun", portfolio: 108.2, benchmark: 103.5 },
    { month: "Jul", portfolio: 112.4, benchmark: 106.2 },
    { month: "Aug", portfolio: 115.8, benchmark: 107.8 },
    { month: "Sep", portfolio: 114.2, benchmark: 105.9 },
    { month: "Oct", portfolio: 117.5, benchmark: 108.4 },
    { month: "Nov", portfolio: 120.1, benchmark: 110.2 },
    { month: "Dec", portfolio: 118.4, benchmark: 109.5 }
  ],
  allocation: [
    { asset: "Equities", percentage: 40, color: "#1e3a5a" },
    { asset: "Forex", percentage: 25, color: "#3b82f6" },
    { asset: "Cryptocurrency", percentage: 20, color: "#64748b" },
    { asset: "Options", percentage: 10, color: "#94a3b8" },
    { asset: "Cash", percentage: 5, color: "#cbd5e1" }
  ]
};

export const insights: Insight[] = [
  {
    id: 1,
    title: "Navigating Volatility: Q3 2025 Market Outlook",
    excerpt: "Our analysis of current market conditions and strategic positioning for the months ahead.",
    category: "Market Insights",
    date: "July 15, 2025",
    readTime: "8 min read",
    content: `
      <p>The third quarter of 2025 has arrived with a complex set of market dynamics that require a disciplined, data-driven approach. As the global economy continues its transition, investors are facing a landscape defined by diverging central bank policies, evolving regulatory frameworks for digital assets, and the persistent influence of geopolitical shifts.</p>
      
      <h3>The Macro Landscape: A Global Rebalancing</h3>
      <p>Inflationary pressures have begun to stabilize in major economies, but the path forward remains uneven. While some central banks are contemplating the first phase of interest rate reductions, others remain cautious, citing resilient labor markets and service sector stickiness. For the strategic investor, this creates a unique window of opportunity in both currencies and equities.</p>
      
      <p>Our positioning for Q3 involves a "Barbell Strategy"—maintaining exposure to high-quality, defensive value stocks while selectively engaging with high-beta growth sectors that have shown strong fundamental consolidation over the past six months.</p>
      
      <h3>The Forex Frontier: Diversification is Key</h3>
      <p>In the currency markets, we are observing a significant shift in carry trade dynamics. The yen has shown signs of structural recovery as policy gaps narrow, while emerging market currencies continue to offer attractive yields for those with a higher risk appetite. Our focus remains on the G10 pairs where economic surprises are most likely to drive directional trends.</p>
      
      <blockquote>
        "Success in volatile markets isn't about predicting the storm, but about having a vessel built to withstand any weather." 
        <footer className="text-sm border-none pt-2">— Juniper Broz</footer>
      </blockquote>
      
      <h3>Digital Assets: Maturity and Regulation</h3>
      <p>The cryptocurrency sector is entering a new era of institutional maturity. With the approval of several spot-based ETFs and the tightening of global regulatory standards, volatility has shifted from speculative noise to fundamental price discovery. We remain constructive on the "Blue Chip" digital assets while maintaining a vigilant eye on the evolving Altcoin landscape.</p>
      
      <h3>Strategic Takeaways for Investors</h3>
      <ul>
        <li><strong>Maintain Liquidity:</strong> Cash reserves should be tactically allocated to take advantage of short-term pullbacks.</li>
        <li><strong>Review Asset Allocation:</strong> Ensure your portfolio is not over-concentrated in any single sector or geography.</li>
        <li><strong>Focus on Fundamentals:</strong> In a high-rate environment, earnings quality and balance sheet strength are the ultimate arbiters of value.</li>
      </ul>
      
      <p>At Juniper Broz Investment, our commitment to your financial success is unwavering. We continue to monitor these developments in real-time, adjusting our strategies to ensure that your capital is not just protected, but positioned for long-term growth.</p>
    `
  },
  {
    id: 2,
    title: "Understanding Cryptocurrency Regulation: What Investors Need to Know",
    excerpt: "A comprehensive guide to the evolving regulatory landscape and its impact on digital asset investments.",
    category: "White Paper",
    date: "July 8, 2025",
    readTime: "12 min read"
  },
  {
    id: 3,
    title: "Forex Trading Fundamentals: Currency Pair Analysis",
    excerpt: "Deep dive into major currency pairs and the macroeconomic factors driving their movements.",
    category: "Education",
    date: "June 28, 2025",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Options Strategies for Income Generation",
    excerpt: "How covered calls and cash-secured puts can enhance portfolio returns in sideways markets.",
    category: "Strategy",
    date: "June 20, 2025",
    readTime: "10 min read"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Michael R.",
    role: "Business Owner",
    content: "Juniper's disciplined approach to risk management has been exactly what I needed. My portfolio has grown steadily while I sleep soundly at night.",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah L.",
    role: "Healthcare Professional",
    content: "The transparency and communication are outstanding. I always know exactly what's happening with my investments and why.",
    rating: 5
  },
  {
    id: 3,
    name: "David K.",
    role: "Tech Executive",
    content: "The forex signals have been incredibly accurate. Juniper's data-driven approach to trading has significantly improved my returns.",
    rating: 5
  }
];

export const credentials: string[] = [
  "Series 7 - General Securities Representative",
  "Series 66 - Uniform Combined State Law",
  "Certified Financial Planner (CFP)",
  "Chartered Market Technician (CMT)"
];

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Services", href: "#services" },
  { label: "Performance", href: "#performance" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" }
];
