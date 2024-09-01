import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute, b as createAstro } from './astro/server_DjDDY4Fk.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                             */

const $$Astro = createAstro();
const $$ButtonBack = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ButtonBack;
  const { ruta } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(ruta, "href")} data-astro-cid-tjje2knh> <button data-astro-cid-tjje2knh> <img src="/img/icons/arrowLeft.png" alt="Voler página anterior" data-astro-cid-tjje2knh>
Volver
</button> </a> `;
}, "C:/Users/indatech/Desktop/TKUIDO/tkuido-landing/src/components/ButtonBack.astro", void 0);

export { $$ButtonBack as $ };
