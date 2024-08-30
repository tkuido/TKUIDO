/* empty css                                 */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_Cyul0w3y.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BfkGO7L-.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Build = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Construcci\xF3n", "description": "P\xE1gina en construcci\xF3n", "data-astro-cid-3s2xuptl": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main id="main-404" data-astro-cid-3s2xuptl> <h1 data-astro-cid-3s2xuptl>Página web en construcción</h1> <p data-astro-cid-3s2xuptl>La página web está actualmente en construcción. Por favor, vuelva más tarde.</p> <button data-astro-cid-3s2xuptl> <a href="/" data-astro-cid-3s2xuptl>Volver al inicio</a> </button> </main> ` })} `;
}, "C:/Users/Christopher/Desktop/TKUIDO/src/pages/Build.astro", void 0);

const $$file = "C:/Users/Christopher/Desktop/TKUIDO/src/pages/Build.astro";
const $$url = "/Build";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Build,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
