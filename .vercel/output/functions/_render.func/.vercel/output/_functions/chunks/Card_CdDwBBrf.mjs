import { jsx, jsxs } from 'react/jsx-runtime';
import { g as getProductById } from './Products_DheOjLTV.mjs';

const Card = ({ idCard }) => {
  if (idCard === void 0) {
    return /* @__PURE__ */ jsx("div", { className: "text-gray-500", children: "No encontrado" });
  }
  const product = getProductById(idCard);
  if (!product) {
    return /* @__PURE__ */ jsx("div", { className: "text-gray-500", children: "Producto no encontrado" });
  }
  return /* @__PURE__ */ jsxs("div", { className: "card bg-white shadow-md rounded-3xl overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: product.img.src,
        alt: product.img.alt,
        className: "w-full object-cover"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "p-7", children: [
      /* @__PURE__ */ jsx("h4", { className: "font-bold text-lg mb-2", children: product.title }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-700 mb-4", children: product.price }),
      /* @__PURE__ */ jsx("ul", { className: "list-disc list-inside mb-4", children: product.features.slice(0, 3).map((feature, index) => /* @__PURE__ */ jsx("li", { className: "text-gray-600", children: feature }, index)) }),
      /* @__PURE__ */ jsx("a", { href: `/products/${idCard}`, children: /* @__PURE__ */ jsx("button", { className: "bg-backgroundButton hover:bg-backgroundButtonHover text-white font-bold py-2 px-4 rounded-xl", children: "Ver detalles" }) })
    ] })
  ] });
};

export { Card as C };
