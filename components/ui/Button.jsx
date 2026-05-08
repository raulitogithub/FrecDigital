import { forwardRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      href,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles = 'font-semibold rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
      primary: 'bg-[#1a3a6b] text-white hover:bg-[#0f2847] focus:ring-[#1a3a6b] hover:shadow-lg hover:shadow-[#1a3a6b]/30',
      accent: 'bg-[#00b4d8] text-white hover:bg-[#0096b8] focus:ring-[#00b4d8] hover:shadow-lg hover:shadow-[#00b4d8]/40',
      outline: 'border-2 border-[#1a3a6b] text-[#1a3a6b] bg-transparent hover:bg-[#e8f4fc] focus:ring-[#1a3a6b] hover:shadow-lg',
      ghost: 'text-[#1a3a6b] hover:bg-[#e8f4fc] focus:ring-[#1a3a6b]',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    const motionProps = {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    };

    if (href) {
      return (
        <motion.div {...motionProps}>
          <Link href={href} className={buttonClasses}>
            {children}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={buttonClasses}
        {...motionProps}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
