import React, { useRef } from 'react';
import { cn } from '@/lib/utils';

function createRipple(event, ref) {
  const button = ref.current;
  if (!button) return;
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  const ripple = document.createElement('span');
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.className = 'absolute rounded-full bg-white/20 animate-ripple pointer-events-none';
  button.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
}

export function RippleButton({ children, className, variant = 'default', ...props }) {
  const ref = useRef(null);

  const variants = {
    default: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    outline: 'border border-border bg-transparent hover:bg-muted text-foreground',
    ghost: 'bg-transparent hover:bg-muted text-foreground',
  };

  return (
    <button
      ref={ref}
      className={cn(
        'relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        className
      )}
      onMouseDown={(e) => createRipple(e, ref)}
      {...props}
    >
      {children}
    </button>
  );
}
