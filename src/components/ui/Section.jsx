'use client';

import * as motion from 'motion/react-client';

const Section = ({ 
  id,
  children, 
  className = '',
  background = 'dark',
  ...props 
}) => {
  const backgrounds = {
    dark: 'bg-black',
    light: 'bg-white',
    gradient: 'bg-gradient-to-b from-black to-gray-900',
    image: ''
  };
  
  const baseClasses = `py-20 relative overflow-hidden ${backgrounds[background]}`;
  
  return (
    <section id={id} className={`${baseClasses} ${className}`} {...props}>
      {children}
    </section>
  );
};

export default Section;

