import React from 'react';
import Header from './Header';
import Footer from './Footer';

const UserLayout = ({ children, user, onLogout }) => {
    return (
        <div className="min-h-screen flex flex-col bg-secondary-50">
            <Header user={user} onLogout={onLogout} />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default UserLayout;
