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
  whatsapp: "+1234567890",
  telegram: "@juniperbrozforex",
  yearsExperience: 12,
  clientsServed: 500,
  assetsManaged: "$45M+"
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
    readTime: "8 min read"
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
