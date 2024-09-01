/* empty css                                 */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_DjDDY4Fk.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CAmY1fQs.mjs';
/* empty css                               */
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "404", "description": "P\xE1gina no encontrada", "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main id="main-404" data-astro-cid-zetdm5md> <h1 data-astro-cid-zetdm5md>404</h1> <p data-astro-cid-zetdm5md>El sitio web al que intenta acceder no existe o se ha movido. Vuelva a nuestra página de inicio.</p> <button data-astro-cid-zetdm5md> <a href="/" data-astro-cid-zetdm5md>Volver al inicio</a> </button> </main> ` })} `;
}, "C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/src/pages/404.astro", void 0);

const $$file = "C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
