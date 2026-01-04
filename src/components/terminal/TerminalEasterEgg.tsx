import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FileSystem {
  [key: string]: string | FileSystem;
}

const fileSystem: FileSystem = {
  home: {
    projects: {
      "rag.md": `# RAG Platform
  
Retrieval Augmented Generation system
Built with React, Node.js, Vector DB
GitHub: github.com/ShaikhSamir786/rag`,
      "2fa-mern.md": `# 2FA MERN Auth

Two-Factor Authentication System
Stack: MongoDB, Express, React, Node.js
GitHub: github.com/ShaikhSamir786/2FA-MERN`,
      "typescript-sdk.md": `# TypeScript SDK

SDK for JSONPlaceholder API
Production-ready clean architecture
GitHub: github.com/ShaikhSamir786/TypeScript-SDK-for-JSONPlaceholder`,
      "eventify.md": `# Eventify

Event Management Platform
Scalable architecture
GitHub: github.com/ShaikhSamir786/Eventify`,
    },
    skills: {
      "frontend.txt": "React, Next.js, TypeScript, Three.js, Framer Motion, TailwindCSS",
      "backend.txt": "Node.js, Python, Go, PostgreSQL, MongoDB, Redis, GraphQL",
      "devops.txt": "AWS, Docker, Kubernetes, Terraform, GitHub Actions, Datadog",
    },
    about: {
      "readme.txt": `> WHOAMI
  
Full-stack developer specializing in scalable backend systems.
1+ years of experience building production applications.
Passionate about clean code and system architecture.

Type 'contact' for ways to reach me.`,
      "contact.txt": `EMAIL: 22amtics312@gmail.com
GITHUB: github.com/ShaikhSamir786
LINKEDIN: linkedin.com/in/samir-shaikh-760b932a8/`,
    },
    ".secret": "🎉 You found the secret! Use code TERMINAL-MASTER for a virtual high-five.",
  },
};

const COMMANDS = {
  help: `Available commands:
  ls              - List directory contents
  cd <dir>        - Change directory
  cat <file>      - Display file contents
  pwd             - Print working directory
  clear           - Clear terminal
  whoami          - Display user info
  projects        - Quick view of projects
  skills          - Display skills summary
  contact         - Show contact info
  github          - Open GitHub profile
  exit            - Close terminal
  
  Tip: Tab to autocomplete, Up/Down for history`,
  whoami: `> developer@portfolio
> Full-Stack Developer | Backend Specialist
> "I build backends that scale. And frontends that don't suck."`,
  projects: `[PROJECTS]
  
├── rag               RAG Platform (AI/ML)
├── 2fa-mern          2FA Authentication System
├── typescript-sdk    JSONPlaceholder SDK
└── eventify          Event Management Platform

Use 'cd projects && cat <file>' for details`,
  skills: `[SKILLS]

FRONTEND  ████████████░░░░  75%
  React, Next.js, TypeScript, Three.js

BACKEND   █████████████████  95%
  Node.js, Python, Go, PostgreSQL

DEVOPS    ██████████████░░  85%
  AWS, Docker, Kubernetes, Terraform`,
  contact: `[CONTACT]

📧 Email:    22amtics312@gmail.com
🐙 GitHub:   github.com/ShaikhSamir786
💼 LinkedIn: linkedin.com/in/samir-shaikh-760b932a8/

Or use the contact form: type 'exit' and scroll to contact section`,
};

export default function TerminalEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<{ command: string; output: string }[]>([
    { command: "", output: "Welcome to the Terminal Portfolio v1.0.0\nType 'help' for available commands.\n" },
  ]);
  const [input, setInput] = useState("");
  const [currentPath, setCurrentPath] = useState<string[]>(["home"]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const getCurrentDir = useCallback((): FileSystem | string => {
    let current: FileSystem | string = fileSystem;
    for (const dir of currentPath) {
      if (typeof current === "object" && dir in current) {
        current = current[dir] as FileSystem | string;
      } else {
        return {};
      }
    }
    return current;
  }, [currentPath]);

  const processCommand = useCallback((cmd: string): string => {
    const parts = cmd.trim().split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ");

    switch (command) {
      case "help":
        return COMMANDS.help;
      case "ls":
        const dir = getCurrentDir();
        if (typeof dir === "object") {
          return Object.keys(dir)
            .map((item) => {
              const isDir = typeof dir[item] === "object";
              return isDir ? `📁 ${item}/` : `📄 ${item}`;
            })
            .join("\n");
        }
        return "Not a directory";
      case "cd":
        if (!args || args === "~" || args === "/") {
          setCurrentPath(["home"]);
          return "";
        }
        if (args === "..") {
          if (currentPath.length > 1) {
            setCurrentPath((prev) => prev.slice(0, -1));
          }
          return "";
        }
        const currentDir = getCurrentDir();
        if (typeof currentDir === "object" && args in currentDir) {
          if (typeof currentDir[args] === "object") {
            setCurrentPath((prev) => [...prev, args]);
            return "";
          }
          return `${args}: Not a directory`;
        }
        return `cd: ${args}: No such directory`;
      case "cat":
        if (!args) return "Usage: cat <filename>";
        const catDir = getCurrentDir();
        if (typeof catDir === "object" && args in catDir) {
          const content = catDir[args];
          if (typeof content === "string") {
            return content;
          }
          return `${args}: Is a directory`;
        }
        return `cat: ${args}: No such file`;
      case "pwd":
        return "/" + currentPath.join("/");
      case "clear":
        setHistory([]);
        return "";
      case "whoami":
        return COMMANDS.whoami;
      case "projects":
        return COMMANDS.projects;
      case "skills":
        return COMMANDS.skills;
      case "contact":
        return COMMANDS.contact;
      case "github":
        window.open("https://github.com/ShaikhSamir786", "_blank");
        return "Opening GitHub...";
      case "exit":
        setTimeout(() => setIsOpen(false), 100);
        return "Closing terminal...";
      case "":
        return "";
      default:
        return `Command not found: ${command}. Type 'help' for available commands.`;
    }
  }, [getCurrentDir, currentPath]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const output = processCommand(input);
    if (output !== "" || input === "clear") {
      setHistory((prev) => input === "clear" ? [] : [...prev, { command: input, output }]);
    } else if (input.startsWith("cd")) {
      setHistory((prev) => [...prev, { command: input, output: "" }]);
    }
    if (input.trim()) {
      setCommandHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);
    }
    setInput("");
  }, [input, processCommand]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const currentDir = getCurrentDir();
      if (typeof currentDir === "object") {
        const matches = Object.keys(currentDir).filter((item) =>
          item.toLowerCase().startsWith(input.split(" ").pop()?.toLowerCase() || "")
        );
        if (matches.length === 1) {
          const parts = input.split(" ");
          parts[parts.length - 1] = matches[0];
          setInput(parts.join(" "));
        }
      }
    }
  }, [commandHistory, historyIndex, getCurrentDir, input]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "`" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => inputRef.current?.focus()}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-4xl h-[80vh] border-4 border-primary bg-card shadow-brutal"
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b-4 border-primary bg-primary/10">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-accent" />
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="ml-4 font-mono text-sm text-muted-foreground">
                terminal@portfolio:~/{currentPath.slice(1).join("/")}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto text-muted-foreground hover:text-foreground font-mono text-sm"
              >
                [ESC to close]
              </button>
            </div>

            {/* Terminal Content */}
            <div
              ref={terminalRef}
              className="h-[calc(100%-60px)] overflow-y-auto p-4 font-mono text-sm"
            >
              {history.map((item, i) => (
                <div key={i} className="mb-2">
                  {item.command && (
                    <div className="flex items-center gap-2 text-primary">
                      <span className="text-accent">❯</span>
                      <span>{item.command}</span>
                    </div>
                  )}
                  {item.output && (
                    <pre className="text-foreground whitespace-pre-wrap mt-1 ml-4">
                      {item.output}
                    </pre>
                  )}
                </div>
              ))}

              {/* Input Line */}
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <span className="text-accent">❯</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-primary caret-primary"
                  spellCheck={false}
                  autoComplete="off"
                />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
