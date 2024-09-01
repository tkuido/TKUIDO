/* empty css                                    */
import { c as createComponent, r as renderTemplate, d as renderComponent, b as createAstro, m as maybeRenderHead, a as addAttribute } from '../../chunks/astro/server_DjDDY4Fk.mjs';
import 'kleur/colors';
import { a as $$ButtoWhatsapp, $ as $$BaseLayout } from '../../chunks/BaseLayout_CAmY1fQs.mjs';
import { g as getProductById } from '../../chunks/Products_DheOjLTV.mjs';
import { $ as $$ButtonBack } from '../../chunks/ButtonBack_oyPwJN7G.mjs';
/* empty css                                   */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const getStaticPaths = () => {
  return [
    { params: { id: "1" } },
    { params: { id: "2" } },
    { params: { id: "3" } }
  ];
};
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  let product;
  if (!id) {
    return {
      status: 404,
      error: new Error(`Product ${id} not found`)
    };
  } else {
    product = getProductById(id);
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `Productos ${id}`, "description": "Detalles de productos", "data-astro-cid-y5jmkon6": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ButtonBack", $$ButtonBack, { "ruta": "/categoria", "data-astro-cid-y5jmkon6": true })} ${maybeRenderHead()}<section id="container-product" data-astro-cid-y5jmkon6> <div class="container" data-astro-cid-y5jmkon6> <img${addAttribute(product?.img.src, "src")}${addAttribute(product?.img.alt, "alt")} data-astro-cid-y5jmkon6> <div class="information" data-astro-cid-y5jmkon6> <h2 data-astro-cid-y5jmkon6>${product?.title}</h2> <h3 data-astro-cid-y5jmkon6>${product?.price}</h3> <h4 data-astro-cid-y5jmkon6>${product?.categoria} ${product?.tipo}</h4> <ul data-astro-cid-y5jmkon6> ${product?.features.map((feature) => renderTemplate`<li data-astro-cid-y5jmkon6>${feature}</li>`)} </ul> <p data-astro-cid-y5jmkon6><b data-astro-cid-y5jmkon6>${product?.adicional.title}</b></p> <ul data-astro-cid-y5jmkon6> ${product?.adicional.features.map((feature) => renderTemplate`<li data-astro-cid-y5jmkon6>${feature}</li>`)} </ul> <div class="conditions" data-astro-cid-y5jmkon6> <h3 data-astro-cid-y5jmkon6>Condiciones:</h3> <ul data-astro-cid-y5jmkon6> ${product?.condiciones.map((feature) => renderTemplate`<li data-astro-cid-y5jmkon6>${feature}</li>`)} </ul> </div> ${renderComponent($$result2, "ButtoWhastapp", $$ButtoWhatsapp, { "text": "Comprar ahora", "message": `Hola! quiero comprar el producto servicios ${product?.title}`, "data-astro-cid-y5jmkon6": true })} </div> </div> </section> ` })} `;
}, "C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/src/pages/products/[id].astro", void 0);

const $$file = "C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/src/pages/products/[id].astro";
const $$url = "/products/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
