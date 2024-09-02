import { getProductById } from "./Products.ts";

const Card = ({ idCard }) => {
  if (idCard === undefined) {
    return <div className="text-gray-500">No encontrado</div>;
  }

  const product = getProductById(idCard);
  if (!product) {
    return <div className="text-gray-500">Producto no encontrado</div>;
  }

  return (
    <div className="card bg-white shadow-md rounded-3xl overflow-hidden">
      <img
        src={product.img.src}
        alt={product.img.alt}
        className="w-full object-cover h-40"
      />
      <div className="p-7 flex flex-col justify-between h-96">
        <div>
          <h4 className="font-bold text-lg mb-2">{product.title}</h4>
          <p className="text-gray-700 mb-4">{product.price}</p>

          <ul className="list-disc list-inside mb-4">
            {product.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="text-gray-600">
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <a href={`/products/${idCard}`}>
          <button className="bg-backgroundButton hover:bg-backgroundButtonHover text-white font-bold py-2 px-4 rounded-xl">
            Ver detalles
          </button>
        </a>
      </div>
    </div>
  );
};

export default Card;
