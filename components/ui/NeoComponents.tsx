import React from 'react';

export const NeoCard: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  title?: string;
  action?: React.ReactNode;
}> = ({ children, className = "", title, action }) => (
  <div className={`bg-card text-card-foreground border-2 border-border shadow-neo p-6 ${className}`}>
    {(title || action) && (
      <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-muted">
        {title && <h3 className="font-mono font-bold uppercase tracking-wider text-sm">{title}</h3>}
        {action && <div>{action}</div>}
      </div>
    )}
    {children}
  </div>
);

export const NeoButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'accent' | 'ghost' }> = ({ 
  children, 
  variant = 'primary', 
  className = "", 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 font-bold uppercase tracking-wider text-sm transition-all active:translate-y-[2px] active:translate-x-[2px] active:shadow-none border-2 border-border font-mono";
  
  const variants = {
    primary: "bg-primary text-primary-foreground shadow-neo hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground shadow-neo hover:bg-secondary/90",
    accent: "bg-accent text-accent-foreground shadow-neo hover:bg-accent/90",
    ghost: "bg-transparent border-transparent shadow-none hover:bg-muted/20 text-foreground",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export const NeoInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = "", ...props }) => (
  <input 
    className={`w-full bg-background border-2 border-border p-3 font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-muted-foreground ${className}`}
    {...props}
  />
);

export const Badge: React.FC<{ children: React.ReactNode, color?: string }> = ({ children, color = "bg-muted" }) => (
    <span className={`${color} border border-border px-2 py-1 text-xs font-mono font-bold uppercase`}>
        {children}
    </span>
);
