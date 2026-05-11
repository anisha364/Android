import { Bell, Settings, TrendingUp, Users, Activity, DollarSign, Plus } from "lucide-react";
import { Link } from "react-router";
import { motion } from "motion/react";
import BottomNav from "../BottomNav";

export default function Home() {
  const stats = [
    { label: "Total Revenue", value: "$45,231", change: "+12.5%", icon: DollarSign, color: "from-primary to-blue-500" },
    { label: "Active Users", value: "8,459", change: "+8.2%", icon: Users, color: "from-secondary to-pink-500" },
    { label: "Engagement", value: "94.2%", change: "+5.4%", icon: Activity, color: "from-green-500 to-emerald-500" },
    { label: "Growth Rate", value: "23.1%", change: "+3.8%", icon: TrendingUp, color: "from-orange-500 to-amber-500" },
  ];

  const activities = [
    { user: "Sarah Johnson", action: "completed a task", time: "2m ago", avatar: "SJ" },
    { user: "Mike Chen", action: "joined the platform", time: "15m ago", avatar: "MC" },
    { user: "Emma Davis", action: "shared a post", time: "1h ago", avatar: "ED" },
    { user: "Alex Turner", action: "started a project", time: "2h ago", avatar: "AT" },
  ];

  return (
    <div className="h-full flex flex-col bg-background max-w-md mx-auto pb-16">
      <div className="flex-1 overflow-auto">
        <div className="bg-gradient-to-br from-primary to-secondary px-6 pt-12 pb-8 rounded-b-[2rem]">
          <div className="flex items-center justify-between mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <p className="text-white/80 text-sm mb-1">Welcome back,</p>
              <h1 className="text-white text-2xl font-bold">John Doe</h1>
            </motion.div>
            <div className="flex gap-3">
              <Link to="/notifications">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl relative"
                >
                  <Bell className="w-5 h-5 text-white" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    3
                  </span>
                </motion.button>
              </Link>
              <Link to="/settings">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl"
                >
                  <Settings className="w-5 h-5 text-white" />
                </motion.button>
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/20 backdrop-blur-md rounded-3xl p-6"
          >
            <p className="text-white/80 text-sm mb-2">Total Balance</p>
            <h2 className="text-white text-3xl font-bold mb-4">$128,450.00</h2>
            <div className="flex items-center gap-2 text-white/90">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">+15.3% from last month</span>
            </div>
          </motion.div>
        </div>

        <div className="px-6 py-6">
          <h3 className="font-bold mb-4">Statistics</h3>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-card border border-border rounded-3xl p-5 shadow-sm"
                >
                  <div className={`bg-gradient-to-br ${stat.color} w-10 h-10 rounded-2xl flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-muted-foreground text-xs mb-1">{stat.label}</p>
                  <p className="font-bold text-xl mb-1">{stat.value}</p>
                  <span className="text-green-500 text-xs">{stat.change}</span>
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Recent Activity</h3>
            <button className="text-primary text-sm">See All</button>
          </div>

          <div className="space-y-3">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
                className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-medium">
                  {activity.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{activity.user}</p>
                  <p className="text-muted-foreground text-xs">{activity.action}</p>
                </div>
                <span className="text-muted-foreground text-xs">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-6 bg-gradient-to-br from-primary to-secondary text-white w-16 h-16 rounded-full shadow-2xl shadow-primary/50 flex items-center justify-center z-10"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      <BottomNav />
    </div>
  );
}
