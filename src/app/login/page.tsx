'use client';

import React, { useState, useEffect } from 'react';
import { Globe, ArrowRight, Code, Info, Lock } from 'lucide-react';

export default function LoginPage() {
  const [clientId, setClientId] = useState('');
  const [redirectUri, setRedirectUri] = useState('');
  const [authUrl, setAuthUrl] = useState('');

  // Default redirect URI for local development
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRedirectUri(`${window.location.origin}/dashboard`);
    }
  }, []);

  // Dynamically construct the Google OAuth2 URL
  useEffect(() => {
    const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const params = new URLSearchParams({
      client_id: clientId || 'YOUR_CLIENT_ID',
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'https://mail.google.com/', // Critical scope for sending emails
      access_type: 'offline', // Required to get a Refresh Token
      prompt: 'consent', // Forces the consent screen to ensure Refresh Token is provided
    });
    setAuthUrl(`${baseUrl}?${params.toString()}`);
  }, [clientId, redirectUri]);

  return (
    <div className="pt-32 pb-20 px-12 max-w-7xl mx-auto grid gap-12 lg:grid-cols-2">
      <div className="space-y-8">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold text-white">
            The <span className="text-gradient">Handshake</span>
          </h1>
          <p className="text-lg text-white/60">
            Before we get tokens, we must ask the user for permission. This is done by redirecting them to Google's specialized login page.
          </p>
        </header>

        <div className="glass p-6 space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-white/70">
              Enter your Client ID (from Google Cloud)
            </label>
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder="e.g. 123456-abc.apps.googleusercontent.com"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex gap-3 items-start">
            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="text-sm text-blue-200/70 leading-relaxed">
              <strong className="text-blue-300">Why Redirect URI?</strong> Google only sends the authorization code back to a pre-approved URL. For this sandbox, it is set to <code className="text-white bg-white/10 px-1 rounded">{redirectUri}</code>.
            </div>
          </div>
        </div>

        <button
          onClick={() => window.location.href = authUrl}
          disabled={!clientId}
          className="group relative w-full overflow-hidden rounded-2xl bg-white p-4 font-bold text-black transition-all hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="relative z-10 flex items-center justify-center gap-3">
            <Globe className="w-5 h-5" />
            Sign in with Google
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2 text-white/40 uppercase tracking-widest text-xs font-bold">
          <Code className="w-4 h-4" />
          URL Construction Breakdown
        </div>

        <div className="glass p-6 space-y-6 overflow-hidden">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Endpoint
            </h3>
            <p className="text-xs text-white/40 font-mono break-all">
              https://accounts.google.com/o/oauth2/v2/auth
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              Query Parameters
            </h3>
            <div className="space-y-3">
              {[
                { key: 'client_id', val: clientId || '...', desc: 'Tells Google which app is asking.' },
                { key: 'redirect_uri', val: redirectUri, desc: 'Where to send the user after login.' },
                { key: 'response_type', val: 'code', desc: 'We want an Authorization Code.' },
                { key: 'scope', val: 'https://mail.google.com/', desc: 'Full access to Gmail (dangerous!)' },
                { key: 'access_type', val: 'offline', desc: 'Crucial for getting a Refresh Token.' },
                { key: 'prompt', val: 'consent', desc: 'Ensure user sees the permission screen.' },
              ].map((param) => (
                <div key={param.key} className="p-3 bg-black/40 rounded-lg border border-white/5 space-y-1">
                  <div className="flex justify-between items-center">
                    <code className="text-purple-400 text-xs font-bold">{param.key}</code>
                    <code className="text-white/60 text-[10px]">{param.val.length > 30 ? param.val.substring(0, 30) + '...' : param.val}</code>
                  </div>
                  <p className="text-[10px] text-white/30">{param.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/5">
            <h3 className="text-sm font-bold text-white mb-3">Final URL Preview</h3>
            <div className="p-4 bg-black/60 rounded-xl text-[10px] font-mono text-white/40 break-all leading-relaxed border border-white/10">
              {authUrl}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
