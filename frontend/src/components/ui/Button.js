import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-primary-900 text-white hover:bg-primary-800 shadow-md hover:shadow-lg rounded-full',
        secondary: 'bg-secondary-100 text-primary-900 hover:bg-secondary-200 rounded-full',
        accent: 'bg-accent-500 text-white hover:bg-accent-600 shadow-md hover:shadow-lg rounded-full',
        outline: 'border-2 border-primary-900 text-primary-900 hover:bg-primary-50 rounded-full',
        ghost: 'text-primary-900 hover:bg-secondary-100 rounded-lg',
    };

    const sizes = {
        sm: 'px-4 py-1.5 text-sm',
        md: 'px-6 py-2.5 text-base',
        lg: 'px-8 py-3.5 text-lg',
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
