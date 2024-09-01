/* empty css                                    */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../../chunks/astro/server_DjDDY4Fk.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_CAmY1fQs.mjs';
import { $ as $$ButtonBack } from '../../chunks/ButtonBack_oyPwJN7G.mjs';
/* empty css                                  */
export { renderers } from '../../renderers.mjs';

const $$RCV = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "RCV", "description": "Blog de responsabilidad civil", "data-astro-cid-gcwudngg": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ButtonBack", $$ButtonBack, { "ruta": "/", "data-astro-cid-gcwudngg": true })} ${maybeRenderHead()}<main data-astro-cid-gcwudngg> <div id="container" data-astro-cid-gcwudngg> <article data-astro-cid-gcwudngg> <iframe width="560" height="315" src="https://www.youtube.com/embed/fWfsNjc3pzc?si=vtIDjB9KRXLi8t4X" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen data-astro-cid-gcwudngg></iframe> </article> <h1 data-astro-cid-gcwudngg>RCV</h1> <div id="info" data-astro-cid-gcwudngg> <p data-astro-cid-gcwudngg>La RCV es un seguro obligatorio en Venezuela que todo propietario de un vehículo debe tener. Este seguro cubre los daños que tu vehículo pueda causar a terceros, ya sean personas o bienes, en caso de un accidente de tránsito. La Responsabilidad Civil del Vehículo es obligatoria por ley para garantizar que las víctimas de un accidente tengan una forma de resarcir los daños sufridos. Si causas un accidente, tu aseguradora se encargará de cubrir los gastos de las reparaciones o las lesiones de los terceros afectados, hasta el límite establecido en la póliza. La RCV no cubre:</p> <br data-astro-cid-gcwudngg> <ul data-astro-cid-gcwudngg> <li data-astro-cid-gcwudngg><strong data-astro-cid-gcwudngg>Daños a tu propio vehículo: </strong>Para proteger tu vehículo, necesitarás una cobertura adicional como la cobertura amplia.</li> <li data-astro-cid-gcwudngg><strong data-astro-cid-gcwudngg>Lesiones a los ocupantes de tu vehículo: </strong>Para cubrir a tus pasajeros, existen coberturas adicionales como la de muerte y lesiones de ocupantes.</li> </ul> <br data-astro-cid-gcwudngg> <p data-astro-cid-gcwudngg>Conducir un vehículo sin la póliza de RCV vigente es una infracción que puede acarrear multas y la retención del vehículo. Además, si causas un accidente sin tener este seguro, deberás asumir personalmente todos los gastos derivados del mismo.</p> </div> </div> </main> ` })} `;
}, "C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/src/pages/servicios/RCV.astro", void 0);

const $$file = "C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/src/pages/servicios/RCV.astro";
const $$url = "/servicios/RCV";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$RCV,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
