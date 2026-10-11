import React, { useState } from 'react';
import { UserSession } from '../../types';
import { saveSession } from '../../services/storage';
import { X, User, Lock, Mail, Shield, CheckCircle2, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: UserSession;
  onUpdateSession: (s: UserSession) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  session,
  onUpdateSession
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'citizen' | 'student' | 'jobseeker' | 'parent'>('jobseeker');
  const [message, setMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    const newSession: UserSession = {
      isLoggedIn: true,
      email: email.trim(),
      fullName: fullName.trim() || (email.split('@')[0]),
      role,
      createdAt: new Date().toISOString()
    };

    saveSession(newSession);
    onUpdateSession(newSession);
    setMessage(isRegister ? 'Account created successfully!' : 'Signed in successfully!');
    setTimeout(() => {
      setMessage(null);
      onClose();
    }, 1000);
  };

  const handleSignOut = () => {
    const guest: UserSession = { isLoggedIn: false, fullName: 'Guest Citizen' };
    saveSession(guest);
    onUpdateSession(guest);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        {session.isLoggedIn ? (
          /* User Profile View */
          <div className="text-center space-y-4 py-2">
            <div className="w-14 h-14 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-400 mx-auto flex items-center justify-center">
              <User className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {session.fullName}
              </h3>
              <p className="text-xs text-slate-500 font-mono">{session.email}</p>
              <div className="mt-1 text-xs text-teal-700 dark:text-teal-400 font-medium capitalize">
                Role: {session.role || 'Citizen'}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
              Your checks are stored locally on this device with full privacy and zero central data harvesting.
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
              >
                Sign Out
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 text-xs font-bold rounded-lg bg-teal-800 text-white hover:bg-teal-900"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* Sign In / Sign Up Form */
          <div>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-teal-800 text-white flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {isRegister ? 'Create Verifai Account' : 'Sign In to Verifai'}
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Any valid email address is accepted. Verification is independent of hosting accounts.
              </p>
            </div>

            {message && (
              <div className="mb-4 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              {isRegister && (
                <>
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rahul Verma"
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Primary Category
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as any)}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      <option value="jobseeker">Job Seeker / Fresher</option>
                      <option value="student">Student / College Applicant</option>
                      <option value="parent">Parent / Family Guardian</option>
                      <option value="citizen">Skilled Worker / Citizen</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 rounded-lg shadow-sm transition-colors mt-2"
              >
                {isRegister ? 'Register Account' : 'Sign In'}
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
              {isRegister ? (
                <span>
                  Already registered?{' '}
                  <button onClick={() => setIsRegister(false)} className="text-teal-700 dark:text-teal-400 font-semibold hover:underline">
                    Sign in here
                  </button>
                </span>
              ) : (
                <span>
                  Don't have an account?{' '}
                  <button onClick={() => setIsRegister(true)} className="text-teal-700 dark:text-teal-400 font-semibold hover:underline">
                    Create one here
                  </button>
                </span>
              )}
            </div>

            <div className="mt-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-[11px] text-slate-500 flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>
                Guest mode is fully supported. You can explore all checkers without creating an account.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
