'use client';

import React, { useState } from 'react';
import { Send, Mail, User, Type, MessageSquare, Loader2, CheckCircle2, XCircle } from 'lucide-react';

export default function EmailPage() {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    message: '',
    clientId: '',
    clientSecret: '',
    refreshToken: '',
    userEmail: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Failed to send email');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Network error occurred');
    }
  };

  return (
    <div className="pt-32 pb-20 px-12 max-w-7xl mx-auto space-y-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">
          Email <span className="text-gradient">Automation</span>
        </h1>
        <p className="text-white/60">
          The final piece of the puzzle. Use your long-lived Refresh Token to send an email via the Gmail API.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-5">
        <form onSubmit={sendEmail} className="lg:col-span-3 glass p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50 uppercase flex items-center gap-2">
                <User className="w-3 h-3" /> Recipient
              </label>
              <input
                required
                type="email"
                placeholder="hello@example.com"
                value={formData.to}
                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50 uppercase flex items-center gap-2">
                <Type className="w-3 h-3" /> Subject
              </label>
              <input
                required
                type="text"
                placeholder="Automated Greeting"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50 uppercase flex items-center gap-2">
                <MessageSquare className="w-3 h-3" /> Message
              </label>
              <textarea
                required
                rows={4}
                placeholder="This email was sent using a Refresh Token!"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending via API...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Email
              </>
            )}
          </button>

          {status === 'success' && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-emerald-400 animate-in fade-in zoom-in-95">
              <CheckCircle2 className="w-5 h-5" />
              <p className="text-sm font-medium">Email sent successfully!</p>
            </div>
          )}

          {status === 'error' && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-400 animate-in fade-in zoom-in-95">
              <XCircle className="w-5 h-5" />
              <p className="text-sm font-medium">{errorMsg}</p>
            </div>
          )}
        </form>

        <aside className="lg:col-span-2 space-y-6">
          <div className="glass p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Auth Credentials</h3>
            <p className="text-xs text-white/40 leading-relaxed">
              In a real application, these would be securely stored in your <code className="text-white bg-white/10 px-1">.env</code> file. Paste them here to test the API.
            </p>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Your Gmail Address"
                value={formData.userEmail}
                onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                className="w-full bg-white/5 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
              />
              <input
                type="text"
                placeholder="Client ID"
                value={formData.clientId}
                onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                className="w-full bg-white/5 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
              />
              <input
                type="password"
                placeholder="Client Secret"
                value={formData.clientSecret}
                onChange={(e) => setFormData({ ...formData, clientSecret: e.target.value })}
                className="w-full bg-white/5 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
              />
              <input
                type="text"
                placeholder="Refresh Token"
                value={formData.refreshToken}
                onChange={(e) => setFormData({ ...formData, refreshToken: e.target.value })}
                className="w-full bg-emerald-500/5 border border-emerald-500/10 rounded-lg px-3 py-2 text-xs text-emerald-300 focus:outline-none"
              />
            </div>
          </div>

          <div className="glass p-6 bg-blue-500/5 border-blue-500/10">
            <h3 className="text-sm font-bold text-blue-300 flex items-center gap-2 mb-3">
              <Mail className="w-4 h-4" />
              API Call Logic
            </h3>
            <div className="text-[10px] text-blue-200/50 space-y-2">
              <p>1. Backend receives Refresh Token.</p>
              <p>2. Backend requests temporary <span className="text-blue-300">Access Token</span> from Google.</p>
              <p>3. Nodemailer uses Access Token to authenticate SMTP.</p>
              <p>4. Email is sent!</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
