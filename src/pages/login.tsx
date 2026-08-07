import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginVideo from "../assets/videos/coke-login.mp4";
import cokeLogo from "../assets/image/coke-logo.jpeg";
import { getDefaultRoute, getStoredUser, signIn } from "../utils/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      navigate(getDefaultRoute(user.role), { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = signIn(email, password);

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    setError("");
    navigate(getDefaultRoute(user.role), { replace: true });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={loginVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="w-[450px] rounded-3xl border border-white/20 bg-black/30 p-10 shadow-2xl backdrop-blur-md">
          <img src={cokeLogo} alt="Coca Cola" className="mx-auto mb-6 h-28 w-28 rounded-xl object-cover" />

          <h1 className="text-center text-5xl font-bold text-red-500">WEFIXO</h1>
          <p className="mt-3 text-center text-lg text-gray-200">Smart Factory Platform</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              className="w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white placeholder-gray-300 outline-none"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              className="w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white placeholder-gray-300 outline-none"
              required
            />

            {error ? <p className="text-sm text-red-300">{error}</p> : null}

            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-300">
              <p className="font-medium text-white">Demo credentials</p>
              <p>Admin: admin@wefixo.com / admin123</p>
              <p>Operations: ops@wefixo.com / ops123</p>
              <p>Maintenance: maintenance@wefixo.com / maint123</p>
            </div>

            <button className="w-full rounded-xl bg-red-600 p-4 text-lg font-semibold text-white transition-all hover:bg-red-700">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}