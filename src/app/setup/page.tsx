'use client';

import React from 'react';
import { Terminal, Key, ShieldCheck, Mail } from 'lucide-react';

export default function SetupPage() {
  const envVariables = [
    {
      name: 'GOOGLE_CLIENT_ID',
      description: 'The Public Identifier for your application. Obtained from the Google Cloud Console.',
      example: '123456789-abcdef.apps.googleusercontent.com',
      icon: <Terminal className="w-6 h-6 text-blue-400" />,
    },
    {
      name: 'GOOGLE_CLIENT_SECRET',
      description: 'The Secret Key used to authenticate your application with Google. Keep this private!',
      example: 'GOCSPX-abc123def456',
      icon: <Key className="w-6 h-6 text-purple-400" />,
    },
    {
      name: 'GOOGLE_REFRESH_TOKEN',
      description: 'A long-lived token that allows your backend to request new Access Tokens without user interaction.',
      example: '1//0gabcdef...',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    },
  ];

  return (
    <div className="pt-32 pb-20 px-12 max-w-7xl mx-auto space-y-12">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Environment <span className="text-gradient">Setup</span>
        </h1>
        <p className="text-lg text-white/60 max-w-2xl">
          To automate emails using the Gmail API, your backend needs three critical pieces of information. 
          Think of these as the keys to your digital mailbox.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {envVariables.map((env) => (
          <div key={env.name} className="glass p-6 space-y-4 hover:border-white/20 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
                {env.icon}
              </div>
              <h2 className="font-semibold text-white">{env.name}</h2>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              {env.description}
            </p>
            <div className="pt-4">
              <div className="text-[10px] uppercase tracking-wider text-white/30 mb-2 font-bold">Example Value</div>
              <code className="block p-3 bg-black/40 rounded-lg text-xs text-white/70 break-all border border-white/5">
                {env.example}
              </code>
            </div>
          </div>
        ))}
      </div>

      <section className="glass p-8 space-y-6">
        <div className="flex items-center gap-3">
          <Mail className="w-6 h-6 text-rose-400" />
          <h2 className="text-2xl font-bold text-white">Why are these needed?</h2>
        </div>
        <div className="prose prose-invert max-w-none text-white/60 space-y-4">
          <p>
            When you send an email via an API, Google needs to know:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-white">Who is asking?</strong> (Client ID & Secret)</li>
            <li><strong className="text-white">Do they have permission?</strong> (Refresh Token)</li>
          </ul>
          <p>
            The <code className="text-blue-400 font-mono">Refresh Token</code> is the "Holy Grail" for automation. 
            Unlike an <code className="text-amber-400 font-mono">Access Token</code> which expires in 1 hour, the Refresh Token 
            can last for months or years, allowing your server to send emails while you sleep.
          </p>
        </div>
      </section>

      <div className="flex justify-end">
        <a 
          href="/login" 
          className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-colors shadow-lg shadow-white/10"
        >
          Next: Generate Tokens →
        </a>
      </div>
    </div>
  );
}
