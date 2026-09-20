import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ChevronDown, ChevronLeft, ChevronRight, Heart, Maximize2, Sparkles, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import moonlitLake from "@/assets/moonlit-lily-lake.jpg";
import purpleAsset from "@/assets/nilafer-purple.jpg.asset.json";
import filmAsset from "@/assets/nilafer-film.jpg.asset.json";
import rosesAsset from "@/assets/nilafer-roses.jpg.asset.json";
import mountainAsset from "@/assets/nilafer-mountains.jpg.asset.json";

const qualities = [
  ["Your Kindness", "The quiet way you care makes the world gentler for everyone around you."],
  ["Your Smile", "It carries its own light — warm, honest, and impossible to forget."],
  ["Your Strength", "You meet life with a courage more beautiful than you know."],
  ["Your Eyes", "In your eyes, I find a whole universe — soft as moonlight, deep as the night, and beautiful enough to get lost in forever."],
  ["The Way You Care", "You remember the little things, and somehow they become everything."],
  ["The Happiness You Bring", "Ordinary moments feel like memories whenever you are near."],
] as const;

const initialPhotos = [
  { src: purpleAsset.url, alt: "Nilafer in a beautiful purple dress", caption: "Grace in every step" },
  { src: filmAsset.url, alt: "A monochrome film portrait of Nilafer", caption: "Quiet moments, forever held" },
  { src: rosesAsset.url, alt: "Nilafer holding white roses", caption: "A heart as lovely as a flower" },
  { src: mountainAsset.url, alt: "Nilafer in the mountain sunlight", caption: "Sunlight found its favorite face" },
];

const loveVerses = [
  ["In Your Presence", "Even the moon seems to soften when you are near, as though the night itself has learned your tenderness."],
  ["In Your Eyes", "I see quiet constellations there — a thousand lovely places where my heart would gladly stay."],
  ["In Your Smile", "There is a kind of sunrise in your smile that turns even my darkest hours golden."],
  ["In Every Silence", "I do not always need words with you; sometimes love is simply the peace of knowing your heart is close."],
  ["Across Every Distance", "No road is long enough to make you feel far away, because my heart carries you wherever I go."],
  ["Always You", "If I could choose one soul in every lifetime, beneath every sky, it would still and always be you."],
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

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="birthday-shell">
      <AnimatePresence>{!loaded && <LoadingScreen />}</AnimatePresence>
      <Hero />
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

function Hero() {
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
      </motion.div>
      <a href="#special" className="scroll-cue" aria-label="Scroll to the story"><span>Enter the garden</span><ChevronDown /></a>
    </section>
  );
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
  const [active, setActive] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState(0);
  const photos = initialPhotos;
  const activePhoto = active === null ? undefined : photos[active];
  const move = useCallback((direction: number) => setActive(current => current === null ? null : (current + direction + photos.length) % photos.length), [photos.length]);
  useEffect(() => {
    const key = (event: KeyboardEvent) => { if (active === null) return; if (event.key === "Escape") setActive(null); if (event.key === "ArrowRight") move(1); if (event.key === "ArrowLeft") move(-1); };
    window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key);
  }, [active, move]);
  return <section className="section gallery-section"><SectionHeading kicker="A gallery of us" title="Moments That Became Memories" copy="Every photograph is a small door back to a beautiful moment." />
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
  return <section className="section timeline-section"><SectionHeading kicker="Love, written in moonlight" title="Words My Heart Keeps for You" />
    <div className="timeline">{loveVerses.map(([title, text], index) => <Reveal key={title} className={`timeline-row ${index % 2 ? "timeline-right" : ""}`}><div className="timeline-dot"><span /></div><article><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article></Reveal>)}</div>
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
    <Reveal className={`envelope-wrap ${open ? "is-open" : ""}`}><button className="envelope" onClick={() => setOpen(true)} aria-label="Open the letter"><div className="envelope-back" /><div className="letter-paper"><span>My baby 😚 Ye chello 😚 I love u sooo much 💙💗</span><p>Nee ye life la naa yethur paakatha oru gift nu thaan sollanum 💯 Nee yepo ye life la vanthiyo, apo lanthu yennaku happiness oo muliyam aah naraya naraya naraya kadachu eruku 😊😚</p><p>Inaiku oo 19th birthday — our first birthday together, and definitely not the last. Inum 60th varaikum eruku 😂😁</p><p>Naa apo apo oo kuda sanda podure, naa unnala love pannala nu ella — naa apo apo yethachu oru pressure la apudi pannire. But onu mathum niyabakam vechukoo... I will always love u, always. Ok vaa chello 🫂🫂🫂💙💋</p><p>I'm sooo blessed to have a beautiful girlfriend and an amazing wife like uu 🎊💋🫂</p><strong>With love, ur jaan 🤍</strong></div><div className="envelope-front" /><div className="seal"><Heart /></div></button>{!open && <p className="tap-letter">Tap to open your letter</p>}</Reveal>
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