import { getClientConfig } from "@/lib/getClientConfig";
import { ReservationForm } from "@/components/sections/ReservationForm";
import { WalkInNotice } from "@/components/sections/WalkInNotice";

export default function PrenotaPage() {
  const config = getClientConfig();
  return config.reservation.enabled ? (
    <ReservationForm config={config} />
  ) : (
    <WalkInNotice config={config} />
  );
}
