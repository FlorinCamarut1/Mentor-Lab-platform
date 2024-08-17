"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  withEye?: boolean;
  isPending?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, withEye = false, isPending = false, ...props }, ref) => {
    const [eyeOpen, setEyeOpen] = React.useState(false);

    return (
      <div className="relative">
        <input
          disabled={isPending}
          type={withEye ? (eyeOpen ? "text" : "password") : type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />

        {withEye && !eyeOpen && (
          <FaEye
            className="absolute right-3 top-1/2 z-40 -translate-y-1/2 cursor-pointer"
            onClick={() => {
              setEyeOpen(!eyeOpen);
            }}
          />
        )}

        {withEye && eyeOpen && (
          <FaEyeSlash
            className="absolute right-3 top-1/2 z-40 -translate-y-1/2 cursor-pointer"
            onClick={() => {
              setEyeOpen(!eyeOpen);
            }}
          />
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
