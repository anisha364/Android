import { Moon, Bell, Lock, HelpCircle, Info, LogOut, ChevronRight, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { Link } from "react-router";

export default function Settings() {
  const { theme, setTheme } = useTheme();

  const settingsSections = [
    {
      title: "Preferences",
      items: [
        {
          icon: theme === "dark" ? Sun : Moon,
          label: "Dark Mode",
          type: "toggle",
          value: theme === "dark",
          onChange: () => setTheme(theme === "dark" ? "light" : "dark"),
          color: "text-purple-500",
        },
        {
          icon: Bell,
          label: "Notifications",
          type: "toggle",
          value: true,
          color: "text-blue-500",
        },
      ],
    },
    {
      title: "Account",
      items: [
        { icon: Lock, label: "Privacy & Security", type: "link", color: "text-green-500" },
        { icon: HelpCircle, label: "Help & Support", type: "link", color: "text-orange-500" },
        { icon: Info, label: "About", type: "link", color: "text-cyan-500" },
      ],
    },
  ];

  return (
    <div className="h-full flex flex-col bg-background max-w-md mx-auto">
      <div className="flex-1 overflow-auto">
        <div className="bg-gradient-to-br from-primary to-secondary px-6 pt-12 pb-8 rounded-b-[2rem]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link to="/home" className="text-white/80 text-sm mb-2 inline-block">
              ← Back
            </Link>
            <h1 className="text-white text-3xl font-bold">Settings</h1>
          </motion.div>
        </div>

        <div className="px-6 py-6 space-y-8">
          {settingsSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * sectionIndex }}
            >
              <h3 className="font-bold mb-3 text-muted-foreground text-sm uppercase tracking-wide">
                {section.title}
              </h3>
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                {section.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  const isLast = itemIndex === section.items.length - 1;

                  return (
                    <div key={item.label}>
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors"
                        onClick={item.type === "toggle" && item.onChange ? item.onChange : undefined}
                      >
                        <div className={`w-10 h-10 rounded-xl ${item.color} bg-opacity-10 flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${item.color}`} />
                        </div>
                        <span className="flex-1 text-left font-medium">{item.label}</span>
                        {item.type === "toggle" ? (
                          <div
                            className={`w-12 h-7 rounded-full transition-colors ${
                              item.value ? "bg-primary" : "bg-switch-background"
                            } relative`}
                          >
                            <motion.div
                              className="w-5 h-5 bg-white rounded-full absolute top-1"
                              animate={{ left: item.value ? "26px" : "4px" }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                          </div>
                        ) : (
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        )}
                      </motion.button>
                      {!isLast && <div className="mx-4 border-t border-border" />}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-card border border-destructive/20 rounded-2xl p-4 flex items-center gap-4 hover:bg-destructive/5 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
              <LogOut className="w-5 h-5 text-destructive" />
            </div>
            <span className="flex-1 text-left font-medium text-destructive">Log Out</span>
          </motion.button>

          <div className="text-center text-muted-foreground text-sm pt-4 pb-8">
            <p>Version 1.0.0</p>
            <p className="mt-1">© 2026 AppName. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
