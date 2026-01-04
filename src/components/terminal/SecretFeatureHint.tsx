import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X } from 'lucide-react';

export default function SecretFeatureHint() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show after a short delay to let the page load
        const showTimer = setTimeout(() => setIsVisible(true), 1500);

        // Hide after 5 seconds of being visible (total 6.5s from mount)
        const hideTimer = setTimeout(() => {
            setIsVisible(false);
        }, 6500);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    // Dismiss if user finds it early
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "`" && (e.ctrlKey || e.metaKey)) {
                setIsVisible(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-6 right-6 z-50 max-w-xs md:max-w-sm pointer-events-auto"
                >
                    <div className="relative bg-card border-2 border-primary p-4 shadow-brutal flex items-start gap-4">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-50" />

                        <div className="shrink-0 p-2 bg-primary/10 rounded-sm">
                            <Terminal className="w-5 h-5 text-primary" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="font-display text-lg leading-none mb-1 text-foreground">System Hint</h3>
                            <p className="font-mono text-xs md:text-sm text-muted-foreground leading-relaxed">
                                Press <span className="inline-block px-1.5 py-0.5 bg-primary/20 text-primary border border-primary/30 rounded text-[10px] font-bold">Ctrl + `</span> to access a secret feature.
                            </p>
                        </div>

                        <button
                            onClick={() => setIsVisible(false)}
                            className="shrink-0 text-muted-foreground hover:text-destructive transition-colors -mt-1 -mr-1"
                        >
                            <X className="w-4 h-4" />
                            <span className="sr-only">Close</span>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
