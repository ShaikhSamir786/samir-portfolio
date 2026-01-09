import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Monitor } from 'lucide-react';

type PopupType = 'screen-size' | 'secret-hint' | null;

export default function SecretFeatureHint() {
    const [currentPopup, setCurrentPopup] = useState<PopupType>(null);
    const [hasShownSession, setHasShownSession] = useState(false);

    useEffect(() => {
        // Check if popups have already been shown in this session
        const sessionKey = 'portfolio-popups-shown';
        const alreadyShown = sessionStorage.getItem(sessionKey);

        if (alreadyShown) {
            setHasShownSession(true);
            return;
        }

        // Popup sequence timing
        // 1. Show first popup after 1.5s
        const showFirstTimer = setTimeout(() => {
            setCurrentPopup('screen-size');
        }, 1500);

        // 2. Hide first popup after 6s (total 7.5s from mount)
        const hideFirstTimer = setTimeout(() => {
            setCurrentPopup(null);
        }, 7500);

        // 3. Show second popup after 2s delay (total 9.5s from mount)
        const showSecondTimer = setTimeout(() => {
            setCurrentPopup('secret-hint');
        }, 9500);

        // 4. Hide second popup after 5s (total 14.5s from mount)
        const hideSecondTimer = setTimeout(() => {
            setCurrentPopup(null);
            sessionStorage.setItem(sessionKey, 'true');
            setHasShownSession(true);
        }, 14500);

        return () => {
            clearTimeout(showFirstTimer);
            clearTimeout(hideFirstTimer);
            clearTimeout(showSecondTimer);
            clearTimeout(hideSecondTimer);
        };
    }, []);

    // Dismiss if user finds the secret feature early
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "`" && (e.ctrlKey || e.metaKey)) {
                setCurrentPopup(null);
                sessionStorage.setItem('portfolio-popups-shown', 'true');
                setHasShownSession(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleClose = () => {
        setCurrentPopup(null);
        sessionStorage.setItem('portfolio-popups-shown', 'true');
        setHasShownSession(true);
    };

    if (hasShownSession && !currentPopup) {
        return null;
    }

    return (
        <AnimatePresence mode="wait">
            {currentPopup === 'screen-size' && (
                <motion.div
                    key="screen-size"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed bottom-6 right-6 z-50 max-w-xs md:max-w-sm pointer-events-auto"
                >
                    <div className="relative bg-card border-2 border-primary p-4 shadow-brutal flex items-start gap-4">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-50" />

                        <div className="shrink-0 p-2 bg-primary/10 rounded-sm">
                            <Monitor className="w-5 h-5 text-primary" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="font-display text-lg leading-none mb-1 text-foreground">Welcome!</h3>
                            <p className="font-mono text-xs md:text-sm text-muted-foreground leading-relaxed">
                                For a better user experience, please use a large screen or laptop.
                            </p>
                        </div>

                        <button
                            onClick={handleClose}
                            className="shrink-0 text-muted-foreground hover:text-destructive transition-colors -mt-1 -mr-1"
                            aria-label="Close notification"
                        >
                            <X className="w-4 h-4" />
                            <span className="sr-only">Close</span>
                        </button>
                    </div>
                </motion.div>
            )}

            {currentPopup === 'secret-hint' && (
                <motion.div
                    key="secret-hint"
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
                            onClick={handleClose}
                            className="shrink-0 text-muted-foreground hover:text-destructive transition-colors -mt-1 -mr-1"
                            aria-label="Close notification"
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
