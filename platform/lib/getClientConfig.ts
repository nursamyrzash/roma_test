import { CLIENTS, type ClientId } from "@/config/clients";
import type { RestaurantConfig } from "@/config/types";

/**
 * The single seam all restaurant data flows through. Every component reads
 * config via this function (never a client file directly) so that swapping
 * the resolution strategy later — hostname-based multi-tenancy, a CMS, a
 * database — is a change to this file alone.
 */
export function getClientConfig(): RestaurantConfig {
  const clientId = process.env.CLIENT_ID as ClientId | undefined;

  if (!clientId) {
    throw new Error(
      "CLIENT_ID environment variable is not set. Set it in .env.local (see .env.example) to one of: " +
        Object.keys(CLIENTS).join(", ")
    );
  }

  const config = CLIENTS[clientId];
  if (!config) {
    throw new Error(
      `Unknown CLIENT_ID "${clientId}". Available clients: ${Object.keys(CLIENTS).join(", ")}`
    );
  }

  return config;
}
