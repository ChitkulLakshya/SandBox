'use client';

import React, { useState } from 'react';
import { Search, Trash2, ShieldAlert, Cpu, Key, HelpCircle, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';

export default function AdvancedPage() {
  const [inspectToken, setInspectToken] = useState('');
  const [inspectResult, setInspectResult] = useState<any>(null);
  const [inspectLoading, setInspectLoading] = useState(false);

  const [revokeToken, setRevokeToken] = useState('');
  const [revokeStatus, setRevokeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const checkToken = async () => {
    if (!inspectToken) return;
    setInspectLoading(true);
    setInspectResult(null);
    try {
      const res = await fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${inspectToken}`);
      const data = await res.json();
      setInspectResult(data);
    } catch (err) {
      setInspectResult({ error: 'Failed to fetch token info' });
    } finally {
      setInspectLoading(false);
    }
  };

  const handleRevoke = async () => {
    if (!revokeToken) return;
    setRevokeStatus('loading');
    try {
      // Note: Google's revoke endpoint works via POST with x-www-form-urlencoded or GET
      const res = await fetch(`https://oauth2.googleapis.com/revoke?token=${revokeToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      if (res.ok) setRevokeStatus('success');
      else setRevokeStatus('error');
    } catch (err) {
      setRevokeStatus('error');
    }
  };

  return (
    <div className="pt-32 pb-20 px-12 max-w-7xl mx-auto space-y-16">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold text-white">
          Advanced <span className="text-gradient">Security & Tools</span>
        </h1>
        <p className="text-lg text-white/60 max-w-3xl">
          Deep-dive into token management, debugging, and the differences between various Google authentication methods.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Token Inspector */}
        <section className="glass p-8 space-y-6">
          <div className="flex items-center gap-3 text-blue-400">
            <Search className="w-6 h-6" />
            <h2 className="text-2xl font-bold text-white">Token Inspector</h2>
          </div>
          <p className="text-sm text-white/50 leading-relaxed">
            Paste an <code className="text-blue-300">Access Token</code> below to see its "Inside" — who it belongs to, what permissions (scopes) it has, and exactly when it will expire.
          </p>
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Paste Access Token here..."
                value={inspectToken}
                onChange={(e) => setInspectToken(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-4 pr-12 py-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-all"
              />
              <button 
                onClick={checkToken}
                disabled={inspectLoading || !inspectToken}
                className="absolute right-2 top-2 p-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-all disabled:opacity-50"
              >
                {inspectLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              </button>
            </div>

            {inspectResult && (
              <div className="p-6 bg-black/60 rounded-2xl border border-white/5 space-y-4 animate-in fade-in slide-in-from-top-4">
                {inspectResult.error ? (
                  <div className="flex items-center gap-2 text-rose-400 text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    {inspectResult.error === 'invalid_token' ? 'Token is expired or invalid.' : inspectResult.error}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Expires In</label>
                        <div className="text-emerald-400 font-mono text-sm">{inspectResult.expires_in}s</div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Audience</label>
                        <div className="text-white/70 font-mono text-[10px] truncate">{inspectResult.azp}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Scopes (Permissions)</label>
                      <div className="flex flex-wrap gap-2">
                        {inspectResult.scope.split(' ').map((s: string) => (
                          <span key={s} className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-[10px] text-blue-300 font-mono">
                            {s.split('/').pop()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Token Revocation */}
        <section className="glass p-8 space-y-6 border-rose-500/10">
          <div className="flex items-center gap-3 text-rose-400">
            <Trash2 className="w-6 h-6" />
            <h2 className="text-2xl font-bold text-white">Revoke Token</h2>
          </div>
          <p className="text-sm text-white/50 leading-relaxed">
            Security best practice: When your app is done, or if a token is leaked, you should <span className="text-rose-400 font-bold">revoke</span> it. This immediately kills the token's access forever.
          </p>
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Paste Refresh Token to Revoke..."
                value={revokeToken}
                onChange={(e) => setRevokeToken(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-4 pr-12 py-4 text-sm text-white focus:outline-none focus:border-rose-500 transition-all"
              />
              <button 
                onClick={handleRevoke}
                disabled={revokeStatus === 'loading' || !revokeToken}
                className="absolute right-2 top-2 p-2 bg-rose-600 hover:bg-rose-500 rounded-lg text-white transition-all disabled:opacity-50"
              >
                {revokeStatus === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldAlert className="w-5 h-5" />}
              </button>
            </div>
            {revokeStatus === 'success' && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Token successfully revoked. It can no longer be used.
              </div>
            )}
            {revokeStatus === 'error' && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Failed to revoke. The token might already be invalid.
              </div>
            )}
          </div>
        </section>
      </div>

      <section className="grid gap-8 md:grid-cols-3">
        <div className="glass p-6 space-y-4">
          <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl inline-block text-purple-400">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Service Accounts</h3>
          <p className="text-xs text-white/40 leading-relaxed">
            Unlike OAuth2, Service Accounts don't have a "Login" button. They are JSON key files used for <strong>server-to-server</strong> communication. Great for automation in Workspace environments.
          </p>
        </div>

        <div className="glass p-6 space-y-4">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl inline-block text-amber-400">
            <Key className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">API Keys</h3>
          <p className="text-xs text-white/40 leading-relaxed">
            Simple strings used for <strong>public data</strong>. You cannot use an API key to read a user's Gmail because an API key doesn't represent a "User Consent" session.
          </p>
        </div>

        <div className="glass p-6 space-y-4">
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl inline-block text-blue-400">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Domain Delegation</h3>
          <p className="text-xs text-white/40 leading-relaxed">
            A "God Mode" for administrators. Allows a Service Account to <strong>impersonate any user</strong> in a company without them clicking "Allow."
          </p>
        </div>
      </section>

      <footer className="text-center py-12 border-t border-white/5">
        <p className="text-white/20 text-xs">
          Built for educational purposes. Never share your Client Secret or Refresh Tokens in public environments.
        </p>
      </footer>
    </div>
  );
}
