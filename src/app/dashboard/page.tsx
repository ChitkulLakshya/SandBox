'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Cpu, RefreshCcw, Key, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';

function DashboardContent() {
  const searchParams = useSearchParams();
  const authCode = searchParams.get('code');
  const [exchangeState, setExchangeState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [tokens, setTokens] = useState<{ access_token: string; refresh_token: string } | null>(null);
  const [clientSecret, setClientSecret] = useState('');
  const [clientId, setClientId] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const exchangeCodeForTokens = async () => {
    if (!authCode || !clientSecret || !clientId) return;
    
    setExchangeState('loading');
    
    // In a real app, this would happen on the server!
    // We are simulating the exchange here to show the student the result.
    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code: authCode,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: `${window.location.origin}/dashboard`,
          grant_type: 'authorization_code',
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        setExchangeState('error');
        console.error(data.error);
      } else {
        setTokens({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        });
        setExchangeState('success');
      }
    } catch (err) {
      setExchangeState('error');
    }
  };

  return (
    <div className="pt-32 pb-20 px-12 max-w-7xl mx-auto space-y-12">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold text-white">
          Token <span className="text-gradient">Extraction</span>
        </h1>
        <p className="text-lg text-white/60">
          The user has logged in and Google sent you an <code className="text-blue-400">Authorization Code</code>. Now, you must exchange it for actual tokens.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="space-y-6">
          <div className="glass p-6 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-400" />
              Step 1: Capture the Code
            </h2>
            <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-2">
              <label className="text-[10px] uppercase font-bold text-white/30">Received Authorization Code</label>
              <div className="flex gap-2">
                <code className="flex-1 text-sm text-blue-300 break-all font-mono">
                  {authCode || 'No code found in URL. Try logging in first.'}
                </code>
                {authCode && (
                  <button onClick={() => handleCopy(authCode, 'code')} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40">
                    {copied === 'code' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>
            <p className="text-sm text-white/40">
              This code is <strong>temporary</strong> and can only be used once. It is not the final token yet!
            </p>
          </div>

          <div className="glass p-6 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <RefreshCcw className="w-5 h-5 text-purple-400" />
              Step 2: The Exchange
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-white/60">Client ID</label>
                <input
                  type="text"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  placeholder="Paste your Client ID here"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/60">Client Secret</label>
                <input
                  type="password"
                  value={clientSecret}
                  onChange={(e) => setClientSecret(e.target.value)}
                  placeholder="Paste your Client Secret here"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none"
                />
              </div>
              <button
                onClick={exchangeCodeForTokens}
                disabled={!authCode || !clientSecret || !clientId || exchangeState === 'loading'}
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-500/20"
              >
                {exchangeState === 'loading' ? 'Exchanging...' : 'Exchange Code for Tokens'}
              </button>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className={`glass p-8 h-full transition-all duration-500 ${exchangeState === 'success' ? 'border-emerald-500/30' : ''}`}>
            {exchangeState === 'success' && tokens ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-3 text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                  <h2 className="text-2xl font-bold">Exchange Successful!</h2>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-bold text-white">Access Token</h3>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">Expires in 1h</span>
                    </div>
                    <div className="p-4 bg-black/40 rounded-xl border border-white/5 relative group">
                      <code className="text-xs text-white/60 break-all font-mono block pr-8">
                        {tokens.access_token}
                      </code>
                      <button onClick={() => handleCopy(tokens.access_token, 'access')} className="absolute right-3 top-3 p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40">
                        {copied === 'access' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-bold text-white">Refresh Token</h3>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">Long Lived</span>
                    </div>
                    <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 relative group">
                      <code className="text-xs text-emerald-300 break-all font-mono block pr-8">
                        {tokens.refresh_token || 'Refresh Token hidden (Already used?)'}
                      </code>
                      {tokens.refresh_token && (
                        <button onClick={() => handleCopy(tokens.refresh_token, 'refresh')} className="absolute right-3 top-3 p-2 hover:bg-white/5 rounded-lg transition-colors text-emerald-400/40">
                          {copied === 'refresh' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                    <p className="text-[10px] text-white/30 italic">
                      Copy this! You will need it for the final Step.
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <a href="/email" className="block text-center py-4 bg-white text-black font-bold rounded-2xl hover:bg-white/90 transition-all">
                    Final Step: Send Automation Email →
                  </a>
                </div>
              </div>
            ) : exchangeState === 'error' ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <AlertCircle className="w-12 h-12 text-rose-500" />
                <h3 className="text-xl font-bold text-white">Exchange Failed</h3>
                <p className="text-sm text-white/50 max-w-xs">
                  The code might have expired or your credentials are invalid. Remember, a code can only be used ONCE.
                </p>
                <button onClick={() => window.location.href = '/login'} className="text-blue-400 text-sm font-bold hover:underline">
                  Try Logging in Again
                </button>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-white/20">
                <Key className="w-16 h-16 opacity-20" />
                <p>Enter credentials and exchange code to see tokens</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
