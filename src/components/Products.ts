import service from "@astrojs/vercel/build-image-service";

export const getProductById = (id: string) => {
  const products = [
    {
      id: '1',
      title: 'PLAN ORO',
      price: '3,25$/mes',
      categoria: 'Categoria 1',
      tipo: 'tipo 1',
      img: {
        src: '/img/products/product-1.jpg',
        alt: 'Servicio fúnebre'
      },
      features: ['Velatorio en capilla o en domicilio', 'Cremación', 'Ataúd Standard', 'Traslado del cuerpo desde el lugar donde falleció hasta el lugar de la velación/ cremación, a nivel regional',],
      adicional: {
        title: 'Servicio de salas velatorias, incluye lo siguiente: ',
        features: ['Habitación de descanso', 'Cortejo Fúnebre', 'Vehículo de acompañamiento', 'Atención Personalizada permanente', 'Servicio de cafetería', 'Apoyo en las diligencias de Ley', 'Oficios religiosos', 'Arreglo floral natural (1 Unidad)', 'Preparación externa sencilla del difunto']
      },
      condiciones: ['Hasta 70 años de edad', 'Plazo de espera 30 días']
    },
    {
      id: '2',
      title: 'PLAN PLATINUM',
      price: '9,00$/mes',
      categoria: 'Categoria 2',
      tipo: 'tipo 2',
      img: {
        src: '/img/products/product-2.jpg',
        alt: 'Imagen 2'
      },
      features: ['Velatorio en capilla o en domicilio', 'Cremación: En sustitución de servicios de inhumación', 'Ataúd Standard', 'Traslado del cuerpo desde el lugar donde falleció hasta el lugar de la velación/inhumación o cremación, según sea el caso, a nivel regional', 'Cementerio: Parcela o bóveda de 1 puesto en cementerio municipal a nivel nacional y/o servicios de inhumación (entierro).'],
      adicional: {
        title: 'Servicio de salas velatorias, incluye lo siguiente: ',
        features: ['Habitación de descanso', 'Cortejo Fúnebre', 'Vehículo de acompañamiento', 'Atención Personalizada permanente', 'Servicio de cafetería', 'Apoyo en documentación y las diligencias de Ley', 'Oficios religiosos', 'Arreglo floral natural (1 Unidad)', 'Preparación externa sencilla del difunto', 'Obituario virtual en nuestra página']
      },
      condiciones: ['Hasta 70 años de edad', 'Plazo de espera 30 días']
    },
    {
      id: '3',
      title: 'TELEMEDICINA',
      price: '3,00$/mes',
      categoria: 'Categoria 3',
      tipo: 'tipo 3',
      img: {
        src: '/img/products/product-3.jpg',
        alt: 'Imagen 3'
      },
      features: ['Acceso a récipe e informe médico digital', 'Seguimiento y acompañamiento post asistencia','Atención sanitaria primaria prestada a distancia'],
      adicional: {
        title: '',
        features: ['vía internet o telefónica las 24 horas del día, los 365 días del año, en la que nuestro afiliado podrá ser atendido por médicos especialistas que se centrarán en ofrecer la solución más adecuada al problema de salud que se presente nuestro afiliado']
      },
      condiciones: ['No aplica']
    }
    
  ];

  return products.find(product => product.id === id);
};