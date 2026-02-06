import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-400 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-stone-900 text-white hover:bg-stone-800 rounded-xl',
        secondary: 'bg-stone-100 text-stone-900 hover:bg-stone-200 rounded-xl',
        accent: 'bg-amber-600 text-white hover:bg-amber-700 rounded-xl',
        outline: 'border border-stone-300 text-stone-900 hover:bg-stone-50 rounded-xl',
        ghost: 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-2.5 text-base',
        lg: 'px-8 py-3 text-lg',
        icon: 'p-2',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
