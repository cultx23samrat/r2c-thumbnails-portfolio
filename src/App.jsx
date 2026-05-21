import React, { useState, useEffect, useRef } from 'react';
// Error yahi thi, import MyLogo from './logo.png'; file available nahi hai. 
// Isko hata diya gaya hai. Hum wapas public folder URL use karenge.

// --- INLINE SVG ICONS (NO LUCIDE-REACT NEEDED) ---
const IconWrapper = ({ size = 24, className = "", fill = "none", children }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {children}
  </svg>
);
const Camera = (p) => <IconWrapper {...p}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></IconWrapper>;
const Gamepad2 = (p) => <IconWrapper {...p}><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="2"/></IconWrapper>;
const Users = (p) => <IconWrapper {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></IconWrapper>;
const Dices = (p) => <IconWrapper {...p}><rect x="2" y="10" width="12" height="12" rx="2"/><path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"/><path d="M6 18h.01"/><path d="M10 14h.01"/><path d="M15 6h.01"/><path d="M18 9h.01"/></IconWrapper>;
const Star = (p) => <IconWrapper {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></IconWrapper>;
const Plus = (p) => <IconWrapper {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></IconWrapper>;
const LinkIcon = (p) => <IconWrapper {...p}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></IconWrapper>;
const Lock = (p) => <IconWrapper {...p}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></IconWrapper>;
const CheckCircle = (p) => <IconWrapper {...p}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></IconWrapper>;
const X = (p) => <IconWrapper {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></IconWrapper>;
const Layout = (p) => <IconWrapper {...p}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></IconWrapper>;
const Edit2 = (p) => <IconWrapper {...p}><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></IconWrapper>;
const Trash2 = (p) => <IconWrapper {...p}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></IconWrapper>;
const Save = (p) => <IconWrapper {...p}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></IconWrapper>;
const Upload = (p) => <IconWrapper {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></IconWrapper>;
const Shield = (p) => <IconWrapper {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></IconWrapper>;

// --- UTILS & HOOKS ---
const useIntersectionObserver = (options = { threshold: 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options]);

  return [domRef, isVisible];
};

const AnimatedSection = ({ children, className = '', delay = 'delay-0' }) => {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'
      } ${className} ${delay}`}
    >
      {children}
    </div>
  );
};

const getYoutubeHandle = (url) => {
  if (!url) return null;
  const match = url.match(/@([^/?]+)/);
  return match ? match[1] : null;
};

const ReviewAvatar = ({ review }) => {
  const [imgError, setImgError] = useState(false);
  const handle = getYoutubeHandle(review.link);
  const avatarUrl = handle ? `https://unavatar.io/youtube/${handle}` : null;

  if (avatarUrl && !imgError) {
    return (
      <img 
        src={avatarUrl} 
        alt={review.name} 
        onError={() => setImgError(true)}
        className="w-12 h-12 rounded-full object-cover shadow-lg flex-shrink-0 border-2 border-white/10 bg-neutral-900"
      />
    );
  }

  return (
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-lg border-2 border-white/10">
      {review.name.charAt(0).toUpperCase()}
    </div>
  );
};

// --- CONSTANTS & DATA ---
const THEME_COLORS = {
  green: { border: 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]', badge: 'bg-green-500 text-black', text: 'text-green-500' },
  purple: { border: 'border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]', badge: 'bg-purple-500 text-white', text: 'text-purple-500' },
  blue: { border: 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]', badge: 'bg-blue-500 text-white', text: 'text-blue-500' },
  red: { border: 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]', badge: 'bg-red-500 text-white', text: 'text-red-500' },
  yellow: { border: 'border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.6)]', badge: 'bg-yellow-500 text-black', text: 'text-yellow-500' },
  cyan: { border: 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]', badge: 'bg-cyan-500 text-black', text: 'text-cyan-500' },
  pink: { border: 'border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]', badge: 'bg-pink-500 text-white', text: 'text-pink-500' },
};

const ICONS = { gamepad: <Gamepad2 size={18} />, camera: <Camera size={18} />, users: <Users size={18} />, dices: <Dices size={18} />, layout: <Layout size={18} /> };

const INITIAL_CATEGORIES = [
  { id: 'c1', name: 'Gaming', iconName: 'gamepad', color: 'green' },
  { id: 'c2', name: 'Vlogging', iconName: 'camera', color: 'purple' },
  { id: 'c3', name: 'IRL', iconName: 'users', color: 'blue' },
  { id: 'c4', name: 'Gambling', iconName: 'dices', color: 'red' }
];

const INITIAL_THUMBNAILS = [
  { id: 1, categoryId: 'c1', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80', title: 'Minecraft Live' },
  { id: 2, categoryId: 'c1', url: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80', title: 'Anant Express Gameplay' },
  { id: 3, categoryId: 'c1', url: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80', title: 'Valorant Live Stream' },
  { id: 4, categoryId: 'c1', url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80', title: 'BGMI Action' },
  { id: 5, categoryId: 'c2', url: 'https://images.unsplash.com/photo-1500634245200-e5245c7574ef?auto=format&fit=crop&w=800&q=80', title: 'Special Guest Vlog' },
  { id: 6, categoryId: 'c2', url: 'https://images.unsplash.com/photo-1516245834213-9074c6e94916?auto=format&fit=crop&w=800&q=80', title: 'Dyno Meets Dinosaur' },
  { id: 7, categoryId: 'c2', url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80', title: 'Epic Friends Feast' },
  { id: 8, categoryId: 'c2', url: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=800&q=80', title: 'Moto Vlog - Buddh Circuit' },
  { id: 9, categoryId: 'c3', url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80', title: 'Life as a Fisherman' },
  { id: 10, categoryId: 'c3', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80', title: '100 Players 1 iPhone' },
  { id: 11, categoryId: 'c3', url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80', title: 'Working as a Rapido Rider' },
  { id: 12, categoryId: 'c3', url: 'https://images.unsplash.com/photo-1523580494112-071d311fa80d?auto=format&fit=crop&w=800&q=80', title: '$3 Billion Mansion' },
  { id: 13, categoryId: 'c4', url: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=800&q=80', title: 'Epic Giveaway Win' },
  { id: 14, categoryId: 'c4', url: 'https://images.unsplash.com/photo-1518133335724-4f40d04fb42c?auto=format&fit=crop&w=800&q=80', title: '1% Rolex Unboxing' },
  { id: 15, categoryId: 'c4', url: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=800&q=80', title: '$19k Max Win!' },
  { id: 16, categoryId: 'c4', url: 'https://images.unsplash.com/photo-1605663861214-41132b85e054?auto=format&fit=crop&w=800&q=80', title: 'Crate Battle Winner' },
];

const INITIAL_REVIEWS = [
  { id: 3, name: 'Payal Gaming', text: 'Really good work! delivers on time ♥️', rating: 5, link: 'https://www.youtube.com/@PAYALGAMING' },
  { id: 4, name: 'JokerKiHaveli', text: 'kiraak🤗🔥', rating: 5, link: 'https://www.youtube.com/@Jokerkihavelii' }
];

export default function App() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [thumbnails, setThumbnails] = useState(INITIAL_THUMBNAILS);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [activeCategory, setActiveCategory] = useState('All');
  
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminTab, setAdminTab] = useState('thumbnails');
  const [reviewTokens, setReviewTokens] = useState(['R2C-VIP-2026']);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const [newThumb, setNewThumb] = useState({ categoryId: 'c1', url: '', title: '' });
  const [newCategory, setNewCategory] = useState({ name: '', iconName: 'layout', color: 'yellow' });
  const [editingThumb, setEditingThumb] = useState(null);

  // LOGO LINK - Pointing back to the public folder (r2c-logo.png)
  const LOGO_URL = "/r2c-logo.png"; 

  // --- HELPERS ---
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const getCategoryTheme = (categoryId) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? THEME_COLORS[cat.color] : THEME_COLORS['blue'];
  };

  const getCategoryName = (categoryId) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.name : 'Unknown';
  };

  const getCategoryIcon = (iconName) => {
    return ICONS[iconName] || ICONS['layout'];
  };

  const filteredThumbnails = activeCategory === 'All' 
    ? thumbnails 
    : thumbnails.filter(t => t.categoryId === activeCategory);

  // --- ADMIN ACTIONS ---
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if(editingThumb) {
          setEditingThumb({...editingThumb, url: reader.result});
        } else {
          setNewThumb({...newThumb, url: reader.result});
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddThumbnail = (e) => {
    e.preventDefault();
    if (newThumb.url && newThumb.title) {
      setThumbnails([{ ...newThumb, id: Date.now() }, ...thumbnails]);
      setNewThumb({ categoryId: categories[0]?.id || '', url: '', title: '' });
      showToast('Thumbnail Added Successfully!');
    }
  };

  const handleDeleteThumbnail = (id) => {
    setThumbnails(thumbnails.filter(t => t.id !== id));
    showToast('Thumbnail Deleted', 'error');
  };

  const handleUpdateThumbnail = (e) => {
    e.preventDefault();
    setThumbnails(thumbnails.map(t => t.id === editingThumb.id ? editingThumb : t));
    setEditingThumb(null);
    showToast('Thumbnail Updated Successfully!');
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.name) {
      const newId = `c${Date.now()}`;
      setCategories([...categories, { ...newCategory, id: newId }]);
      setNewCategory({ name: '', iconName: 'layout', color: 'yellow' });
      showToast('New Category Created!');
    }
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(c => c.id !== id));
    setThumbnails(thumbnails.filter(t => t.categoryId !== id));
    if(activeCategory === id) setActiveCategory('All');
    showToast('Category and its Thumbnails Deleted', 'error');
  };

  const generateReviewToken = () => {
    const token = `R2C-${Math.floor(Math.random() * 10000)}`;
    setReviewTokens([...reviewTokens, token]);
    showToast(`New Token Generated: ${token}`);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const token = e.target.token.value;
    const name = e.target.name.value;
    const link = e.target.link.value;
    const text = e.target.text.value;

    if (reviewTokens.includes(token)) {
      setReviews([{ id: Date.now(), name, link, text, rating: 5 }, ...reviews]);
      setReviewTokens(reviewTokens.filter(t => t !== token));
      setIsReviewFormOpen(false);
      showToast('Review Submitted Successfully!');
    } else {
      showToast('Invalid Token!', 'error');
    }
  };

  return (
    <div className="min-h-screen premium-bg text-white font-sans selection:bg-purple-500 selection:text-white">
      
      {/* --- CUSTOM CSS STYLES & ANIMATIONS --- */}
      <style>{`
        @keyframes premiumGlow {
          0% { filter: drop-shadow(0 0 8px rgba(168,85,247,0.3)) drop-shadow(0 0 15px rgba(59,130,246,0.2)); transform: scale(1); }
          100% { filter: drop-shadow(0 0 25px rgba(168,85,247,0.8)) drop-shadow(0 0 40px rgba(59,130,246,0.6)); transform: scale(1.04); }
        }
        .logo-glow {
          animation: premiumGlow 2.5s ease-in-out infinite alternate;
          will-change: filter, transform;
        }
        
        /* Transparent 3D Effect for Logo - Removed mix-blend-mode since logo is natively transparent */
        .logo-3d-transparent {
          filter: drop-shadow(0px 10px 20px rgba(168, 85, 247, 0.5)) drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.9));
          transform: perspective(500px) translateZ(10px);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .logo-3d-transparent:hover {
          transform: perspective(500px) translateZ(30px) scale(1.05);
        }

        @keyframes argbGradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animated-argb {
          background: linear-gradient(to right, #ff0000, #ff8000, #ffff00, #00ff00, #00ffff, #0000ff, #8000ff, #ff00ff, #ff0000);
          background-size: 200% auto;
          color: #000;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: argbGradient 3s linear infinite;
        }
        @keyframes premiumBg {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .premium-bg {
          background: linear-gradient(-45deg, #000000, #0d0914, #000000, #050a12);
          background-size: 400% 400%;
          animation: premiumBg 15s ease infinite;
        }
      `}</style>

      {/* --- TOAST NOTIFICATION --- */}
      {toast && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[110] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className={`px-6 py-3 rounded-full flex items-center gap-2 shadow-2xl backdrop-blur-md border ${
            toast.type === 'error' ? 'bg-red-500/20 border-red-500/50 text-red-200' : 'bg-green-500/20 border-green-500/50 text-green-200'
          }`}>
            <CheckCircle size={18} className={toast.type === 'error' ? 'hidden' : 'block'} />
            <X size={18} className={toast.type === 'error' ? 'block' : 'hidden'} />
            <span className="font-medium text-sm">{toast.message}</span>
          </div>
        </div>
      )}

      {/* --- NAVBAR --- */}
      <nav className="fixed w-full top-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2 cursor-pointer relative group" onDoubleClick={() => setIsAdminOpen(true)}>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 blur-2xl opacity-20 group-hover:opacity-50 transition-opacity duration-500 rounded-full animate-pulse"></div>
              <img 
                src={LOGO_URL} 
                alt="R2C Premium Logo" 
                className="h-12 sm:h-16 relative z-10 logo-glow logo-3d-transparent object-contain"
                onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
              />
            </div>
            
            {/* Nav Actions - Visible on mobile too */}
            <div className="flex items-center gap-3 sm:gap-6">
              <a href="#portfolio" className="hidden sm:block text-sm font-medium text-gray-300 hover:text-white transition-colors">Portfolio</a>
              <a href="#reviews" className="hidden sm:block text-sm font-medium text-gray-300 hover:text-white transition-colors">Reviews</a>
              <button 
                onClick={() => setIsAdminOpen(true)}
                className="text-xs sm:text-sm font-medium text-white transition-colors flex items-center gap-1.5 bg-purple-600/20 px-4 py-2 rounded-full border border-purple-500/30 hover:bg-purple-600/40 shadow-lg"
              >
                <Shield size={14} className="text-purple-400" /> Admin
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Thumbnails</span><br/>
              For Elite Creators.
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay="delay-200">
            <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
              Elevate your YouTube channel's CTR to the next level. We design eye-catching and high-converting thumbnails for every niche.
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay="delay-400" className="mt-10 flex justify-center gap-4">
            <a 
              href="https://wa.me/917002718915?text=Hey%20there!" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)]"
            >
              Reach Us
            </a>
          </AnimatedSection>
        </div>
      </div>

      {/* --- PORTFOLIO SECTION --- */}
      <section id="portfolio" className="py-20 bg-black/20 backdrop-blur-sm border-y border-white/5 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-12">Our <span className="text-purple-400">Masterpieces</span></h2>
          </AnimatedSection>

          {/* Category Filters */}
          <AnimatedSection delay="delay-100" className="flex flex-wrap justify-center gap-4 mb-12">
            <button 
              onClick={() => setActiveCategory('All')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeCategory === 'All' ? 'bg-white text-black' : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'}`}
            >
              All
            </button>
            {categories.map((cat) => {
              const theme = THEME_COLORS[cat.color];
              const isActive = activeCategory === cat.id;
              return (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    isActive ? theme.badge : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
                  }`}
                >
                  {getCategoryIcon(cat.iconName)} {cat.name}
                </button>
              );
            })}
          </AnimatedSection>

          {/* Thumbnails Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredThumbnails.map((thumb, index) => {
              const theme = getCategoryTheme(thumb.categoryId);
              return (
                <AnimatedSection key={thumb.id} delay={`delay-${(index % 4) * 100}`}>
                  <div className={`group relative rounded-2xl overflow-hidden border-2 bg-neutral-900 transition-all duration-500 transform hover:-translate-y-2 ${theme.border}`}>
                    <div className="aspect-video w-full overflow-hidden bg-neutral-800">
                      <img 
                        src={thumb.url} 
                        alt={thumb.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded w-max mb-2 shadow-lg ${theme.badge}`}>
                        {getCategoryName(thumb.categoryId)}
                      </span>
                      <h3 className="text-lg font-bold text-white drop-shadow-md">{thumb.title}</h3>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
          
          {filteredThumbnails.length === 0 && (
             <div className="text-center text-gray-500 py-10">No thumbnails in this category yet.</div>
          )}
        </div>
      </section>

      {/* --- REVIEWS SECTION --- */}
      <section id="reviews" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent -z-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <AnimatedSection>
            {/* Animated ARGB Line */}
            <div className="text-center mb-4 text-lg text-gray-300 font-medium">
              <span className="animated-argb text-[1.1em] font-extrabold px-1">1200+</span> projects delivered successfully with over <span className="animated-argb text-[1.1em] font-extrabold px-1">7+</span> years of experience..
            </div>
            
            <h2 className="text-4xl font-bold text-center mb-4">Client <span className="text-blue-400">Reviews</span></h2>
            <p className="text-center text-gray-400 mb-12">Only verified clients can submit a review.</p>
          </AnimatedSection>

          <div className="space-y-6">
            {reviews.map((review, index) => (
              <AnimatedSection key={review.id} delay={`delay-${index * 100}`}>
                <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex gap-4 items-start">
                  <ReviewAvatar review={review} />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                      <h4 className="font-bold text-lg leading-tight">
                        {review.link ? (
                          <a href={review.link} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors underline decoration-purple-500/30 underline-offset-4">
                            {review.name}
                          </a>
                        ) : (
                          review.name
                        )}
                      </h4>
                      <div className="flex text-yellow-500">
                        {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill={review.rating > i ? "currentColor" : "none"} />)}
                      </div>
                    </div>
                    {/* Fixed the gap issue with trimming and proper margins */}
                    <p className="text-gray-300 break-words whitespace-pre-wrap mt-2">{review.text.trim()}</p>
                    <div className="flex items-center gap-1 text-green-400 text-xs mt-3 opacity-70">
                      <CheckCircle size={12} /> Verified Client
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-12 text-center">
            <button 
              onClick={() => setIsReviewFormOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full font-medium transition-colors border border-white/10 hover:border-white/30"
            >
              <Plus size={18} /> Submit a Review (Token Required)
            </button>
          </AnimatedSection>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/10 bg-black/60 backdrop-blur-xl py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-6">
            <img 
              src={LOGO_URL} 
              alt="R2C Premium Logo" 
              className="h-16 sm:h-24 logo-glow logo-3d-transparent object-contain" 
              onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
            />
          </div>
          <p className="text-gray-400 mb-2 mt-4">Premium Thumbnail Design Team</p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>Creators:</span>
            <a href="https://youtube.com/@ranchozod" target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:text-purple-400 transition-colors">Rancho</a> • 
            <a href="https://youtube.com/@ravoislive" target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:text-blue-400 transition-colors">Ravo</a> • 
            <a href="https://youtube.com/@cultx" target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:text-green-400 transition-colors">Cultx</a>
          </div>
          <p className="text-xs text-gray-600 mt-8">© 2026 R2C. All rights reserved.</p>
        </div>
      </footer>


      {/* ============================================================== */}
      {/* --- MODALS (POPUPS) --- */}
      {/* ============================================================== */}

      {/* 1. ADMIN MODAL */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-neutral-900 border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col relative animate-in fade-in zoom-in duration-300 shadow-2xl">
            
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-neutral-950/50 rounded-t-3xl">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Shield className="text-purple-500" /> Secure Admin Dashboard
              </h2>
              <button onClick={() => setIsAdminOpen(false)} className="text-gray-400 hover:text-white p-2 bg-neutral-800 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
              {/* Sidebar Tabs */}
              <div className="w-full sm:w-64 border-r border-white/10 bg-neutral-950/30 p-4 space-y-2 overflow-y-auto">
                <button 
                  onClick={() => setAdminTab('thumbnails')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${adminTab === 'thumbnails' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-neutral-800 hover:text-white'}`}
                >
                  <Layout size={18} /> Manage Thumbnails
                </button>
                <button 
                  onClick={() => setAdminTab('categories')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${adminTab === 'categories' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-neutral-800 hover:text-white'}`}
                >
                  <Plus size={18} /> Categories
                </button>
                <button 
                  onClick={() => setAdminTab('tokens')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${adminTab === 'tokens' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-neutral-800 hover:text-white'}`}
                >
                  <LinkIcon size={18} /> Review Tokens
                </button>
              </div>

              {/* Tab Content Area */}
              <div className="flex-1 overflow-y-auto p-6 bg-neutral-900">
                
                {/* TAB: THUMBNAILS */}
                {adminTab === 'thumbnails' && (
                  <div className="space-y-8">
                    {/* Add / Edit Form */}
                    <div className="bg-neutral-950 p-6 rounded-2xl border border-white/5 shadow-lg">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        {editingThumb ? <><Edit2 size={18} className="text-blue-400"/> Edit Thumbnail</> : <><Plus size={18} className="text-green-400"/> Add New Thumbnail</>}
                      </h3>
                      <form onSubmit={editingThumb ? handleUpdateThumbnail : handleAddThumbnail} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-gray-500 mb-1 block">Category</label>
                            <select 
                              value={editingThumb ? editingThumb.categoryId : newThumb.categoryId} 
                              onChange={e => editingThumb ? setEditingThumb({...editingThumb, categoryId: e.target.value}) : setNewThumb({...newThumb, categoryId: e.target.value})}
                              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white outline-none focus:border-purple-500"
                            >
                              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 mb-1 block">Title</label>
                            <input 
                              type="text" required
                              value={editingThumb ? editingThumb.title : newThumb.title}
                              onChange={e => editingThumb ? setEditingThumb({...editingThumb, title: e.target.value}) : setNewThumb({...newThumb, title: e.target.value})}
                              placeholder="Thumbnail Title..."
                              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white outline-none focus:border-purple-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs text-gray-500 mb-1 block">Image Source</label>
                          <div className="flex gap-2">
                            <input 
                              type="url" 
                              value={editingThumb ? editingThumb.url : newThumb.url}
                              onChange={e => editingThumb ? setEditingThumb({...editingThumb, url: e.target.value}) : setNewThumb({...newThumb, url: e.target.value})}
                              placeholder="Paste URL..."
                              className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white outline-none focus:border-purple-500"
                            />
                            <label className="cursor-pointer bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg p-3 flex items-center justify-center transition-colors">
                              <Upload size={20} className="text-gray-400" />
                              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                            </label>
                          </div>
                          {(editingThumb?.url || newThumb.url) && (
                            <div className="mt-2 h-32 rounded-lg border border-neutral-700 overflow-hidden relative group w-max">
                               <img src={editingThumb ? editingThumb.url : newThumb.url} className="h-full object-cover" alt="Preview" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <button type="submit" className="flex-1 bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                            <Save size={18} /> {editingThumb ? 'Save Changes' : 'Publish Thumbnail'}
                          </button>
                          {editingThumb && (
                            <button type="button" onClick={() => setEditingThumb(null)} className="px-4 bg-neutral-800 text-white font-medium py-3 rounded-lg hover:bg-neutral-700 transition-colors">
                              Cancel
                            </button>
                          )}
                        </div>
                      </form>
                    </div>

                    {/* Manage List */}
                    <div>
                      <h3 className="font-bold text-gray-400 mb-4 px-2">Uploaded Thumbnails ({thumbnails.length})</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {thumbnails.map(thumb => (
                          <div key={thumb.id} className="bg-neutral-950 border border-white/5 rounded-xl p-3 flex gap-4 items-center group">
                            <img src={thumb.url} alt={thumb.title} className="w-20 h-14 object-cover rounded-md border border-neutral-800" />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-sm truncate text-white">{thumb.title}</h4>
                              <span className="text-xs text-gray-500 bg-neutral-900 px-2 py-0.5 rounded mt-1 inline-block">{getCategoryName(thumb.categoryId)}</span>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => { setEditingThumb(thumb); window.scrollTo(0,0); }} className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20">
                                <Edit2 size={16} />
                              </button>
                              <button onClick={() => handleDeleteThumbnail(thumb.id)} className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB: CATEGORIES */}
                {adminTab === 'categories' && (
                  <div className="space-y-8">
                    <div className="bg-neutral-950 p-6 rounded-2xl border border-white/5 shadow-lg">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Plus size={18} className="text-green-400"/> Add New Category
                      </h3>
                      <form onSubmit={handleAddCategory} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="text-xs text-gray-500 mb-1 block">Category Name</label>
                            <input 
                              type="text" required
                              value={newCategory.name}
                              onChange={e => setNewCategory({...newCategory, name: e.target.value})}
                              placeholder="e.g., Finance"
                              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white outline-none focus:border-purple-500"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 mb-1 block">Theme Color</label>
                            <select 
                              value={newCategory.color} 
                              onChange={e => setNewCategory({...newCategory, color: e.target.value})}
                              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white outline-none focus:border-purple-500"
                            >
                              {Object.keys(THEME_COLORS).map(color => (
                                <option key={color} value={color} className="capitalize">{color}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 mb-1 block">Icon Type</label>
                            <select 
                              value={newCategory.iconName} 
                              onChange={e => setNewCategory({...newCategory, iconName: e.target.value})}
                              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white outline-none focus:border-purple-500"
                            >
                              {Object.keys(ICONS).map(icon => (
                                <option key={icon} value={icon} className="capitalize">{icon}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors">
                          Create Category
                        </button>
                      </form>
                    </div>

                    <div>
                       <h3 className="font-bold text-gray-400 mb-4 px-2">Active Categories</h3>
                       <div className="space-y-3">
                         {categories.map(cat => (
                           <div key={cat.id} className="bg-neutral-950 border border-white/5 rounded-xl p-4 flex justify-between items-center group">
                             <div className="flex items-center gap-3">
                               <div className={`p-2 rounded-lg ${THEME_COLORS[cat.color].badge}`}>
                                 {getCategoryIcon(cat.iconName)}
                               </div>
                               <span className="font-bold text-white">{cat.name}</span>
                             </div>
                             <button onClick={() => handleDeleteCategory(cat.id)} className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity" title="Delete Category & its Thumbnails">
                                <Trash2 size={18} />
                              </button>
                           </div>
                         ))}
                       </div>
                    </div>
                  </div>
                )}

                {/* TAB: REVIEW TOKENS */}
                {adminTab === 'tokens' && (
                  <div className="space-y-6">
                    <div className="bg-neutral-950 p-6 rounded-2xl border border-white/5 shadow-lg">
                      <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <LinkIcon size={18} className="text-purple-400" /> Review Access Tokens
                      </h3>
                      <p className="text-sm text-gray-400 mb-6">Generate secret keys to give to clients so they can submit a verified review.</p>
                      
                      <button 
                        onClick={generateReviewToken}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition-colors shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] flex justify-center items-center gap-2 text-lg"
                      >
                        <Plus size={20} /> Generate New Token
                      </button>
                    </div>

                    {reviewTokens.length > 0 && (
                      <div className="bg-neutral-950 p-6 rounded-2xl border border-white/5">
                        <h4 className="font-bold text-gray-400 mb-4">Active Tokens (Ready to use)</h4>
                        <div className="flex flex-wrap gap-3">
                          {reviewTokens.map(token => (
                            <div key={token} className="bg-neutral-800 border border-neutral-700 px-4 py-2 rounded-lg text-white font-mono flex items-center gap-3">
                              {token}
                              <button onClick={() => {navigator.clipboard.writeText(token); showToast('Token Copied!');}} className="text-gray-400 hover:text-white" title="Copy to clipboard">
                                <LinkIcon size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. CLIENT REVIEW SUBMISSION MODAL */}
      {isReviewFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-neutral-900 border border-white/10 p-6 sm:p-8 rounded-3xl w-full max-w-md relative animate-in fade-in slide-in-from-bottom-4 duration-300 shadow-2xl">
            <button onClick={() => setIsReviewFormOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white bg-neutral-800 p-2 rounded-full">
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-bold mb-2">Submit a Review</h2>
            <p className="text-sm text-gray-400 mb-6">Enter your approval token to post your verified review.</p>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Secret Token *</label>
                <input 
                  type="text" name="token" required
                  placeholder="e.g., R2C-1234"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Your Name / Channel Name *</label>
                <input 
                  type="text" name="name" required
                  placeholder="e.g., John Doe"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">YouTube Link (Optional)</label>
                <input 
                  type="url" name="link"
                  placeholder="e.g., https://youtube.com/@handle"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white outline-none focus:border-blue-500"
                />
                <p className="text-[10px] text-gray-500 mt-1">Providing this will automatically fetch your channel logo.</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Your Review *</label>
                <textarea 
                  name="text" required rows="3"
                  placeholder="Amazing work..."
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white outline-none focus:border-blue-500 resize-none"
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}