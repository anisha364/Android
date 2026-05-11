import { Camera, MapPin, Mail, Phone, Calendar, ChevronRight, Edit2 } from "lucide-react";
import { motion } from "motion/react";
import BottomNav from "../BottomNav";

export default function Profile() {
  const profileStats = [
    { label: "Posts", value: "245" },
    { label: "Followers", value: "12.5K" },
    { label: "Following", value: "892" },
  ];

  const menuItems = [
    { icon: Edit2, label: "Edit Profile", color: "text-primary" },
    { icon: Calendar, label: "My Events", color: "text-secondary" },
    { icon: MapPin, label: "Saved Places", color: "text-green-500" },
    { icon: Mail, label: "Messages", color: "text-orange-500" },
  ];

  return (
    <div className="h-full flex flex-col bg-background max-w-md mx-auto pb-16">
      <div className="flex-1 overflow-auto">
        <div className="bg-gradient-to-br from-primary to-secondary px-6 pt-12 pb-24 rounded-b-[2rem] relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-4">
              <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-white/40 to-white/10 flex items-center justify-center">
                  JD
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-0 right-0 bg-white text-primary w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
              >
                <Camera className="w-5 h-5" />
              </motion.button>
            </div>
            <h2 className="text-white text-2xl font-bold mb-1">John Doe</h2>
            <p className="text-white/80 text-sm mb-4">@johndoe</p>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <MapPin className="w-4 h-4" />
              <span>San Francisco, CA</span>
            </div>
          </motion.div>
        </div>

        <div className="px-6 -mt-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-3xl p-6 shadow-lg mb-6"
          >
            <div className="flex justify-around">
              {profileStats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <p className="font-bold text-2xl mb-1">{stat.value}</p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="mb-6">
            <h3 className="font-bold mb-3">About</h3>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-2xl p-5"
            >
              <p className="text-muted-foreground leading-relaxed">
                Product designer & developer passionate about creating beautiful user experiences.
                Love to travel and capture moments.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>john.doe@example.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Joined March 2024</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div>
            <h3 className="font-bold mb-3">Quick Actions</h3>
            <div className="space-y-3 pb-4">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-card border border-border rounded-2xl p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className={`w-12 h-12 rounded-2xl ${item.color} bg-opacity-10 flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <span className="flex-1 text-left font-medium">{item.label}</span>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
