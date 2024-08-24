import service from "@astrojs/vercel/build-image-service";

export const getProductById = (id: string) => {
  const products = [
    {
      id: '1',
      title: 'PLAN ORO',
      price: 'Precio 1',
      categoria: 'Categoria 1',
      tipo: 'tipo 1',
      img: {
        src: '/img/products/product-1.jpg',
        alt: 'Imagen 1'
      },
      features: ['Velatorio en capilla o en domicilio', 'Cremación', 'Ataúd Standard', 'Traslado del cuerpo desde el lugar donde falleció hasta el lugar de la velación/ cremación, a nivel regional'],
      adicional: {
        title: 'Servicio de salas velatorias, incluye lo siguiente: ',
        features: ['Habitación de descanso', 'Cortejo Fúnebre', 'Vehículo de acompañamiento', 'Atención Personalizada permanente', 'Servicio de cafetería', 'Apoyo en las diligencias de Ley', 'Oficios religiosos', 'Arreglo floral natural (1 Unidad)', 'Preparación externa sencilla del difunto']
      },
      condiciones: ['Hasta 70 años de edad', 'Plazo de espera 30 días']
    },
    {
      id: '2',
      title: 'PLAN PLATA',
      price: 'Precio 2',
      categoria: 'Categoria 2',
      tipo: 'tipo 2',
      img: {
        src: '/img/products/product-2.jpg',
        alt: 'Imagen 2'
      },
      features: ['Velatorio en capilla o en domicilio', 'Cremación', 'Ataúd Standard', 'Traslado del cuerpo desde el lugar donde falleció hasta el lugar de la velación/ cremación, a nivel regional'],
      adicional: {
        title: 'Servicio de salas velatorias, incluye lo siguiente: ',
        features: ['Habitación de descanso', 'Cortejo Fúnebre', 'Vehículo de acompañamiento', 'Atención Personalizada permanente', 'Servicio de cafetería', 'Apoyo en las diligencias de Ley', 'Oficios religiosos', 'Arreglo floral natural (1 Unidad)', 'Preparación externa sencilla del difunto']
      },
      condiciones: ['Hasta 70 años de edad', 'Plazo de espera 30 días']
    },
    {
      id: '3',
      title: 'PLAN BRONCE',
      price: 'Precio 3',
      categoria: 'Categoria 3',
      tipo: 'tipo 3',
      img: {
        src: '/img/products/product-3.jpg',
        alt: 'Imagen 3'
      },
      features: ['Velatorio en capilla o en domicilio', 'Cremación', 'Ataúd Standard', 'Traslado del cuerpo desde el lugar donde falleció hasta el lugar de la velación/ cremación, a nivel regional'],
      adicional: {
        title: 'Servicio de salas velatorias, incluye lo siguiente: ',
        features: ['Habitación de descanso', 'Cortejo Fúnebre', 'Vehículo de acompañamiento', 'Atención Personalizada permanente', 'Servicio de cafetería', 'Apoyo en las diligencias de Ley', 'Oficios religiosos', 'Arreglo floral natural (1 Unidad)', 'Preparación externa sencilla del difunto']
      },
      condiciones: ['Hasta 70 años de edad', 'Plazo de espera 30 días']
    }
    
  ];

  return products.find(product => product.id === id);
};