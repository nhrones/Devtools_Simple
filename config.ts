import { Config, getConfig }from "./deps.ts";
import JSR from "./jsr.json" with { type: "json" };
export const VER = JSR.version

if (Deno.args[0]) {
   // if args0 = -h or ?, show help then exit
   if (Deno.args[0] === '-h' || Deno.args[0] === '?') {
      console.log(`
   Simple Server Help --
   
   Usage:

   commandline args:

   arg[0]:
   -h or ? = this help
   if number = port number to use
   if string = folder to be served

   arg[1]:
   if arg[0] = folder then arg[1] (number) = port number to use
   if arg[0] = port number then arg[1] = (string) folder to be served

   This command uses/mutates the 'simple' entry in ./.vscode/dev.json
   dev.json:
   BuildTarget: "",
   Port: 80
   `);
      Deno.exit(0)
   }
}

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
