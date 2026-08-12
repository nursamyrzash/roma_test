import { getClientConfig } from "@/lib/getClientConfig";
import { MenuList } from "@/components/sections/MenuList";

export default function MenuPage() {
  const config = getClientConfig();
  return <MenuList config={config} />;
}
