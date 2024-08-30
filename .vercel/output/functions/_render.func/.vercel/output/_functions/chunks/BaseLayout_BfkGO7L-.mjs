import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute, b as createAstro, d as renderComponent, e as renderHead, f as renderSlot } from './astro/server_Cyul0w3y.mjs';
/* empty css                         */

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer id="footer" data-astro-cid-sz7xmlte> <div id="Container" data-astro-cid-sz7xmlte> <div id="container-izquierdo" data-astro-cid-sz7xmlte> <img src="../img/Isotipo_TKUIDO.png" alt="logo TKUIDO" data-astro-cid-sz7xmlte> <div class="social" data-astro-cid-sz7xmlte> <a href="https://www.instagram.com/tkuido247?igsh=cWxuMXR4OTM0c2Jm" data-astro-cid-sz7xmlte> <img src="../img/icons/icono-instagram.png" alt="instagram" data-astro-cid-sz7xmlte> </a> <a href="https://www.facebook.com/people/TKuido-247/61564934094455/" data-astro-cid-sz7xmlte> <img src="../img/icons/icon-facebook.png" alt="facebook" data-astro-cid-sz7xmlte> </a> <a href="https://www.tiktok.com/@tkuido.247?_t=8pFx3vxYutK&_r=1" data-astro-cid-sz7xmlte> <img src="../img/icons/icon-tik-tok.png" alt="tik tok" data-astro-cid-sz7xmlte> </a> <a href="https://www.linkedin.com/company/tkuido-24-7/" data-astro-cid-sz7xmlte> <img src="../img/icons/icon-linkedin.png" alt="linkedin" data-astro-cid-sz7xmlte> </a> </div> </div> <div class="container-derecha" data-astro-cid-sz7xmlte> <div class="links-derecha" data-astro-cid-sz7xmlte> <h4 data-astro-cid-sz7xmlte>Inicio</h4> <a href="/#noticias-container" data-astro-cid-sz7xmlte>Noticias</a> <a href="/#servicio-container" data-astro-cid-sz7xmlte>Servicios</a> <a href="/#polizas-container" data-astro-cid-sz7xmlte>Productos</a> <a href="/#nosotro-container" data-astro-cid-sz7xmlte>Nosotros</a> <a href="/#contacto-container" data-astro-cid-sz7xmlte>Contáctanos</a> </div> <div class="links-derecha" data-astro-cid-sz7xmlte> <h4 data-astro-cid-sz7xmlte>Legal</h4> <a href="/Build" data-astro-cid-sz7xmlte>Términos y condiciones</a> <a href="/Build" data-astro-cid-sz7xmlte>Políticas de privacidad</a> <a href="/Build" data-astro-cid-sz7xmlte>Política de cookies</a> </div> </div> </div> <hr data-astro-cid-sz7xmlte> <p data-astro-cid-sz7xmlte>Copyright © 2024, TKUIDO</p> </footer> `;
}, "C:/Users/Christopher/Desktop/TKUIDO/src/components/Footer.astro", void 0);

const $$Astro$2 = createAstro();
const $$ButtoWhatsapp = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ButtoWhatsapp;
  const { text, message } = Astro2.props;
  const whatsappUrl = `https://wa.me/584264389499?text=${encodeURIComponent(message || "")}`;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(whatsappUrl, "href")} target="_blank" rel="noopener" data-astro-cid-57t65ufm> <button data-astro-cid-57t65ufm>${text} <img src="../img/icons/icons-whatsapp.svg" alt="icono whatsapp" data-astro-cid-57t65ufm> </button> </a> `;
}, "C:/Users/Christopher/Desktop/TKUIDO/src/components/ButtoWhatsapp.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header data-astro-cid-3ef6ksr2> <div id="logo-container" data-astro-cid-3ef6ksr2> <a href="/" aria-label="Go to homepage" data-astro-cid-3ef6ksr2> <img src="../img/Isotipo_TKUIDO.png" alt="TKUIDO" width="100" height="100" data-astro-cid-3ef6ksr2> </a> <h1 data-astro-cid-3ef6ksr2>TKUIDO</h1> </div> <div id="navbar-inicio" data-astro-cid-3ef6ksr2> <nav class="navbar" data-astro-cid-3ef6ksr2> <label class="labe_hamburguesa" for="menu_hamburguesa" data-astro-cid-3ef6ksr2> <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="list_icon" viewBox="0 0 16 16" data-astro-cid-3ef6ksr2> <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" data-astro-cid-3ef6ksr2></path> </svg> </label> <input class="menu_hamburguesa" type="checkbox" name="" id="menu_hamburguesa" data-astro-cid-3ef6ksr2> <ul class="ul-links" data-astro-cid-3ef6ksr2> <li class="li-link" data-astro-cid-3ef6ksr2> <a class="links" href="/" data-astro-cid-3ef6ksr2>Inicio</a> </li> <li class="li-link" data-astro-cid-3ef6ksr2> <a class="links" href="/#noticias-container" data-astro-cid-3ef6ksr2>Noticias</a> </li> <li class="li-link" data-astro-cid-3ef6ksr2> <a class="links" href="/#servicio-container" data-astro-cid-3ef6ksr2>Servicios</a> </li> <li class="li-link" data-astro-cid-3ef6ksr2> <a class="links" href="/#polizas-container" data-astro-cid-3ef6ksr2>Productos</a> </li> <li class="li-link" data-astro-cid-3ef6ksr2> <a class="links" href="/#nosotro-container" data-astro-cid-3ef6ksr2>Nosotros</a> </li> <li class="li-link" data-astro-cid-3ef6ksr2> <a class="links" href="/#contacto-container" data-astro-cid-3ef6ksr2>Contáctanos</a> </li> </ul> </nav> ${renderComponent($$result, "ButtoWhatsapp", $$ButtoWhatsapp, { "text": "Consulta en Linea", "message": "Hola! quiero m\xE1s informaci\xF3n de sus servicios", "data-astro-cid-3ef6ksr2": true })} </div> </header> `;
}, "C:/Users/Christopher/Desktop/TKUIDO/src/components/Header.astro", void 0);

const $$Astro$1 = createAstro();
const $$ViewTransitions = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "C:/Users/Christopher/Desktop/TKUIDO/node_modules/.pnpm/astro@4.13.3_typescript@5.5.4/node_modules/astro/components/ViewTransitions.astro", void 0);

const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title, description } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width"><link rel="icon" type="image" href="../img/Isotipo_TKUIDO.png"><title>${title}</title>${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "C:/Users/Christopher/Desktop/TKUIDO/src/layout/BaseLayout.astro", void 0);

export { $$BaseLayout as $, $$ButtoWhatsapp as a };
