
import { join, serveFile } from "./deps.ts";
import { DEV, folder, port, htmlName } from './config.ts'
import { openWebsite } from "./browser.ts"


// Start the server -> routes all requests to the handler below
Deno.serve({ port: port }, handleRequest )

// Handle all HTTP requests
async function handleRequest(request: Request): Promise<Response> {

   // Get and adjust the requested path name
   let { pathname } = new URL(request.url);
   if (pathname === '/') pathname = '/' + htmlName;
   // determin the requested full-path
   const fullPath = (folder.length > 0)
      ? join(Deno.cwd() + '\\' + folder + pathname)
      : join(Deno.cwd() + '.' + pathname);

   if (DEV) console.log(`Serving ${fullPath}`); // show what was requested
   // find the file -> get the content -> return it in a response
   const resp = await serveFile(request, fullPath)
   resp.headers.append("Cache-Control", "no-store"),
   resp.headers.append("Access-Control-Allow-Origin", "*")
   return resp  
}

// Trigger browser start
await openWebsite(`http://localhost:${port}`)
