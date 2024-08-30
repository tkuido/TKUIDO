/* empty css                                    */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../../chunks/astro/server_Cyul0w3y.mjs';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_BfkGO7L-.mjs';
import { $ as $$ButtonBack } from '../../chunks/ButtonBack_H9xrO5KU.mjs';
import { C as Card } from '../../chunks/Card_BV1g5GJl.mjs';
/* empty css                                       */
export { renderers } from '../../renderers.mjs';

const $$Funebres = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Productos F\xFAnebres", "description": "P\xE1gina de productos f\xFAnebres de TKUIDO venta de seguros ", "data-astro-cid-26j7ne6f": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ButtonBack", $$ButtonBack, { "ruta": "/categoria", "data-astro-cid-26j7ne6f": true })} ${maybeRenderHead()}<main data-astro-cid-26j7ne6f> <h1 data-astro-cid-26j7ne6f>Productos Fúnebres</h1> <section id="funebres-container" data-astro-cid-26j7ne6f> ${renderComponent($$result2, "Card", Card, { "idCard": "1", "client:visible": true, "client:component-hydration": "visible", "client:component-path": "C:/Users/Christopher/Desktop/TKUIDO/src/components/Card.jsx", "client:component-export": "default", "data-astro-cid-26j7ne6f": true })} ${renderComponent($$result2, "Card", Card, { "idCard": "2", "client:visible": true, "client:component-hydration": "visible", "client:component-path": "C:/Users/Christopher/Desktop/TKUIDO/src/components/Card.jsx", "client:component-export": "default", "data-astro-cid-26j7ne6f": true })} </section> </main> ` })} `;
}, "C:/Users/Christopher/Desktop/TKUIDO/src/pages/listaProductos/funebres.astro", void 0);

const $$file = "C:/Users/Christopher/Desktop/TKUIDO/src/pages/listaProductos/funebres.astro";
const $$url = "/listaProductos/funebres";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Funebres,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
