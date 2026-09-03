import type { RestaurantConfig } from "@/config/types";
import { osteriaDaMario } from "@/config/clients/osteria-da-mario";
import { tonnarello } from "@/config/clients/tonnarello";
import { ilCorallo } from "@/config/clients/il-corallo";

export const CLIENTS = {
  "osteria-da-mario": osteriaDaMario,
  tonnarello: tonnarello,
  "il-corallo": ilCorallo,
} satisfies Record<string, RestaurantConfig>;

export type ClientId = keyof typeof CLIENTS;
