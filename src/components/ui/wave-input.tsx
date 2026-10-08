"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface WaveInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  label: string;
  error?: string | null;
  helperText?: string | null;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const WaveInput = React.forwardRef<HTMLInputElement, WaveInputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className,
      containerClassName,
      id,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      type = "text",
      required,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    const [isFocused, setIsFocused] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(
      defaultValue !== undefined ? String(defaultValue) : ""
    );

    const isControlled = value !== undefined;
    const currentVal = isControlled ? String(value) : internalValue;
    const hasValue = currentVal.length > 0;
    const isActive = isFocused || hasValue;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    // Split label into letters to generate the staggered jumping wave
    const letters = label.split("");

    return (
      <div className={cn("w-full space-y-1", containerClassName)}>
        <div
          className={cn(
            "wave-form-control relative w-full",
            isActive && "is-active",
            leftIcon && "has-left-icon",
            rightIcon && "has-right-icon",
            error && "has-error"
          )}
        >
          {leftIcon && (
            <div className="wave-left-icon absolute left-0 top-3 text-brand-muted transition-colors pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            type={type}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder=" " // required for :placeholder-shown CSS selector
            required={required}
            className={cn(
              "w-full bg-transparent border-0 border-b-2 border-brand-border py-2.5 text-base sm:text-sm text-brand-text outline-none transition-all duration-200",
              "focus:border-brand-primary dark:focus:border-brand-glow",
              leftIcon ? "pl-7" : "pl-0",
              rightIcon ? "pr-8" : "pr-0",
              error && "!border-red-500",
              className
            )}
            {...props}
          />

          <label
            htmlFor={inputId}
            className={cn(
              "absolute top-2.5 flex pointer-events-none select-none transition-all duration-200",
              leftIcon ? "left-7" : "left-0"
            )}
          >
            {letters.map((char, index) => (
              <span
                key={index}
                style={{
                  transitionDelay: `${index * 45}ms`,
                }}
                className={cn(
                  "inline-block text-sm text-brand-muted transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]",
                  char === " " && "w-1.5",
                  isActive &&
                    "-translate-y-6 text-xs font-semibold text-brand-primary dark:text-brand-glow"
                )}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
            {required && (
              <span
                style={{ transitionDelay: `${letters.length * 45}ms` }}
                className={cn(
                  "inline-block text-xs text-brand-primary/70 dark:text-brand-glow/70 ml-1 transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]",
                  isActive && "-translate-y-6"
                )}
              >
                *
              </span>
            )}
          </label>

          {rightIcon && (
            <div className="wave-right-icon absolute right-0 top-2.5 text-brand-muted hover:text-brand-text transition-colors">
              {rightIcon}
            </div>
          )}
        </div>

        {error ? (
          <p className="text-xs text-red-500 pt-0.5 animate-in fade-in duration-150">
            {error}
          </p>
        ) : helperText ? (
          <p className="text-xs text-brand-muted pt-0.5">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

WaveInput.displayName = "WaveInput";
export default WaveInput;
