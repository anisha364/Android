import { useState, useRef, useEffect } from "react";
import { Search, MoreVertical, Send, Paperclip, Smile, Phone, Video } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import BottomNav from "../BottomNav";

interface Message {
  id: number;
  text: string;
  sent: boolean;
  time: string;
  delivered?: boolean;
  read?: boolean;
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "SJ",
      lastMessage: "That sounds great! Let's do it 🎉",
      time: "2m ago",
      unread: 3,
      online: true,
      messages: [
        { id: 1, text: "Hey! How's it going?", sent: false, time: "10:30 AM", read: true },
        { id: 2, text: "Hi! I'm doing great, thanks! How about you?", sent: true, time: "10:32 AM", delivered: true, read: true },
        { id: 3, text: "Pretty good! Working on some new designs", sent: false, time: "10:33 AM", read: true },
        { id: 4, text: "That sounds exciting! Can't wait to see them", sent: true, time: "10:35 AM", delivered: true, read: true },
        { id: 5, text: "That sounds great! Let's do it 🎉", sent: false, time: "10:36 AM", read: false },
      ],
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "MC",
      lastMessage: "Thanks for the update",
      time: "15m ago",
      unread: 0,
      online: true,
      messages: [
        { id: 1, text: "Did you see the latest designs?", sent: true, time: "9:15 AM", delivered: true, read: true },
        { id: 2, text: "Yes! They look amazing", sent: false, time: "9:20 AM", read: true },
        { id: 3, text: "Thanks for the update", sent: false, time: "9:25 AM", read: true },
      ],
    },
    {
      id: 3,
      name: "Emma Davis",
      avatar: "ED",
      lastMessage: "See you tomorrow!",
      time: "1h ago",
      unread: 1,
      online: false,
      messages: [
        { id: 1, text: "Are we still on for the meeting?", sent: false, time: "Yesterday", read: true },
        { id: 2, text: "Yes, absolutely! 2 PM works for me", sent: true, time: "Yesterday", delivered: true, read: true },
        { id: 3, text: "Perfect! See you tomorrow!", sent: false, time: "1h ago", read: false },
      ],
    },
    {
      id: 4,
      name: "Alex Turner",
      avatar: "AT",
      lastMessage: "The project looks amazing",
      time: "2h ago",
      unread: 0,
      online: false,
      messages: [
        { id: 1, text: "Just finished the prototype", sent: true, time: "3h ago", delivered: true, read: true },
        { id: 2, text: "The project looks amazing", sent: false, time: "2h ago", read: true },
        { id: 3, text: "Thanks! Really happy with how it turned out", sent: true, time: "2h ago", delivered: true, read: true },
      ],
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat, conversations]);

  const currentChat = conversations.find((c) => c.id === selectedChat);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && selectedChat !== null) {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

      const newMessage: Message = {
        id: Date.now(),
        text: message.trim(),
        sent: true,
        time: timeString,
        delivered: true,
        read: false,
      };

      setConversations((prevConvos) =>
        prevConvos.map((convo) => {
          if (convo.id === selectedChat) {
            return {
              ...convo,
              messages: [...convo.messages, newMessage],
              lastMessage: message.trim(),
              time: "Just now",
            };
          }
          return convo;
        })
      );

      setMessage("");

      // Simulate typing indicator and response
      if (currentChat?.online) {
        setTimeout(() => {
          setIsTyping(true);
        }, 1000);

        setTimeout(() => {
          setIsTyping(false);
          const responses = [
            "That's great! 😊",
            "Sounds good to me!",
            "I agree!",
            "Perfect! Let's do it",
            "Awesome! 🎉",
            "Thanks for letting me know",
            "I'll look into that",
            "That makes sense",
          ];

          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          const responseTime = new Date();
          const responseTimeString = responseTime.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          });

          const responseMessage: Message = {
            id: Date.now() + 1,
            text: randomResponse,
            sent: false,
            time: responseTimeString,
            read: false,
          };

          setConversations((prevConvos) =>
            prevConvos.map((convo) => {
              if (convo.id === selectedChat) {
                return {
                  ...convo,
                  messages: [...convo.messages, responseMessage],
                  lastMessage: randomResponse,
                  time: "Just now",
                  unread: convo.unread + 1,
                };
              }
              return convo;
            })
          );
        }, 2500);
      }
    }
  };

  if (selectedChat !== null) {
    if (!currentChat) return null;

    return (
      <div className="h-full flex flex-col bg-background max-w-md mx-auto">
        <div className="bg-gradient-to-br from-primary to-secondary px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSelectedChat(null)}
            className="text-white"
          >
            ←
          </button>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-medium">
              {currentChat.avatar}
            </div>
            {currentChat.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-white font-medium">{currentChat.name}</h3>
            <p className="text-white/70 text-xs">
              {isTyping ? "typing..." : currentChat.online ? "Active now" : "Offline"}
            </p>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="text-white"
            >
              <Phone className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="text-white"
            >
              <Video className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="text-white"
            >
              <MoreVertical className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-6 py-4 space-y-4">
          <AnimatePresence>
            {currentChat.messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.05 * Math.min(index, 5) }}
                className={`flex ${msg.sent ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[75%] ${msg.sent ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  <div
                    className={`rounded-3xl px-5 py-3 ${
                      msg.sent
                        ? "bg-gradient-to-br from-primary to-secondary text-white rounded-br-lg shadow-lg shadow-primary/20"
                        : "bg-card border border-border rounded-bl-lg"
                    }`}
                  >
                    <p className="text-sm leading-relaxed break-words">{msg.text}</p>
                  </div>
                  <div className="flex items-center gap-1 px-2">
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                    {msg.sent && (
                      <span className="text-xs">
                        {msg.read ? "✓✓" : msg.delivered ? "✓✓" : "✓"}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div className="bg-card border border-border rounded-3xl rounded-bl-lg px-5 py-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-muted-foreground rounded-full"
                      animate={{
                        y: [0, -6, 0],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="px-6 py-4 border-t border-border bg-background">
          <form onSubmit={handleSendMessage} className="flex items-center gap-3">
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Paperclip className="w-5 h-5" />
            </motion.button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full bg-input-background border border-border rounded-3xl py-3 px-5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                autoFocus
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Smile className="w-5 h-5" />
              </button>
            </div>
            <motion.button
              type="submit"
              disabled={!message.trim()}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className={`text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                message.trim()
                  ? "bg-gradient-to-br from-primary to-secondary shadow-primary/30"
                  : "bg-muted cursor-not-allowed opacity-50"
              }`}
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </form>
        </div>
      </div>
    );
  }

  // Sort conversations by most recent
  const sortedConversations = [...conversations].sort((a, b) => {
    if (a.time === "Just now") return -1;
    if (b.time === "Just now") return 1;
    return 0;
  });

  return (
    <div className="h-full flex flex-col bg-background max-w-md mx-auto pb-16">
      <div className="flex-1 overflow-auto">
        <div className="px-6 pt-12 pb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-6"
          >
            <h1 className="text-3xl font-bold">Messages</h1>
            <div className="bg-primary text-white text-sm px-3 py-1 rounded-full">
              {conversations.reduce((sum, c) => sum + c.unread, 0)} new
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-6"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full bg-input-background border border-border rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </motion.div>

          <div className="space-y-2">
            <AnimatePresence>
              {sortedConversations.map((chat, index) => (
                <motion.button
                  key={chat.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.05 * Math.min(index, 5) }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedChat(chat.id);
                    // Mark as read when opening
                    setConversations((prevConvos) =>
                      prevConvos.map((c) =>
                        c.id === chat.id ? { ...c, unread: 0 } : c
                      )
                    );
                  }}
                  className={`w-full bg-card border rounded-2xl p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors ${
                    chat.unread > 0 ? "border-primary/30 bg-primary/5" : "border-border"
                  }`}
                >
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-medium text-lg">
                      {chat.avatar}
                    </div>
                    {chat.online && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-card rounded-full"
                      />
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`truncate ${chat.unread > 0 ? "font-bold" : "font-medium"}`}>
                        {chat.name}
                      </h3>
                      <span className={`text-xs flex-shrink-0 ml-2 ${
                        chat.unread > 0 ? "text-primary font-medium" : "text-muted-foreground"
                      }`}>
                        {chat.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-sm truncate ${
                        chat.unread > 0 ? "text-foreground font-medium" : "text-muted-foreground"
                      }`}>
                        {chat.lastMessage}
                      </p>
                      {chat.unread > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-primary text-white text-xs px-2 py-1 rounded-full flex-shrink-0 min-w-[24px] text-center"
                        >
                          {chat.unread}
                        </motion.span>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {conversations.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <MoreVertical className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-bold mb-2">No Messages Yet</h3>
              <p className="text-muted-foreground text-sm">
                Start a conversation with your contacts
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
