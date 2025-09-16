import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '@/assets/logo.png'; // @ = src

import {
  Waves,
  Shield,
  Users,
  TrendingUp,
  ChevronRight,
  Anchor,
  Fish,
  Wind,
  AlertCircle,
  MapPin,
  Activity,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/enhanced-button";

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    if (user) {
      const path =
        user.role === "admin" ? "/admin/dashboard" : "/citizen/dashboard";
      navigate(path);
    }
  }, [user, navigate]);

  const features = [
    {
      icon: Shield,
      title: "Real-time Hazard Alerts",
      description: "Get instant notifications about ocean hazards in your area",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Community Powered",
      description: "Crowdsourced reporting from citizens and professionals",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: TrendingUp,
      title: "AI-Powered Analytics",
      description: "Smart severity scoring and trend analysis",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Users", icon: Users },
    { number: "50K+", label: "Reports Filed", icon: AlertCircle },
    { number: "95%", label: "Accuracy Rate", icon: Activity },
    { number: "24/7", label: "Monitoring", icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-500/20 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Floating Icons */}
        <Fish
          className="absolute top-20 left-10 w-8 h-8 text-blue-400/20"
          style={{ animation: "float 8s ease-in-out infinite" }}
        />
        <Anchor
          className="absolute top-40 right-20 w-10 h-10 text-cyan-400/20"
          style={{
            animation: "float 10s ease-in-out infinite",
            animationDelay: "2s",
          }}
        />
        <Wind
          className="absolute bottom-40 left-20 w-12 h-12 text-blue-300/20"
          style={{
            animation: "float 12s ease-in-out infinite",
            animationDelay: "4s",
          }}
        />
      </div>

      {/* Hero Section */}
      <div
        className={`relative min-h-screen flex flex-col items-center justify-center text-center px-4 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Logo */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 blur-3xl opacity-50 animate-pulse" />
          <div className="relative inline-flex items-center gap-6 p-8 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl blur-xl opacity-80 animate-pulse" />
              <div className="relative flex items-center justify-center p-0 " >
                <img
                  src={logo}
                  alt="OceanPulse Logo"
                  className="w-20 h-20 object-contain rounded-2xl"
                />
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                Ocean<span className="text-cyan-400">Pulse</span>
              </h1>
              <p className="text-xl text-blue-200 font-light">
                Crowdsourced Ocean Hazard Reporting
              </p>
            </div>
          </div>
        </div>

        {/* Tagline with Animation */}
        <div
          className={`mb-16 max-w-4xl transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            Protecting Communities Through
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              {" "}
              Collective Intelligence
            </span>
          </h2>
          <p className="text-xl text-blue-100/80 leading-relaxed">
            Real-time ocean hazard monitoring powered by community reports,
            social media analytics, and AI-driven insights.
          </p>
        </div>

        {/* CTA Buttons with Hover Effects */}
        <div
          className={`flex flex-col sm:flex-row gap-6 mb-20 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Button
            variant="ocean"
            size="xl"
            onClick={() => navigate("/auth")}
            className="group min-w-[250px] bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              Get Started Now
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
          <Button
            variant="outline"
            size="xl"
            onClick={() => navigate("/terms")}
            className="min-w-[250px] bg-white/5 backdrop-blur-xl border-white/30 text-white hover:bg-white/10 hover:border-white/50 shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Learn More
          </Button>
        </div>

        {/* Stats Bar */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <stat.icon className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {stat.number}
                </div>
              </div>
              <div className="text-sm text-blue-200/70">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
            <div
              className="w-1 h-2 bg-white/50 rounded-full"
              style={{ animation: "scroll 1.5s ease-in-out infinite" }}
            />
          </div>
        </div>
      </div>

      {/* Features Section with Glass Effect */}
      <div className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why OceanPulse?
            </h3>
            <p className="text-xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed">
              Advanced technology meets community action to create the most
              comprehensive ocean hazard monitoring system.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`group relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 cursor-pointer ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                  >
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-blue-100/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Glow Effect */}
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-30 blur-xl rounded-3xl transition-opacity duration-500`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action with Gradient */}
      <div className="relative py-32 px-4">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
        <div className="relative max-w-5xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Make a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Difference?
            </span>
          </h3>
          <p className="text-xl text-blue-100/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of citizens and officials working together to keep
            our oceans safe.
          </p>
          <Button
            variant="ocean"
            size="xl"
            onClick={() => navigate("/auth")}
            className="group bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-110 transition-all duration-300 px-12 py-6 text-lg"
          >
            <span className="flex items-center gap-3">
              Start Reporting Today
              <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </span>
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(5deg); }
          66% { transform: translateY(10px) rotate(-5deg); }
        }
        
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
        
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(16px); opacity: 0; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-wave {
          animation: wave 3s ease-in-out infinite;
        }
        
        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
