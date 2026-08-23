import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAppDispatch } from "../app/hooks";
import { login } from "../app/authSlice";

interface FormErrors {
  email?: string;
  password?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("rana@loopline.app");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const next: FormErrors = {};
    if (!email.trim()) {
      next.email = "Enter your email.";
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (!password) {
      next.password = "Enter your password.";
    } else if (password.length < 6) {
      next.password = "Password must be at least 6 characters.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulated auth check — swap for a real request when this
    // project is wired to a backend.
    await new Promise((res) => setTimeout(res, 500));
    dispatch(login(email.trim()));
    navigate("/board");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5 bg-paper">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <span className="w-9 h-9 rounded-full bg-charcoal-800 text-paper flex items-center justify-center font-display text-sm">
            L
          </span>
          <span className="font-display text-xl text-charcoal-800">
            Loopline
          </span>
        </div>

        <div className="bg-white/80 border border-charcoal-700/[0.07] rounded-2xl shadow-card p-7">
          <h1 className="font-display text-xl text-charcoal-800 mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-charcoal-600/60 mb-6">
            Sign in to your team's board.
          </p>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <Input
              icon={Mail}
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />

            <Button
              type="submit"
              variant="accent"
              size="lg"
              icon={ArrowRight}
              className="w-full"
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <p className="text-xs text-charcoal-600/45 text-center mt-5">
            Demo project — any email + a 6+ character password signs you in.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
