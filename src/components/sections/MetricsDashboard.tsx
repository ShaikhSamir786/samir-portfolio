import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Activity, GitCommit, Code, Clock, Zap, Server, Users, Star } from "lucide-react";

interface MetricCardProps {
  value: number;
  label: string;
  suffix?: string;
  icon: React.ReactNode;
  delay?: number;
}

function AnimatedCounter({ value, suffix = "", delay = 0 }: { value: number; suffix?: string; delay?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const interval = setInterval(() => {
          current += increment;
          if (current >= value) {
            setCount(value);
            clearInterval(interval);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);

        return () => clearInterval(interval);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isInView, value, delay]);

  return (
    <span ref={ref} className="metric-value">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

function MetricCard({ value, label, suffix, icon, delay = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="card-brutal group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 border-2 border-primary text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          {icon}
        </div>
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
      </div>
      <AnimatedCounter value={value} suffix={suffix} delay={delay * 1000} />
      <p className="text-muted-foreground text-sm font-mono uppercase tracking-wider mt-2">
        {label}
      </p>
    </motion.div>
  );
}

function ActivityHeatmap() {
  const weeks = 52;
  const days = 7;
  const [contributions, setContributions] = useState<number[]>(Array(weeks * days).fill(0));

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://api.github.com/users/ShaikhSamir786/events?per_page=100");
        if (!response.ok) throw new Error("Failed to fetch events");

        const events = await response.json();
        const eventDates: { [key: string]: number } = {};

        // Count events per day
        events.forEach((event: any) => {
          const date = new Date(event.created_at).toISOString().split('T')[0];
          eventDates[date] = (eventDates[date] || 0) + 1;
        });

        // Map to grid (last 52 weeks)
        const today = new Date();
        const newContributions = Array(weeks * days).fill(0);

        // Fill backwards from today
        for (let i = 0; i < weeks * days; i++) {
          const date = new Date(today);
          date.setDate(date.getDate() - ((weeks * days) - 1 - i));
          const dateString = date.toISOString().split('T')[0];
          if (eventDates[dateString]) {
            newContributions[i] = eventDates[dateString];
          }
        }

        setContributions(newContributions);
      } catch (error) {
        console.error("Error fetching GitHub events:", error);
        // Keep initial empty/random state or handle error
      }
    };

    fetchEvents();
  }, []);

  const getIntensity = (count: number) => {
    if (count === 0) return "bg-secondary";
    if (count < 2) return "bg-primary/30";
    if (count < 4) return "bg-primary/60";
    return "bg-primary";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="overflow-x-auto"
    >
      <div className="terminal-window min-w-[800px]">
        <div className="terminal-header">
          <div className="terminal-dot bg-destructive" />
          <div className="terminal-dot bg-accent" />
          <div className="terminal-dot bg-primary" />
          <span className="ml-4 text-xs text-muted-foreground font-mono">activity.log (Last 90 Days Events)</span>
        </div>
        <div className="flex gap-1 justify-end">
          {Array.from({ length: weeks }).map((_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {Array.from({ length: days }).map((_, dayIndex) => {
                const index = weekIndex * days + dayIndex;
                const count = contributions[index];
                return (
                  <motion.div
                    key={dayIndex}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.1,
                      delay: (index % 50) * 0.01 // Optimize delay for many items
                    }}
                    viewport={{ once: true }}
                    className={`w-3 h-3 ${getIntensity(count)} hover:ring-2 hover:ring-primary cursor-pointer transition-all`}
                    title={`${count} contributions`}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-secondary" />
            <div className="w-3 h-3 bg-primary/30" />
            <div className="w-3 h-3 bg-primary/60" />
            <div className="w-3 h-3 bg-primary" />
          </div>
          <span>More</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function MetricsDashboard() {
  const [profileMetrics, setProfileMetrics] = useState({
    repos: 47, // Default fallback
    followers: 0,
    following: 0,
    years: 5
  });

  useEffect(() => {
    fetch("https://api.github.com/users/ShaikhSamir786")
      .then(res => res.json())
      .then(data => {
        if (data.public_repos) {
          setProfileMetrics({
            repos: data.public_repos,
            followers: data.followers,
            following: data.following,
            years: new Date().getFullYear() - new Date(data.created_at).getFullYear()
          });
        }
      })
      .catch(err => console.error("Error fetching profile:", err));
  }, []);

  const metrics = [
    { value: profileMetrics.repos, label: "Public Repos", icon: <GitCommit className="w-5 h-5" /> },
    { value: profileMetrics.followers, label: "Followers", icon: <Users className="w-5 h-5" /> },
    { value: 99.9, suffix: "%", label: "Uptime Average", icon: <Activity className="w-5 h-5" /> },
    { value: 142, suffix: "ms", label: "Avg Response Time", icon: <Zap className="w-5 h-5" /> },
    { value: profileMetrics.years, suffix: "+", label: "Years Active", icon: <Clock className="w-5 h-5" /> },
    { value: 15, suffix: "+", label: "APIs Deployed", icon: <Server className="w-5 h-5" /> },
  ];

  return (
    <section id="metrics" className="section-brutal">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider">// LIVE METRICS</span>
          <h2 className="section-header">
            <span className="text-foreground">THE</span>{" "}
            <span className="text-primary">NUMBERS</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-16">
          {metrics.map((metric, index) => (
            <MetricCard
              key={metric.label}
              {...metric}
              delay={index * 0.1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-2xl mb-6 text-foreground">CONTRIBUTION ACTIVITY</h3>
          <ActivityHeatmap />
        </motion.div>
      </div>
    </section>
  );
}
