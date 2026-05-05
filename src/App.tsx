/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Target, 
  Eye, 
  Zap, 
  Settings, 
  User, 
  Lock, 
  CreditCard, 
  Smartphone, 
  Activity,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Cpu,
  Monitor,
  Flame,
  Layout,
  Trophy,
  Skull,
  Radar,
  Tv,
  Hash,
  Wallet,
  History,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  X,
  FastForward,
  ZapOff,
  Crosshair,
  Wind,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

enum Tab {
  DASHBOARD = 'dashboard',
  TACTICAL = 'tactical',
  GFX = 'gfx',
  VIP = 'vip',
  STORE = 'store',
  TOURNAMENTS = 'tournaments',
  LIVE = 'live',
  WALLET = 'wallet',
}

interface TokenPackage {
  id: string;
  name: string;
  tokens: number;
  price: number;
  popular?: boolean;
}

interface ModuleStatus {
  id: string;
  name: string;
  isActive: boolean;
  type: 'auto' | 'manual';
  icon: React.ReactNode;
}

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  method: string;
}

// --- Components ---

const Panel: React.FC<{ children: React.ReactNode, className?: string, title?: string }> = ({ children, className = "", title }) => (
  <div className={`bg-[#0D0D12] border border-white/10 rounded-xl overflow-hidden ${className}`}>
    {title && (
      <div className="px-4 py-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
        <h3 className="text-xs font-mono uppercase tracking-widest text-white/50">{title}</h3>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
        </div>
      </div>
    )}
    <div className="p-4">
      {children}
    </div>
  </div>
);

const TacticalModule: React.FC<{ module: ModuleStatus, onToggle: (id: string) => void }> = ({ module, onToggle }) => (
  <div 
    className={`flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer ${
      module.isActive 
        ? 'bg-red-500/10 border-red-500/50' 
        : 'bg-white/5 border-white/10 hover:border-white/20'
    }`}
    onClick={() => onToggle(module.id)}
  >
    <div className="flex items-center gap-4">
      <div className={`p-2 rounded-md ${module.isActive ? 'text-red-500' : 'text-white/30'}`}>
        {module.icon}
      </div>
      <div>
        <div className="text-sm font-medium text-white">{module.name}</div>
        <div className="text-[10px] font-mono uppercase tracking-tighter text-white/40">
          Mode: {module.type}
        </div>
      </div>
    </div>
    <div className={`w-10 h-5 rounded-full relative transition-colors ${module.isActive ? 'bg-red-600' : 'bg-white/10'}`}>
      <motion.div 
        animate={{ x: module.isActive ? 20 : 0 }}
        className="absolute top-1 left-1 w-3 h-3 rounded-full bg-white shadow-sm"
      />
    </div>
  </div>
);

const PaymentModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'info' | 'processing' | 'success'>('info');

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => setStep('success'), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-md bg-[#16161E] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            {step === 'info' && (
              <div className="p-8">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                  <Flame size={32} />
                </div>
                <h2 className="text-2xl font-bold text-center text-white mb-2">Unlock VIP Access</h2>
                <p className="text-center text-white/50 text-sm mb-8">
                  Get exclusive access to VIP strategy guides, ultra-sensitivity settings, and custom crosshairs.
                </p>
                <div className="bg-white/5 rounded-xl p-4 mb-8 border border-white/5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-white/70">One-time Activation</span>
                    <span className="text-xl font-bold text-white">₹2.00</span>
                  </div>
                  <div className="text-[10px] text-white/30 truncate">Transaction ID: AIS-7392-FX-991</div>
                </div>
                <button 
                  onClick={handlePay}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <CreditCard size={18} />
                  Pay with UPI / Wallet
                </button>
              </div>
            )}
            
            {step === 'processing' && (
              <div className="p-12 text-center">
                <div className="animate-spin text-red-500 mx-auto mb-6">
                  <Zap size={48} />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Connecting Securely</h2>
                <p className="text-sm text-white/50">Processing your 2₹ payment through encrypted gateway...</p>
              </div>
            )}

            {step === 'success' && (
              <div className="p-12 text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500"
                >
                  <CheckCircle2 size={40} />
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-2">VIP Active!</h2>
                <p className="text-sm text-white/50 mb-8">Your account bgmigamerz has been upgraded to Elite Status.</p>
                <button 
                  onClick={onClose}
                  className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const WithdrawModal: React.FC<{ isOpen: boolean, onClose: () => void, balance: number, setBalance: React.Dispatch<React.SetStateAction<number>>, setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>> }> = ({ isOpen, onClose, balance, setBalance, setTransactions }) => {
  const [amount, setAmount] = useState('');
  const [upi, setUpi] = useState('');
  const [method, setMethod] = useState<'UPI' | 'BANK'>('UPI');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const handleWithdraw = () => {
    const val = parseFloat(amount);
    if (!val || val > balance || val < 100) return;
    setStatus('processing');
    
    // Simulate API call
    setTimeout(() => {
      setBalance(prev => prev - val);
      const newTxn: Transaction = {
        id: `TXN-${Math.floor(Math.random() * 9000) + 1000}`,
        type: 'withdrawal',
        amount: val,
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        method: method === 'UPI' ? `UPI: ${upi}` : 'Bank Transfer'
      };
      setTransactions(prev => [newTxn, ...prev]);
      setStatus('success');
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-md bg-[#0F0F15] border border-white/10 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-xl font-black uppercase tracking-tighter mb-6">Withdraw Earnings</h2>
            {status === 'idle' ? (
              <div className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <button onClick={() => setMethod('UPI')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase border transition-all ${method === 'UPI' ? 'bg-red-600 border-red-500 text-white' : 'bg-white/5 border-white/10 text-white/40'}`}>UPI Portal</button>
                  <button onClick={() => setMethod('BANK')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase border transition-all ${method === 'BANK' ? 'bg-red-600 border-red-500 text-white' : 'bg-white/5 border-white/10 text-white/40'}`}>Direct Bank</button>
                </div>
                <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                  <label className="text-[10px] text-white/30 uppercase font-mono mb-1 block">Payout Amount (Min ₹100)</label>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-red-500">₹</span>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="bg-transparent border-none text-3xl font-black focus:ring-0 w-full p-0 text-white" placeholder="0.00" />
                  </div>
                </div>
                <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                  <label className="text-[10px] text-white/30 uppercase font-mono mb-1 block">{method === 'UPI' ? 'UPI Address / VPA' : 'Bank Account Number & IFSC'}</label>
                  <input type="text" value={upi} onChange={(e) => setUpi(e.target.value)} className="bg-transparent border-none text-sm font-mono focus:ring-0 w-full p-0 text-red-500" placeholder={method === 'UPI' ? 'gamer@okhdfc' : '000000000 / IFSC000'} />
                </div>
                <p className="text-[9px] text-white/30 italic leading-relaxed">By confirming, you agree to our financial terms. Withdrawals are subject to 24-hour verification periods for security and anti-fraud compliance.</p>
                <button onClick={handleWithdraw} className="w-full py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black transition-all shadow-[0_10px_40px_rgba(220,38,38,0.4)] hover:-translate-y-1 active:translate-y-0">INITIATE WITHDRAWAL</button>
              </div>
            ) : status === 'processing' ? (
              <div className="py-12 text-center space-y-6">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
                  <div className="absolute inset-0 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-black uppercase italic tracking-widest text-white">Encrypting Transfer...</p>
                  <p className="text-[10px] text-white/30 font-mono">NEURAL LINK SECURE GATEWAY V4.2</p>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center space-y-6">
                <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(34,197,94,0.2)]"><CheckCircle2 size={40} /></div>
                <div className="space-y-2">
                   <h3 className="text-2xl font-black uppercase text-white tracking-tighter">Request Broadcasted</h3>
                   <p className="text-xs text-white/40 uppercase font-mono tracking-[0.2em]">Txn ID: {transactions[0]?.id}</p>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">Your withdrawal request of <span className="text-white font-bold">₹{amount}</span> has been queued. Verification complete. Funds arrival expected within 24 business hours.</p>
                <button onClick={onClose} className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black transition-all">SYSTEM DISMISS</button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const FloatingModMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mods, setMods] = useState([
    { id: 'aim', name: 'Neural Aimbot', icon: <Target size={18} />, active: false, color: 'text-red-500' },
    { id: 'esp', name: 'ESP Wallhack', icon: <Eye size={18} />, active: false, color: 'text-cyan-500' },
    { id: 'speed', name: 'Velocity Burst', icon: <Wind size={18} />, active: false, color: 'text-yellow-500' },
    { id: 'fly', name: 'Fly Mode v2', icon: <Zap size={18} />, active: false, color: 'text-purple-500' },
    { id: 'recoil', name: 'Zero Recoil', icon: <Crosshair size={18} />, active: false, color: 'text-green-500' },
    { id: 'ghost', name: 'Ghost Step', icon: <Layers size={18} />, active: false, color: 'text-blue-500' },
  ]);

  const toggleMod = (id: string) => {
    setMods(prev => prev.map(m => m.id === id ? { ...m, active: !m.active } : m));
  };

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50, x: 20 }}
            className="absolute bottom-20 right-0 w-72 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-cyan-500 to-red-600 animate-gradient-x" />
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Skull size={16} className="text-red-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Injecting v8.2</span>
              </div>
              <div className="px-2 py-0.5 bg-red-600/10 border border-red-500/20 rounded text-[8px] font-mono text-red-500 uppercase">Secure</div>
            </div>

            <div className="space-y-2">
              {mods.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => toggleMod(mod.id)}
                  className={`w-full group flex items-center justify-between p-3 rounded-2xl border transition-all ${
                    mod.active 
                      ? 'bg-white/10 border-white/20' 
                      : 'bg-white/5 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-black/40 ${mod.active ? mod.color : 'text-white/20'}`}>
                      {mod.icon}
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-tight ${mod.active ? 'text-white' : 'text-white/40'}`}>
                      {mod.name}
                    </span>
                  </div>
                  <div className={`w-8 h-4 rounded-full relative transition-colors ${mod.active ? 'bg-red-600' : 'bg-white/10'}`}>
                    <motion.div
                      animate={{ x: mod.active ? 16 : 0 }}
                      className="absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white shadow-lg"
                    />
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[10px] font-black tracking-widest uppercase transition-all shadow-[0_10px_20px_rgba(220,38,38,0.2)]">
                Initialize All Modules
              </button>
              <button onClick={() => setIsOpen(false)} className="w-full py-3 bg-white/5 text-white/40 rounded-xl text-[10px] font-black tracking-widest uppercase hover:bg-white/10">
                Ghost Mode
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center relative shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all ${
          isOpen ? 'bg-red-600 rotate-90' : 'bg-white/10 backdrop-blur-xl border border-white/20'
        }`}
      >
        <div className="absolute inset-0 rounded-full border border-white/10" />
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <div className="relative">
            <Skull size={24} className="text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#050508] animate-pulse" />
          </div>
        )}
      </motion.button>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authData, setAuthData] = useState({ email: '', password: '', username: '', playerUid: '' });
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);
  const [streamStatus, setStreamStatus] = useState<'starting' | 'live'>('live');
  const [streamCountdown, setStreamCountdown] = useState(180); // 3 minutes in seconds
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [fpsMode, setFpsMode] = useState<60 | 90 | 120 | 300 | 422 | 500 | 800 | 1000>(60);
  const [is90FPSUnlocked, setIs90FPSUnlocked] = useState(false);
  const [is120FPSUnlocked, setIs120FPSUnlocked] = useState(false);
  const [is300FPSUnlocked, setIs300FPSUnlocked] = useState(false);
  const [is422FPSUnlocked, setIs422FPSUnlocked] = useState(false);
  const [is500FPSUnlocked, setIs500FPSUnlocked] = useState(false);
  const [is800FPSUnlocked, setIs800FPSUnlocked] = useState(false);
  const [is1000FPSUnlocked, setIs1000FPSUnlocked] = useState(false);
  const [showTacticalWindows, setShowTacticalWindows] = useState(false);
  const [showBooyah, setShowBooyah] = useState(false);
  const [balance, setBalance] = useState(25000); // Initial Real Money Balance in INR
  const [tokens, setTokens] = useState(1250);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 'TXN-9821', type: 'deposit', amount: 500, status: 'completed', date: '2024-05-01', method: 'Google Pay' },
    { id: 'TXN-9805', type: 'withdrawal', amount: 1200, status: 'completed', date: '2024-04-28', method: 'UPI' },
    { id: 'TXN-9788', type: 'deposit', amount: 1000, status: 'completed', date: '2024-04-25', method: 'PhonePe' },
  ]);
  const [purchaseStatus, setPurchaseStatus] = useState<string | null>(null);
  const [pendingPackage, setPendingPackage] = useState<TokenPackage | null>(null);
  const [gameType, setGameType] = useState<'FF Normal' | 'FF Max' | 'BGMI' | 'PUBG' | 'CODM'>('FF Max');
  const [registeredEvents, setRegisteredEvents] = useState<string[]>(['Ignite Open v4']);
  const [isLaunching, setIsLaunching] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{id: string, title: string} | null>(null);

  // GFX Settings State
  const [resolution, setResolution] = useState('1080p');
  const [graphicsQuality, setGraphicsQuality] = useState('Ultra HDR');
  const [antiAliasing, setAntiAliasing] = useState('4x');
  const [shadowQuality, setShadowQuality] = useState('Ultra');
  const [textureFiltering, setTextureFiltering] = useState('Anisotropic 16x');
  const [isGraphicsApplied, setIsGraphicsApplied] = useState(false);

  const tokenPackages: TokenPackage[] = [
    { id: 't1', name: 'Starter Pack', tokens: 100, price: 100 },
    { id: 't2', name: 'Pro Pack', tokens: 120, price: 200, popular: true },
    { id: 't3', name: 'Elite Pack', tokens: 230, price: 300 },
    { id: 't4', name: 'Titan Pack', tokens: 580, price: 670 },
    { id: 't5', name: 'Master Elite', tokens: 8500, price: 4569 },
    { id: 't6', name: 'Imperial Master', tokens: 10000, price: 5452 },
    { id: 't7', name: 'Premium King', tokens: 1000, price: 1000 },
  ];

  const handlePurchaseTokens = (pkg: TokenPackage) => {
    if (balance >= pkg.price) {
      setBalance(prev => prev - pkg.price);
      setTokens(prev => prev + pkg.tokens);
      setPurchaseStatus(`Successfully converted ₹${pkg.price} to ${pkg.tokens} Tokens!`);
      setTimeout(() => setPurchaseStatus(null), 3000);
    } else {
      setPendingPackage(pkg);
      setPurchaseStatus(`Insufficient Balance. Please add ₹${pkg.price - balance} more.`);
      setTimeout(() => setPurchaseStatus(null), 3000);
      setIsPaymentOpen(true);
    }
  };

  const [modules, setModules] = useState<ModuleStatus[]>([
    { id: '1', name: 'Auto-Headshot Assistant', isActive: false, type: 'auto', icon: <Target size={20} /> },
    { id: '2', name: 'ESP Entity Visualization', isActive: false, type: 'auto', icon: <Eye size={20} /> },
    { id: '3', name: 'Movement Engine v2', isActive: false, type: 'manual', icon: <Smartphone size={20} /> },
    { id: '4', name: 'Tactical Recall Pro', isActive: false, type: 'manual', icon: <Activity size={20} /> },
    { id: '5', name: 'Anti-Cheat Bypass v4', isActive: false, type: 'auto', icon: <Shield size={20} /> },
    { id: '6', name: 'BGMI Neural Prediction', isActive: false, type: 'auto', icon: <Target size={20} /> },
    { id: '7', name: 'PUBG Global X-Ray', isActive: false, type: 'auto', icon: <Eye size={20} /> },
    { id: '8', name: 'CODM Strategic Reflex', isActive: false, type: 'auto', icon: <Zap size={20} /> },
    { id: '9', name: 'Multi-Window Tactical HUD', isActive: false, type: 'auto', icon: <Layout size={20} /> },
  ]);

  const [stats, setStats] = useState({
    fps: 60,
    ping: 24,
    cpu: 12,
    ram: 45
  });

  useEffect(() => {
    const interval = setInterval(() => {
      let baseFps = 58;
      if (fpsMode === 90) baseFps = 88;
      else if (fpsMode === 120) baseFps = 118;
      else if (fpsMode === 300) baseFps = 295;
      else if (fpsMode === 422) baseFps = 418;
      else if (fpsMode === 500) baseFps = 492;
      else if (fpsMode === 800) baseFps = 788;
      else if (fpsMode === 1000) baseFps = 992;

      setStats({
        fps: baseFps + Math.floor(Math.random() * 8),
        ping: 20 + Math.floor(Math.random() * 10),
        cpu: 10 + Math.floor(Math.random() * 15),
        ram: 44 + Math.floor(Math.random() * 2)
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [fpsMode]);

  useEffect(() => {
    if (isLoggedIn && streamStatus === 'live') {
      setShowBooyah(true);
      const timer = setTimeout(() => setShowBooyah(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, streamStatus]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (streamStatus === 'starting' && streamCountdown > 0) {
      interval = setInterval(() => {
        setStreamCountdown(prev => prev - 1);
      }, 1000);
    } else if (streamCountdown === 0) {
      setStreamStatus('live');
    }
    return () => clearInterval(interval);
  }, [streamStatus, streamCountdown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleModule = (id: string) => {
    const module = modules.find(m => m.id === id);
    if (!module) return;

    // Logic for Auto-Headshot (ID 1)
    if (id === '1' && !module.isActive) {
      if (tokens <= 0) {
        setPurchaseStatus('Insufficient Tokens! Tokens required for Neural Auto-Headshot.');
        setTimeout(() => setPurchaseStatus(null), 3000);
        setActiveTab(Tab.STORE);
        return;
      }
      setPurchaseStatus(`Neural Core Initialized. Consumed all ${tokens} Tokens.`);
      setTokens(0);
      setTimeout(() => setPurchaseStatus(null), 3000);
    }

    // Logic for Bypass (ID 5)
    if (id === '5' && !module.isActive) {
      if (tokens < 150) {
        setPurchaseStatus('Insufficient Tokens! 150 Tokens required for Advanced Bypass.');
        setTimeout(() => setPurchaseStatus(null), 3000);
        setActiveTab(Tab.STORE);
        return;
      }
      setTokens(prev => prev - 150);
      setPurchaseStatus('Anti-Cheat Bypass Level 4 Active.');
      setTimeout(() => setPurchaseStatus(null), 3000);
    }

    // Special logic for ESP / Eye Panel (ID 2)
    if (id === '2' && !module.isActive) {
      if (tokens < 100) {
        setPurchaseStatus('Insufficient Tokens! 100 Tokens required for Eye Panel.');
        setTimeout(() => setPurchaseStatus(null), 3000);
        setActiveTab(Tab.STORE);
        return;
      }
      setTokens(prev => prev - 100);
    }

    // Logic for BGMI Neural Prediction (ID 6)
    if (id === '6' && !module.isActive) {
      if (tokens < 250) {
        setPurchaseStatus('250 Tokens required for BGMI Neural Core.');
        setTimeout(() => setPurchaseStatus(null), 3000);
        setActiveTab(Tab.STORE);
        return;
      }
      setTokens(prev => prev - 250);
    }

    // Logic for PUBG Global X-Ray (ID 7)
    if (id === '7' && !module.isActive) {
      if (tokens < 300) {
        setPurchaseStatus('300 Tokens required for PUBG Global X-Ray.');
        setTimeout(() => setPurchaseStatus(null), 3000);
        setActiveTab(Tab.STORE);
        return;
      }
      setTokens(prev => prev - 300);
    }

    // Logic for CODM Strategic Reflex (ID 8)
    if (id === '8' && !module.isActive) {
      if (tokens < 200) {
        setPurchaseStatus('200 Tokens required for CODM Reflex Patch.');
        setTimeout(() => setPurchaseStatus(null), 3000);
        setActiveTab(Tab.STORE);
        return;
      }
      setTokens(prev => prev - 200);
    }

    // Logic for Multi-Window HUD (ID 9)
    if (id === '9') {
      setShowTacticalWindows(!module.isActive);
    }

    setModules(prev => prev.map(m => m.id === id ? { ...m, isActive: !m.isActive } : m));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#050508] text-white selection:bg-red-600/30 flex items-center justify-center p-6 relative overflow-hidden font-sans">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050508] z-10" />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.4, 0.3] 
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-30"
          />
          <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-black/80 backdrop-blur-3xl border border-white/5 rounded-[40px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-20"
        >
          <div className="flex flex-col items-center mb-10">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 border-2 border-red-500/20 rounded-full flex items-center justify-center mb-6 relative"
            >
              <div className="absolute inset-0 border-t-2 border-red-600 rounded-full animate-spin" />
              <Target className="text-red-600" size={32} />
            </motion.div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter text-center">
              {authMode === 'login' ? 'Neural Link Login' : 'Arena Registration'}
            </h1>
            <p className="text-white/40 text-[10px] font-mono uppercase tracking-[0.4em] mt-2">
              Bypass Version 8.4.2 Active
            </p>
          </div>

          {authMode === 'login' && (
            <div className="mb-8 p-1 bg-white/5 rounded-3xl border border-white/5 border-dashed">
              <div className="p-5 flex flex-col gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/40">
                    <Hash size={16} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="ENTER PLAYER UID (FAST PLAY)"
                    value={authData.playerUid}
                    onChange={(e) => setAuthData({...authData, playerUid: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-12 py-4 text-xs font-mono text-red-500 placeholder:text-white/10 focus:ring-1 focus:ring-red-600 outline-none transition-all"
                  />
                </div>
                <button 
                  onClick={() => {
                    if (authData.playerUid.length >= 6) {
                      setIsAuthenticating(true);
                      setTimeout(() => {
                        setIsAuthenticating(false);
                        setIsLoggedIn(true);
                      }, 1500);
                    }
                  }}
                  className="w-full bg-red-600/10 hover:bg-red-600 border border-red-600/20 hover:border-red-600 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 group"
                >
                  <Zap size={14} className="text-red-500 group-hover:text-white" />
                  Fast UID Neural Sync
                </button>
              </div>
              <div className="flex items-center gap-3 px-6 pb-2">
                <div className="h-px flex-1 bg-white/5" />
                <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.3em]">Hardware ID Mapping Enabled</span>
                <div className="h-px flex-1 bg-white/5" />
              </div>
            </div>
          )}

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              setIsAuthenticating(true);
              setTimeout(() => {
                setIsAuthenticating(false);
                setIsLoggedIn(true);
              }, 2000);
            }}
            className="space-y-6"
          >
            {authMode === 'register' && (
              <div>
                <label className="text-[10px] font-black uppercase text-white/30 tracking-widest block mb-2 px-1">Tactical Codename</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. AGENT_ZERO"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all font-mono text-sm uppercase placeholder:text-white/10"
                />
              </div>
            )}
            <div>
              <label className="text-[10px] font-black uppercase text-white/30 tracking-widest block mb-2 px-1">Neural Credential (Email)</label>
              <input 
                required
                type="email" 
                placeholder="PRO_OPS@CYBER.COM"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all font-mono text-sm uppercase placeholder:text-white/10"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-white/30 tracking-widest block mb-2 px-1">Access Kernel (Password)</label>
              <input 
                required
                type="password" 
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all font-mono text-sm uppercase placeholder:text-white/10"
              />
            </div>

            <button 
              disabled={isAuthenticating}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-900 py-5 rounded-2xl font-black uppercase tracking-widest transition-all relative overflow-hidden group shadow-2xl shadow-red-600/20"
            >
              <span className={isAuthenticating ? 'opacity-0' : 'opacity-100'}>
                {authMode === 'login' ? 'Establish Connection' : 'Initialize Account'}
              </span>
              {isAuthenticating && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-xs text-white/30">
            {authMode === 'login' ? 'Don\'t have an active link?' : 'Already registered in the system?'}
            <button 
              type="button"
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              className="ml-2 text-red-500 font-bold uppercase hover:underline"
            >
              {authMode === 'login' ? 'Register Now' : 'Link Login'}
            </button>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white font-sans selection:bg-red-500/30">
      
      {/* Enhanced Payment Modal */}
      <AnimatePresence>
        {isPaymentOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setIsPaymentOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-[#0F0F15] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-black uppercase tracking-tighter">Secure Checkout</h2>
                  <button onClick={() => setIsPaymentOpen(false)} className="text-white/20 hover:text-white transition-colors">
                    <AlertCircle size={24} />
                  </button>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="text-[10px] text-white/30 uppercase font-mono mb-1">Deposit Amount</div>
                    <div className="flex items-end gap-2">
                       <span className="text-3xl font-black">₹</span>
                       <input 
                        type="number" 
                        placeholder="500"
                        className="bg-transparent border-none text-3xl font-black focus:ring-0 w-full p-0 placeholder:text-white/10"
                        onChange={(e) => {}} // In real app, bind to state
                       />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {['Google Pay', 'PhonePe', 'Credit Card', 'Voucher'].map(method => (
                      <button key={method} className="p-4 rounded-xl border border-white/5 hover:border-red-500/50 hover:bg-red-500/5 transition-all flex items-center gap-3 text-sm font-medium">
                        <div className="w-2 h-2 rounded-full bg-white/40" />
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => {
                    const amountToAdd = 500;
                    setBalance(prev => prev + amountToAdd);
                    const newTxn: Transaction = {
                      id: `TXN-${Math.floor(Math.random() * 9000) + 1000}`,
                      type: 'deposit',
                      amount: amountToAdd,
                      status: 'completed',
                      date: new Date().toISOString().split('T')[0],
                      method: 'Google Pay'
                    };
                    setTransactions(prev => [newTxn, ...prev]);
                    setIsPaymentOpen(false);
                    setPurchaseStatus('₹500.00 successfully added!');
                    setTimeout(() => setPurchaseStatus(null), 3000);
                  }}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-lg transition-all shadow-[0_10px_30px_rgba(220,38,38,0.3)] flex items-center justify-center gap-3"
                >
                  <Lock size={18} />
                  PAY SECURELY NOW
                </button>
                
                <div className="mt-6 flex items-center justify-center gap-4 text-[10px] text-white/20 uppercase font-mono">
                  <div className="flex items-center gap-1"><Shield size={12} /> SSL SECURE</div>
                  <div className="flex items-center gap-1"><CheckCircle2 size={12} /> PCI COMPLIANT</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Withdraw Modal */}
      <WithdrawModal isOpen={isWithdrawOpen} onClose={() => setIsWithdrawOpen(false)} balance={balance} setBalance={setBalance} setTransactions={setTransactions} />

      {/* Floating Mod Menu Integration */}
      <FloatingModMenu />

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
      </div>

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
              onClick={() => setSelectedVideo(null)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(220,38,38,0.3)]"
            >
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-6 right-6 z-50 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
              >
                <Hash size={20} className="rotate-45" />
              </button>
              <iframe 
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                className="w-full h-full"
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="relative flex min-h-screen">
        
        {/* Navigation Rail */}
        <aside className="w-20 md:w-64 border-r border-white/5 flex flex-col bg-[#08080C] z-30">
          <div className="p-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                <Flame size={24} />
              </div>
              <div className="hidden md:block">
                <div className="font-black text-sm tracking-tighter uppercase leading-none">Ignite</div>
                <div className="text-[10px] font-mono text-red-500 uppercase tracking-widest mt-0.5">Tactical Hub</div>
              </div>
            </div>
          </div>

          <div className="px-6 mb-6">
             <div className="bg-red-600/5 border border-red-600/20 rounded-2xl p-4">
                <div className="text-[8px] font-mono text-red-500 uppercase mb-1">Your Total Assets</div>
                <div className="text-xl font-black text-white">₹{balance.toLocaleString('en-IN')}</div>
                <div className="mt-3 flex gap-2">
                   <button onClick={() => setIsPaymentOpen(true)} className="flex-1 py-1.5 bg-red-600 rounded-lg text-[8px] font-black uppercase">Add</button>
                   <button onClick={() => setIsWithdrawOpen(true)} className="flex-1 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[8px] font-black uppercase">Out</button>
                </div>
             </div>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            {[
              { id: Tab.DASHBOARD, icon: <Layout size={20} />, label: 'Overview' },
              { id: Tab.TACTICAL, icon: <Target size={20} />, label: 'Tactical Mods' },
              { id: Tab.GFX, icon: <Monitor size={20} />, label: 'GFX Optimizer' },
              { id: Tab.TOURNAMENTS, icon: <Trophy size={20} />, label: 'Tournaments' },
              { id: Tab.LIVE, icon: <div className="relative"><Tv size={20} /><div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" /></div>, label: 'Live Broadcast' },
              { id: Tab.STORE, icon: <CreditCard size={20} />, label: 'Token Store' },
              { id: Tab.WALLET, icon: <Wallet size={20} />, label: 'Earnings & Wallet' },
              { id: Tab.VIP, icon: <Shield size={20} />, label: 'VIP Services' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                    : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span className="hidden md:block font-medium text-sm">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 mt-auto">
            <div className="bg-gradient-to-br from-red-600 to-amber-600 p-4 rounded-xl relative overflow-hidden group cursor-pointer" onClick={() => setIsPaymentOpen(true)}>
              <div className="relative z-10">
                <div className="text-white font-bold text-sm mb-1 text-center">ADD BALANCE</div>
                <div className="text-[10px] text-white/80 text-center">One-click Deposit</div>
              </div>
              <Zap className="absolute -right-2 -bottom-2 w-12 h-12 text-white/20 group-hover:scale-125 transition-transform" />
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto z-10">
          <header className="h-24 border-b border-white/5 flex items-center justify-between px-8 bg-[#08080C]/80 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-white/30 uppercase">Wallet Balance</span>
                <div className="text-xl font-black text-green-500">₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-white/30 uppercase">Tactical Tokens</span>
                <div className="text-xl font-black text-amber-500 flex items-center gap-2">
                  <Zap size={18} />
                  {tokens}
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-white/30 uppercase">Active Core</span>
                <div className={`text-xs font-black uppercase tracking-widest ${gameType === 'FF Max' || gameType === 'PUBG' || gameType === 'CODM' ? 'text-cyan-400' : 'text-red-500'}`}>
                  {gameType}
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-white/30 uppercase">Frame Sync</span>
                <div className={`text-xs font-black uppercase tracking-widest ${fpsMode === 1000 ? 'text-white shadow-[0_0_10px_white]' : fpsMode >= 300 ? 'text-purple-500' : fpsMode === 120 ? 'text-green-500' : fpsMode === 90 ? 'text-cyan-400' : 'text-white/40'}`}>
                  {fpsMode} FPS ACTIVE
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden xl:flex items-center gap-2 px-4 py-1.5 bg-red-600/10 border border-red-600/20 rounded-full">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">Thanks for download this app</span>
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              </div>
              <div className="hidden lg:flex gap-6">
                {[
                  { label: 'FPS', val: stats.fps },
                  { label: 'PING', val: `${stats.ping}ms` },
                ].map(s => (
                  <div key={s.label} className="text-right">
                    <div className="text-[10px] font-mono text-white/30 uppercase leading-none">{s.label}</div>
                    <div className="text-sm font-bold font-mono text-white">{s.val}</div>
                  </div>
                ))}
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs font-bold">{authData.playerUid ? `FF: ${authData.playerUid}` : 'bgmigamerz'}</div>
                  <div className="text-[10px] text-red-500 font-mono uppercase tracking-tighter">
                    {authData.playerUid ? 'Connected Account' : 'Elite Member'}
                  </div>
                </div>
                <div className="relative group/profile cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center text-white font-black text-xs ring-2 ring-white/10 overflow-hidden">
                    {authData.playerUid ? (
                      <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${authData.playerUid}`} 
                        className="w-full h-full object-cover"
                        alt="FF Player DP"
                      />
                    ) : (
                      'BG'
                    )}
                  </div>
                  {authData.playerUid && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full shadow-[0_0_10px_#22c55e]" />
                  )}
                </div>
              </div>
            </div>
          </header>

          <div className="p-8 max-w-6xl mx-auto relative min-h-screen">
            <AnimatePresence>
              {showTacticalWindows && (
                <div className="fixed inset-0 pointer-events-none z-50 p-8 flex flex-col justify-between overflow-hidden">
                  <div className="flex justify-between items-start">
                    <motion.div 
                      drag
                      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -100, opacity: 0 }}
                      className="pointer-events-auto w-64 bg-black/80 backdrop-blur-md border border-red-500/30 rounded-2xl p-4 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-[10px] font-black uppercase text-red-500 flex items-center gap-2">
                          <Activity size={12} /> Neural Stream
                        </div>
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      </div>
                      <div className="space-y-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              animate={{ width: ["20%", "80%", "40%"] }}
                              transition={{ repeat: Infinity, duration: 1.5 + i }}
                              className="h-full bg-red-600"
                            />
                          </div>
                        ))}
                        <div className="text-[8px] font-mono text-white/20 mt-2">ENCRYPTED PKT: SYNC_DATA</div>
                      </div>
                    </motion.div>

                    <motion.div 
                      drag
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 100, opacity: 0 }}
                      className="pointer-events-auto w-48 h-48 bg-black/80 backdrop-blur-md border border-cyan-500/30 rounded-full p-4 flex flex-col items-center justify-center relative overflow-hidden"
                    >
                      <Radar size={24} className="text-cyan-500 mb-2" />
                      <div className="text-[10px] font-black uppercase text-cyan-400">Tactical Radar</div>
                      <div className="text-[12px] font-mono text-white/60">SENS: 0.92</div>
                    </motion.div>
                  </div>

                  <div className="flex justify-center mb-20 md:mb-0">
                    <motion.div 
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 100, opacity: 0 }}
                      className="pointer-events-auto max-w-sm w-full bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4"
                    >
                      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white">
                        <Monitor size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] uppercase font-black text-white/40">System Console</div>
                        <div className="text-[11px] font-mono text-green-500">{">>"} CORE_SYNC: ACTIVE</div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {activeTab === Tab.DASHBOARD && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  key="dashboard"
                  className="space-y-8"
                >
                  {/* Tournament Active Banner */}
                  {registeredEvents.length > 0 && (
                    <motion.div 
                      key="tournament-banner"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="bg-red-600/10 border border-red-600/30 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 overflow-hidden relative"
                    >
                      <div className="absolute top-0 right-0 p-2 opacity-10">
                        <Trophy size={160} className="-mr-10 -mt-10" />
                      </div>
                      <div className="flex items-center gap-6 relative z-10">
                        <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                          <Trophy size={28} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Live Tournament Active</span>
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                          </div>
                          <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">
                            {registeredEvents[0]}
                          </h3>
                        </div>
                      </div>
                      <button 
                        onClick={() => setActiveTab(Tab.TOURNAMENTS)}
                        className="relative z-10 w-full md:w-auto px-10 py-3 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95"
                      >
                        Enter Arena
                      </button>
                    </motion.div>
                  )}

                  {/* Hero */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                    <button 
                      onClick={() => setGameType('FF Normal')}
                      className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 ${gameType === 'FF Normal' ? 'bg-red-600 border-red-500 shadow-lg' : 'bg-white/5 border-white/10 opacity-50'}`}
                    >
                      <Flame size={18} className={gameType === 'FF Normal' ? 'text-white' : 'text-red-500'} />
                      <div className="font-bold text-[10px] uppercase">FF Normal</div>
                    </button>
                    <button 
                      onClick={() => setGameType('FF Max')}
                      className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 ${gameType === 'FF Max' ? 'bg-cyan-600 border-cyan-500 shadow-lg' : 'bg-white/5 border-white/10 opacity-50'}`}
                    >
                      <Zap size={18} className={gameType === 'FF Max' ? 'text-white' : 'text-cyan-400'} />
                      <div className="font-bold text-[10px] uppercase">FF Max</div>
                    </button>
                    <button 
                      onClick={() => setGameType('BGMI')}
                      className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 ${gameType === 'BGMI' ? 'bg-orange-600 border-orange-500 shadow-lg' : 'bg-white/5 border-white/10 opacity-50'}`}
                    >
                      <Activity size={18} className={gameType === 'BGMI' ? 'text-white' : 'text-orange-500'} />
                      <div className="font-bold text-[10px] uppercase">BGMI</div>
                    </button>
                    <button 
                      onClick={() => setGameType('PUBG')}
                      className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 ${gameType === 'PUBG' ? 'bg-white/10 border-white/20 shadow-lg' : 'bg-white/5 border-white/10 opacity-50'}`}
                    >
                      <Shield size={18} className={gameType === 'PUBG' ? 'text-white' : 'text-white/60'} />
                      <div className="font-bold text-[10px] uppercase">PUBG MOBILE</div>
                    </button>
                    <button 
                      onClick={() => setGameType('CODM')}
                      className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 ${gameType === 'CODM' ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/20' : 'bg-white/5 border-white/10 opacity-50'}`}
                    >
                      <Target size={18} className={gameType === 'CODM' ? 'text-white' : 'text-blue-400'} />
                      <div className="font-bold text-[10px] uppercase">COD MOBILE</div>
                    </button>
                  </div>

                  <div className="relative h-64 rounded-3xl overflow-hidden group">
                    <img 
                      src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070" 
                      alt="Cyber City" 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-50"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
                    <div className="relative h-full flex flex-col justify-center px-12">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 mb-4 w-fit">
                        <AlertCircle size={14} className="text-yellow-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Update v4.2 Deployment Complete</span>
                      </div>
                      <h1 className="text-4xl font-black text-white uppercase tracking-tight mb-2 flex items-center gap-4">
                        <Monitor size={40} className="text-red-500 animate-pulse" />
                        <span>Welcome back, <span className="text-red-500 underline decoration-red-500/50">Agent</span></span>
                      </h1>
                      <p className="text-white/60 max-w-md text-sm">
                        Total System Liquidity Secured. Access all VIP modules instantly using your Digital Wallet.
                      </p>
                    </div>
                  </div>

                  {/* Live Feed Section */}
                  <div className="bg-[#0D0D12] border border-white/5 rounded-3xl overflow-hidden relative group">
                    <div className="absolute top-6 left-6 z-10 flex items-center gap-3">
                      <div className="px-3 py-1 bg-red-600 rounded text-[10px] font-black animate-pulse uppercase text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]">Live Feed</div>
                      <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[8px] font-mono text-cyan-400 uppercase tracking-widest leading-none flex items-center gap-2">
                        <Activity size={10} />
                        Neural Link: Active
                      </div>
                    </div>
                    <div className="aspect-video lg:aspect-[21/9] relative">
                      <iframe 
                        className="w-full h-full grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                        src="https://www.youtube.com/embed/S6f7P29IuEw?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1" 
                        title="Live Stream"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      ></iframe>
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0D0D12] via-transparent to-transparent opacity-60" />
                    </div>
                    <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-red-600/10 border border-red-500/20 rounded-2xl flex items-center justify-center text-red-500">
                          <Tv size={32} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black uppercase italic tracking-tighter">Bermuda Pro Finals</h3>
                          <p className="text-white/40 text-xs italic">Live Free Fire Telemetry & Combat Intel</p>
                        </div>
                      </div>
                      <div className="flex gap-4 w-full md:w-auto">
                        <button 
                          onClick={() => setIsWithdrawOpen(true)}
                          className="flex-1 md:flex-none px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 justify-center"
                        >
                          <Wallet size={16} className="text-red-500" />
                          Withdraw Cash
                        </button>
                        <button 
                          onClick={() => setActiveTab(Tab.LIVE)}
                          className="flex-1 md:flex-none px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-red-600/20"
                        >
                          Watch Full Feed
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Tactical Media Arena - Substantial Player Upgrade */}
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-1.5 h-6 bg-red-600 rounded-full" />
                          <div className="absolute inset-0 bg-red-500 blur-sm opacity-50" />
                        </div>
                        <h2 className="text-xl font-black uppercase tracking-tighter">Tactical Media Arena</h2>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono text-white/30 uppercase">824 COMBAT LOGS</span>
                        <button className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase text-white/50 tracking-widest hover:border-red-500/50 hover:text-white transition-all">Vault Archive</button>
                      </div>
                    </div>

                    {/* Featured Spotlight */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div 
                        onClick={() => setSelectedVideo({ id: 'MvAnL-XFEx8', title: 'Tactical Cinematic' })}
                        className="lg:col-span-2 group relative aspect-video bg-black rounded-[2rem] overflow-hidden border border-white/5 cursor-pointer"
                      >
                        <img 
                          src="https://img.youtube.com/vi/MvAnL-XFEx8/maxresdefault.jpg" 
                          className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                          alt="Main Highlight"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.5)] group-hover:scale-110 transition-transform">
                            <Tv size={40} className="fill-white" />
                          </div>
                        </div>
                        <div className="absolute bottom-8 left-8 p-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 bg-red-600 text-[8px] font-black uppercase rounded">Featured Spotlight</span>
                            <span className="text-[8px] font-mono text-white/50 uppercase tracking-widest">4K • 1.2M Views</span>
                          </div>
                          <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white">NEURAL CORE: THE FINAL DEPLOYMENT</h3>
                        </div>
                      </div>
                      <div className="space-y-6">
                        {[
                          { id: 'S6f7P29IuEw', title: 'North America Highlights', dur: '15:20' },
                          { id: 'jfKfPfyJRdk', title: 'Elite Gameplay Tactics', dur: '08:45' }
                        ].map((small, idx) => (
                           <div 
                              key={idx}
                              onClick={() => setSelectedVideo({ id: small.id, title: small.title })}
                              className="group relative aspect-video bg-black rounded-[1.5rem] overflow-hidden border border-white/5 cursor-pointer"
                           >
                              <img 
                                src={`https://img.youtube.com/vi/${small.id}/mqdefault.jpg`}
                                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                alt={small.title}
                              />
                              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all" />
                              <div className="absolute bottom-4 left-4">
                                <div className="text-[8px] font-black uppercase text-red-500 mb-1">Combat Intel {idx + 1}</div>
                                <h4 className="text-sm font-black uppercase italic text-white leading-tight">{small.title}</h4>
                              </div>
                              <div className="absolute top-4 right-4 px-2 py-0.5 bg-black/80 rounded text-[8px] font-mono font-bold text-white uppercase">{small.dur}</div>
                           </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {[
                        { title: 'FFWS 2024 Global Finals', dur: '12:45', id: 'MvAnL-XFEx8', type: 'Pro Match', premium: false },
                        { title: 'Top 10 Sniping Clutch', dur: '08:20', id: 'S6f7P29IuEw', type: 'Guide', premium: true },
                        { title: 'Neural Core Strategy', dur: '15:10', id: 'jfKfPfyJRdk', type: 'Strategy', premium: true },
                        { title: 'World Series V5 Preview', dur: '22:00', id: 'v5L6mD6-kOE', type: 'Tournament', premium: false },
                        { title: 'Garena Master Class', dur: '05:30', id: 'w08XoI_qM_4', type: 'Community', premium: false },
                        { title: 'Forbidden Zone Tactics', dur: '10:15', id: 'm-nN6_i8vYs', type: 'Secrets', premium: true },
                        { title: 'Pro Scrims Highlights', dur: '18:40', id: 'U8WfIEn0vYQ', type: 'Archive', premium: true },
                        { title: 'Sensitivity Mastery', dur: '04:12', id: 'jfKfPfyJRdk', type: 'Academy', premium: false },
                        { title: 'Bermuda Masterclass', dur: '14:30', id: 'S6f7P29IuEw', type: 'Records', premium: true },
                        { title: 'Perfect Grenade Guide', dur: '06:15', id: 'MvAnL-XFEx8', type: 'Guide', premium: false },
                        { title: 'V-Badge Holder Tips', dur: '09:40', id: 'jfKfPfyJRdk', type: 'Strategy', premium: true },
                        { title: 'Official Launch Event', dur: '25:00', id: 'w08XoI_qM_4', type: 'Esports', premium: false },
                      ].map((vid, i) => (
                        <div 
                          key={i} 
                          onClick={() => {
                            if (vid.premium && tokens < 50) {
                              setPurchaseStatus('Premium Video: 50 Tokens Required');
                              setActiveTab(Tab.STORE);
                              return;
                            }
                            setSelectedVideo({ id: vid.id, title: vid.title });
                          }}
                          className="group relative bg-[#0D0D12] border border-white/5 rounded-2xl overflow-hidden hover:border-red-500/30 transition-all cursor-pointer"
                        >
                          <div className="aspect-video relative overflow-hidden">
                            <img 
                              src={`https://img.youtube.com/vi/${vid.id}/mqdefault.jpg`}
                              className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                              alt={vid.title}
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all" />
                            
                            {vid.premium && (
                              <div className="absolute top-3 left-3 px-2 py-1 bg-amber-500 rounded flex items-center gap-1 shadow-lg">
                                <Lock size={10} className="text-black" />
                                <span className="text-[8px] font-black uppercase text-black">VIP ONLY</span>
                              </div>
                            )}

                            <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 backdrop-blur-md rounded text-[8px] font-mono font-bold text-white uppercase">{vid.dur}</div>
                            
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_20px_#dc2626]">
                                <Tv size={20} className="fill-white" />
                              </div>
                            </div>
                          </div>
                          <div className="p-4 bg-gradient-to-b from-transparent to-black/20">
                            <div className="flex items-center justify-between mb-1">
                              <div className="text-[8px] font-mono text-red-500 uppercase tracking-widest">{vid.type}</div>
                              {vid.premium && <span className="text-[8px] font-mono text-amber-500 uppercase">50 Tokens</span>}
                            </div>
                            <h4 className="text-sm font-black uppercase italic tracking-tight truncate text-white/80 group-hover:text-white transition-colors">{vid.title}</h4>
                            <div className="mt-3 flex items-center justify-between">
                              <div className="flex -space-x-2">
                                {[1, 2, 3].map(j => (
                                  <div key={j} className="w-5 h-5 rounded-full border-2 border-[#0D0D12] bg-white/10 overflow-hidden">
                                    <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${j*i + 1}`} className="w-full h-full" alt="avatar" />
                                  </div>
                                ))}
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye size={10} className="text-white/20" />
                                <span className="text-[8px] font-mono text-white/20 uppercase">{(Math.random() * 5 + 1).toFixed(1)}k Views</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Settings Snippet */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div 
                      className="bg-white/5 border border-white/5 rounded-3xl p-8 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-all"
                      onClick={() => setIsPaymentOpen(true)}
                    >
                      <div>
                        <div className="text-2xl font-black mb-1">ADD MONEY</div>
                        <p className="text-xs text-white/40">Secure UPI & Card Support</p>
                      </div>
                      <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center">
                        <CreditCard size={24} />
                      </div>
                    </div>
                    <div 
                      className="bg-white/5 border border-white/5 rounded-3xl p-8 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-all"
                      onClick={() => setActiveTab(Tab.STORE)}
                    >
                      <div>
                        <div className="text-2xl font-black mb-1">BUY TOKENS</div>
                        <p className="text-xs text-white/40">Convert INR to Tactical Credits</p>
                      </div>
                      <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center">
                        <Zap size={24} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === Tab.TACTICAL && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  key="tactical"
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-black uppercase tracking-tight">Tactical Modules</h2>
                      <p className="text-white/50 text-sm">Enable advanced assistances for tactical gameplay simulation.</p>
                    </div>
                    <button 
                      onClick={() => {
                        setModules(prev => prev.map(m => ({ ...m, isActive: true })));
                        setPurchaseStatus('ALL GAME PLUGINS & HACKS ENABLED');
                        setTimeout(() => setPurchaseStatus(null), 3000);
                      }}
                      className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-lg transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] uppercase tracking-widest"
                    >
                      ENABLE ALL HACKS
                    </button>
                    <div className="bg-red-500/10 px-4 py-2 border border-red-500/20 rounded-lg flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      <span className="text-xs font-bold text-red-500 uppercase font-mono tracking-widest">Live Injection</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {modules.map(mod => (
                      <TacticalModule key={mod.id} module={mod} onToggle={toggleModule} />
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === Tab.GFX && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  key="gfx"
                  className="space-y-8"
                >
                  <div className="flex justify-between items-center bg-white/5 p-8 rounded-3xl border border-white/5">
                    <div>
                      <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2">GFX Neural Optimizer</h2>
                      <p className="text-white/50 text-sm italic">Direct kernel-level access to device graphics drivers.</p>
                    </div>
                    <button 
                      onClick={() => {
                        setIsGraphicsApplied(true);
                        setPurchaseStatus('GFX Configurations Applied for ' + gameType);
                        setTimeout(() => setIsGraphicsApplied(false), 2000);
                        setTimeout(() => setPurchaseStatus(null), 3000);
                      }}
                      className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl shadow-[0_10px_30px_rgba(220,38,38,0.3)] transition-all active:scale-95 uppercase tracking-widest text-xs"
                    >
                      {isGraphicsApplied ? 'OPTIMIZING...' : 'APPLY SETTINGS'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Resolution & Quality */}
                    <div className="space-y-6">
                      <Panel title="Primary Render Settings">
                        <div className="space-y-6">
                          <div>
                            <label className="text-[10px] font-black uppercase text-white/30 tracking-widest block mb-3">Resolution Scale</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                              {['720p', '1080p', '2K', '4K Native'].map(res => (
                                <button 
                                  key={res}
                                  onClick={() => setResolution(res)}
                                  className={`py-3 rounded-xl border text-[10px] font-bold transition-all ${resolution === res ? 'bg-red-600 border-red-500 text-white' : 'bg-white/5 border-white/5 text-white/40 hover:border-white/20'}`}
                                >
                                  {res}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] font-black uppercase text-white/30 tracking-widest block mb-3">Graphics Quality</label>
                            <div className="grid grid-cols-3 gap-2">
                              {['Smooth', 'Balanced', 'HD', 'HDR', 'Ultra HDR', 'Extreme Native'].map(q => (
                                <button 
                                  key={q}
                                  onClick={() => setGraphicsQuality(q)}
                                  className={`py-3 rounded-xl border text-[10px] font-bold transition-all ${graphicsQuality === q ? 'bg-red-600 border-red-500 text-white' : 'bg-white/5 border-white/5 text-white/40 hover:border-white/20'}`}
                                >
                                  {q}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Panel>

                      <Panel title="Advanced Post-Processing">
                        <div className="space-y-6">
                          <div>
                            <label className="text-[10px] font-black uppercase text-white/30 tracking-widest block mb-3">MSAA Anti-Aliasing</label>
                            <div className="grid grid-cols-3 gap-2">
                              {['Off', '2x', '4x'].map(aa => (
                                <button 
                                  key={aa}
                                  onClick={() => setAntiAliasing(aa)}
                                  className={`py-3 rounded-xl border text-[10px] font-bold transition-all ${antiAliasing === aa ? 'bg-red-600 border-red-500 text-white' : 'bg-white/5 border-white/5 text-white/40 hover:border-white/20'}`}
                                >
                                  {aa}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] font-black uppercase text-white/30 tracking-widest block mb-3">Shadow Fidelity</label>
                            <div className="grid grid-cols-4 gap-2">
                              {['Off', 'Low', 'Med', 'Ultra'].map(s => (
                                <button 
                                  key={s}
                                  onClick={() => setShadowQuality(s)}
                                  className={`py-3 rounded-xl border text-[10px] font-bold transition-all ${shadowQuality === s ? 'bg-red-600 border-red-500 text-white' : 'bg-white/5 border-white/5 text-white/40 hover:border-white/20'}`}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Panel>
                    </div>

                    {/* FPS Neural Unlock */}
                    <div className="space-y-6">
                      <div className="bg-[#09090E] border border-white/5 p-8 rounded-3xl flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                           <Zap size={64} className="text-white/[0.02]" />
                        </div>
                        <Cpu className="text-green-500 mb-6 drop-shadow-[0_0_20px_rgba(34,197,94,0.5)]" size={48} />
                        <h3 className="text-2xl font-black mb-2 uppercase italic">Frame Rate Neural Unlock</h3>
                        <p className="text-xs text-white/40 mb-8 leading-relaxed">
                          Synchronize your device refresh rate with neural precision kernels for absolute response dominance.
                        </p>
                        
                        <div className="grid grid-cols-4 gap-2 w-full">
                          {[60, 90, 120, 300, 422, 500, 800, 1000].map(fps => {
                            const isUnlocked = fps === 60 || 
                              (fps === 90 && is90FPSUnlocked) || 
                              (fps === 120 && is120FPSUnlocked) || 
                              (fps === 300 && is300FPSUnlocked) || 
                              (fps === 422 && is422FPSUnlocked) || 
                              (fps === 500 && is500FPSUnlocked) || 
                              (fps === 800 && is800FPSUnlocked) || 
                              (fps === 1000 && is1000FPSUnlocked);
                            
                            const cost = fps === 90 ? 150 : fps === 120 ? 200 : fps === 300 ? 400 : fps === 422 ? 350 : fps === 500 ? 600 : fps === 800 ? 1000 : fps === 1000 ? 2500 : 0;

                            return (
                              <button 
                                key={fps}
                                onClick={() => {
                                  if (isUnlocked) {
                                    setFpsMode(fps as any);
                                  } else if (tokens >= cost) {
                                    setTokens(prev => prev - cost);
                                    if (fps === 90) setIs90FPSUnlocked(true);
                                    if (fps === 120) setIs120FPSUnlocked(true);
                                    if (fps === 300) setIs300FPSUnlocked(true);
                                    if (fps === 422) setIs422FPSUnlocked(true);
                                    if (fps === 500) setIs500FPSUnlocked(true);
                                    if (fps === 800) setIs800FPSUnlocked(true);
                                    if (fps === 1000) setIs1000FPSUnlocked(true);
                                    setFpsMode(fps as any);
                                    setPurchaseStatus(`${fps} FPS Successfully Unlocked!`);
                                    setTimeout(() => setPurchaseStatus(null), 3000);
                                  } else {
                                    setPurchaseStatus(`${cost} Tokens required for ${fps} FPS!`);
                                    setTimeout(() => setPurchaseStatus(null), 3000);
                                  }
                                }}
                                className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-1 ${
                                  fpsMode === fps 
                                  ? (fps >= 500 ? 'bg-white/20 border-white/40 shadow-lg' : 'bg-red-500/20 border-red-500/50 shadow-lg shadow-red-500/10') 
                                  : 'bg-white/5 border-white/5'
                                }`}
                              >
                                <div className={`text-lg font-black ${isUnlocked ? (fpsMode === fps ? 'text-white' : 'text-red-500') : 'text-white/20'}`}>{fps}</div>
                                <div className={`text-[8px] font-bold uppercase mt-1 ${isUnlocked ? 'text-white/50' : 'text-white/20'}`}>
                                  {isUnlocked ? 'ACTIVE' : `${cost} Z`}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <Panel title="Texture Extraction Core">
                        <div className="flex items-center justify-between p-2">
                          <label className="text-[10px] font-black uppercase text-white/30 tracking-widest">Anisotropic Filtering</label>
                          <select 
                            value={textureFiltering}
                            onChange={(e) => setTextureFiltering(e.target.value)}
                            className="bg-black/40 border border-white/10 rounded-lg text-xs p-2 focus:ring-red-500 focus:border-red-500"
                          >
                            <option>Linear</option>
                            <option>Anisotropic 4x</option>
                            <option>Anisotropic 8x</option>
                            <option>Anisotropic 16x</option>
                          </select>
                        </div>
                      </Panel>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === Tab.STORE && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  key="store"
                  className="space-y-8"
                >
                  <div className="flex justify-between items-end mb-12">
                    <div className="max-w-xl">
                      <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2">Token Emporium</h2>
                      <p className="text-white/50 text-sm italic">Use your Digital Wallet (INR) to purchase tactical tokens.</p>
                    </div>
                    <button 
                      onClick={() => setIsPaymentOpen(true)}
                      className="px-6 py-2 bg-green-500 hover:bg-green-600 text-black text-xs font-black rounded-lg transition-all"
                    >
                      + ADD MONEY
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                    {tokenPackages.map((pkg) => (
                      <div 
                        key={pkg.id} 
                        className={`p-6 rounded-3xl border transition-all relative group cursor-pointer ${
                          pkg.popular ? 'bg-red-600/10 border-red-500 shadow-[0_0_30px_rgba(220,38,38,0.15)]' : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                        onClick={() => handlePurchaseTokens(pkg)}
                      >
                        {pkg.popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                            Most Popular
                          </div>
                        )}
                        <div className="text-center">
                          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-all border border-white/5">
                            <Zap className={pkg.popular ? 'text-yellow-500' : 'text-white/40'} size={32} />
                          </div>
                          <div className="text-2xl font-black text-white mb-1">{pkg.tokens} <span className="text-[10px] block text-white/40 font-normal uppercase tracking-widest">Tokens</span></div>
                          <div className="text-[10px] font-mono text-white/40 mb-8">{pkg.name}</div>
                          <button className={`w-full py-3 rounded-xl font-black text-sm transition-all ${pkg.popular ? 'bg-red-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                            PAY ₹{pkg.price}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#09090E] border border-white/5 p-12 rounded-3xl flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                       <Shield size={64} className="text-white/[0.02]" />
                    </div>
                    <Eye className="text-red-500 mb-6 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]" size={64} />
                    <h3 className="text-3xl font-black mb-4 uppercase italic">Eye Panel Activation</h3>
                    <p className="text-sm text-white/50 mb-10 max-w-md leading-relaxed">
                      The ESP visualization system requires massive computational injection. Activation cost is strictly 100 Tokens. Ensure your token count is sufficient.
                    </p>
                    <div className="flex gap-6">
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] text-white/20 uppercase font-mono mb-1">Unit Cost</span>
                        <div className="px-8 py-3 bg-white/5 rounded-2xl text-xl font-black font-mono border border-white/5">100 Z</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] text-white/20 uppercase font-mono mb-1">Availability</span>
                        <div className={tokens >= 100 ? 'px-8 py-3 bg-green-500/10 rounded-2xl text-xl font-black font-mono text-green-500 border border-green-500/20' : 'px-8 py-3 bg-red-500/10 rounded-2xl text-xl font-black font-mono text-red-500 border border-red-500/20'}>
                          {tokens >= 100 ? 'ACTIVE' : 'LOCKED'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#09090E] border border-white/5 p-12 rounded-3xl flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                       <Shield size={64} className="text-white/[0.02]" />
                    </div>
                    <Shield className="text-cyan-500 mb-6 drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]" size={64} />
                    <h3 className="text-3xl font-black mb-4 uppercase italic">Kernel Bypass v4</h3>
                    <p className="text-sm text-white/50 mb-10 max-w-md leading-relaxed">
                      Advanced anti-cheat suppression for high-tier accounts. Integration requires deep memory patching. Activation cost is 150 Tokens.
                    </p>
                    <div className="flex gap-6">
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] text-white/20 uppercase font-mono mb-1">Unit Cost</span>
                        <div className="px-8 py-3 bg-white/5 rounded-2xl text-xl font-black font-mono border border-white/5">150 Z</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] text-white/20 uppercase font-mono mb-1">Availability</span>
                        <div className={tokens >= 150 ? 'px-8 py-3 bg-green-500/10 rounded-2xl text-xl font-black font-mono text-green-500 border border-green-500/20' : 'px-8 py-3 bg-red-500/10 rounded-2xl text-xl font-black font-mono text-red-500 border border-red-500/20'}>
                          {tokens >= 150 ? 'SECURE' : 'LOCKED'}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === Tab.WALLET && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  key="wallet"
                  className="space-y-6"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 bg-gradient-to-br from-red-600 to-red-900 rounded-[2.5rem] p-10 flex flex-col justify-between overflow-hidden relative shadow-[0_20px_50px_rgba(220,38,38,0.3)] min-h-[300px]">
                      <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12">
                        <TrendingUp size={200} />
                      </div>
                      <div>
                        <div className="text-white/60 font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                          <Shield size={12} /> Secure Assets Balance
                        </div>
                        <div className="text-6xl font-black italic tracking-tighter text-white">
                          ₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => setIsPaymentOpen(true)}
                          className="px-8 py-4 bg-white text-red-600 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white/90 active:scale-95 transition-all flex items-center gap-2"
                        >
                          <ArrowDownLeft size={16} /> Deposit Funds
                        </button>
                        <button 
                          onClick={() => setIsWithdrawOpen(true)}
                          className="px-8 py-4 bg-black/20 border border-white/20 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-black/30 active:scale-95 transition-all flex items-center gap-2"
                        >
                          <ArrowUpRight size={16} /> Withdraw
                        </button>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-80 bg-white/5 border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
                      <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Zap size={100} />
                      </div>
                      <div>
                        <div className="text-white/40 font-mono text-[10px] uppercase tracking-widest mb-1">Account Tokens</div>
                        <div className="text-4xl font-black text-amber-500">{tokens.toLocaleString()}</div>
                        <div className="text-[10px] text-white/20 uppercase mt-4">Equivalent to ₹{(tokens * 0.1).toFixed(2)}</div>
                      </div>
                      <button onClick={() => setActiveTab(Tab.STORE)} className="w-full py-3 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl text-[10px] font-black uppercase tracking-widest mt-8">Buy More Tokens</button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-red-600 rounded-full shadow-[0_0_10px_#dc2626]" />
                        <h2 className="text-xl font-black uppercase tracking-tighter">Transaction Registry</h2>
                      </div>
                      <div className="flex items-center gap-4 text-[10px] text-white/30 font-mono uppercase">
                        <span>Total Records: {transactions.length}</span>
                        <History size={14} />
                      </div>
                    </div>

                    <div className="bg-[#0D0D12] border border-white/5 rounded-3xl overflow-hidden">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-white/[0.02] border-b border-white/5">
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-white/40 tracking-widest">Reference ID</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-white/40 tracking-widest">Type</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-white/40 tracking-widest">Amount</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-white/40 tracking-widest">Status</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-white/40 tracking-widest">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map((txn) => (
                            <tr key={txn.id} className="hover:bg-white/[0.01] border-b border-white/5 transition-all">
                              <td className="px-6 py-4 text-xs font-mono text-cyan-500">{txn.id}</td>
                              <td className="px-6 py-4">
                                <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase inline-block ${txn.type === 'deposit' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                  {txn.type}
                                </div>
                              </td>
                              <td className="px-6 py-4 font-black text-xs text-white">₹{txn.amount.toLocaleString('en-IN')}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <div className={`w-1.5 h-1.5 rounded-full ${txn.status === 'completed' ? 'bg-green-500' : txn.status === 'pending' ? 'bg-amber-500 animate-pulse' : 'bg-red-500'}`} />
                                  <span className={`text-[10px] font-bold uppercase ${txn.status === 'completed' ? 'text-green-500' : txn.status === 'pending' ? 'text-amber-500' : 'text-red-500'}`}>{txn.status}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-[10px] font-mono text-white/30 uppercase tracking-tighter">{txn.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}
              {activeTab === Tab.VIP && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  key="vip"
                  className="max-w-2xl mx-auto text-center py-8"
                >
                  <div className="w-24 h-24 bg-gradient-to-tr from-red-600 to-amber-600 rounded-3xl mx-auto flex items-center justify-center text-white rotate-12 shadow-[0_20px_50px_rgba(220,38,38,0.3)] mb-12">
                    <Shield size={48} />
                  </div>
                  <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Ascend to <span className="text-red-500">Elite VIP</span></h2>
                  <p className="text-white/50 mb-12 leading-relaxed">
                    Unlock the most powerful tactical algorithms developed by top-tier analysts. 
                    Your gameplay will never be the same again.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 text-left">
                    {[
                      'Real-time Cloud Sync',
                      'No Recoil Neural Script',
                      'Exclusive High-Tier Skins (Visual)',
                      'Priority Server Routing',
                      '24/7 Dedicated Support',
                      'Private Elite Discord Access'
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                        <CheckCircle2 size={18} className="text-green-500" />
                        <span className="text-sm font-medium text-white/80">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-red-600 p-8 rounded-3xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <div className="relative z-10">
                      <div className="text-sm font-bold text-white/80 uppercase tracking-widest mb-2">Special Limited Offer</div>
                      <div className="flex items-center justify-center gap-4 mb-6">
                        <span className="text-white/40 text-2xl line-through">₹499</span>
                        <span className="text-6xl font-black text-white">₹2</span>
                      </div>
                      <button 
                        onClick={() => setIsPaymentOpen(true)}
                        className="w-full bg-white text-red-600 py-4 rounded-xl font-black text-lg hover:shadow-xl transition-all active:scale-95"
                      >
                        ACTIVATE VIP NOW
                      </button>
                    </div>
                  </div>
                  <p className="mt-6 text-[10px] text-white/30 uppercase tracking-[0.2em]">Offer ends in 02:14:59 | User ID: bgmigamerz</p>
                </motion.div>
              )}

              {activeTab === Tab.TOURNAMENTS && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key="tournaments"
                  className="space-y-8"
                >
                  <AnimatePresence>
                    {isLaunching && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center"
                      >
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          <Trophy size={80} className="text-red-500 mb-8 drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]" />
                        </motion.div>
                        <h2 className="text-3xl font-black uppercase italic mb-2 tracking-widest">Bridging Arena...</h2>
                        <p className="text-red-500 font-mono text-xs animate-pulse mb-8 uppercase tracking-[0.3em]">Connecting to {isLaunching}</p>
                        
                        <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden relative">
                          <motion.div 
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2.5, ease: "easeInOut" }}
                            className="absolute inset-y-0 left-0 bg-red-600 shadow-[0_0_10px_#dc2626]"
                          />
                        </div>
                        
                        <div className="mt-8 grid grid-cols-1 gap-2">
                          <span className="text-[10px] text-white/20 font-mono uppercase">Syncing Neural Kernel... OK</span>
                          <span className="text-[10px] text-white/20 font-mono uppercase">Optimizing Latency... 12ms</span>
                          <span className="text-[10px] text-white/20 font-mono uppercase">Connecting to Global Lobby... SYNCED</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h2 className="text-3xl font-black uppercase italic tracking-tighter">Tournament Arena</h2>
                      <p className="text-white/50 text-sm italic leading-none">Compete for dominance in global high-stakes leagues.</p>
                    </div>
                    <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
                      {['All', 'Solo', 'Duo', 'Squad'].map(mode => (
                        <button key={mode} className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'All' ? 'bg-red-600 text-white' : 'text-white/40 hover:text-white/60'}`}>
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { game: 'BGMI', title: 'Neural Championship', prize: '₹25,000', players: '48/100', color: 'bg-orange-500', icon: <Skull size={24} /> },
                      { game: 'Free Fire', title: 'Ignite Open v4', prize: '₹50,000', players: '82/200', color: 'bg-red-600', icon: <Flame size={24} /> },
                      { game: 'PUBG', title: 'Global Precision League', prize: '₹1,00,000', players: '12/64', color: 'bg-cyan-500', icon: <Shield size={24} /> },
                      { game: 'CODM', title: 'Tactical Elite Series', prize: '₹15,000', players: '32/50', color: 'bg-blue-600', icon: <Target size={24} /> }
                    ].map((t, idx) => (
                      <div key={idx} className="bg-[#09090E] border border-white/5 rounded-3xl overflow-hidden group hover:border-white/20 transition-all flex h-48">
                        <div className={`w-32 ${t.color} flex flex-col items-center justify-center gap-2 group-hover:w-36 transition-all duration-500`}>
                          {t.icon}
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] -rotate-90 origin-center whitespace-nowrap mt-4">LEAGUE v4.2</span>
                        </div>
                        <div className="flex-1 p-8 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${t.color}/20 text-white`}>{t.game}</span>
                              <div className="text-[10px] font-mono text-white/30 uppercase">Prize Pool</div>
                            </div>
                            <h3 className="text-xl font-black uppercase italic truncate">{t.title}</h3>
                            <div className="text-3xl font-black text-white mt-1">{t.prize}</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-[10px] font-mono text-white/40">
                              RESERVED: <span className="text-white">{t.players}</span>
                            </div>
                            <button 
                              onClick={() => {
                                if (registeredEvents.includes(t.title)) {
                                  setIsLaunching(t.title);
                                  setTimeout(() => {
                                    setIsLaunching(null);
                                    setActiveTab(Tab.LIVE);
                                    setPurchaseStatus(`Successfully Connected to ${t.game} Battleground!`);
                                    setTimeout(() => setPurchaseStatus(null), 3000);
                                  }, 3000);
                                  return;
                                }
                                setRegisteredEvents(prev => [...prev, t.title]);
                                setPurchaseStatus(`Tournament Registration Successful: ${t.title}`);
                                setTimeout(() => setPurchaseStatus(null), 3000);
                              }}
                              className={`px-6 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${
                                registeredEvents.includes(t.title) 
                                ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:scale-105 active:scale-95' 
                                : 'bg-white text-black hover:bg-red-600 hover:text-white'
                              }`}
                            >
                              {registeredEvents.includes(t.title) ? 'LAUNCH ARENA' : 'REGISTER'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-red-600/20 to-transparent border border-red-500/20 p-8 rounded-3xl flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-red-600/30">
                        <Trophy size={32} />
                      </div>
                      <div>
                        <h4 className="text-xl font-black uppercase italic">Host Your Own Scrims</h4>
                        <p className="text-sm text-white/40">Private tournament hosting tools unlocked for Elite Members.</p>
                      </div>
                    </div>
                    <button className="px-8 py-3 bg-red-600 text-white font-black rounded-xl text-xs hover:scale-105 transition-transform uppercase tracking-widest">
                      CREATE TOURNAMENT
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === Tab.LIVE && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key="live"
                  className="space-y-8"
                >
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`px-2 py-0.5 rounded text-[10px] font-black uppercase text-white ${streamStatus === 'live' ? 'bg-red-600 animate-pulse' : 'bg-yellow-600'}`}>
                          {streamStatus === 'live' ? 'Live' : 'Starting Soon'}
                        </div>
                        <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                          {streamStatus === 'live' ? 'BATTLE ROYALE: FREE FIRE | SEASON 38' : 'PRE-MATCH STREAM | PREPARING LINK'}
                        </div>
                      </div>
                      <h2 className="text-4xl font-black uppercase italic tracking-tighter">
                        {streamStatus === 'live' ? 'Global Tournament: Purgatory' : 'Free Fire Elite Tournament'}
                      </h2>
                      <p className="text-white/50 text-sm italic">
                        {streamStatus === 'live' ? 'FF Pro Series Final: 48 Players | Squad Clash | Neural Link' : `Special Iftar Series starting in ${formatTime(streamCountdown)}`}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      {streamStatus === 'live' ? (
                        <>
                          <div className="text-right">
                            <div className="text-[10px] font-mono text-white/30 uppercase">Active Survival</div>
                            <div className="text-xl font-black text-white">34 / 100</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] font-mono text-white/30 uppercase">Zone Phase</div>
                            <div className="text-xl font-black text-red-500">STAGE 4</div>
                          </div>
                        </>
                      ) : (
                        <div className="text-right">
                          <div className="text-[10px] font-mono text-white/30 uppercase">Countdown</div>
                          <div className="text-3xl font-black text-red-500 font-mono tracking-tighter">{formatTime(streamCountdown)}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3 space-y-6">
                      <div className="aspect-video bg-black rounded-[40px] overflow-hidden border border-white/5 shadow-2xl relative group">
                        <iframe 
                          className="w-full h-full"
                          src={streamStatus === 'live' 
                            ? "https://www.youtube.com/embed/b1Y-bALz0f8?autoplay=1&mute=1" 
                            : "https://www.youtube.com/embed/S6f7P29IuEw?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1"
                          } 
                          title={streamStatus === 'live' ? "Free Fire Normal Gameplay" : "Free Fire Tournament Gameplay"}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                        
                        <AnimatePresence>
                          {showBooyah && (
                            <motion.div 
                              initial={{ scale: 0, opacity: 0, rotate: -20 }}
                              animate={{ scale: 1, opacity: 1, rotate: -5 }}
                              exit={{ scale: 2, opacity: 0, rotate: 10 }}
                              className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
                            >
                              <div className="bg-yellow-500 px-12 py-6 rounded-2xl shadow-[0_0_100px_rgba(234,179,8,0.8)] border-4 border-white">
                                <h2 className="text-8xl font-black italic tracking-tighter text-black uppercase">BOOYAH!</h2>
                                <p className="text-center font-mono text-black text-sm font-bold uppercase tracking-widest">Match Started</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {streamStatus === 'starting' && (
                          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none">
                            <motion.div
                              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                              transition={{ duration: 4, repeat: Infinity }}
                              className="w-48 h-48 mb-8 relative"
                            >
                              <div className="absolute inset-0 bg-red-600/20 blur-[60px] rounded-full animate-pulse" />
                              <img 
                                src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070&auto=format&fit=crop" 
                                className="w-full h-full object-cover rounded-full border-4 border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.5)]" 
                                alt="Free Fire Logo"
                              />
                              <div className="absolute inset-0 border-4 border-white/20 rounded-full border-t-red-600 animate-spin" />
                            </motion.div>
                            <h3 className="text-5xl font-black uppercase italic tracking-tighter text-white drop-shadow-[0_5px_15px_rgba(0,0,0,1)]">STREAM STARTING SOON</h3>
                            <p className="text-red-500 font-mono text-[10px] tracking-[0.5em] uppercase font-bold mt-2">Special Iftar Tournament Series</p>
                            <div className="mt-4 flex items-center gap-4">
                              <div className="h-[2px] w-24 bg-gradient-to-r from-transparent to-red-600" />
                              <span className="text-xl font-black font-mono text-red-500">{formatTime(streamCountdown)}</span>
                              <div className="h-[2px] w-24 bg-gradient-to-l from-transparent to-red-600" />
                            </div>
                          </div>
                        )}

                        <div className="absolute inset-0 pointer-events-none border-[20px] border-black/20" />
                        <div className="absolute top-8 left-8 space-y-2 z-30">
                          <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-white/10 text-[8px] font-mono text-cyan-400">
                            {streamStatus === 'live' ? 'BR_SERVER: ASIA-NEURAL-7' : 'SIGNAL: STABILIZING'}
                          </div>
                          <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-white/10 text-[8px] font-mono text-green-400">
                            {streamStatus === 'live' ? 'FPS: 1000 (KERNEL_SYNC)' : 'LINK: 84% ESTABLISHED'}
                          </div>
                        </div>

                        {streamStatus === 'starting' && (
                          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setStreamStatus('live');
                              }}
                              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl text-[10px] uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(220,38,38,0.5)] pointer-events-auto flex items-center gap-2"
                            >
                              <Zap size={14} />
                              START MISSION & GO LIVE
                            </button>
                          </div>
                        )}
                      </div>

                      <Panel title={streamStatus === 'live' ? "Battle Royale Telemetry" : "Upcoming Match Intel"}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2">
                          {[
                            { label: 'Map', val: streamStatus === 'live' ? 'Purgatory' : 'Purgatory' },
                            { label: 'Type', val: streamStatus === 'live' ? 'World Series' : 'Elite BR Ranked' },
                            { label: 'Kill Leader', val: streamStatus === 'live' ? 'Gare-FF-Alpha' : 'Searching...' },
                            { label: 'Prize Pool', val: '₹10,00,000' }
                          ].map(s => (
                            <div key={s.label} className="bg-white/5 p-4 rounded-xl border border-white/5">
                              <div className="text-[8px] font-mono text-white/30 uppercase mb-1">{s.label}</div>
                              <div className="text-xs font-black uppercase text-white">{s.val}</div>
                            </div>
                          ))}
                        </div>
                      </Panel>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-[#0D0D12] border border-white/5 rounded-[40px] h-full flex flex-col overflow-hidden">
                        <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Live Arena Chat</span>
                          </div>
                          <div className="text-[10px] font-mono text-white/20">6.4K ONLINE</div>
                        </div>
                        <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[600px] scrollbar-hide">
                          {[
                            { user: 'BOOYAH_KING', msg: 'DROP AT SKI LODGE!!', time: '12:04' },
                            { user: 'Slayer_FF', msg: 'GLOO WALLS ARE READY!', time: '12:05' },
                            { user: 'System', msg: 'Danger Zone Appearing in Mt. Villa', type: 'system' },
                            { user: 'Nexus_9', msg: 'That AWM shot was pure magic', time: '12:05' },
                            { user: 'Viper_Ops', msg: 'Elite Pass members get 2x tokens!', time: '12:06' },
                            { user: 'Alpha_Squad', msg: 'Booyah is ours this time!', time: '12:07' },
                          ].map((chat, i) => (
                            <div key={i} className={`flex flex-col ${chat.type === 'system' ? 'items-center' : ''}`}>
                              {chat.type === 'system' ? (
                                <div className="text-[9px] font-mono text-red-500/50 bg-red-500/5 px-2 py-1 rounded italic uppercase">
                                  {chat.msg}
                                </div>
                              ) : (
                                <>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-black text-white/40 uppercase">{chat.user}</span>
                                    <span className="text-[8px] font-mono text-white/10">{chat.time}</span>
                                  </div>
                                  <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5 text-[11px] text-white/80 leading-relaxed">
                                    {chat.msg}
                                  </div>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="p-6 border-t border-white/5">
                          <div className="relative">
                            <input 
                              type="text" 
                              placeholder="Type tactical intel..." 
                              className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-xs focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none pr-12"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-600">
                              <Zap size={16} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {purchaseStatus && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-white text-black px-8 py-4 rounded-2xl font-black shadow-2xl flex items-center gap-4 border border-white/10"
          >
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
              <CheckCircle2 size={18} />
            </div>
            {purchaseStatus}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(239, 68, 68, 0.3); }
      `}</style>
    </div>
  );
}
