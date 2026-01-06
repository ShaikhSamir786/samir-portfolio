import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { profile } from "node:console";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: "Hey! I'm Samir's AI assistant. Ask me anything about his skills, experience, projects, or how he can help with your project!",
  timestamp: new Date(),
};

const SAMPLE_RESPONSES: Record<string, string> = {
  skills: "Samir specializes in backend development with Node.js, Python, and Go. He's proficient in PostgreSQL, Redis, Kafka, and has extensive experience with cloud platforms like AWS and GCP. On the frontend, he works with React, TypeScript, and Next.js.",
  experience: "Samir has 7+ years of experience, currently working as a Senior Backend Engineer at TechScale Inc. He's previously worked at StartupHub, DataFlow Systems, and WebAgency Pro, progressively growing from junior developer to senior engineer.",
  projects: "Some notable projects include: AuthFlow Pro (authentication microservice), DataPipe Engine (real-time data processing), and CloudScale API (serverless API gateway). All projects demonstrate his expertise in building scalable, production-ready systems.",
  contact: "The best way to reach Samir is through the contact form on this website, or connect with him on LinkedIn or GitHub. He typically responds within 24 hours.",
  availability: "Samir is currently available for freelance projects and consulting work. He's open to both short-term and long-term engagements, especially in backend architecture and API development.",
  default: "I'd be happy to help you learn more about Samir! You can ask about his skills, experience, projects, availability, or how to get in touch. What would you like to know?",
  profile: "Samir is a passionate software engineer with over 7 years of experience in building scalable, production-ready systems. He's currently working as a  Backend Engineer at logicwind Inc."
};

function getResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack") || lower.includes("know")) {
    return SAMPLE_RESPONSES.skills;
  }
  if (lower.includes("experience") || lower.includes("work") || lower.includes("job") || lower.includes("career")) {
    return SAMPLE_RESPONSES.experience;
  }
  if (lower.includes("project") || lower.includes("portfolio") || lower.includes("built") || lower.includes("create")) {
    return SAMPLE_RESPONSES.projects;
  }
  if (lower.includes("contact") || lower.includes("reach") || lower.includes("email") || lower.includes("hire")) {
    return SAMPLE_RESPONSES.contact;
  }
  if (lower.includes("available") || lower.includes("freelance") || lower.includes("consult")) {
    return SAMPLE_RESPONSES.availability;
  }
  if (lower.includes("profile") || lower.includes("about") || lower.includes("know")) {
    return SAMPLE_RESPONSES.profile;
  }
  return SAMPLE_RESPONSES.default;
}

function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      <div
        className={`w-8 h-8 flex items-center justify-center shrink-0 ${isUser ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
          }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      <div
        className={`max-w-[80%] p-3 font-mono text-sm ${isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground border-2 border-primary/30"
          }`}
      >
        {message.content}
      </div>
    </motion.div>
  );
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getResponse(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground flex items-center justify-center shadow-brutal hover:shadow-brutal-lg transition-all ${isOpen ? "hidden" : ""
          }`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-accent flex items-center justify-center"
        >
          <Sparkles className="w-3 h-3 text-accent-foreground" />
        </motion.span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-card border-4 border-primary shadow-brutal flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b-4 border-primary bg-primary/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent flex items-center justify-center">
                  <Bot className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-foreground">AI Assistant</h3>
                  <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-primary/20 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 bg-accent flex items-center justify-center">
                    <Bot className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div className="bg-muted border-2 border-primary/30 p-3 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="font-mono text-sm text-muted-foreground">Typing...</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t-4 border-primary">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 bg-background border-2 border-primary font-mono text-sm focus:outline-none focus:border-accent transition-colors"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="px-4 py-3 bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="mt-2 text-xs font-mono text-muted-foreground text-center">
                Powered by AI • Ask about skills, projects, or availability
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
