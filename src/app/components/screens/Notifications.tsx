import { Heart, MessageCircle, UserPlus, TrendingUp, CheckCheck } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import BottomNav from "../BottomNav";

export default function Notifications() {
  const notifications = [
    {
      type: "like",
      icon: Heart,
      color: "from-red-500 to-pink-500",
      user: "Sarah Johnson",
      action: "liked your post",
      time: "2m ago",
      unread: true,
    },
    {
      type: "comment",
      icon: MessageCircle,
      color: "from-blue-500 to-cyan-500",
      user: "Mike Chen",
      action: "commented on your photo",
      content: "This looks amazing! 🔥",
      time: "15m ago",
      unread: true,
    },
    {
      type: "follow",
      icon: UserPlus,
      color: "from-purple-500 to-pink-500",
      user: "Emma Davis",
      action: "started following you",
      time: "1h ago",
      unread: true,
    },
    {
      type: "trending",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      user: "Your Post",
      action: "is trending now",
      content: "245 new interactions",
      time: "2h ago",
      unread: false,
    },
    {
      type: "comment",
      icon: MessageCircle,
      color: "from-blue-500 to-cyan-500",
      user: "Alex Turner",
      action: "mentioned you in a comment",
      time: "3h ago",
      unread: false,
    },
    {
      type: "like",
      icon: Heart,
      color: "from-red-500 to-pink-500",
      user: "Lisa Anderson",
      action: "liked your comment",
      time: "5h ago",
      unread: false,
    },
  ];

  return (
    <div className="h-full flex flex-col bg-background max-w-md mx-auto pb-16">
      <div className="flex-1 overflow-auto">
        <div className="bg-gradient-to-br from-primary to-secondary px-6 pt-12 pb-6 rounded-b-[2rem]">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link to="/home" className="text-white/80 text-sm mb-2 inline-block">
                ← Back
              </Link>
              <h1 className="text-white text-3xl font-bold">Notifications</h1>
            </motion.div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-white text-sm flex items-center gap-2"
            >
              <CheckCheck className="w-4 h-4" />
              Mark all read
            </motion.button>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="space-y-3">
            {notifications.map((notification, index) => {
              const Icon = notification.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  whileTap={{ scale: 0.98 }}
                  className={`bg-card border rounded-2xl p-4 flex gap-4 transition-all ${
                    notification.unread
                      ? "border-primary/30 bg-primary/5"
                      : "border-border"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${notification.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-medium text-sm">
                        <span className="text-foreground">{notification.user}</span>
                        <span className="text-muted-foreground ml-1">{notification.action}</span>
                      </p>
                      {notification.unread && (
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                    {notification.content && (
                      <p className="text-muted-foreground text-sm mb-1">
                        {notification.content}
                      </p>
                    )}
                    <p className="text-muted-foreground text-xs">{notification.time}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-3">
              <CheckCheck className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">You're all caught up!</p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
