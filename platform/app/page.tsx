import { getClientConfig } from "@/lib/getClientConfig";
import { Hero } from "@/components/sections/Hero";
import { WhyUs } from "@/components/sections/WhyUs";
import { SignatureDishes } from "@/components/sections/SignatureDishes";
import { ReservationForm } from "@/components/sections/ReservationForm";
import { LocationSection } from "@/components/sections/LocationSection";
import { HoursTable } from "@/components/sections/HoursTable";
import { InstagramTeaser } from "@/components/sections/InstagramTeaser";
import { PremiumHome } from "@/components/sections/PremiumHome";

export default function Home() {
  const config = getClientConfig();

  if (config.premium) return <PremiumHome config={config} />;

  return (
    <>
      <Hero config={config} />
      <WhyUs config={config} />
      <SignatureDishes config={config} />
      {config.reservation.enabled && <ReservationForm config={config} />}
      <LocationSection config={config} />
      <HoursTable config={config} />
      <InstagramTeaser config={config} />
    </>
  );
}
