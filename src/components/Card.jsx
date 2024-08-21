import { getProductById } from './Products.ts'; 

const Card = ({ idCard }) => {
  if (idCard === undefined) {
    return <div>No encontrado</div>;
  }

  const product = getProductById(idCard);
  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="card">
      <img src={product.img.src} alt={product.img.alt} style={{ width: '100%' }} />
      <div className="container">
        <h4>
          <b>{product.title}</b>
        </h4>
        <p>{product.price}</p>
        <ul>
          {product.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <a href="">
          <button>Ver detalles</button>
        </a>
      </div>
    </div>
  );
};

export default Card;

