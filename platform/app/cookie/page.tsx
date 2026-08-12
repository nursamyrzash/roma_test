import { getClientConfig } from "@/lib/getClientConfig";
import { LegalPage } from "@/components/sections/LegalPage";

export default function CookiePage() {
  const config = getClientConfig();
  return <LegalPage titleKey="footer.cookie" content={config.legal.cookiePolicyContent} />;
}
