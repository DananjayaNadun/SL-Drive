import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  color?: "success" | "primary" | "danger";
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, color = "success", ...props }, ref) => {
    
    const bgColor = {
      success: "bg-success",
      primary: "bg-primary",
      danger: "bg-danger"
    }[color];

    return (
      <div
        ref={ref}
        className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
        {...props}
      >
        <motion.div
          className={cn("h-full w-full flex-1 transition-all", bgColor)}
          initial={{ x: "-100%" }}
          animate={{ x: `-${100 - value}%` }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        >
          {/* Add the little light reflection for Duolingo style */}
          <div className="absolute top-1 left-2 h-1 w-full max-w-[calc(100%-1rem)] rounded-full bg-white/30" />
        </motion.div>
      </div>
    );
  }
);
ProgressBar.displayName = "ProgressBar";

export { ProgressBar };
