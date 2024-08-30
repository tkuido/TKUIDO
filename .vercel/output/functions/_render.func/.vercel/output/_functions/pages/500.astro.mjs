/* empty css                                 */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_Cyul0w3y.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BfkGO7L-.mjs';
/* empty css                               */
export { renderers } from '../renderers.mjs';

const $$500 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "500", "description": "Error interno", "data-astro-cid-5v2qf5k4": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main id="main-500" data-astro-cid-5v2qf5k4> <h1 data-astro-cid-5v2qf5k4>500</h1> <p data-astro-cid-5v2qf5k4>
Ha ocurrido un error interno en el servidor. Por favor, vuelva a
      intentarlo más tarde.
</p> <button data-astro-cid-5v2qf5k4> <a href="/" data-astro-cid-5v2qf5k4>Volver al inicio</a> </button> </main> ` })} `;
}, "C:/Users/Christopher/Desktop/TKUIDO/src/pages/500.astro", void 0);

const $$file = "C:/Users/Christopher/Desktop/TKUIDO/src/pages/500.astro";
const $$url = "/500";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$500,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
