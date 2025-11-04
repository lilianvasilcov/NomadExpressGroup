'use client';

import * as motion from 'motion/react-client';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  ...props 
}) => {
  const baseClasses = 'rounded-lg shadow-lg overflow-hidden transition-all duration-300';
  const hoverClasses = hover ? 'hover:shadow-2xl hover:scale-[1.02]' : '';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${baseClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;

