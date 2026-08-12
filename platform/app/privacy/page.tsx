import { getClientConfig } from "@/lib/getClientConfig";
import { LegalPage } from "@/components/sections/LegalPage";

export default function PrivacyPage() {
  const config = getClientConfig();
  return <LegalPage titleKey="footer.privacy" content={config.legal.privacyPolicyContent} />;
}
