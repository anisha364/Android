import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Shield, Zap, ChevronRight } from "lucide-react";

const slides = [
  {
    icon: Sparkles,
    title: "Modern & Intuitive",
    description: "Experience a beautifully crafted interface designed for the modern user",
    gradient: "from-primary to-secondary",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is protected with enterprise-grade security",
    gradient: "from-secondary to-pink-500",
  },
  {
    icon: Zap,
    title: "Fast & Reliable",
    description: "Lightning-fast performance that keeps up with your lifestyle",
    gradient: "from-primary to-blue-500",
  },
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/login");
    }
  };

  const handleSkip = () => {
    navigate("/login");
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="h-full flex flex-col bg-background max-w-md mx-auto">
      <div className="flex justify-end p-6">
        <button
          onClick={handleSkip}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            <motion.div
              className={`bg-gradient-to-br ${slide.gradient} p-8 rounded-3xl mb-12`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Icon className="w-24 h-24 text-white" strokeWidth={1.5} />
            </motion.div>

            <h2 className="text-3xl font-bold mb-4 text-foreground">
              {slide.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-sm">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-8 pb-12">
        <div className="flex gap-2 justify-center mb-8">
          {slides.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-primary w-8"
                  : "bg-muted w-2"
              }`}
              animate={{ width: index === currentSlide ? 32 : 8 }}
            />
          ))}
        </div>

        <motion.button
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
          whileTap={{ scale: 0.98 }}
        >
          <span className="font-medium text-lg">
            {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          </span>
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
