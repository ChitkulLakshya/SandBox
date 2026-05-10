'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Code, Zap, Loader2, CheckCircle2, XCircle, ShieldAlert, Key, Lock, Info } from 'lucide-react';

export default function ValidatorPage() {
  const [groqKey, setGroqKey] = useState('');
  const [groqResult, setGroqResult] = useState<any>(null);
  const [groqLoading, setGroqLoading] = useState(false);

  const [githubToken, setGithubToken] = useState('');
  const [githubResult, setGithubResult] = useState<any>(null);
  const [githubLoading, setGithubLoading] = useState(false);

  const validateGroq = async () => {
    setGroqLoading(true);
    setGroqResult(null);
    try {
      const res = await fetch('/api/validate/groq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: groqKey }),
      });
      const data = await res.json();
      setGroqResult(data);
    } catch (err) {
      setGroqResult({ error: 'Network error' });
    } finally {
      setGroqLoading(false);
    }
  };

  const validateGithub = async () => {
    setGithubLoading(true);
    setGithubResult(null);
    try {
      const res = await fetch('/api/validate/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: githubToken }),
      });
      const data = await res.json();
      setGithubResult(data);
    } catch (err) {
      setGithubResult({ error: 'Network error' });
    } finally {
      setGithubLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-32 px-12 max-w-[1440px] mx-auto space-y-24">
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime/10 border border-lime/20 text-lime text-xs font-black uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4" />
          Mission Control
        </div>
        <h1 className="text-[7rem] font-black text-white leading-[0.8] tracking-tighter">
          API<br /><span className="text-primary italic">Validator</span>
        </h1>
        <p className="text-white/40 max-w-xl text-lg leading-relaxed">
          Test your static API keys securely. Learn how to validate permissions and handle errors without exposing secrets to the frontend.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Groq Validator Card */}
        <section className="blue-card p-12 space-y-8 relative overflow-hidden group">
          <div className="absolute -right-12 -top-12 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap className="w-48 h-48 text-white fill-white" />
          </div>
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3">
               <div className="p-3 bg-white/10 rounded-2xl"><Zap className="w-6 h-6 text-lime fill-lime" /></div>
               <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Groq Llama Test</h2>
            </div>
            <p className="text-white/70 text-sm">Validates by initiating a minimal Llama 3 inference call.</p>
          </div>

          <div className="space-y-4 relative z-10">
            <input
              type="password"
              placeholder="gsk_..."
              value={groqKey}
              onChange={(e) => setGroqKey(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-lime transition-all"
            />
            <button
              onClick={validateGroq}
              disabled={groqLoading || !groqKey}
              className="w-full py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] transition-all disabled:opacity-50"
            >
              {groqLoading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : 'Run Validation'}
            </button>
          </div>

          {groqResult && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
              {groqResult.valid ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-lime font-black uppercase text-xs">
                    <CheckCircle2 className="w-5 h-5" /> Status: Valid & Active
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl">
                      <div className="text-[10px] text-white/30 uppercase font-bold mb-1">Latency</div>
                      <div className="text-white font-mono">{groqResult.latency}ms</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl">
                      <div className="text-[10px] text-white/30 uppercase font-bold mb-1">Model</div>
                      <div className="text-white font-mono text-xs">{groqResult.model}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-rose-400 font-bold text-sm">
                  <XCircle className="w-5 h-5" /> {groqResult.error}
                </div>
              )}
            </motion.div>
          )}
        </section>

        {/* GitHub Validator Card */}
        <section className="glass-card p-12 space-y-8 relative overflow-hidden group">
          <div className="absolute -right-12 -top-12 opacity-5 group-hover:opacity-10 transition-opacity">
            <Code className="w-48 h-48 text-white fill-white" />
          </div>
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3">
               <div className="p-3 bg-white/5 rounded-2xl"><Code className="w-6 h-6 text-white" /></div>
               <h2 className="text-3xl font-black text-white uppercase tracking-tighter">GitHub Scope Check</h2>
            </div>
            <p className="text-white/40 text-sm">Extracts x-oauth-scopes to reveal token permissions.</p>
          </div>

          <div className="space-y-4 relative z-10">
            <input
              type="password"
              placeholder="ghp_..."
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-all"
            />
            <button
              onClick={validateGithub}
              disabled={githubLoading || !githubToken}
              className="w-full py-5 bg-primary text-white font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] transition-all disabled:opacity-50"
            >
              {githubLoading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : 'Inspect Token'}
            </button>
          </div>

          {githubResult && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
              {githubResult.valid ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <img src={githubResult.avatar} alt="Avatar" className="w-12 h-12 rounded-full border border-white/20" />
                    <div>
                      <div className="text-white font-black text-lg">@{githubResult.username}</div>
                      <div className="text-white/40 text-xs">{githubResult.bio || 'GitHub Developer'}</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Authorized Scopes</div>
                    <div className="flex flex-wrap gap-2">
                      {githubResult.scopes.length > 0 ? githubResult.scopes.map((s: string) => (
                        <span key={s} className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] text-primary font-black uppercase">
                          {s}
                        </span>
                      )) : <span className="text-white/20 text-xs italic">No specific scopes (Public only)</span>}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-rose-400 font-bold text-sm">
                  <XCircle className="w-5 h-5" /> {githubResult.error}
                </div>
              )}
            </motion.div>
          )}
        </section>
      </div>

      {/* Educational Section */}
      <section className="grid lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-1 space-y-6">
           <h3 className="text-4xl font-black text-white leading-tight">OAuth2 vs<br /><span className="text-lime">Static Keys</span></h3>
           <p className="text-white/40 text-sm leading-relaxed">
             Understanding the difference between long-lived static keys and dynamic authorization flows is critical for system architecture.
           </p>
        </div>

        <div className="glass-card p-10 space-y-6">
           <div className="flex items-center gap-3 text-white">
              <Key className="w-6 h-6" />
              <h4 className="font-black uppercase tracking-tighter">Static API Keys</h4>
           </div>
           <ul className="space-y-4">
              {[
                'Single long-lived string.',
                'Usually used for server-to-server calls.',
                'Highest risk if leaked (total access).',
                'Harder to rotate without downtime.'
              ].map(item => (
                <li key={item} className="flex gap-3 text-xs text-white/40">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1" />
                  {item}
                </li>
              ))}
           </ul>
        </div>

        <div className="glass-card p-10 space-y-6 border-primary/20">
           <div className="flex items-center gap-3 text-primary">
              <Lock className="w-6 h-6" />
              <h4 className="font-black uppercase tracking-tighter">OAuth2 Flows</h4>
           </div>
           <ul className="space-y-4">
              {[
                'Short-lived Access Tokens.',
                'Requires user consent/handshake.',
                'Scopes limit specific permissions.',
                'Revocable without changing passwords.'
              ].map(item => (
                <li key={item} className="flex gap-3 text-xs text-white/40">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1" />
                  {item}
                </li>
              ))}
           </ul>
        </div>
      </section>

      <div className="p-8 bg-noir rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row items-center gap-8 justify-between">
        <div className="flex items-center gap-6">
           <div className="p-4 bg-white/5 rounded-2xl text-lime"><ShieldAlert className="w-8 h-8" /></div>
           <div className="space-y-1">
              <h4 className="text-white font-black uppercase">Security Warning</h4>
              <p className="text-white/30 text-xs max-w-md">Never call external APIs (Groq, GitHub, etc.) directly from your React components. SANDBOX uses a Backend proxy to protect your keys.</p>
           </div>
        </div>
        <div className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-3">
           <Info className="w-4 h-4 text-primary" />
           Inspect Network Tab to confirm
        </div>
      </div>
    </div>
  );
}
