import { Home, Search, MessageCircle, User } from "lucide-react";
import { Link, useLocation } from "react-router";
import { motion } from "motion/react";

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: "/home", icon: Home, label: "Home" },
    { path: "/search", icon: Search, label: "Search" },
    { path: "/chat", icon: MessageCircle, label: "Chat" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-area-inset-bottom">
      <nav className="flex items-center justify-around h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center flex-1 h-full relative"
            >
              <motion.div
                className="flex flex-col items-center gap-1"
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <Icon
                    className={`w-6 h-6 transition-colors ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
                <span
                  className={`text-xs transition-colors ${
                    isActive ? "text-primary font-medium" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
