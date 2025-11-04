'use client';

import * as motion from 'motion/react-client';

const PageHeader = ({ title, subtitle, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`text-center mb-12 ${className}`}
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default PageHeader;

