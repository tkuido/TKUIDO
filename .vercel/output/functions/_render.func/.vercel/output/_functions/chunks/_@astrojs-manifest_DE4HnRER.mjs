import 'cookie';
import 'kleur/colors';
import { parse } from 'devalue';
import { D as DEFAULT_404_COMPONENT } from './astro/server_DjDDY4Fk.mjs';
import 'clsx';
import { escape } from 'html-escaper';
import { compile } from 'path-to-regexp';

const ACTION_QUERY_PARAMS = {
  actionName: "_astroAction",
  actionPayload: "_astroActionPayload",
  actionRedirect: "_astroActionRedirect"
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
const statusToCodeMap = Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);
class ActionError extends Error {
  type = "AstroActionError";
  code = "INTERNAL_SERVER_ERROR";
  status = 500;
  constructor(params) {
    super(params.message);
    this.code = params.code;
    this.status = ActionError.codeToStatus(params.code);
    if (params.stack) {
      this.stack = params.stack;
    }
  }
  static codeToStatus(code) {
    return codeToStatusMap[code];
  }
  static statusToCode(status) {
    return statusToCodeMap[status] ?? "INTERNAL_SERVER_ERROR";
  }
  static fromJson(body) {
    if (isInputError(body)) {
      return new ActionInputError(body.issues);
    }
    if (isActionError(body)) {
      return new ActionError(body);
    }
    return new ActionError({
      code: "INTERNAL_SERVER_ERROR"
    });
  }
}
function isActionError(error) {
  return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionError";
}
function isInputError(error) {
  return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionInputError" && "issues" in error && Array.isArray(error.issues);
}
class ActionInputError extends ActionError {
  type = "AstroActionInputError";
  // We don't expose all ZodError properties.
  // Not all properties will serialize from server to client,
  // and we don't want to import the full ZodError object into the client.
  issues;
  fields;
  constructor(issues) {
    super({
      message: `Failed to validate: ${JSON.stringify(issues, null, 2)}`,
      code: "BAD_REQUEST"
    });
    this.issues = issues;
    this.fields = {};
    for (const issue of issues) {
      if (issue.path.length > 0) {
        const key = issue.path[0].toString();
        this.fields[key] ??= [];
        this.fields[key]?.push(issue.message);
      }
    }
  }
}
function getActionQueryString(name) {
  const searchParams = new URLSearchParams({ [ACTION_QUERY_PARAMS.actionName]: name });
  return `?${searchParams.toString()}`;
}
function deserializeActionResult(res) {
  if (res.type === "error") {
    return { error: ActionError.fromJson(JSON.parse(res.body)), data: void 0 };
  }
  if (res.type === "empty") {
    return { data: void 0, error: void 0 };
  }
  return {
    data: parse(res.body, {
      URL: (href) => new URL(href)
    }),
    error: void 0
  };
}

function template({
  title,
  pathname,
  statusCode = 404,
  tabTitle,
  body
}) {
  return `<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>${tabTitle}</title>
		<style>
			:root {
				--gray-10: hsl(258, 7%, 10%);
				--gray-20: hsl(258, 7%, 20%);
				--gray-30: hsl(258, 7%, 30%);
				--gray-40: hsl(258, 7%, 40%);
				--gray-50: hsl(258, 7%, 50%);
				--gray-60: hsl(258, 7%, 60%);
				--gray-70: hsl(258, 7%, 70%);
				--gray-80: hsl(258, 7%, 80%);
				--gray-90: hsl(258, 7%, 90%);
				--black: #13151A;
				--accent-light: #E0CCFA;
			}

			* {
				box-sizing: border-box;
			}

			html {
				background: var(--black);
				color-scheme: dark;
				accent-color: var(--accent-light);
			}

			body {
				background-color: var(--gray-10);
				color: var(--gray-80);
				font-family: ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace;
				line-height: 1.5;
				margin: 0;
			}

			a {
				color: var(--accent-light);
			}

			.center {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 100vh;
				width: 100vw;
			}

			h1 {
				margin-bottom: 8px;
				color: white;
				font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
				font-weight: 700;
				margin-top: 1rem;
				margin-bottom: 0;
			}

			.statusCode {
				color: var(--accent-light);
			}

			.astro-icon {
				height: 124px;
				width: 124px;
			}

			pre, code {
				padding: 2px 8px;
				background: rgba(0,0,0, 0.25);
				border: 1px solid rgba(255,255,255, 0.25);
				border-radius: 4px;
				font-size: 1.2em;
				margin-top: 0;
				max-width: 60em;
			}
		</style>
	</head>
	<body>
		<main class="center">
			<svg class="astro-icon" xmlns="http://www.w3.org/2000/svg" width="64" height="80" viewBox="0 0 64 80" fill="none"> <path d="M20.5253 67.6322C16.9291 64.3531 15.8793 57.4632 17.3776 52.4717C19.9755 55.6188 23.575 56.6157 27.3035 57.1784C33.0594 58.0468 38.7122 57.722 44.0592 55.0977C44.6709 54.7972 45.2362 54.3978 45.9045 53.9931C46.4062 55.4451 46.5368 56.9109 46.3616 58.4028C45.9355 62.0362 44.1228 64.8429 41.2397 66.9705C40.0868 67.8215 38.8669 68.5822 37.6762 69.3846C34.0181 71.8508 33.0285 74.7426 34.403 78.9491C34.4357 79.0516 34.4649 79.1541 34.5388 79.4042C32.6711 78.5705 31.3069 77.3565 30.2674 75.7604C29.1694 74.0757 28.6471 72.2121 28.6196 70.1957C28.6059 69.2144 28.6059 68.2244 28.4736 67.257C28.1506 64.8985 27.0406 63.8425 24.9496 63.7817C22.8036 63.7192 21.106 65.0426 20.6559 67.1268C20.6215 67.2865 20.5717 67.4446 20.5218 67.6304L20.5253 67.6322Z" fill="white"/> <path d="M20.5253 67.6322C16.9291 64.3531 15.8793 57.4632 17.3776 52.4717C19.9755 55.6188 23.575 56.6157 27.3035 57.1784C33.0594 58.0468 38.7122 57.722 44.0592 55.0977C44.6709 54.7972 45.2362 54.3978 45.9045 53.9931C46.4062 55.4451 46.5368 56.9109 46.3616 58.4028C45.9355 62.0362 44.1228 64.8429 41.2397 66.9705C40.0868 67.8215 38.8669 68.5822 37.6762 69.3846C34.0181 71.8508 33.0285 74.7426 34.403 78.9491C34.4357 79.0516 34.4649 79.1541 34.5388 79.4042C32.6711 78.5705 31.3069 77.3565 30.2674 75.7604C29.1694 74.0757 28.6471 72.2121 28.6196 70.1957C28.6059 69.2144 28.6059 68.2244 28.4736 67.257C28.1506 64.8985 27.0406 63.8425 24.9496 63.7817C22.8036 63.7192 21.106 65.0426 20.6559 67.1268C20.6215 67.2865 20.5717 67.4446 20.5218 67.6304L20.5253 67.6322Z" fill="url(#paint0_linear_738_686)"/> <path d="M0 51.6401C0 51.6401 10.6488 46.4654 21.3274 46.4654L29.3786 21.6102C29.6801 20.4082 30.5602 19.5913 31.5538 19.5913C32.5474 19.5913 33.4275 20.4082 33.7289 21.6102L41.7802 46.4654C54.4274 46.4654 63.1076 51.6401 63.1076 51.6401C63.1076 51.6401 45.0197 2.48776 44.9843 2.38914C44.4652 0.935933 43.5888 0 42.4073 0H20.7022C19.5206 0 18.6796 0.935933 18.1251 2.38914C18.086 2.4859 0 51.6401 0 51.6401Z" fill="white"/> <defs> <linearGradient id="paint0_linear_738_686" x1="31.554" y1="75.4423" x2="39.7462" y2="48.376" gradientUnits="userSpaceOnUse"> <stop stop-color="#D83333"/> <stop offset="1" stop-color="#F041FF"/> </linearGradient> </defs> </svg>
			<h1>${statusCode ? `<span class="statusCode">${statusCode}: </span> ` : ""}<span class="statusMessage">${title}</span></h1>
			${body || `
				<pre>Path: ${escape(pathname)}</pre>
			`}
			</main>
	</body>
</html>`;
}

const DEFAULT_404_ROUTE = {
  component: DEFAULT_404_COMPONENT,
  generate: () => "",
  params: [],
  pattern: /\/404/,
  prerender: false,
  pathname: "/404",
  segments: [[{ content: "404", dynamic: false, spread: false }]],
  type: "page",
  route: "/404",
  fallbackRoutes: [],
  isIndex: false
};
function ensure404Route(manifest) {
  if (!manifest.routes.some((route) => route.route === "/404")) {
    manifest.routes.push(DEFAULT_404_ROUTE);
  }
  return manifest;
}
async function default404Page({ pathname }) {
  return new Response(
    template({
      statusCode: 404,
      title: "Not found",
      tabTitle: "404: Not Found",
      pathname
    }),
    { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
default404Page.isAstroComponentFactory = true;
const default404Instance = {
  default: default404Page
};

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.D-2wbxhY.js"}],"styles":[{"type":"external","src":"/_astro/Build.CRaWxLx7.css"},{"type":"inline","content":"#main-404[data-astro-cid-zetdm5md]{padding:0;margin:0;display:flex;flex-direction:column;justify-content:center;align-items:center;height:50vw}h1[data-astro-cid-zetdm5md]{color:#6bb580;font-size:260px;margin:0;padding:0}p[data-astro-cid-zetdm5md]{font-size:40px;width:50%;text-align:center;margin-top:-60px}button[data-astro-cid-zetdm5md]{cursor:pointer;background:#243010;width:150px;height:50px;border-radius:8%}a[data-astro-cid-zetdm5md]{background:#243010;text-decoration:none;color:#fff;font-size:15px;font-weight:600}@media (max-width: 768px){h1[data-astro-cid-zetdm5md]{font-size:100px}p[data-astro-cid-zetdm5md]{margin-top:20px;font-size:20px;width:80%}button[data-astro-cid-zetdm5md]{margin-top:10px;width:100px;height:40px}a[data-astro-cid-zetdm5md]{font-size:10px}#main-404[data-astro-cid-zetdm5md]{margin-top:10vh;margin-bottom:10vh}}\n"},{"type":"external","src":"/_astro/Build.m_h20DTx.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.D-2wbxhY.js"}],"styles":[{"type":"external","src":"/_astro/Build.CRaWxLx7.css"},{"type":"inline","content":"#main-500[data-astro-cid-5v2qf5k4]{padding:0;margin:0;display:flex;flex-direction:column;justify-content:center;align-items:center;height:50vw}h1[data-astro-cid-5v2qf5k4]{color:#6bb580;font-size:260px;margin:0;padding:0}p[data-astro-cid-5v2qf5k4]{font-size:40px;width:50%;text-align:center;margin-top:-60px}button[data-astro-cid-5v2qf5k4]{cursor:pointer;background:#243010;width:150px;height:50px;border-radius:8%}a[data-astro-cid-5v2qf5k4]{background:#243010;text-decoration:none;color:#fff;font-size:15px;font-weight:600}@media (max-width: 768px){h1[data-astro-cid-5v2qf5k4]{font-size:100px}p[data-astro-cid-5v2qf5k4]{margin-top:20px;font-size:20px;width:80%}button[data-astro-cid-5v2qf5k4]{margin-top:10px;width:100px;height:40px}a[data-astro-cid-5v2qf5k4]{font-size:10px}#main-500[data-astro-cid-5v2qf5k4]{margin-top:10vh;margin-bottom:10vh}}\n"},{"type":"external","src":"/_astro/Build.m_h20DTx.css"}],"routeData":{"route":"/500","isIndex":false,"type":"page","pattern":"^\\/500\\/?$","segments":[[{"content":"500","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/500.astro","pathname":"/500","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.D-2wbxhY.js"}],"styles":[{"type":"external","src":"/_astro/Build.CRaWxLx7.css"},{"type":"inline","content":"#main-404[data-astro-cid-3s2xuptl]{padding:0;margin:0;display:flex;flex-direction:column;justify-content:center;align-items:center;height:50vw}h1[data-astro-cid-3s2xuptl]{color:#6bb580;font-size:130px;text-align:center;margin:0 0 20px;padding:0}p[data-astro-cid-3s2xuptl]{font-size:40px;width:50%;text-align:center;margin-top:-60px}button[data-astro-cid-3s2xuptl]{cursor:pointer;background:#243010;width:150px;height:50px;border-radius:8%}a[data-astro-cid-3s2xuptl]{background:#243010;text-decoration:none;color:#fff;font-size:15px;font-weight:600}@media (max-width: 768px){h1[data-astro-cid-3s2xuptl]{font-size:40px}p[data-astro-cid-3s2xuptl]{margin-top:20px;font-size:20px;width:80%}button[data-astro-cid-3s2xuptl]{margin-top:10px;width:100px;height:40px}a[data-astro-cid-3s2xuptl]{font-size:10px}#main-404[data-astro-cid-3s2xuptl]{margin-top:10vh;margin-bottom:10vh}}\n"},{"type":"external","src":"/_astro/Build.m_h20DTx.css"}],"routeData":{"route":"/build","isIndex":false,"type":"page","pattern":"^\\/Build\\/?$","segments":[[{"content":"Build","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Build.astro","pathname":"/Build","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.D-2wbxhY.js"}],"styles":[{"type":"external","src":"/_astro/Build.CRaWxLx7.css"},{"type":"external","src":"/_astro/Build.m_h20DTx.css"},{"type":"inline","content":"a[data-astro-cid-tjje2knh]{position:relative;margin-top:20px;display:block;margin-left:calc(100vw - 97%)}button[data-astro-cid-tjje2knh]{display:flex;align-items:center;gap:10px;background-color:#6bb580;color:#fff;padding:10px 20px;border-radius:5px;font-weight:600;cursor:pointer}button[data-astro-cid-tjje2knh] img[data-astro-cid-tjje2knh]{width:20px;height:20px}button[data-astro-cid-tjje2knh]:hover{background-color:#128c7e}@media (max-width: 769px){a[data-astro-cid-tjje2knh]{position:fixed;bottom:50px;background-color:#f0f9f2;border-radius:5px;margin-left:0;padding:5px;padding-left:calc(100vw - 99%);box-shadow:6px 10px 14px #00000070}}\nmain[data-astro-cid-nnsxwabn]{display:flex;flex-direction:column;justify-content:center;align-items:center;margin-bottom:30vh;padding:20px}h1[data-astro-cid-nnsxwabn]{font-size:3rem;font-weight:600;color:#333}#categoria-container[data-astro-cid-nnsxwabn]{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;justify-content:center;align-items:center;padding:20px}a[data-astro-cid-nnsxwabn]{text-decoration:none;color:#333;font-size:2rem;font-weight:600;padding:10px;border-radius:10px;transition:all .5s ease;background:#3d6b43;background:linear-gradient(90deg,#3d6b43,#6bb580 56%);color:#fff}a[data-astro-cid-nnsxwabn]:hover{background:#6bb580;background:linear-gradient(90deg,#6bb580 45%,#3d6b43);color:#fff}#paquetes[data-astro-cid-nnsxwabn]{grid-column:1 / 3}@media screen and (max-width: 768px){#categoria-container[data-astro-cid-nnsxwabn]{display:flex;flex-direction:column}a[data-astro-cid-nnsxwabn]{width:100%}}\n"}],"routeData":{"route":"/categoria","isIndex":false,"type":"page","pattern":"^\\/categoria\\/?$","segments":[[{"content":"categoria","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/categoria.astro","pathname":"/categoria","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.D-2wbxhY.js"}],"styles":[{"type":"external","src":"/_astro/Build.CRaWxLx7.css"},{"type":"external","src":"/_astro/Build.m_h20DTx.css"},{"type":"inline","content":"a[data-astro-cid-tjje2knh]{position:relative;margin-top:20px;display:block;margin-left:calc(100vw - 97%)}button[data-astro-cid-tjje2knh]{display:flex;align-items:center;gap:10px;background-color:#6bb580;color:#fff;padding:10px 20px;border-radius:5px;font-weight:600;cursor:pointer}button[data-astro-cid-tjje2knh] img[data-astro-cid-tjje2knh]{width:20px;height:20px}button[data-astro-cid-tjje2knh]:hover{background-color:#128c7e}@media (max-width: 769px){a[data-astro-cid-tjje2knh]{position:fixed;bottom:50px;background-color:#f0f9f2;border-radius:5px;margin-left:0;padding:5px;padding-left:calc(100vw - 99%);box-shadow:6px 10px 14px #00000070}}\nmain[data-astro-cid-26j7ne6f]{display:flex;flex-direction:column;justify-content:center;align-items:center;margin-bottom:20vh;padding:20px}h1[data-astro-cid-26j7ne6f]{font-size:3rem;font-weight:600;color:#333}#funebres-container[data-astro-cid-26j7ne6f]{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;justify-content:center;align-items:center;padding:20px}@media (max-width: 768px){#funebres-container[data-astro-cid-26j7ne6f]{display:flex;flex-direction:column}h1[data-astro-cid-26j7ne6f]{font-size:2rem;text-align:center}}\n"}],"routeData":{"route":"/listaproductos/funebres","isIndex":false,"type":"page","pattern":"^\\/listaProductos\\/funebres\\/?$","segments":[[{"content":"listaProductos","dynamic":false,"spread":false}],[{"content":"funebres","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/listaProductos/funebres.astro","pathname":"/listaProductos/funebres","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.D-2wbxhY.js"}],"styles":[{"type":"external","src":"/_astro/Build.CRaWxLx7.css"},{"type":"external","src":"/_astro/Build.m_h20DTx.css"},{"type":"inline","content":"a[data-astro-cid-tjje2knh]{position:relative;margin-top:20px;display:block;margin-left:calc(100vw - 97%)}button[data-astro-cid-tjje2knh]{display:flex;align-items:center;gap:10px;background-color:#6bb580;color:#fff;padding:10px 20px;border-radius:5px;font-weight:600;cursor:pointer}button[data-astro-cid-tjje2knh] img[data-astro-cid-tjje2knh]{width:20px;height:20px}button[data-astro-cid-tjje2knh]:hover{background-color:#128c7e}@media (max-width: 769px){a[data-astro-cid-tjje2knh]{position:fixed;bottom:50px;background-color:#f0f9f2;border-radius:5px;margin-left:0;padding:5px;padding-left:calc(100vw - 99%);box-shadow:6px 10px 14px #00000070}}\nmain[data-astro-cid-nlz5rjyq]{display:flex;flex-direction:column;justify-content:center;align-items:center;margin-bottom:20vh;padding:20px}h1[data-astro-cid-nlz5rjyq]{font-size:3rem;font-weight:600;color:#333}#paquetes-container[data-astro-cid-nlz5rjyq]{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;justify-content:center;align-items:center;padding:20px}@media (max-width: 768px){#paquetes-container[data-astro-cid-nlz5rjyq]{display:flex;flex-direction:column}h1[data-astro-cid-nlz5rjyq]{font-size:2rem;text-align:center}}\n"}],"routeData":{"route":"/listaproductos/paquetes","isIndex":false,"type":"page","pattern":"^\\/listaProductos\\/paquetes\\/?$","segments":[[{"content":"listaProductos","dynamic":false,"spread":false}],[{"content":"paquetes","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/listaProductos/paquetes.astro","pathname":"/listaProductos/paquetes","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.D-2wbxhY.js"}],"styles":[{"type":"external","src":"/_astro/Build.CRaWxLx7.css"},{"type":"external","src":"/_astro/Build.m_h20DTx.css"},{"type":"inline","content":"a[data-astro-cid-tjje2knh]{position:relative;margin-top:20px;display:block;margin-left:calc(100vw - 97%)}button[data-astro-cid-tjje2knh]{display:flex;align-items:center;gap:10px;background-color:#6bb580;color:#fff;padding:10px 20px;border-radius:5px;font-weight:600;cursor:pointer}button[data-astro-cid-tjje2knh] img[data-astro-cid-tjje2knh]{width:20px;height:20px}button[data-astro-cid-tjje2knh]:hover{background-color:#128c7e}@media (max-width: 769px){a[data-astro-cid-tjje2knh]{position:fixed;bottom:50px;background-color:#f0f9f2;border-radius:5px;margin-left:0;padding:5px;padding-left:calc(100vw - 99%);box-shadow:6px 10px 14px #00000070}}\nmain[data-astro-cid-3h2uy4z6]{display:flex;flex-direction:column;justify-content:center;align-items:center;margin-bottom:20vh;padding:20px}h1[data-astro-cid-3h2uy4z6]{font-size:3rem;font-weight:600;color:#333}#telemedicina-container[data-astro-cid-3h2uy4z6]{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;justify-content:center;align-items:center;padding:20px}@media (max-width: 768px){#telemedicina-container[data-astro-cid-3h2uy4z6]{display:flex;flex-direction:column}h1[data-astro-cid-3h2uy4z6]{font-size:2rem;text-align:center}}\n"}],"routeData":{"route":"/listaproductos/telemedicina","isIndex":false,"type":"page","pattern":"^\\/listaProductos\\/telemedicina\\/?$","segments":[[{"content":"listaProductos","dynamic":false,"spread":false}],[{"content":"telemedicina","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/listaProductos/telemedicina.astro","pathname":"/listaProductos/telemedicina","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/Build.CRaWxLx7.css"}],"routeData":{"route":"/nosotros","isIndex":false,"type":"page","pattern":"^\\/nosotros\\/?$","segments":[[{"content":"nosotros","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/nosotros.astro","pathname":"/nosotros","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.D-2wbxhY.js"}],"styles":[{"type":"external","src":"/_astro/Build.CRaWxLx7.css"},{"type":"external","src":"/_astro/Build.m_h20DTx.css"},{"type":"inline","content":"a[data-astro-cid-tjje2knh]{position:relative;margin-top:20px;display:block;margin-left:calc(100vw - 97%)}button[data-astro-cid-tjje2knh]{display:flex;align-items:center;gap:10px;background-color:#6bb580;color:#fff;padding:10px 20px;border-radius:5px;font-weight:600;cursor:pointer}button[data-astro-cid-tjje2knh] img[data-astro-cid-tjje2knh]{width:20px;height:20px}button[data-astro-cid-tjje2knh]:hover{background-color:#128c7e}@media (max-width: 769px){a[data-astro-cid-tjje2knh]{position:fixed;bottom:50px;background-color:#f0f9f2;border-radius:5px;margin-left:0;padding:5px;padding-left:calc(100vw - 99%);box-shadow:6px 10px 14px #00000070}}\n#container-product[data-astro-cid-y5jmkon6]{padding:20px;height:-moz-max-content;height:max-content;width:100%;display:flex;justify-content:center}.container[data-astro-cid-y5jmkon6]{display:grid;grid-template-columns:50% 50%;gap:20px}.container[data-astro-cid-y5jmkon6] img[data-astro-cid-y5jmkon6]{border-radius:10px}.information[data-astro-cid-y5jmkon6]{display:flex;flex-direction:column;gap:10px;padding:0 30px 30px}.information[data-astro-cid-y5jmkon6] h2[data-astro-cid-y5jmkon6]{text-align:center;font-size:2rem;font-weight:600;color:#333}.information[data-astro-cid-y5jmkon6] h3[data-astro-cid-y5jmkon6]{text-align:center;font-size:1.5rem;font-weight:600;color:#333}.information[data-astro-cid-y5jmkon6] h4[data-astro-cid-y5jmkon6]{text-align:center;font-size:1.2rem;font-weight:600;color:#333}ul[data-astro-cid-y5jmkon6]{list-style:outside}.conditions[data-astro-cid-y5jmkon6]{border:1px solid #acacac;background:#fff;border-radius:10px;padding-left:10px}.conditions[data-astro-cid-y5jmkon6] ul[data-astro-cid-y5jmkon6]{padding-left:30px}@media (max-width: 769px){.container[data-astro-cid-y5jmkon6]{display:flex;flex-direction:column}.container[data-astro-cid-y5jmkon6] img[data-astro-cid-y5jmkon6]{border-radius:10px;height:calc(100vh - 50%)}}\n"}],"routeData":{"route":"/products/[id]","isIndex":false,"type":"page","pattern":"^\\/products\\/([^/]+?)\\/?$","segments":[[{"content":"products","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/products/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.D-2wbxhY.js"}],"styles":[{"type":"external","src":"/_astro/Build.CRaWxLx7.css"},{"type":"external","src":"/_astro/Build.m_h20DTx.css"},{"type":"inline","content":"a[data-astro-cid-tjje2knh]{position:relative;margin-top:20px;display:block;margin-left:calc(100vw - 97%)}button[data-astro-cid-tjje2knh]{display:flex;align-items:center;gap:10px;background-color:#6bb580;color:#fff;padding:10px 20px;border-radius:5px;font-weight:600;cursor:pointer}button[data-astro-cid-tjje2knh] img[data-astro-cid-tjje2knh]{width:20px;height:20px}button[data-astro-cid-tjje2knh]:hover{background-color:#128c7e}@media (max-width: 769px){a[data-astro-cid-tjje2knh]{position:fixed;bottom:50px;background-color:#f0f9f2;border-radius:5px;margin-left:0;padding:5px;padding-left:calc(100vw - 99%);box-shadow:6px 10px 14px #00000070}}\nmain[data-astro-cid-fzqhcnj3]{display:flex;justify-content:center;align-items:center;flex-direction:column}#container[data-astro-cid-fzqhcnj3]{display:flex;flex-direction:column;align-items:center;border:1px solid #ccc;width:60vw;padding:30px;background:#f9f9f9;border-radius:4%;margin-bottom:30px}#info[data-astro-cid-fzqhcnj3]{width:50vw;margin:0 20px}article[data-astro-cid-fzqhcnj3]{margin-bottom:20px;width:30vw}iframe[data-astro-cid-fzqhcnj3]{width:100%;max-width:100vw;height:400px;border-radius:4%}h1[data-astro-cid-fzqhcnj3]{font-size:2rem;margin:20px 0;color:#6bb580}p[data-astro-cid-fzqhcnj3]{font-size:1rem;margin:10px 0;text-align:justify}ul[data-astro-cid-fzqhcnj3]{margin:10px 0;padding-left:20px;text-align:justify}li[data-astro-cid-fzqhcnj3]{margin:5px 0}@media screen and (max-width: 768px){#container[data-astro-cid-fzqhcnj3]{width:90vw}#info[data-astro-cid-fzqhcnj3]{width:80vw}article[data-astro-cid-fzqhcnj3]{width:80vw}main[data-astro-cid-fzqhcnj3]{margin-top:20px}}\n"}],"routeData":{"route":"/servicios/asistenciavial","isIndex":false,"type":"page","pattern":"^\\/servicios\\/AsistenciaVial\\/?$","segments":[[{"content":"servicios","dynamic":false,"spread":false}],[{"content":"AsistenciaVial","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/servicios/AsistenciaVial.astro","pathname":"/servicios/AsistenciaVial","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.D-2wbxhY.js"}],"styles":[{"type":"external","src":"/_astro/Build.CRaWxLx7.css"},{"type":"external","src":"/_astro/Build.m_h20DTx.css"},{"type":"inline","content":"a[data-astro-cid-tjje2knh]{position:relative;margin-top:20px;display:block;margin-left:calc(100vw - 97%)}button[data-astro-cid-tjje2knh]{display:flex;align-items:center;gap:10px;background-color:#6bb580;color:#fff;padding:10px 20px;border-radius:5px;font-weight:600;cursor:pointer}button[data-astro-cid-tjje2knh] img[data-astro-cid-tjje2knh]{width:20px;height:20px}button[data-astro-cid-tjje2knh]:hover{background-color:#128c7e}@media (max-width: 769px){a[data-astro-cid-tjje2knh]{position:fixed;bottom:50px;background-color:#f0f9f2;border-radius:5px;margin-left:0;padding:5px;padding-left:calc(100vw - 99%);box-shadow:6px 10px 14px #00000070}}\nmain[data-astro-cid-bi4ft6a7]{display:flex;justify-content:center;align-items:center;flex-direction:column}#container[data-astro-cid-bi4ft6a7]{display:flex;flex-direction:column;align-items:center;border:1px solid #ccc;width:60vw;padding:30px;background:#f9f9f9;border-radius:4%;margin-bottom:30px}#info[data-astro-cid-bi4ft6a7]{width:50vw;margin:0 20px}article[data-astro-cid-bi4ft6a7]{margin-bottom:20px;width:30vw}iframe[data-astro-cid-bi4ft6a7]{width:100%;max-width:100vw;height:400px;border-radius:4%}h1[data-astro-cid-bi4ft6a7]{font-size:2rem;margin:20px 0;color:#6bb580}p[data-astro-cid-bi4ft6a7]{font-size:1rem;margin:10px 0;text-align:justify}ul[data-astro-cid-bi4ft6a7]{margin:10px 0;padding-left:20px;text-align:justify}li[data-astro-cid-bi4ft6a7]{margin:5px 0}@media screen and (max-width: 768px){#container[data-astro-cid-bi4ft6a7]{width:90vw}#info[data-astro-cid-bi4ft6a7]{width:80vw}article[data-astro-cid-bi4ft6a7]{width:80vw}main[data-astro-cid-bi4ft6a7]{margin-top:20px}}\n"}],"routeData":{"route":"/servicios/funerario","isIndex":false,"type":"page","pattern":"^\\/servicios\\/funerario\\/?$","segments":[[{"content":"servicios","dynamic":false,"spread":false}],[{"content":"funerario","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/servicios/funerario.astro","pathname":"/servicios/funerario","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.D-2wbxhY.js"}],"styles":[{"type":"external","src":"/_astro/Build.CRaWxLx7.css"},{"type":"external","src":"/_astro/Build.m_h20DTx.css"},{"type":"inline","content":"a[data-astro-cid-tjje2knh]{position:relative;margin-top:20px;display:block;margin-left:calc(100vw - 97%)}button[data-astro-cid-tjje2knh]{display:flex;align-items:center;gap:10px;background-color:#6bb580;color:#fff;padding:10px 20px;border-radius:5px;font-weight:600;cursor:pointer}button[data-astro-cid-tjje2knh] img[data-astro-cid-tjje2knh]{width:20px;height:20px}button[data-astro-cid-tjje2knh]:hover{background-color:#128c7e}@media (max-width: 769px){a[data-astro-cid-tjje2knh]{position:fixed;bottom:50px;background-color:#f0f9f2;border-radius:5px;margin-left:0;padding:5px;padding-left:calc(100vw - 99%);box-shadow:6px 10px 14px #00000070}}\nmain[data-astro-cid-gcwudngg]{display:flex;justify-content:center;align-items:center;flex-direction:column}#container[data-astro-cid-gcwudngg]{display:flex;flex-direction:column;align-items:center;border:1px solid #ccc;width:60vw;padding:30px;background:#f9f9f9;border-radius:4%;margin-bottom:30px}#info[data-astro-cid-gcwudngg]{width:50vw;margin:0 20px}article[data-astro-cid-gcwudngg]{margin-bottom:20px;width:30vw}iframe[data-astro-cid-gcwudngg]{width:100%;max-width:100vw;height:400px;border-radius:4%}h1[data-astro-cid-gcwudngg]{font-size:2rem;margin:20px 0;color:#6bb580}p[data-astro-cid-gcwudngg]{font-size:1rem;margin:10px 0;text-align:justify}ul[data-astro-cid-gcwudngg]{margin:10px 0;padding-left:20px;text-align:justify}li[data-astro-cid-gcwudngg]{margin:5px 0}@media screen and (max-width: 768px){#container[data-astro-cid-gcwudngg]{width:90vw}#info[data-astro-cid-gcwudngg]{width:80vw}article[data-astro-cid-gcwudngg]{width:80vw}main[data-astro-cid-gcwudngg]{margin-top:20px}}\n"}],"routeData":{"route":"/servicios/rcv","isIndex":false,"type":"page","pattern":"^\\/servicios\\/RCV\\/?$","segments":[[{"content":"servicios","dynamic":false,"spread":false}],[{"content":"RCV","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/servicios/RCV.astro","pathname":"/servicios/RCV","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.D-2wbxhY.js"}],"styles":[{"type":"external","src":"/_astro/Build.CRaWxLx7.css"},{"type":"external","src":"/_astro/Build.m_h20DTx.css"},{"type":"inline","content":"a[data-astro-cid-tjje2knh]{position:relative;margin-top:20px;display:block;margin-left:calc(100vw - 97%)}button[data-astro-cid-tjje2knh]{display:flex;align-items:center;gap:10px;background-color:#6bb580;color:#fff;padding:10px 20px;border-radius:5px;font-weight:600;cursor:pointer}button[data-astro-cid-tjje2knh] img[data-astro-cid-tjje2knh]{width:20px;height:20px}button[data-astro-cid-tjje2knh]:hover{background-color:#128c7e}@media (max-width: 769px){a[data-astro-cid-tjje2knh]{position:fixed;bottom:50px;background-color:#f0f9f2;border-radius:5px;margin-left:0;padding:5px;padding-left:calc(100vw - 99%);box-shadow:6px 10px 14px #00000070}}\nmain[data-astro-cid-523627du]{display:flex;justify-content:center;align-items:center;flex-direction:column}#container[data-astro-cid-523627du]{display:flex;flex-direction:column;align-items:center;border:1px solid #ccc;width:60vw;padding:30px;background:#f9f9f9;border-radius:4%;margin-bottom:30px}#info[data-astro-cid-523627du]{width:50vw;margin:0 20px}article[data-astro-cid-523627du]{margin-bottom:20px;width:40vw}iframe[data-astro-cid-523627du]{width:100%;max-width:100vw;height:400px;border-radius:4%}h1[data-astro-cid-523627du]{font-size:2rem;margin:20px 0;color:#6bb580}p[data-astro-cid-523627du]{font-size:1rem;margin:10px 0;text-align:justify}ul[data-astro-cid-523627du],ol[data-astro-cid-523627du]{margin:10px 0;padding-left:20px;text-align:justify}li[data-astro-cid-523627du]{margin:5px 0}@media screen and (max-width: 768px){#container[data-astro-cid-523627du]{width:90vw}#info[data-astro-cid-523627du]{width:80vw}article[data-astro-cid-523627du]{width:80vw}main[data-astro-cid-523627du]{margin-top:20px}}\n"}],"routeData":{"route":"/servicios/telemedicina","isIndex":false,"type":"page","pattern":"^\\/servicios\\/telemedicina\\/?$","segments":[[{"content":"servicios","dynamic":false,"spread":false}],[{"content":"telemedicina","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/servicios/telemedicina.astro","pathname":"/servicios/telemedicina","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.D-2wbxhY.js"}],"styles":[{"type":"external","src":"/_astro/Build.CRaWxLx7.css"},{"type":"external","src":"/_astro/Build.m_h20DTx.css"},{"type":"external","src":"/_astro/index.BC7IForK.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/src/pages/500.astro",{"propagation":"none","containsHead":true}],["C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/src/pages/Build.astro",{"propagation":"none","containsHead":true}],["C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/src/pages/categoria.astro",{"propagation":"none","containsHead":true}],["C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/src/pages/listaProductos/funebres.astro",{"propagation":"none","containsHead":true}],["C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/src/pages/listaProductos/paquetes.astro",{"propagation":"none","containsHead":true}],["C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/src/pages/listaProductos/telemedicina.astro",{"propagation":"none","containsHead":true}],["C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/src/pages/products/[id].astro",{"propagation":"none","containsHead":true}],["C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/src/pages/servicios/AsistenciaVial.astro",{"propagation":"none","containsHead":true}],["C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/src/pages/servicios/RCV.astro",{"propagation":"none","containsHead":true}],["C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/src/pages/servicios/funerario.astro",{"propagation":"none","containsHead":true}],["C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/src/pages/servicios/telemedicina.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/500@_@astro":"pages/500.astro.mjs","\u0000@astro-page:src/pages/Build@_@astro":"pages/build.astro.mjs","\u0000@astro-page:src/pages/categoria@_@astro":"pages/categoria.astro.mjs","\u0000@astro-page:src/pages/listaProductos/funebres@_@astro":"pages/listaproductos/funebres.astro.mjs","\u0000@astro-page:src/pages/listaProductos/paquetes@_@astro":"pages/listaproductos/paquetes.astro.mjs","\u0000@astro-page:src/pages/listaProductos/telemedicina@_@astro":"pages/listaproductos/telemedicina.astro.mjs","\u0000@astro-page:src/pages/nosotros@_@astro":"pages/nosotros.astro.mjs","\u0000@astro-page:src/pages/products/[id]@_@astro":"pages/products/_id_.astro.mjs","\u0000@astro-page:src/pages/servicios/AsistenciaVial@_@astro":"pages/servicios/asistenciavial.astro.mjs","\u0000@astro-page:src/pages/servicios/funerario@_@astro":"pages/servicios/funerario.astro.mjs","\u0000@astro-page:src/pages/servicios/RCV@_@astro":"pages/servicios/rcv.astro.mjs","\u0000@astro-page:src/pages/servicios/telemedicina@_@astro":"pages/servicios/telemedicina.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","\u0000@astrojs-manifest":"manifest_BZ4QGCIZ.mjs","C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/src/components/FAQ.jsx":"_astro/FAQ.D4K29_Zk.js","C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/src/components/Card.jsx":"_astro/Card.CQSOrxTF.js","/astro/hoisted.js?q=0":"_astro/hoisted.D-2wbxhY.js","@astrojs/react/client.js":"_astro/client.BIGLHmRd.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/Build.m_h20DTx.css","/_astro/Build.CRaWxLx7.css","/_astro/index.BC7IForK.css","/fonts/AVENIRLTSTD-BLACK.OTF","/fonts/AVENIRLTSTD-ROMAN.OTF","/fonts/FontsFree-Net-AvenirLTStd-Roman-1.ttf","/_astro/Card.CQSOrxTF.js","/_astro/client.BIGLHmRd.js","/_astro/FAQ.D4K29_Zk.js","/_astro/hoisted.D-2wbxhY.js","/_astro/index.DhYZZe0J.js","/_astro/jsx-runtime.7faW4zRM.js","/img/adultomayor.avif","/img/asistenciaVial.png","/img/bgimg.png","/img/contacto.jpg","/img/funebre.png","/img/iconoTkuido.png","/img/nosotros.jpg","/img/RCV-coche.png","/img/telemedicine.png","/_astro/astro/assets-service.l0sNRNKZ.js","/img/aliados/Fenix-salud.png","/img/aliados/Grupo-CASONITA.png","/img/aliados/telemedi.png","/img/heroImages/AdultoMayor.avif","/img/heroImages/bgimg.avif","/img/heroImages/Familia.avif","/img/products/product-1.jpg","/img/products/product-2.jpg","/img/products/product-3.jpg","/img/icons/arrowLeft.png","/img/icons/icon-facebook.png","/img/icons/icon-linkedin.png","/img/icons/icon-tik-tok.png","/img/icons/icono-instagram.png","/img/icons/icons-whatsapp.svg"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"experimentalEnvGetSecretEnabled":false});

export { DEFAULT_404_ROUTE as D, default404Instance as a, deserializeActionResult as d, ensure404Route as e, getActionQueryString as g, manifest as m };
