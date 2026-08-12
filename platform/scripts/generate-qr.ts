/**
 * Usage: npm run qr <clientId>
 *
 * Generates the printable QR code for a client, pointing at their live
 * /menu page. Encodes the URL, never menu content — the QR never needs
 * regenerating when dishes/prices change, only if the domain itself
 * changes ("Il QR code resta sempre lo stesso").
 */
import path from "node:path";
import fs from "node:fs";
import QRCode from "qrcode";
import { CLIENTS, type ClientId } from "../config/clients";

async function main() {
  const clientId = process.argv[2] as ClientId | undefined;

  if (!clientId || !(clientId in CLIENTS)) {
    console.error(
      `Usage: npm run qr <clientId>\nAvailable clients: ${Object.keys(CLIENTS).join(", ")}`
    );
    process.exit(1);
  }

  const config = CLIENTS[clientId];
  const targetUrl = `${config.deployedUrl.replace(/\/$/, "")}/menu`;
  const outDir = path.resolve(__dirname, "..", "public", "clients", clientId);
  fs.mkdirSync(outDir, { recursive: true });

  const svgPath = path.join(outDir, "qr-menu.svg");
  const pngPath = path.join(outDir, "qr-menu.png");

  await QRCode.toFile(svgPath, targetUrl, { type: "svg", errorCorrectionLevel: "H", margin: 2 });
  await QRCode.toFile(pngPath, targetUrl, {
    type: "png",
    errorCorrectionLevel: "H",
    margin: 2,
    width: 1024,
  });

  console.log(`QR generated for "${clientId}" -> ${targetUrl}`);
  console.log(`  ${svgPath}`);
  console.log(`  ${pngPath}`);
}

main();
