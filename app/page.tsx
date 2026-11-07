import Image from "next/image";
import Link from "next/link";
import { Icon, Logo } from "@/components/Icon";
import { withActor, SYSTEM } from "@/lib/db/actor";
import { getConfig } from "@/lib/config";
import { currentSession } from "@/lib/auth/current";
import { inr } from "@/lib/format";

export const dynamic = "force-dynamic";

function ServiceIcon({ mark, tone }: { mark: string; tone: string }) {
  return <span className={`flex h-11 w-11 items-center justify-center rounded-2xl text-[18px] font-black ${tone}`}>{mark}</span>;
}

function ServiceItem({ mark, tone, title, href }: { mark: string; tone: string; title: string; href: string }) {
  return <Link href={href} className="group flex min-w-0 flex-1 flex-col items-center gap-3 rounded-2xl px-1 py-3 text-center transition hover:bg-[#F1F7D6] sm:px-2"><ServiceIcon mark={mark} tone={tone} /><span className="text-[12px] font-bold leading-[1.18] text-[#101828] group-hover:text-[#172C00] sm:text-[13px]">{title}</span></Link>;
}

function FeatureBanner({ tone, eyebrow, title, body, href, children }: { tone: string; eyebrow: string; title: string; body: string; href: string; children?: React.ReactNode }) {
  return <Link href={href} className={`group relative min-h-[172px] overflow-hidden rounded-[22px] p-5 text-[#07111F] transition hover:-translate-y-1 ${tone}`}><div className="relative z-10 max-w-[210px]"><p className="text-[10px] font-black uppercase tracking-[0.13em] opacity-60">{eyebrow}</p><h3 className="mt-2 text-[22px] font-[900] leading-[0.95] tracking-[-0.06em]">{title}</h3><p className="mt-3 max-w-[200px] text-[12px] font-semibold leading-[1.35] opacity-70">{body}</p><span className="mt-4 inline-flex text-[12px] font-black">Explore <span className="ml-1 transition group-hover:ml-2">→</span></span></div>{children}</Link>;
}

function StepMark({ number }: { number: number }) {
  return <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#B6FF00] text-[11px] font-black text-[#07111F] shadow-[0_0_18px_rgba(182,255,0,.35)]">0{number}</span>;
}

export default async function Landing() {
  const c = await withActor(SYSTEM, (tx) => getConfig(tx));
  const signedIn = Boolean(await currentSession());
  const apkHref = "/downloads/ascend.apk";
  const grad = c.ladder.find((r) => "action" in r)?.cycles;
  const cta = signedIn ? { href: "/home", label: "Open Ascend" } : { href: "/signup", label: "Get started" };
  const steps = [
    { n: 1, tag: "Minutes", t: "Connect", b: "Sign up with your email. Verify your identity. Share your bank statement so we can see how money comes in." },
    { n: 2, tag: "Instant", t: "Get your limit", b: `${c.limit_pct}% of your average monthly inflow, between ${inr(c.limit_min)} and ${inr(c.limit_max)}. Every rupee explained.` },
    { n: 3, tag: "Any UPI QR", t: "Pay with UPI", b: `Scan and pay. Clear the full bill by your due date: ${c.interest_on_time_pct}% interest, ${inr(c.late_fee)} late fee.` },
    { n: 4, tag: grad ? `${grad} cycles` : "Over time", t: "Build and climb", b: "On-time cycles build your record and grow your limit. Keep going and graduate to a real credit card." },
  ];
  const rows: [string, string, string, string, string][] = [
    ["Builds your own credit record", "No", "No: it builds your parent's", "Sometimes", "Yes, reported every cycle"],
    ["Interest if you pay on time", "None: it's your money", "0%, high if carried over", "Often high, plus fees", `${c.interest_on_time_pct}%`],
    ["Late fee", "Not applicable", "Yes", "Yes, can add up daily", `${inr(c.late_fee)}, with ${c.grace_days} grace days`],
    ["How you're approved", "Anyone with an account", "Your parent decides", "Often opaque", "Your cash flow, explained"],
    ["Privacy", "Private", "Parent sees every purchase", "Some ask for contacts", "Never contacts, photos or SMS"],
  ];

  return (
    <div id="ascend-home" className="min-h-screen overflow-hidden bg-[#F8F5EC] text-[#07111F]">
      <div className="bg-[#07111F] px-5 py-2 text-center text-[10px] font-black uppercase tracking-[0.14em] text-[#B6FF00]">A first credit line for students 18+ · Small, clear and built around your cash flow <a href={apkHref} download className="ml-2 inline-flex underline underline-offset-2 transition hover:text-white">Download now ↗</a></div>

      <header className="sticky top-0 z-30 border-b border-[#E7E4DB] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center gap-3 px-5 lg:px-8">
          <Logo />
          <span className="text-[18px] font-[900] tracking-[-0.06em]">Ascend</span>
          <span className="ml-2 hidden border-l border-[#D8D7D0] pl-3 text-[10px] font-black uppercase tracking-[0.13em] text-[#667085] lg:inline">Student credit, made clear</span>
          <nav className="ml-auto hidden items-center gap-7 text-[13px] font-bold text-[#101828] md:flex">
            <a className="transition hover:text-[#6D9F00]" href="#services">Explore Ascend</a>
            <a className="transition hover:text-[#6D9F00]" href="#how">How it works</a>
            <Link className="transition hover:text-[#6D9F00]" href="/how-we-decide">How we decide</Link>
            <Link className="transition hover:text-[#6D9F00]" href="/parents">For parents</Link>
          </nav>
          <Link href={signedIn ? "/home" : "/signup"} className="ml-auto hidden text-[13px] font-black text-[#0B4A3E] md:inline">{signedIn ? "Dashboard" : "Sign in"}</Link>
          <a href={apkHref} download aria-label="Download the Ascend Android app" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#07111F] text-[16px] font-black text-[#07111F] transition hover:-translate-y-px hover:bg-[#F1F7D6] sm:h-[43px] sm:w-auto sm:gap-2 sm:px-4 sm:text-[12px]"><span aria-hidden="true">↓</span><span className="hidden sm:inline">Download app</span></a>
          <Link href={cta.href} className="inline-flex min-h-[43px] items-center gap-2 rounded-full bg-[#07111F] px-5 text-[12px] font-black text-[#B6FF00] transition hover:-translate-y-px hover:bg-[#14243B]">{cta.label}<span aria-hidden="true">↗</span></Link>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D8D7D0] text-[14px] md:hidden">☰</span>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-[linear-gradient(180deg,#B6FF00_0%,#D9FF64_38%,#F8F5EC_100%)] px-5 pb-10 pt-7 lg:px-8 lg:pb-14 lg:pt-12">
          <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-white/25 blur-3xl" />
          <div className="pointer-events-none absolute -right-28 top-20 h-96 w-96 rounded-full bg-[#89D500]/40 blur-3xl" />
          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[1.6fr_.7fr]">
              <div id="services" className="rounded-[26px] bg-white p-6 shadow-[0_16px_35px_rgba(44,72,16,.1)] sm:p-8 lg:p-9">
                <div className="flex items-start justify-between gap-5"><div><p className="text-[11px] font-black uppercase tracking-[0.15em] text-[#6D9F00]">Your Ascend services</p><h1 className="mt-2 text-[32px] font-[900] leading-[0.95] tracking-[-0.07em] sm:text-[43px]">Build your credit<br />before you need it</h1></div><span className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-[#07111F] text-[20px] text-[#B6FF00] sm:flex">↗</span></div>
                <p className="mt-4 max-w-xl text-[14px] leading-[1.55] text-[#667085]">A small UPI credit line of <strong className="text-[#07111F]">{inr(c.limit_min)}–{inr(c.limit_max)}</strong>. Pay in full each cycle and it costs nothing.</p>
                <div className="mt-8 grid grid-cols-3 gap-2 border-t border-[#ECEBE5] pt-5 sm:grid-cols-6"><ServiceItem mark="₹" tone="bg-[#EAF7B9] text-[#5E8A00]" title="Get your limit" href={cta.href} /><ServiceItem mark="↗" tone="bg-[#D8FFF3] text-[#008F77]" title="Pay with UPI" href="#how" /><ServiceItem mark="✓" tone="bg-[#EEE4FF] text-[#7A3EC8]" title="Check eligibility" href="/how-we-decide" /><ServiceItem mark="+" tone="bg-[#FFE3B9] text-[#C45B00]" title="Build and climb" href="#how" /><ServiceItem mark="▣" tone="bg-[#DDEBFF] text-[#2364C4]" title="See your record" href="/home" /><ServiceItem mark="•••" tone="bg-[#FFE1F0] text-[#C83A79]" title="View all steps" href="#how" /></div>
              </div>
              <div className="relative min-h-[330px] overflow-hidden rounded-[26px] bg-[#07111F] p-6 text-white shadow-[0_16px_35px_rgba(44,72,16,.16)] sm:p-8"><div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[28px] border-[#B6FF00]/20" /><div className="absolute -bottom-28 -left-12 h-64 w-64 rounded-full bg-[#6C8DFF]/25 blur-2xl" /><div className="relative flex h-full flex-col justify-between"><div><p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#B6FF00]">Start your first credit story</p><h2 className="mt-4 max-w-[270px] text-[37px] font-[900] leading-[0.9] tracking-[-0.07em]">Your next step is smaller than you think</h2></div><div><p className="text-[14px] leading-[1.5] text-white/65">Start at {inr(c.limit_min)}–{inr(c.limit_max)}. Grow with every on-time cycle.</p><div className="mt-5 flex flex-wrap gap-3"><Link href={cta.href} className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#B6FF00] px-5 text-[13px] font-black text-[#07111F]">{cta.label}<span>↗</span></Link><a href={apkHref} download className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-white/35 px-5 text-[13px] font-black text-white transition hover:border-[#B6FF00] hover:text-[#B6FF00]">Download now<span>↓</span></a></div></div></div></div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2"><Link href={cta.href} className="flex items-center justify-between rounded-[18px] bg-white px-5 py-4 shadow-[0_8px_20px_rgba(44,72,16,.07)] transition hover:-translate-y-0.5"><span className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF7B9] text-[20px] text-[#5E8A00]">₹</span><span><strong className="block text-[17px] font-black">Need your first credit line?</strong><span className="block text-[13px] text-[#667085]">Check your starting limit in a few steps</span></span></span><span className="rounded-full border border-[#6D9F00] px-4 py-2 text-[12px] font-black text-[#5E8A00]">Start now →</span></Link><Link href="/parents" className="flex items-center justify-between rounded-[18px] bg-white px-5 py-4 shadow-[0_8px_20px_rgba(44,72,16,.07)] transition hover:-translate-y-0.5"><span className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFE3B9] text-[20px] text-[#C45B00]">⌂</span><span><strong className="block text-[17px] font-black">Want to understand the safe version?</strong><span className="block text-[13px] text-[#667085]">Read the guide made for parents</span></span></span><span className="rounded-full border border-[#C45B00] px-4 py-2 text-[12px] font-black text-[#C45B00]">Read now →</span></Link></div>
          </div>
        </section>

        <section id="features" className="bg-[#F8F5EC] px-5 pb-20 lg:px-8 lg:pb-28"><div className="mx-auto max-w-7xl"><div className="grid gap-4 md:grid-cols-3"><FeatureBanner tone="bg-[linear-gradient(135deg,#B6FF00,#E4FF84)]" eyebrow="On-time is powerful" title="Pay on time, grow your limit" body="Every clear cycle helps build a credit record that is yours." href="#how"><span className="absolute -bottom-10 -right-4 text-[110px] font-black leading-none text-black/10">↗</span></FeatureBanner><FeatureBanner tone="bg-[linear-gradient(135deg,#BBA0FF,#E9DFFF)]" eyebrow="No mystery" title="Know exactly how we decide" body="Cash flow, KYC and clear reasons. No opaque score wall." href="/how-we-decide"><span className="absolute -bottom-7 -right-2 text-[100px] font-black leading-none text-white/40">?</span></FeatureBanner><FeatureBanner tone="bg-[linear-gradient(135deg,#36F1D0,#B7FFF4)]" eyebrow="Stay private" title="No contacts, photos or SMS" body="Your money story stays yours. Built for students, not surveillance." href="/parents"><span className="absolute -bottom-9 -right-2 text-[105px] font-black leading-none text-black/10">◉</span></FeatureBanner></div></div></section>

        <section id="how" className="bg-white px-5 py-20 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-[11px] font-black uppercase tracking-[0.17em] text-[#6D9F00]">How it works</p><h2 className="mt-3 text-[43px] font-[900] leading-[0.94] tracking-[-0.07em] sm:text-[61px]">Simple by design</h2></div><p className="max-w-sm text-[15px] leading-relaxed text-[#667085]">A practical path from first sign-up to a credit record that is yours.</p></div><ol className="mt-11 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{steps.map((s) => <li key={s.n} className="min-h-[260px] rounded-2xl border border-[#E5E8DE] bg-[#F9FCF1] p-6 transition hover:-translate-y-1 hover:border-[#B6FF00] hover:shadow-[0_10px_25px_rgba(98,137,0,.1)] lg:p-7"><div className="flex items-center justify-between"><StepMark number={s.n} /><span className="text-[10px] font-black uppercase tracking-[0.1em] text-[#667085]">{s.tag}</span></div><h3 className="mt-11 text-[24px] font-[900] tracking-[-0.05em]">{s.t}</h3><p className="mt-3 text-[14px] leading-[1.65] text-[#667085]">{s.b}</p></li>)}</ol></div></section>

        <section id="story" className="relative min-h-[560px] overflow-hidden bg-[#07111F] text-white"><Image src="/media/ascend-lifestyle-editorial.png" alt="Students sharing a transparent first step with Ascend" fill className="object-cover object-center opacity-75" sizes="100vw" /><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,31,.25)_0%,rgba(7,17,31,.68)_58%,rgba(7,17,31,.96)_100%)]" /><div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col items-start justify-end gap-10 px-5 py-16 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-24"><div className="max-w-[520px]"><p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#B6FF00]">The honest version</p><h2 className="mt-5 text-[48px] font-[900] leading-[0.92] tracking-[-0.075em] sm:text-[68px]">Your limit grows when you pay on time</h2><p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/70">Not when you ask. Not because someone else co-signs. A small UPI line, reported every cycle, with the exact reason behind every decision.</p></div><div className="w-full max-w-[350px] rounded-2xl border border-[#B6FF00]/35 bg-[#07111F]/80 p-5 backdrop-blur-[8px] sm:p-6"><p className="text-[11px] font-black uppercase tracking-[0.15em] text-[#B6FF00]">How we decide</p><p className="mt-3 text-[16px] font-black">Two checks. No mystery.</p><p className="mt-2 text-[13px] leading-relaxed text-white/65">KYC and {c.min_age}+ → no active unpaid loan → at least {inr(c.min_inflow)} a month coming in, {c.min_history_months}+ months of history, no bounce in {c.bounce_lookback_days} days.</p><Link href="/how-we-decide" className="mt-5 inline-flex text-[12px] font-black uppercase tracking-[0.1em] text-[#B6FF00] underline underline-offset-4">See the full decision flow ↗</Link></div></div></section>

        <section id="comparison" className="bg-[#F8F5EC] px-5 py-20 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><div><p className="text-[11px] font-black uppercase tracking-[0.17em] text-[#6D9F00]">The honest comparison</p><h2 className="mt-4 text-[42px] font-[900] leading-[0.94] tracking-[-0.07em] sm:text-[60px]">Not a shortcut<br /><span className="text-[#98A2B3]">A first step</span></h2></div><p className="max-w-md text-[15px] leading-relaxed text-[#667085]">Every option has a place; only one builds your own record safely. Ascend is designed for the moment before a traditional credit card makes sense.</p></div><div className="mt-10 overflow-x-auto rounded-2xl border border-[#E5E8DE] bg-white shadow-[0_8px_25px_rgba(31,55,90,.04)]"><table className="w-full min-w-[720px] text-left text-[13px]"><thead><tr className="border-b border-[#E7EDF5] text-[11px] font-black uppercase tracking-[0.08em] text-[#667085]"><th className="p-5" /><th className="p-5">Debit card</th><th className="p-5">Parent&apos;s card</th><th className="p-5">Loan apps</th><th className="bg-[#07111F] p-5 text-[#B6FF00]">Ascend</th></tr></thead><tbody>{rows.map((r) => <tr key={r[0]} className="border-b border-[#E7EDF5] last:border-0"><th className="p-5 font-black">{r[0]}</th><td className="p-5 text-[#667085]">{r[1]}</td><td className="p-5 text-[#667085]">{r[2]}</td><td className="p-5 text-[#667085]">{r[3]}</td><td className="bg-[#F1F7D6] p-5 font-black text-[#426300]">{r[4]}</td></tr>)}</tbody></table></div></div></section>

        <section id="guides" className="grid bg-white lg:grid-cols-2"><div className="bg-[#07111F] p-8 text-white sm:p-12"><p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#B6FF00]">How we decide</p><h3 className="mt-4 text-[32px] font-[900] leading-[0.95] tracking-[-0.06em]">Two checks<br />No mystery</h3><p className="mt-5 max-w-lg text-[14px] leading-relaxed text-white/60">Not ready yet? You get a Builder path with the exact reason and a re-check date. No dead ends.</p><Link href="/how-we-decide" className="mt-7 inline-flex text-[13px] font-black text-[#B6FF00] underline underline-offset-4">See the full decision flow ↗</Link></div><div className="bg-[#B6FF00] p-8 text-[#07111F] sm:p-12"><p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#426300]">For parents</p><h3 className="mt-4 text-[32px] font-[900] leading-[0.95] tracking-[-0.06em]">Small limits<br />Zero surprises</h3><p className="mt-5 max-w-lg text-[14px] leading-relaxed text-[#426300]">The limit is {c.limit_pct}% of what lands in their account. If they&apos;re late, spends pause; the fee is {inr(c.late_fee)}, and we never contact family. Read it in English or हिंदी.</p><Link href="/parents" className="mt-7 inline-flex text-[13px] font-black text-[#07111F] underline underline-offset-4">Read the parent guide ↗</Link></div></section>

        <section id="start" className="bg-[#07111F] px-5 py-20 text-white lg:px-8 lg:py-24"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row md:items-end"><div><p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#B6FF00]">Ready when you are</p><h2 className="mt-4 max-w-3xl text-[48px] font-[900] leading-[0.92] tracking-[-0.075em] sm:text-[72px]">Start with {inr(c.limit_min)}–{inr(c.limit_max)}</h2></div><div><p className="max-w-sm text-[15px] leading-relaxed text-white/55">Your limit grows when you pay on time, not when you ask.</p><Link href={cta.href} className="mt-8 inline-flex min-h-[50px] items-center gap-2 rounded-full bg-[#B6FF00] px-7 text-[14px] font-black text-[#07111F] transition hover:-translate-y-px hover:bg-[#D0FF55]">{cta.label}<span>↗</span></Link></div></div></section>
      </main>

      <footer className="flex flex-col gap-3 bg-[#050A13] px-5 py-8 text-[12px] text-white/45 sm:flex-row sm:items-center sm:justify-between lg:px-8"><p>Ascend · a CaseBlitz 2026 prototype. {c.partner_bank_name} is a fictional lender used for this demo.</p><p className="flex flex-wrap items-center gap-3"><Link href="/test-merchant" className="underline underline-offset-2">Test merchant (sandbox)</Link><span>Grievances: Settings · RBI escalation after {c.grievance_escalation_days} days</span><Icon name="shield" size={14} /></p></footer>
    </div>
  );
}
