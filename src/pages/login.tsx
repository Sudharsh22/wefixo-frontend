import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Zap,
  Factory
} from "lucide-react";
import loginVideo from "../assets/videos/coke-login.mp4";
import { getDefaultRoute, getStoredUser, signIn } from "../utils/auth";

// Canvas component for floating glowing red particles and ambient network nodes
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      pulseSpeed: number;
    }> = [];

    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.15,
        alpha: Math.random() * 0.6 + 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connecting node lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 26, 26, ${0.14 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw floating glowing particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.008;
        if (p.alpha < 0.15) p.alpha = 0.15;
        if (p.alpha > 0.85) p.alpha = 0.85;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 26, 26, ${p.alpha})`;
        ctx.shadowColor = "#ff1a1a";
        ctx.shadowBlur = 10;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />;
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      navigate(getDefaultRoute(user.role), { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Maintain existing auth logic strictly
    setTimeout(() => {
      const user = signIn(email, password);

      if (!user) {
        setError("Invalid email or password. Please check your credentials.");
        setIsSubmitting(false);
        return;
      }

      navigate(getDefaultRoute(user.role), { replace: true });
    }, 250);
  };

  // Preset demo credentials quick fill
  const fillCredentials = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError("");
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col lg:flex-row overflow-hidden font-sans selection:bg-[#ff1a1a]/40 selection:text-white">
      {/* LEFT SECTION (60-65% width) - Refined Industrial Hero Section */}
      <div className="relative w-full lg:w-[62%] xl:w-[65%] min-h-[450px] lg:min-h-screen flex items-center justify-center p-8 sm:p-12 lg:p-20 overflow-hidden border-b lg:border-b-0 lg:border-r border-red-950/30 bg-gradient-to-br from-[#050505] via-[#0e0204] to-[#250308]">
        {/* Background Industrial Video Backdrop */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-20 filter contrast-125 saturate-150 mix-blend-luminosity scale-105"
          >
            <source src={loginVideo} type="video/mp4" />
          </video>
          {/* Dark-to-Red Radial & Linear Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-[#050505]/80 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,26,26,0.22),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(153,0,0,0.35),transparent_60%)]" />
        </div>

        {/* Floating Glowing Particle Canvas */}
        <ParticleCanvas />

        {/* Ambient Glowing Orbs */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-[#ff1a1a]/15 rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-10 right-10 w-[520px] h-[520px] bg-[#990000]/25 rounded-full blur-[160px] pointer-events-none z-0" />

        {/* Vertically Centered Hero Content */}
        <div className="relative z-20 max-w-3xl w-full">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white leading-[1.05]">
            WEFIXO{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff1a1a] via-[#ff4d4d] to-[#990000] drop-shadow-[0_0_35px_rgba(255,26,26,0.55)]">
              SMART FACTORY
            </span>{" "}
            AI
          </h1>

          <p className="mt-8 sm:mt-10 text-lg sm:text-xl lg:text-2xl text-gray-300/90 max-w-2xl font-light leading-relaxed tracking-wide">
            Real-time Manufacturing Intelligence, Predictive Analytics &amp; Factory Monitoring
          </p>
        </div>
      </div>

      {/* RIGHT SECTION (35-40% width) - Glassmorphism Enterprise Login Form */}
      <div className="relative w-full lg:w-[38%] xl:w-[35%] min-h-[600px] lg:min-h-screen flex items-center justify-center p-6 sm:p-8 lg:p-10 bg-[#050505] z-20">
        {/* Subtle background ambient red glow behind card */}
        <div className="absolute w-[350px] h-[350px] bg-[#ff1a1a]/20 rounded-full blur-[120px] pointer-events-none" />

        {/* Login Card */}
        <div className="w-full max-w-md login-glass-card rounded-[28px] p-7 sm:p-9 relative z-10 transition-all duration-300">
          {/* Top Decorative Red Accent Bar */}
          <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#ff1a1a] to-transparent shadow-[0_0_12px_#ff1a1a]" />

          {/* Card Header Emblem */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#ff1a1a]/50 bg-gradient-to-br from-[#ff1a1a]/25 via-[#990000]/30 to-black text-[#ff1a1a] shadow-[0_0_30px_rgba(255,26,26,0.4)]">
              <Factory className="w-8 h-8 text-[#ff1a1a]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Enterprise Sign In
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-gray-400 font-medium">
              Access the WEFIXO Smart Factory Control Portal
            </p>
          </div>

          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                Corporate Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@wefixo.com"
                  className="w-full bg-white/[0.04] border border-white/15 focus:border-[#ff1a1a] focus:ring-2 focus:ring-[#ff1a1a]/30 focus:shadow-[0_0_20px_rgba(255,26,26,0.25)] rounded-xl py-3.5 pl-11 pr-4 text-white text-sm placeholder-gray-500 outline-none transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white/[0.04] border border-white/15 focus:border-[#ff1a1a] focus:ring-2 focus:ring-[#ff1a1a]/30 focus:shadow-[0_0_20px_rgba(255,26,26,0.25)] rounded-xl py-3.5 pl-11 pr-11 text-white text-sm placeholder-gray-500 outline-none transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-start space-x-2 animate-fade-up">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Interactive Demo Credentials Box */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 text-xs text-gray-300">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-white tracking-wide flex items-center space-x-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#ff1a1a]" />
                  <span>Demo Access Roles</span>
                </span>
                <span className="text-[10px] text-gray-400">Click to fill</span>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => fillCredentials("admin@wefixo.com", "admin123")}
                  className="p-2 rounded-lg bg-white/[0.04] hover:bg-[#ff1a1a]/20 border border-white/10 hover:border-[#ff1a1a]/50 text-left transition-all group cursor-pointer"
                >
                  <div className="font-bold text-white group-hover:text-[#ff1a1a] text-[11px] truncate">Admin</div>
                  <div className="text-[9px] text-gray-400 truncate">Full Access</div>
                </button>

                <button
                  type="button"
                  onClick={() => fillCredentials("ops@wefixo.com", "ops123")}
                  className="p-2 rounded-lg bg-white/[0.04] hover:bg-[#ff1a1a]/20 border border-white/10 hover:border-[#ff1a1a]/50 text-left transition-all group cursor-pointer"
                >
                  <div className="font-bold text-white group-hover:text-[#ff1a1a] text-[11px] truncate">Operations</div>
                  <div className="text-[9px] text-gray-400 truncate">Factory Ops</div>
                </button>

                <button
                  type="button"
                  onClick={() => fillCredentials("maintenance@wefixo.com", "maint123")}
                  className="p-2 rounded-lg bg-white/[0.04] hover:bg-[#ff1a1a]/20 border border-white/10 hover:border-[#ff1a1a]/50 text-left transition-all group cursor-pointer"
                >
                  <div className="font-bold text-white group-hover:text-[#ff1a1a] text-[11px] truncate">Maintenance</div>
                  <div className="text-[9px] text-gray-400 truncate">Engineering</div>
                </button>
              </div>
            </div>

            {/* Large Sign In Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-[#ff1a1a] to-[#990000] hover:from-[#ff3333] hover:to-[#b30000] py-4 text-base font-bold text-white shadow-[0_0_25px_rgba(255,26,26,0.4)] hover:shadow-[0_0_35px_rgba(255,26,26,0.65)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2 tracking-wide disabled:opacity-70"
            >
              <span>{isSubmitting ? "Authenticating..." : "Sign In to Dashboard"}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </form>

          {/* Footer Security Badge */}
          <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>TLS 256-Bit Encrypted</span>
            </div>
            <span>v4.2.0-Prod</span>
          </div>
        </div>
      </div>
    </div>
  );
}