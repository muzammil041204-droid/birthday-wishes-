import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ChevronDown, ChevronLeft, ChevronRight, Heart, ImagePlus, Maximize2, Music2, Pause, Sparkles, Volume2, VolumeX, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import moonlitLake from "@/assets/moonlit-lily-lake.jpg";
import purpleAsset from "@/assets/nilafer-purple.jpg.asset.json";
import filmAsset from "@/assets/nilafer-film.jpg.asset.json";
import rosesAsset from "@/assets/nilafer-roses.jpg.asset.json";
import mountainAsset from "@/assets/nilafer-mountains.jpg.asset.json";

const BIRTHDAY = "2027-05-24T00:00:00+05:30"; // Change Nilafer's birthday here.

const qualities = [
  ["Your Kindness", "The quiet way you care makes the world gentler for everyone around you."],
  ["Your Smile", "It carries its own light — warm, honest, and impossible to forget."],
  ["Your Strength", "You meet life with a courage more beautiful than you know."],
  ["Your Dreams", "The way you believe in tomorrow makes every possibility feel closer."],
  ["The Way You Care", "You remember the little things, and somehow they become everything."],
  ["The Happiness You Bring", "Ordinary moments feel like memories whenever you are near."],
] as const;

const initialPhotos = [
  { src: purpleAsset.url, alt: "Nilafer in a beautiful purple dress", caption: "Grace in every step" },
  { src: filmAsset.url, alt: "A monochrome film portrait of Nilafer", caption: "Quiet moments, forever held" },
  { src: rosesAsset.url, alt: "Nilafer holding white roses", caption: "A heart as lovely as a flower" },
  { src: mountainAsset.url, alt: "Nilafer in the mountain sunlight", caption: "Sunlight found its favorite face" },
];

const timeline = [
  ["The Day We Met", "Some days pass quietly. That day became the beginning of something unforgettable."],
  ["First Conversation", "Words became comfort, and minutes began to feel too short."],
  ["First Laugh Together", "A sound I did not know would become one of my favorite things."],
  ["Favorite Memory", "Not a grand moment — simply us, being completely ourselves."],
  ["Unforgettable Moments", "A constellation of little memories I will always keep close."],
  ["Today", "Celebrating the beautiful soul who makes every chapter brighter."],
] as const;

const reasons = ["Your laugh", "Your kindness", "Your determination", "Your beautiful personality", "Your honest heart", "Your quiet courage", "The way you listen", "Your playful side", "Your thoughtful words", "Your graceful spirit", "How deeply you care", "Simply being you"];
const lilies = [
  ["Kindness", "Your kindness leaves every heart softer than you found it."],
  ["Courage", "You carry courage quietly, even on the days nobody sees."],
  ["Loyalty", "Your presence feels constant, safe, and true."],
  ["Happiness", "You turn the smallest moments into something worth remembering."],
  ["Compassion", "You understand hearts without asking them to explain."],
  ["Beauty", "A beauty that begins within and shines through everything you do."],
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Nilafer — A Moonlit Love Letter" },
      { name: "description", content: "A magical blue water lily birthday garden created with love for Nilafer." },
      { property: "og:title", content: "Happy Birthday, Nilafer" },
      { property: "og:description", content: "Some flowers bloom in gardens. Some bloom in hearts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BirthdayExperience,
});

function BirthdayExperience() {
  const [loaded, setLoaded] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  const toggleMusic = useCallback(() => {
    if (musicOn && audioRef.current) {
      void audioRef.current.close();
      audioRef.current = null;
      setMusicOn(false);
      return;
    }
    const AudioContextClass = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const gain = context.createGain();
    gain.gain.value = 0.018;
    gain.connect(context.destination);
    [174.61, 220, 261.63].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const noteGain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      noteGain.gain.value = index === 0 ? 0.45 : 0.18;
      oscillator.connect(noteGain).connect(gain);
      oscillator.start();
    });
    audioRef.current = context;
    setMusicOn(true);
  }, [musicOn]);

  return (
    <main className="birthday-shell">
      <AnimatePresence>{!loaded && <LoadingScreen />}</AnimatePresence>
      <Button variant="moonlit" size="icon" className="music-toggle" onClick={toggleMusic} aria-label={musicOn ? "Turn ambient music off" : "Turn ambient music on"} title={musicOn ? "Mute moonlight melody" : "Play moonlight melody"}>
        {musicOn ? <Volume2 /> : <VolumeX />}
      </Button>
      <Hero musicOn={musicOn} toggleMusic={toggleMusic} />
      <Qualities />
      <Gallery />
      <Timeline />
      <LilyGarden />
      <Letter />
      <Reasons />
      <Wishes />
      <Surprise />
      <Finale />
    </main>
  );
}

function LoadingScreen() {
  return (
    <motion.div className="loading-screen" exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
      <Lily size="lg" />
      <p>Nilafer</p><span>A blue water lily is about to bloom</span>
    </motion.div>
  );
}

function Hero({ musicOn, toggleMusic }: { musicOn: boolean; toggleMusic: () => void }) {
  return (
    <section className="hero" id="top">
      <img src={moonlitLake} width={1920} height={1080} alt="Blue water lilies beneath a moonlit sky" className="hero-bg" />
      <div className="hero-veil" />
      <Stars count={34} />
      <Petals />
      <motion.div className="hero-content" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 1.2 }}>
        <span className="eyebrow">A moonlit celebration for a rare soul</span>
        <h1><em>Happy Birthday,</em> Nilafer</h1>
        <p>Like the rare blue water lily that blooms with grace and beauty, you make every moment brighter simply by being yourself.</p>
        <Countdown />
        <Button variant="moonlit" onClick={toggleMusic} className="hero-music">
          {musicOn ? <Pause /> : <Music2 />} {musicOn ? "Pause the melody" : "Play the moonlight melody"}
        </Button>
      </motion.div>
      <a href="#special" className="scroll-cue" aria-label="Scroll to the story"><span>Enter the garden</span><ChevronDown /></a>
    </section>
  );
}

function Countdown() {
  const calculate = () => {
    const distance = Math.max(0, new Date(BIRTHDAY).getTime() - Date.now());
    return { days: Math.floor(distance / 86400000), hours: Math.floor(distance / 3600000) % 24, mins: Math.floor(distance / 60000) % 60, secs: Math.floor(distance / 1000) % 60 };
  };
  const [time, setTime] = useState(calculate);
  useEffect(() => { const id = window.setInterval(() => setTime(calculate()), 1000); return () => window.clearInterval(id); }, []);
  return <div className="countdown" aria-label="Countdown to Nilafer's birthday">{Object.entries(time).map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}</div>;
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, margin: "-12%" });
  return <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 36 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.85 }}>{children}</motion.div>;
}

function SectionHeading({ kicker, title, copy }: { kicker: string; title: string; copy?: string }) {
  return <Reveal className="section-heading"><span className="eyebrow">{kicker}</span><h2>{title}</h2>{copy && <p>{copy}</p>}<span className="heading-flower">✦</span></Reveal>;
}

function Qualities() {
  const [open, setOpen] = useState<number | null>(null);
  return <section className="section qualities-section" id="special"><SectionHeading kicker="Six little truths" title="Why You’re So Special" />
    <div className="qualities-layout">
      <div className="qualities-grid">{qualities.map(([title, body], index) => <motion.button key={title} className={`quality-card ${open === index ? "is-open" : ""}`} onClick={() => setOpen(open === index ? null : index)} whileHover={{ y: -5 }}><span>0{index + 1}</span><h3>{title}</h3><AnimatePresence>{open === index && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>{body}</motion.p>}</AnimatePresence><small>{open === index ? "Close" : "Open"}</small></motion.button>)}</div>
      <Reveal className="featured-quote"><span>“</span><blockquote>You are not special because you are perfect. You are special because no one else in this world is you.</blockquote><Lily /></Reveal>
    </div>
  </section>;
}

function Gallery() {
  const [uploads, setUploads] = useState<typeof initialPhotos>([]);
  const [active, setActive] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState(0);
  const photos = useMemo(() => [...initialPhotos, ...uploads], [uploads]);
  const activePhoto = active === null ? undefined : photos[active];
  const move = useCallback((direction: number) => setActive(current => current === null ? null : (current + direction + photos.length) % photos.length), [photos.length]);
  useEffect(() => {
    const key = (event: KeyboardEvent) => { if (active === null) return; if (event.key === "Escape") setActive(null); if (event.key === "ArrowRight") move(1); if (event.key === "ArrowLeft") move(-1); };
    window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key);
  }, [active, move]);
  const upload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    setUploads(current => [...current, ...files.map((file, i) => ({ src: URL.createObjectURL(file), alt: file.name, caption: `A new memory ${current.length + i + 1}` }))]);
  };
  return <section className="section gallery-section"><SectionHeading kicker="A gallery of us" title="Moments That Became Memories" copy="Every photograph is a small door back to a beautiful moment." />
    <div className="gallery-actions"><label className="upload-control"><ImagePlus /> Add your memories<input type="file" accept="image/*" multiple onChange={upload} /></label></div>
    <div className="masonry">{photos.map((photo, index) => <Reveal key={`${photo.src}-${index}`} className="gallery-item"><button onClick={() => setActive(index)} aria-label={`View ${photo.caption}`}><img src={photo.src} alt={photo.alt} loading="lazy" /><span>{photo.caption}<Maximize2 /></span></button></Reveal>)}</div>
    <AnimatePresence>{activePhoto && <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)} onTouchStart={e => setTouchStart(e.touches[0]?.clientX ?? 0)} onTouchEnd={e => { const end = e.changedTouches[0]?.clientX ?? 0; if (Math.abs(end - touchStart) > 45) move(end < touchStart ? 1 : -1); }}>
      <Button variant="moonlit" size="icon" className="lightbox-close" onClick={() => setActive(null)} aria-label="Close image"><X /></Button>
      <Button variant="moonlit" size="icon" className="lightbox-prev" onClick={e => { e.stopPropagation(); move(-1); }} aria-label="Previous image"><ChevronLeft /></Button>
      <motion.figure key={activePhoto.src} initial={{ scale: .94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={e => e.stopPropagation()}><img src={activePhoto.src} alt={activePhoto.alt} /><figcaption>{activePhoto.caption}</figcaption></motion.figure>
      <Button variant="moonlit" size="icon" className="lightbox-next" onClick={e => { e.stopPropagation(); move(1); }} aria-label="Next image"><ChevronRight /></Button>
    </motion.div>}</AnimatePresence>
  </section>;
}

function Timeline() {
  const [attachments, setAttachments] = useState<Record<number, string>>({});
  const add = (index: number, event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (file) setAttachments(a => ({ ...a, [index]: URL.createObjectURL(file) })); };
  return <section className="section timeline-section"><SectionHeading kicker="Written in starlight" title="Our Story, Still Unfolding" />
    <div className="timeline">{timeline.map(([title, text], index) => <Reveal key={title} className={`timeline-row ${index % 2 ? "timeline-right" : ""}`}><div className="timeline-dot"><span /></div><article>{attachments[index] && <img src={attachments[index]} alt={`Memory for ${title}`} />}<span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p><label><ImagePlus /> Add a photo<input type="file" accept="image/*" onChange={e => add(index, e)} /></label></article></Reveal>)}</div>
  </section>;
}

function LilyGarden() {
  const [open, setOpen] = useState<number | null>(null);
  const openLily = open === null ? undefined : lilies[open];
  return <section className="lily-garden"><Stars count={26} /><SectionHeading kicker="Touch a flower" title="The Garden You Grew" copy="Every lily carries something beautiful that reminds me of you." />
    <div className="lily-pond">{lilies.map(([name, message], index) => <motion.button key={name} className={`lily-memory lily-${index + 1}`} onClick={() => setOpen(open === index ? null : index)} initial={{ scale: .25, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, amount: .8 }} transition={{ delay: index * .12, type: "spring" }} aria-label={`Open ${name} lily`}><Lily size={index % 3 === 0 ? "lg" : "md"} /><span>{name}</span></motion.button>)}</div>
    <AnimatePresence>{openLily && <motion.div className="lily-message" initial={{ opacity: 0, scale: .85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .9 }}><Button variant="ghost" size="icon" onClick={() => setOpen(null)} aria-label="Close message"><X /></Button><Lily /><h3>{openLily[0]}</h3><p>{openLily[1]}</p></motion.div>}</AnimatePresence>
  </section>;
}

function Letter() {
  const [open, setOpen] = useState(false);
  return <section className="section letter-section"><SectionHeading kicker="Words meant only for you" title="A Letter For You" />
    <Reveal className={`envelope-wrap ${open ? "is-open" : ""}`}><button className="envelope" onClick={() => setOpen(true)} aria-label="Open the letter"><div className="envelope-back" /><div className="letter-paper"><span>My dearest Nilafer,</span><p>On your birthday, I want you to know how deeply your presence is cherished. You bring a softness to difficult days and a light to ordinary ones.</p><p>May this year carry you closer to every dream your heart has held quietly. May you always remember how rare, remarkable, and loved you truly are.</p><strong>Forever grateful for you.</strong></div><div className="envelope-front" /><div className="seal"><Heart /></div></button>{!open && <p className="tap-letter">Tap to open your letter</p>}</Reveal>
  </section>;
}

function Reasons() {
  const [open, setOpen] = useState<number[]>([]);
  const toggle = (i: number) => setOpen(list => list.includes(i) ? list.filter(x => x !== i) : [...list, i]);
  return <section className="section reasons-section"><SectionHeading kicker="Twelve little reminders" title="Reasons I Adore You" />
    <div className="reasons-grid">{reasons.map((reason, i) => <motion.button key={reason} className={`reason-card ${open.includes(i) ? "is-open" : ""}`} onClick={() => toggle(i)} whileHover={{ rotate: i % 2 ? 1.5 : -1.5, y: -6 }}><span>{String(i + 1).padStart(2, "0")}</span><Heart /><p>{open.includes(i) ? reason : "Open me"}</p></motion.button>)}</div>
  </section>;
}

function Wishes() {
  const wishes = ["May every dream you whisper to the moon find its way to you.", "May your smile always return to you in a thousand beautiful ways.", "May this chapter be gentle, brave, and full of wonder.", "May you always feel as loved as you make others feel."];
  return <section className="section wishes-section"><SectionHeading kicker="A sky full of wishes" title="Birthday Wishes Wall" />
    <div className="wishes-wall">{wishes.map((wish, i) => <motion.article key={wish} className="wish-polaroid" initial={{ opacity: 0, y: 30, rotate: i % 2 ? 3 : -3 }} whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 2 : -2 }} viewport={{ once: true }} transition={{ delay: i * .1 }}><div><Sparkles /></div><p>{wish}</p><span>For Nilafer, with love</span></motion.article>)}</div>
  </section>;
}

function Surprise() {
  const [open, setOpen] = useState(false);
  return <section className={`surprise-section ${open ? "is-open" : ""}`}><Stars count={open ? 70 : 12} />{open && <div className="surprise-blooms">{Array.from({ length: 14 }, (_, i) => <motion.div key={i} initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: i * .07, type: "spring" }}><Lily size={i % 4 === 0 ? "lg" : "sm"} /></motion.div>)}</div>}
    <AnimatePresence mode="wait">{!open ? <motion.div key="closed" exit={{ opacity: 0, scale: .9 }}><span className="eyebrow">One last secret</span><Button variant="moonlit" size="lg" onClick={() => setOpen(true)}><Sparkles /> Open Your Surprise</Button></motion.div> : <motion.div key="open" className="surprise-message" initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .5, duration: 1 }}><Lily size="lg" /><h2>Happy Birthday, Nilafer</h2><p>Thank you for being one of the most beautiful chapters of my life.</p></motion.div>}</AnimatePresence>
  </section>;
}

function Finale() {
  return <section className="finale"><img src={moonlitLake} width={1920} height={1080} alt="A moon reflected over a garden of blue lilies" loading="lazy" /><div className="finale-overlay" /><Stars count={38} /><Reveal className="finale-copy"><Lily size="lg" /><p>“Some flowers bloom in gardens.<br />Some bloom in hearts.<br />You have done both.”</p><h2>Happy Birthday, Nilafer</h2><strong>My kanmani · My love · My Bujji <Heart /></strong></Reveal><span className="made-with">Made beneath the moon, with all my heart</span></section>;
}

function Lily({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  return <span className={`lily lily-${size}`} aria-hidden="true"><i /><i /><i /><i /><i /><i /><b /></span>;
}

function Stars({ count }: { count: number }) {
  return <div className="stars" aria-hidden="true">{Array.from({ length: count }, (_, i) => <i key={i} style={{ "--x": `${(i * 37) % 101}%`, "--y": `${(i * 61) % 97}%`, "--d": `${1.5 + (i % 6) * .5}s`, "--s": `${1 + (i % 3)}px` } as React.CSSProperties} />)}</div>;
}

function Petals() {
  return <div className="petals" aria-hidden="true">{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ "--x": `${(i * 19) % 100}%`, "--delay": `${i * -.8}s`, "--duration": `${9 + (i % 5)}s` } as React.CSSProperties} />)}</div>;
}