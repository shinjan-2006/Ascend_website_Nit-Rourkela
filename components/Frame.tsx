import type { ReactNode } from "react";
import { AppBar, Stepper } from "./bits";

/** Responsive product shell: phone-width on small screens, full web canvas on desktop. */
export function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#E8E8E2] sm:py-6 md:bg-[#EEF1F6] md:py-0">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-paper sm:min-h-[calc(100vh-48px)] sm:overflow-hidden sm:rounded-[28px] sm:shadow-[0_30px_60px_-30px_rgba(10,10,10,0.35)] md:max-w-none md:rounded-none md:shadow-none md:[&>main]:mx-auto md:[&>main]:max-w-2xl md:[&>main]:px-8">
        {children}
      </div>
    </div>
  );
}

export const ONBOARD_STEPS = ["Profile", "Identity", "Enrolment", "Consent", "Bureau", "Cash flow", "Limit", "Ladder", "AutoPay"] as const;

export function OnboardFrame({
  title,
  step,
  back,
  children,
}: {
  title: string;
  step?: number;
  back?: string;
  children: ReactNode;
}) {
  return (
    <div className="onboard-shell">
      <MobileFrame>
        <AppBar title={title} mode="onboard" back={back} />
        {step && <Stepper step={step} total={ONBOARD_STEPS.length} label={ONBOARD_STEPS[step - 1]} />}
        <main className="flex flex-1 animate-asc-in flex-col gap-4 px-4 pb-6 pt-2 md:mx-auto md:max-w-2xl md:px-8 md:pb-12 md:pt-10">{children}</main>
      </MobileFrame>
    </div>
  );
}

export function Heading({ title, sub }: { title: string; sub?: ReactNode }) {
  return (
    <div>
      <h2 className="h-title">{title}</h2>
      {sub && <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{sub}</p>}
    </div>
  );
}
