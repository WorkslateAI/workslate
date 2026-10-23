import React from 'react';

export const SignIn: React.FC = () => {
  return (
    <section id="sign-in" className="py-20 bg-navy-800">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-900 border border-navy-700 rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign In</h2>
          <p className="text-navy-300 text-center mb-6">
            Sign in to access your dashboard and manage your token movements.
          </p>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-navy-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 bg-navy-800 border border-navy-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-navy-500"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-navy-300 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 bg-navy-800 border border-navy-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-navy-500"
                placeholder="••••••••"
              />
            </div>
            
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Sign In
            </button>
          </div>
          
          <p className="text-center text-sm text-navy-300 mt-6">
            Don't have an account?{' '}
            <a href="#get-started" className="text-blue-400 hover:underline">
              Get Started
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
