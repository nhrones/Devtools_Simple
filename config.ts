import { Config, getConfig }from "./deps.ts";
import JSR from "./jsr.json" with { type: "json" };
export const VER = JSR.version

/** required configuration */
const requiredCfg = {
   "Serve": "",
   "Port": 80,
   "DEV": true,
   "HtmlName": "index.html"
} satisfies Config

// gets an existing config, or builds one
const cfg = getConfig('RUN', VER, Deno.args, requiredCfg)

export const DEV = cfg.DEV || false
export const folder = cfg.Serve || ""
export const htmlName = cfg.HtmlName
export const port = cfg.Port || 80
