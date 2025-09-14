import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  variant?: 'light' | 'dark' | 'default';
  onClick?: () => void;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8', 
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
};

const textSizeClasses = {
  sm: 'text-sm',
  md: 'text-lg',
  lg: 'text-xl', 
  xl: 'text-2xl'
};

export function Logo({ 
  size = 'md', 
  showText = true, 
  className,
  variant = 'default',
  onClick
}: LogoProps) {
  // Determine which logo to use based on variant
  const logoSrc = variant === 'light' ? '/src/assets/logo-dark.png' : '/src/assets/logo.png';
  
  const logoSvg = (
    <img 
      src={logoSrc}
      alt="Code Rev Minds Logo"
      className={cn(sizeClasses[size], className)}
    />
  );

  if (!showText) {
    return logoSvg;
  }

  const textColor = variant === 'light' ? 'text-white' : variant === 'dark' ? 'text-slate-900' : 'text-achievement-gold';

  return (
    <div 
      className={cn("flex items-center space-x-3", onClick && "cursor-pointer", className)}
      onClick={onClick}
    >
      {logoSvg}
      <span className={cn("font-bold", textSizeClasses[size], textColor)}>
        Code Rev Minds
      </span>
    </div>
  );
}
