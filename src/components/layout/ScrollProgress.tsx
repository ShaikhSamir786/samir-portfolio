import { useScrollProgress } from "@/hooks/useScrollAnimations";

export default function ScrollProgress() {
  const progressRef = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-secondary z-50">
      <div
        ref={progressRef}
        className="h-full bg-primary origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
