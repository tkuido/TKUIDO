/* empty css                                    */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../../chunks/astro/server_DjDDY4Fk.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_CAmY1fQs.mjs';
import { $ as $$ButtonBack } from '../../chunks/ButtonBack_oyPwJN7G.mjs';
import { C as Card } from '../../chunks/Card_CdDwBBrf.mjs';
/* empty css                                           */
export { renderers } from '../../renderers.mjs';

const $$Telemedicina = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Productos Telemedicina", "description": "P\xE1gina de productos de telemedicina de TKUIDO venta de seguros ", "data-astro-cid-3h2uy4z6": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ButtonBack", $$ButtonBack, { "ruta": "/categoria", "data-astro-cid-3h2uy4z6": true })} ${maybeRenderHead()}<main data-astro-cid-3h2uy4z6> <h1 data-astro-cid-3h2uy4z6>Productos Telemedicina</h1> <section id="telemedicina-container" data-astro-cid-3h2uy4z6> ${renderComponent($$result2, "Card", Card, { "idCard": "3", "client:visible": true, "client:component-hydration": "visible", "client:component-path": "C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/src/components/Card.jsx", "client:component-export": "default", "data-astro-cid-3h2uy4z6": true })} </section> </main> ` })} `;
}, "C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/src/pages/listaProductos/telemedicina.astro", void 0);

const $$file = "C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/src/pages/listaProductos/telemedicina.astro";
const $$url = "/listaProductos/telemedicina";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Telemedicina,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
