'use client';

import * as motion from 'motion/react-client';
import Link from 'next/link';

const Button = ({ 
  children, 
  href, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = '',
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center';
  
  const variants = {
    primary: 'btn-primary text-white',
    secondary: 'border border-white text-white hover:bg-white hover:text-black',
    outline: 'border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white',
    ghost: 'text-white hover:bg-white/10'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link href={href} className={classes} {...props}>
          {children}
        </Link>
      </motion.div>
    );
  }
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={classes}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;

