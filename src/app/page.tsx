'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Asterisk, Heart, ArrowRight, Mail, Key, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden font-sans">
      {/* Hero Section - Flushed Top Left */}
      <div className="w-full grid grid-cols-12 gap-8 items-start">
        {/* Left Column: Logo & Branding */}
        <div className="col-span-5 p-12 space-y-12">
          <div className="space-y-6">
            <h1 className="text-9xl font-[1000] text-white leading-[0.75] tracking-[-0.08em] flex flex-col">
              <span>SANDBOX</span>
              <span className="text-lime text-4xl font-black tracking-[0.2em] flex items-center gap-4 mt-4">
                MASTERED
                <Asterisk className="w-8 h-8 text-white fill-white mt-1" />
              </span>
            </h1>
            <p className="text-white/30 max-w-sm text-base leading-relaxed font-medium">
              A comprehensive educational environment designed to demystify OAuth2 handshakes, token lifecycles, and secure API integration.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="px-8 py-4 rounded-full bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-lime" />
              <span className="text-[10px] font-black text-white/60 tracking-[0.2em] uppercase">Architecture v2.0</span>
            </div>
            <div className="px-8 py-4 rounded-full bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <span className="text-[10px] font-black text-white/60 tracking-[0.2em] uppercase">Enterprise Ready</span>
            </div>
          </div>

          {/* Bold Drawing Heart Rate (ECG) Sensor Animation - Extended Reach */}
          <div className="relative w-full max-w-2xl h-32 overflow-hidden">
            <svg viewBox="0 0 800 100" className="w-full h-full" preserveAspectRatio="none">
              <motion.path
                d="M 0 50 L 50 50 L 60 20 L 70 80 L 80 50 L 120 50 L 130 10 L 140 90 L 150 50 L 250 50 L 260 20 L 270 80 L 280 50 L 320 50 L 330 10 L 340 90 L 350 50 L 450 50 L 460 20 L 470 80 L 480 50 L 520 50 L 530 10 L 540 90 L 550 50 L 800 50"
                fill="transparent"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: [0, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "linear",
                  repeatDelay: 0.5
                }}
              />
            </svg>
            {/* Soft Glow */}
            <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full opacity-20 pointer-events-none" />
          </div>
        </div>

        {/* Right Column: Hero Card & Swatches */}
        <div className="col-span-7 flex flex-col gap-12 pt-12">
          {/* Seamless Color Swatches (No Gap) - Detached & Floating */}
          <div className="flex justify-end items-start pr-0 relative z-20">
            {[
              { name: "Setup", href: "/setup", color: "bg-[#EEFF00]", text: "text-black", code: "EEFF00" },
              { name: "Login", href: "/login", color: "bg-[#1A1B23]", text: "text-white", code: "1A1B23" },
              { name: "Dashboard", href: "/dashboard", color: "bg-[#4D3CFF]", text: "text-white", code: "4D3CFF" },
              { name: "Email", href: "/email", color: "bg-[#8B5CF6]", text: "text-white", code: "8B5CF6" },
              { name: "Validator", href: "/validator", color: "bg-[#F43F5E]", text: "text-white", code: "F43F5E" },
              { name: "Advanced", href: "/advanced", color: "bg-[#059669]", text: "text-white", code: "059669" },
            ].map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={`${item.color} w-28 h-44 rounded-full p-6 flex flex-col justify-end group hover:scale-105 hover:-translate-y-2 transition-all duration-500 border border-white/5 active:scale-95`}
              >
                <div className={`text-[10px] font-black uppercase tracking-tighter leading-none ${item.text} group-hover:tracking-widest transition-all`}>
                  {item.name}
                </div>
                <div className={`text-[8px] font-mono mt-1 opacity-40 ${item.text}`}>
                  {item.code}
                </div>
              </Link>
            ))}
          </div>

          <div className="blue-card w-full aspect-[4/3] p-16 flex flex-col justify-center relative overflow-hidden group">
            <div className="space-y-2 relative z-10">
              <div className="text-white/70 text-xs font-medium tracking-tight mb-8">Unlock potential, go further</div>
              <h1 className="text-[10rem] font-black text-white leading-[0.8] tracking-tighter flex flex-col">
                <span className="flex items-center">
                  Auth
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 ml-4"
                  >
                    <Asterisk className="w-full h-full text-lime fill-lime" />
                  </motion.div>
                </span>
                <span>Guide</span>
              </h1>
            </div>

            {/* Mockup Overlay on Card */}
            <div className="absolute right-[-10%] top-[10%] w-1/2 rotate-[15deg] group-hover:rotate-[10deg] transition-all duration-700">
               <MockupScreen title="WHAT'S YOUR GOAL?" color="bg-[#1A1B23]" />
            </div>
          </div>
        </div>
      </div>

      {/* Middle Info Section */}
      <div className="max-w-screen-2xl mx-auto px-12 mt-12 flex justify-end">
         <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 group cursor-pointer hover:bg-white/10 transition-colors">
            <div className="text-xs font-bold text-white/40 uppercase tracking-widest">13 endpoints active</div>
            <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white transition-all" />
         </div>
      </div>

      {/* Bottom Mockups Grid */}
      <div className="max-w-screen-2xl mx-auto px-12 mt-20 pb-32">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-4 space-y-4">
            <h2 className="text-6xl font-bold text-white tracking-tighter">Get Your Key</h2>
            <p className="text-white/40 max-w-xs text-sm">Select a scope, set goals, and plan automation days.</p>
          </div>
          <div className="col-span-8 grid grid-cols-3 gap-8 items-end">
             <motion.div initial={{ y: 50 }} whileInView={{ y: 0 }} transition={{ delay: 0.1 }}>
               <MockupScreen title="GROQ API" color="bg-primary" showPills />
             </motion.div>
             <motion.div initial={{ y: 100 }} whileInView={{ y: 0 }} transition={{ delay: 0.2 }}>
               <MockupScreen title="GITHUB SCOPES" color="bg-noir" />
             </motion.div>
             <motion.div initial={{ y: 150 }} whileInView={{ y: 0 }} transition={{ delay: 0.3 }}>
               <MockupScreen title="KEY VALIDATOR" color="bg-[#111218]" />
             </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockupScreen({ title, color, showPills = false }: { title: string; color: string; showPills?: boolean }) {
  return (
    <div className={`${color} w-full aspect-[9/19] rounded-[3rem] p-8 border border-white/5 overflow-hidden shadow-2xl space-y-6`}>
      <div className="flex justify-between items-center opacity-40">
        <div className="text-[10px] font-bold">9:41</div>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-full bg-white/20" />
          <div className="w-3 h-3 rounded-full bg-white/20" />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-[10px] font-bold text-white/40 tracking-widest uppercase">Overview</div>
        <h3 className="text-xl font-black text-white leading-tight">{title}</h3>
      </div>

      {showPills && (
        <div className="flex gap-2">
           <div className="px-3 py-1.5 rounded-full bg-lime text-black text-[8px] font-black uppercase">Active</div>
           <div className="px-3 py-1.5 rounded-full bg-white/10 text-white text-[8px] font-bold uppercase tracking-widest">Pending</div>
        </div>
      )}

      <div className="mt-8 space-y-3">
        <div className="w-full h-24 rounded-2xl bg-white/5 border border-white/5" />
        <div className="w-full h-12 rounded-2xl bg-white/10" />
        <div className="w-full h-12 rounded-2xl bg-white/5" />
      </div>
    </div>
  );
}
