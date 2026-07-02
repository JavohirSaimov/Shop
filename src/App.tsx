import { Canvas } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Suspense, useRef, useState, useEffect } from "react";
import Scene from "./components/Scene";
import { Instagram, MapPin, ChevronDown, Store, Star, Phone, Clock, X, Heart, Sparkles, Send } from "lucide-react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

function Section({ children, className = "", id, watermarkPosition }: { children: React.ReactNode; className?: string; id?: string; watermarkPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  return (
    <section id={id} className={`min-h-screen w-full flex items-center justify-center px-6 md:px-20 relative overflow-hidden ${className}`}>
      {watermarkPosition && (
        <img 
          src="/logo.png" 
          alt="" 
          className={`absolute opacity-[0.03] pointer-events-none z-0 w-[60vw] max-w-[600px] object-contain mix-blend-multiply ${
            watermarkPosition === 'top-left' ? '-top-32 -left-32' :
            watermarkPosition === 'top-right' ? '-top-32 -right-32' :
            watermarkPosition === 'bottom-left' ? '-bottom-32 -left-32' :
            '-bottom-32 -right-32'
          }`}
        />
      )}
      <div className="relative z-10 w-full h-full flex items-center justify-center flex-col">
        {children}
      </div>
    </section>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({ children, className = "", href, onClick, target, rel }: any) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

function InteractiveMap() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center overflow-hidden">
      {/* The embedded Map */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 z-20"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.002870197495!2d65.3789498!3d40.1066705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f51c760438cf1c9%3A0xe5cd870c920fdf94!2sMuslima%20Shop%20Navoiy!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-brand-dark hover:bg-gray-100 z-30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            key="marker"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -100 }}
            className="cursor-pointer group absolute inset-0 m-auto flex flex-col items-center justify-center focus:outline-none z-30 w-28 h-28"
          >
            <div className="w-28 h-28 bg-pink-400 rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.15)] group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 relative p-1 border-4 border-pink-300">
              <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-30 group-hover:opacity-50"></div>
              
              {/* Pseudo-3D map marker tail */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-pink-300 drop-shadow-md"></div>
              
              <img src="/logo.png" alt="Muslima Shop Location" className="w-full h-full object-cover rounded-full relative z-10 bg-pastel-pink" onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = document.getElementById('map-marker-fallback');
                if (fallback) fallback.style.display = 'flex';
              }} />
              
              <div id="map-marker-fallback" className="hidden absolute inset-0 bg-brand-dark rounded-full items-center justify-center z-10">
                <MapPin className="w-10 h-10 text-white" />
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    gsap.to(window, { duration: 1, scrollTo: `#${id}`, ease: "power2.inOut" });
  };

  return (
    <div ref={containerRef} className="relative w-full bg-[#FAFAFA] min-h-screen">

      {/* Marquee Banner */}
      <div className="fixed top-0 left-0 right-0 h-8 z-[100] bg-pink-500 text-white text-xs tracking-widest font-medium uppercase overflow-hidden flex items-center whitespace-nowrap shadow-sm">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          className="flex space-x-12 px-4"
        >
          <span>✨ Yangi yozgi kolleksiya yetib keldi</span>
          <span>✨ Barcha kiyimlar yuqori sifatda</span>
          <span>✨ Yangi yozgi kolleksiya yetib keldi</span>
          <span>✨ Barcha kiyimlar yuqori sifatda</span>
          <span>✨ Yangi yozgi kolleksiya yetib keldi</span>
          <span>✨ Barcha kiyimlar yuqori sifatda</span>
          <span>✨ Yangi yozgi kolleksiya yetib keldi</span>
          <span>✨ Barcha kiyimlar yuqori sifatda</span>
          <span>✨ Yangi yozgi kolleksiya yetib keldi</span>
          <span>✨ Barcha kiyimlar yuqori sifatda</span>
        </motion.div>
      </div>

      <motion.div
        className="fixed top-8 left-0 right-0 h-[2px] bg-blue-400 origin-left z-[110]"
        style={{ scaleX }}
      />

      {/* 3D Canvas Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Navigation */}
      <div className="fixed top-14 left-0 right-0 z-50 px-6 flex justify-center pointer-events-none">
        <nav className="flex items-center justify-center md:justify-between px-6 md:px-8 py-3 w-full max-w-7xl backdrop-blur-2xl bg-pink-100/90 border border-white/60 rounded-full shadow-[0_8px_32px_rgba(236,72,153,0.15)] pointer-events-auto">
          <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')} className="flex items-center gap-3 font-display font-medium text-lg tracking-wide text-brand-dark">
            <img src="/logo.png" alt="Muslima Shop" className="h-8 w-8 object-contain rounded-full shadow-sm" onError={(e) => e.currentTarget.style.display = 'none'} />
            <span>Muslima Shop</span>
          </a>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-brand-dark/70 tracking-wide uppercase">
            <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')} className="hover:text-pink-500 transition-colors">Bosh sahifa</a>
            <a href="#collections" onClick={(e) => scrollToSection(e, 'collections')} className="hover:text-pink-500 transition-colors">Kiyimlar</a>
            <a href="#store" onClick={(e) => scrollToSection(e, 'store')} className="hover:text-pink-500 transition-colors">Do'kon</a>
            <a href="#instagram" onClick={(e) => scrollToSection(e, 'instagram')} className="hover:text-pink-500 transition-colors">Instagram</a>
          </div>
        </nav>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 w-full overflow-hidden">
        
        {/* 1. Hero Section */}
        <Section id="hero" className="pt-20 relative" watermarkPosition="top-left">
          {/* Floating cute elements */}
          <motion.div animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-32 left-[10%] md:left-[20%] text-pink-400 opacity-60">
            <Heart size={40} fill="currentColor" />
          </motion.div>
          <motion.div animate={{ y: [0, 20, 0], rotate: [0, -15, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-40 left-[15%] md:left-[25%] text-blue-500 opacity-50">
            <Star size={48} fill="currentColor" />
          </motion.div>
          <motion.div animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-40 right-[15%] md:right-[25%] text-purple-400 opacity-60">
            <Sparkles size={36} />
          </motion.div>
          
          <div className="max-w-5xl mx-auto text-center relative z-10 mt-10">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-md mb-8 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse"></span>
                <span className="text-xs font-semibold tracking-widest text-pink-600 uppercase">Premium Bolalar Kiyimlari</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-balance leading-[1.1] text-[#1A202C] mb-6">
                Bolajonlar uchun <br/><span className="text-pink-400 italic font-light">nafis tanlov</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg md:text-xl text-[#4A5568] mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                Muslima Shop Navoiy'da bolalar kiyimlari uchun yumshoq, sifatli va chiroyli tanlovlar.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagneticButton href="#store" onClick={(e: any) => scrollToSection(e, 'store')} className="inline-block px-8 py-4 bg-pink-500 backdrop-blur-md text-white rounded-full font-medium tracking-wide hover:bg-pink-600 transition-all w-full sm:w-auto shadow-xl shadow-pink-500/30 cursor-pointer text-center">
                  Do'kon haqida
                </MagneticButton>
                <MagneticButton href="https://instagram.com/muslimashopnavoiyoptomn1" target="_blank" rel="noreferrer" className="px-8 py-4 bg-white/80 backdrop-blur-md text-pink-600 rounded-full font-medium tracking-wide flex items-center justify-center gap-2 hover:bg-white transition-all w-full sm:w-auto shadow-sm cursor-pointer">
                  <Instagram className="w-5 h-5" />
                  Instagramga o'tish
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* 2. Scroll 1: Intro */}
        <Section id="collections" className="justify-center items-center py-20" watermarkPosition="bottom-right">
          <div className="max-w-4xl mx-auto mt-32 md:mt-0 backdrop-blur-xl bg-pink-100/90 border border-white/80 p-10 md:p-16 rounded-[2.5rem] shadow-[0_16px_60px_-15px_rgba(236,72,153,0.15)] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-pink-400"></div>
            <Reveal>
              <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6 text-slate-800">
                Har kuni kiyishga qulay, <br/><span className="italic font-light text-pink-500">ko'rinishi nafis</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
                Farzandingiz terisiga mayin tegadigan, harakatlanishiga xalaqit bermaydigan va ota-onalar ko'nglini xotirjam qiladigan yuqori sifatli kiyimlar to'plami.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* 3. Scroll 2: Categories */}
        <Section className="py-20" watermarkPosition="top-right">
          <div className="max-w-7xl w-full mx-auto">
            <Reveal>
               <h2 className="font-display text-4xl md:text-5xl font-semibold mb-12 text-center text-slate-800">
                Qizlar va o'g'il bolalar uchun
              </h2>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {[
                { title: "Kundalik kiyimlar", color: "bg-pink-300/70 shadow-pink-300/50", icon: "✨" },
                { title: "Pijamalar", color: "bg-blue-300/70 shadow-blue-300/50", icon: "🌙" },
                { title: "Paypoqlar", color: "bg-pink-400/70 shadow-pink-400/50 text-white", icon: "🧦" },
                { title: "Mavsumiy to'plamlar", color: "bg-blue-400/70 shadow-blue-400/50 text-white", icon: "🌸" }
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.1} className="h-full">
                  <div className={`${item.color} backdrop-blur-xl h-full p-6 md:p-10 rounded-[1.5rem] md:rounded-[2rem] flex flex-col items-center justify-center text-center shadow-lg hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 cursor-default aspect-square`}>
                    <span className="text-3xl md:text-5xl mb-4 md:mb-6">{item.icon}</span>
                    <h3 className="font-medium text-sm md:text-lg text-slate-800">{item.title}</h3>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* 4. Scroll 3: Quality */}
        <Section className="justify-center py-20" watermarkPosition="bottom-left">
           <div className="max-w-4xl mx-auto mt-32 md:mt-0 backdrop-blur-xl bg-blue-100/90 border border-white/80 p-10 md:p-16 rounded-[2.5rem] shadow-[0_16px_60px_-15px_rgba(59,130,246,0.15)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-60 -mr-10 -mt-10 pointer-events-none"></div>
            <Reveal>
              <h2 className="font-display text-4xl md:text-5xl font-semibold mb-10 text-slate-800">
                Yumshoqlik, qulaylik <span className="italic font-light text-blue-600">va e'tibor</span>
              </h2>
            </Reveal>
            <div className="space-y-6 relative z-10">
              {[
                "Bolalar uchun xavfsiz matolar",
                "Kundalik faol foydalanishga chidamli",
                "Ota-onalar uchun tanlash oson",
                "Estetik va nafis ko'rinish"
              ].map((text, i) => (
                <Reveal key={i} delay={0.2 + (i * 0.1)}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shadow-sm text-blue-500 shrink-0">
                      <Star className="w-4 h-4" fill="currentColor" />
                    </div>
                    <p className="text-lg font-medium text-slate-700">{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* 5. Scroll 4: Store Location */}
        <Section id="store" className="py-20" watermarkPosition="top-left">
           <div className="max-w-6xl mx-auto w-full backdrop-blur-xl bg-pink-100/90 border border-white/80 p-8 md:p-16 rounded-[3rem] shadow-[0_16px_60px_-15px_rgba(236,72,153,0.15)] relative overflow-hidden">
            <div className="absolute -left-20 top-20 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            
            <Reveal>
              <div className="text-center mb-16 relative z-10">
                <img src="/logo.png" alt="Muslima Shop" className="w-20 h-20 mx-auto object-cover rounded-full shadow-md mb-6 bg-white/50 backdrop-blur-sm" onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = document.getElementById('store-icon-fallback');
                  if (fallback) fallback.style.display = 'block';
                }} />
                <Store id="store-icon-fallback" className="hidden w-12 h-12 mx-auto text-pink-500 mb-6" />
                <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4 text-slate-800">
                  Do'konimizga tashrif buyuring
                </h2>
                <p className="text-xl text-slate-600 font-light">
                  Kiyimlarning sifatini o'z qo'lingiz bilan his qiling.
                </p>
              </div>
            </Reveal>
            
            <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
              <Reveal delay={0.2}>
                <div className="space-y-6 bg-white/50 backdrop-blur-md p-8 rounded-[2rem] shadow-lg shadow-pink-200/50 h-full flex flex-col justify-center">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-lg">Manzil</h4>
                      <p className="text-slate-600 mt-1 text-sm">Navoiy shahri</p>
                      <a href="https://maps.app.goo.gl/BKeNgG1vpRXCC86w6" target="_blank" rel="noreferrer" className="text-pink-600 hover:text-pink-700 font-medium text-sm underline underline-offset-4 inline-block mt-2 transition-colors">
                        Xaritada ko'rish
                      </a>
                    </div>
                  </div>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-200/50 to-transparent my-2"></div>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-lg">Ish vaqti</h4>
                      <p className="text-slate-600 mt-1">Har kuni: 09:00 - 20:00</p>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="aspect-square bg-white/50 backdrop-blur-md rounded-[2rem] overflow-hidden relative shadow-lg shadow-blue-200/50">
                  <InteractiveMap />
                </div>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* 6. Scroll 5: Instagram */}
        <Section id="instagram" className="py-20 text-center" watermarkPosition="bottom-right">
          <div className="max-w-5xl mx-auto backdrop-blur-xl bg-blue-100/90 border border-white/80 p-10 md:p-20 rounded-[2.5rem] md:rounded-[3rem] shadow-[0_16px_60px_-15px_rgba(59,130,246,0.15)] w-full">
             <Reveal>
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] rounded-2xl md:rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-xl shadow-pink-300/50">
                <Instagram className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-semibold mb-6 text-slate-800">
                Yangi kelganlarni kuzating
              </h2>
              <p className="text-lg md:text-xl text-slate-600 mb-10 font-light max-w-2xl mx-auto">
                Bizning Instagram sahifamizda har doim eng yangi kiyimlar, chegirmalar va mijozlarimizning fikrlarini topasiz.
              </p>
              <MagneticButton href="https://instagram.com/muslimashopnavoiyoptomn1" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-8 py-4 md:px-12 md:py-5 bg-gradient-to-r from-[#e6683c] to-[#bc1888] text-white rounded-full font-medium tracking-wide hover:opacity-90 transition-all shadow-xl shadow-pink-300/40 text-base md:text-lg group w-full sm:w-auto break-all sm:break-normal cursor-pointer">
                <Instagram className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform shrink-0" />
                <span className="truncate">@muslimashopnavoiyoptomn1</span>
              </MagneticButton>
            </Reveal>
          </div>
        </Section>

        {/* Footer */}
        <footer className="w-full bg-pink-100/90 backdrop-blur-2xl border-t border-white/60 py-12 px-6 md:px-12 relative z-10 shadow-[0_-8px_30px_rgba(0,0,0,0.05)]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="font-display font-semibold text-2xl tracking-tight text-slate-800 flex items-center gap-3">
              <img src="/logo.png" alt="" className="w-8 h-8 rounded-full shadow-sm" onError={(e) => e.currentTarget.style.display='none'} />
              Muslima Shop
            </div>
            <div className="flex items-center gap-8 text-sm font-medium tracking-wide uppercase text-slate-600">
              <a href="https://instagram.com/muslimashopnavoiyoptomn1" className="hover:text-pink-500 transition-colors">Instagram</a>
              <a href="#store" className="hover:text-pink-500 transition-colors">Manzil</a>
            </div>
            <p className="text-sm text-slate-500 font-light">
              © {new Date().getFullYear()} Muslima Shop.
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}
