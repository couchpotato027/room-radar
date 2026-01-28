import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-secondary-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Brand */}
                    <div className="flex items-center space-x-2">
                        <Logo className="w-6 h-6 text-gray-400" />
                        <span className="text-xl font-bold text-gray-400 tracking-tight">RoomRadar</span>
                    </div>

                    {/* Copyright */}
                    <div className="text-sm text-gray-400">
                        © {new Date().getFullYear()} RoomRadar. All rights reserved.
                    </div>

                    {/* Links */}
                    <div className="flex gap-6">
                        <Link to="/about" className="text-sm font-medium text-gray-500 hover:text-primary-900 transition-colors">
                            About Us
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
