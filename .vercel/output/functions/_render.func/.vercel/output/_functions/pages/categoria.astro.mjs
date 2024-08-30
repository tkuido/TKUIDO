/* empty css                                 */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_Cyul0w3y.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BfkGO7L-.mjs';
import { $ as $$ButtonBack } from '../chunks/ButtonBack_H9xrO5KU.mjs';
/* empty css                                     */
export { renderers } from '../renderers.mjs';

const $$Categoria = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Categoria", "description": "P\xE1gina de categorias de TKUIDO venta de seguros ", "data-astro-cid-nnsxwabn": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ButtonBack", $$ButtonBack, { "ruta": "/", "data-astro-cid-nnsxwabn": true })} ${maybeRenderHead()}<main data-astro-cid-nnsxwabn> <h1 data-astro-cid-nnsxwabn>Categorías</h1> <section id="categoria-container" data-astro-cid-nnsxwabn> <a href="/listaProductos/paquetes" id="paquetes" data-astro-cid-nnsxwabn> <h2 data-astro-cid-nnsxwabn>Paquetes</h2> </a> <a href="/listaProductos/funebres" id="funebre" data-astro-cid-nnsxwabn> <h2 data-astro-cid-nnsxwabn>Fúnebre</h2> </a> <a href="/listaProductos/telemedicina" id="Telemedicina" data-astro-cid-nnsxwabn> <h2 data-astro-cid-nnsxwabn>Telemedicina</h2> </a> <a href="/Build" id="RCV" data-astro-cid-nnsxwabn> <h2 data-astro-cid-nnsxwabn>RCV</h2> </a> <a href="/Build" id="Asistencia" data-astro-cid-nnsxwabn> <h2 data-astro-cid-nnsxwabn>Asistencia Vial</h2> </a> </section> </main> ` })} `;
}, "C:/Users/Christopher/Desktop/TKUIDO/src/pages/categoria.astro", void 0);

const $$file = "C:/Users/Christopher/Desktop/TKUIDO/src/pages/categoria.astro";
const $$url = "/categoria";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Categoria,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
