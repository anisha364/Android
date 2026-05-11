import { useState } from "react";
import { Search as SearchIcon, TrendingUp, X, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import BottomNav from "../BottomNav";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const trendingTopics = [
    { tag: "Design", count: "12.5K posts" },
    { tag: "Technology", count: "8.3K posts" },
    { tag: "Photography", count: "6.7K posts" },
    { tag: "Travel", count: "5.2K posts" },
    { tag: "Food", count: "4.8K posts" },
  ];

  const recentSearches = [
    "React Native Tutorial",
    "Material Design 3",
    "UI/UX Inspiration",
    "Mobile App Development",
  ];

  const searchResults = [
    { type: "User", name: "Sarah Johnson", subtitle: "@sarahj • Designer", avatar: "SJ" },
    { type: "Post", name: "Material Design Guide", subtitle: "by Alex Turner", avatar: "📱" },
    { type: "User", name: "Mike Chen", subtitle: "@mikec • Developer", avatar: "MC" },
    { type: "Tag", name: "#UIDesign", subtitle: "2.3K posts", avatar: "🎨" },
  ];

  return (
    <div className="h-full flex flex-col bg-background max-w-md mx-auto pb-16">
      <div className="flex-1 overflow-auto">
        <div className="px-6 pt-12 pb-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-6"
          >
            Search
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-6"
          >
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearching(e.target.value.length > 0);
              }}
              placeholder="Search users, posts, tags..."
              className="w-full bg-input-background border border-border rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setIsSearching(false);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </motion.div>

          <AnimatePresence mode="wait">
            {!isSearching ? (
              <motion.div
                key="browse"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <h3 className="font-bold">Recent Searches</h3>
                  </div>
                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <motion.button
                        key={search}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * index }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSearchQuery(search)}
                        className="w-full bg-card border border-border rounded-2xl p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                      >
                        <span className="text-sm">{search}</span>
                        <X className="w-4 h-4 text-muted-foreground" />
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-muted-foreground" />
                    <h3 className="font-bold">Trending Topics</h3>
                  </div>
                  <div className="space-y-3">
                    {trendingTopics.map((topic, index) => (
                      <motion.button
                        key={topic.tag}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * index }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-card border border-border rounded-2xl p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-medium">
                          #{index + 1}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-medium">#{topic.tag}</p>
                          <p className="text-muted-foreground text-sm">{topic.count}</p>
                        </div>
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3 className="font-bold mb-4">Search Results</h3>
                <div className="space-y-3">
                  {searchResults.map((result, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * index }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-card border border-border rounded-2xl p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-medium">
                        {result.avatar}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium">{result.name}</p>
                        <p className="text-muted-foreground text-sm">{result.subtitle}</p>
                      </div>
                      <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        {result.type}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
