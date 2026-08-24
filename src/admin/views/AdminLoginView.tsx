import React, { useState } from 'react';
import { Stethoscope, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Button } from '../../components/ui/Button';

export const AdminLoginView: React.FC = () => {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState('admin@auraskinclinic.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Authenticate via local credentials / mock or API endpoint
      setTimeout(() => {
        login('mock_jwt_token_aura_admin_2026', {
          id: 'admin-1',
          name: 'Dr. Sarah Jenkins',
          email,
          role: 'SUPER_ADMIN',
        });
        setIsLoading(false);
      }, 600);
    } catch (err: any) {
      setError('Invalid login credentials. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B2521] via-[#143D36] to-[#0B2521] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-[#E2E8E6] space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#C89B7B] text-[#0B2521] mx-auto flex items-center justify-center shadow-lg">
            <Stethoscope className="w-7 h-7" />
          </div>
          <h2 className="font-serif font-bold text-2xl text-[#0B2521]">Aura Medical Admin</h2>
          <p className="text-xs text-gray-500">Sign in to manage clinic operations & patient care</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-4 py-2.5 bg-[#F4F6F5] border border-gray-200 rounded-xl text-xs text-[#121816] focus:outline-none focus:border-[#C89B7B] focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-4 py-2.5 bg-[#F4F6F5] border border-gray-200 rounded-xl text-xs text-[#121816] focus:outline-none focus:border-[#C89B7B] focus:bg-white"
              />
            </div>
          </div>

          <Button variant="primary" fullWidth type="submit" disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Sign In to Portal'} <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <div className="text-center text-[11px] text-gray-400">
          Protected Area • Aura Medical System v2.0
        </div>
      </div>
    </div>
  );
};
