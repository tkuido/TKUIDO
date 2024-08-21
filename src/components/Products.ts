export const getProductById = (id: string) => {
  const products = [
    {
      id: '1',
      title: 'Titulo 1',
      price: 'Precio 1',
      img: {
        src: '',
        alt: 'Imagen 1'
      },
      features: ['caracteristica 1', 'caracteristica 2', 'caracteristica 3']
    },
    {
      id: '2',
      title: 'Titulo 2',
      price: 'Precio 2',
      img: {
        src: '',
        alt: 'Imagen 2'
      },
      features: ['caracteristica 1', 'caracteristica 2', 'caracteristica 3']
    },
    {
      id: '3',
      title: 'Titulo 3',
      price: 'Precio 3',
      img: {
        src: '',
        alt: 'Imagen 3'
      },
      features: ['caracteristica 1', 'caracteristica 2', 'caracteristica 3']
    },
    {
      id: '4',
      title: 'Titulo 4',
      price: 'Precio 4',
      img: {
        src: '',
        alt: 'Imagen 4'
      },
      features: ['caracteristica 1', 'caracteristica 2', 'caracteristica 3']
    },
    {
      id: '5',
      title: 'Titulo 5',
      price: 'Precio 5',
      img: {
        src: '',
        alt: 'Imagen 5'
      },
      features: ['caracteristica 1', 'caracteristica 2', 'caracteristica 3']
    }
  ];

  return products.find(product => product.id === id);
};