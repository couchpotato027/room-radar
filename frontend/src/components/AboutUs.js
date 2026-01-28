import React from 'react';
import Button from './ui/Button';
import { Link } from 'react-router-dom';

const AboutUs = ({ user, onLogout }) => {
    return (
        <div className="min-h-screen bg-secondary-50">
            <main className="max-w-4xl mx-auto px-4 py-16 text-center">
                {/* Hero Section */}
                <div className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-6 tracking-tight">
                        More than just a room, <br />
                        <span className="text-accent-500">it's {user?.role === 'OWNER' ? 'their' : 'your'} new beginning.</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Every year, thousands of students leave the comfort of their homes to chase their dreams.
                        At RoomRadar, we believe that finding a place to stay should be the start of a beautiful journey, not a stressful chore.
                    </p>
                </div>

                {/* The Emotional Story / "Poetry" Section */}
                <div className="bg-white rounded-3xl p-10 md:p-16 border border-secondary-200 shadow-sm mb-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-50 rounded-full blur-3xl -ml-16 -mb-16 opacity-50"></div>

                    <blockquote className="relative z-10 italic text-lg md:text-2xl text-gray-700 font-serif leading-loose">
                        "We left our homes with heavy bags and heavier hearts,<br />
                        Chasing dreams in crowded streets and unknown parts.<br />
                        Mom's cooked meals, Dad's protective shade,<br />
                        Replaced by goals and the promises we made.<br /><br />
                        But even far away, a heart needs a nest,<br />
                        A corner of peace, a place to rest.<br />
                        So we built RoomRadar, with a simple decree:<br />
                        To find not just a hostel, but a home for thee."
                    </blockquote>
                </div>

                {/* Mission Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left items-center mb-16">
                    <div>
                        <h2 className="text-3xl font-serif font-bold text-primary-900 mb-6">Our Promise</h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            We understand that moving to a new city is daunting. It's the first time many of you are stepping out into the world on your own.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            That's why we don't just list hostels; we vet homes. We look for safety, comfort, and that little touch of warmth that makes a space feel less like a dormitory and more like a sanctuary. Because when your living space is taken care of, you can focus on what truly matters—building your future.
                        </p>
                    </div>
                    <div className="h-64 md:h-full bg-secondary-100 rounded-3xl flex items-center justify-center relative overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&q=80"
                            alt="Students studying together"
                            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <span className="relative text-white font-bold text-xl z-10">Finding your tribe</span>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <h3 className="text-2xl font-serif font-bold text-primary-900 mb-6">
                        {user?.role === 'OWNER' ? 'Ready to welcome students?' : 'Ready to find your second home?'}
                    </h3>
                    <Link to={user?.role === 'OWNER' ? '/list-hostel' : '/'}>
                        <Button variant="primary" size="lg" className="px-12">
                            {user?.role === 'OWNER' ? 'Start Listing' : 'Start Searching'}
                        </Button>
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default AboutUs;
