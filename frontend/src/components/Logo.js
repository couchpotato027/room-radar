import React from 'react';

const Logo = ({ className = "w-8 h-8" }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="RoomRadar Logo"
  >
    {/* Soft geometric house shape */}
    <path
      d="M20 4L4 16V34C4 35.1046 4.89543 36 6 36H14V24H26V36H34C35.1046 36 36 35.1046 36 34V16L20 4Z"
      className="fill-primary-900"
    />
    {/* Subtle radar pulse / location dot accent */}
    <circle cx="20" cy="19" r="4" className="fill-accent-500" />
    <path
      d="M20 9L29 16"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      className="opacity-20"
    />
  </svg>
);

export default Logo;
