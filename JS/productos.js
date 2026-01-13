const productos = [
   {
    id: 1,
    nombre: "Copa de Helado",
    descripcion: "Copa refrescante con fresa natural",
    precio: 19000,
    imagen: "../Assets/Helados/copa_copa_de_helado_fresa.png",
    categoria: "Copa",
    sabores: ["fresa"],
    emocion: "feliz",
    destacado: true
  },
  {
    id: 2,
    nombre: "Helado de crema",
    descripcion: "Chocolate y vainilla en cono crujiente",
    precio: 8000,
    imagen: "../Assets/Helados/cono-vainilla-helado.jpg",
    categoria: "Helado",
    sabores: ["chocolate", "vainilla"],
    emocion: "relajado",
    destacado: true
  },
  {
    id: 3,
    nombre: "Helado de limón",
    descripcion: "Refrescante y cítrico",
    precio: 36000,
    imagen: "../Assets/Helados/helado_de_limon.png",
    categoria: "Helado",
    sabores: ["limon"],
    emocion: "intenso",
    destacado: true
  },
  {
    id: 4,
    nombre: "Waffle con helado",
    descripcion: "Waffle tibio con helado y M&M",
    precio: 17000,
    imagen: "../Assets/Helados/waffle_y_helado.png",
    categoria: "Waffle",
    sabores: ["vainilla"],
    emocion: "feliz",
    destacado: true

  },
  {
    id: 5,
    nombre: "Knickerbocker",
    descripcion: "Chocolate, fresas y galletas",
    precio: 21000,
    imagen: "../Assets/Helados/helado_knickerbocker.png",
    categoria: "Helado",
    sabores: ["chocolate"],
    emocion: "melancolico",
    destacado: true

  },
  {
    id: 6,
    nombre: "Helado de fresa",
    descripcion: "Clásico helado de crema con fresa",
    precio: 8000,
    imagen: "../Assets/Helados/cono_fresa.png",
    categoria: "Helado",
    sabores: ["fresa"],
    emocion: "feliz",
    destacado: true

  },
  {
    id: 7,
    nombre: "Copa Vainilla",
    descripcion: "Helado suave de vainilla",
    precio: 14000,
    imagen: "https://cdn.pixabay.com/photo/2015/05/15/14/47/ice-768781_1280.jpg",
    categoria: "Copa",
    sabores: ["vainilla"],
    emocion: "relajado"
  },
  {
    id: 8,
    nombre: "Sundae de Chocolate",
    descripcion: "Sundae con salsa de chocolate",
    precio: 18000,
    imagen: "https://cdn.pixabay.com/photo/2017/07/16/10/43/ice-2509849_1280.jpg",
    categoria: "Copa",
    sabores: ["chocolate"],
    emocion: "intenso"
  },
  {
    id: 9,
    nombre: "Helado Fresa Artesanal",
    descripcion: "Helado artesanal de fresa",
    precio: 15000,
    imagen: "https://cdn.pixabay.com/photo/2015/11/09/21/47/ice-ice-cream-1030795_1280.jpg",
    categoria: "Helado",
    sabores: ["fresa"],
    emocion: "feliz"
  },
  {
    id: 10,
    nombre: "Copa Limón",
    descripcion: "Copa fría de limón",
    precio: 14000,
    imagen: "https://cdn.pixabay.com/photo/2016/01/05/13/58/ice-1120007_1280.jpg",
    categoria: "Copa",
    sabores: ["limon"],
    emocion: "intenso"
  },
  {
    id: 11,
    nombre: "Helado Chocolate Suave",
    descripcion: "Textura cremosa y sabor intenso",
    precio: 13000,
    imagen: "https://cdn.pixabay.com/photo/2016/05/25/12/30/ice-cream-1418496_1280.jpg",
    categoria: "Helado",
    sabores: ["chocolate"],
    emocion: "melancolico"
  },
  {
    id: 12,
    nombre: "Cono Vainilla Clásico",
    descripcion: "Cono simple de vainilla",
    precio: 7000,
    imagen: "https://cdn.pixabay.com/photo/2016/11/29/04/22/ice-cream-1869875_1280.jpg",
    categoria: "Helado",
    sabores: ["vainilla"],
    emocion: "relajado"
  },
  {
    id: 13,
    nombre: "Copa Mixta Fresa Vainilla",
    descripcion: "Combinación suave y dulce",
    precio: 20000,
    imagen: "https://cdn.pixabay.com/photo/2019/06/18/16/49/ice-4281894_1280.jpg",
    categoria: "Copa",
    sabores: ["fresa", "vainilla"],
    emocion: "feliz"
  },
  {
    id: 14,
    nombre: "Helado Limón Natural",
    descripcion: "Ideal para días calurosos",
    precio: 12000,
    imagen: "https://cdn.pixabay.com/photo/2018/03/10/19/52/ice-3219928_1280.jpg",
    categoria: "Helado",
    sabores: ["limon"],
    emocion: "intenso"
  },
  {
    id: 15,
    nombre: "Sundae Fresa",
    descripcion: "Helado con salsa de fresa",
    precio: 17000,
    imagen: "https://cdn.pixabay.com/photo/2020/06/05/21/07/ice-cream-5266228_1280.jpg",
    categoria: "Copa",
    sabores: ["fresa"],
    emocion: "feliz"
  },
  {
    id: 16,
    nombre: "Helado Chocolate Cremoso",
    descripcion: "Chocolate intenso y cremoso",
    precio: 16000,
    imagen: "https://cdn.pixabay.com/photo/2017/09/10/17/22/ice-2734660_1280.jpg",
    categoria: "Helado",
    sabores: ["chocolate"],
    emocion: "melancolico"
  },
  {
    id: 17,
    nombre: "Copa Vainilla Deluxe",
    descripcion: "Vainilla premium",
    precio: 22000,
    imagen: "https://cdn.pixabay.com/photo/2017/03/11/18/46/ice-cream-2139031_1280.jpg",
    categoria: "Copa",
    sabores: ["vainilla"],
    emocion: "relajado"
  },
  {
    id: 18,
    nombre: "Helado Fresa Cremoso",
    descripcion: "Fresa dulce y natural",
    precio: 14000,
    imagen: "https://cdn.pixabay.com/photo/2017/07/22/20/38/ice-cream-2527881_1280.jpg",
    categoria: "Helado",
    sabores: ["fresa"],
    emocion: "feliz"
  },
  {
    id: 19,
    nombre: "Helado Chocolate Intenso",
    descripcion: "Para amantes del chocolate",
    precio: 18000,
    imagen: "https://cdn.pixabay.com/photo/2020/05/18/16/46/ice-5189207_1280.jpg",
    categoria: "Helado",
    sabores: ["chocolate"],
    emocion: "intenso"
  },
  {
    id: 20,
    nombre: "Helado Vainilla Tradicional",
    descripcion: "Sabor clásico y suave",
    precio: 10000,
    imagen: "https://cdn.pixabay.com/photo/2017/04/05/00/58/ice-2198079_1280.jpg",
    categoria: "Helado",
    sabores: ["vainilla"],
    emocion: "relajado"
  }

  
//   {
//     "id": 7,
//     "nombre": "Cono de Vainilla",
//     "descripcion": "El clásico barquillo crujiente con helado de vainilla",
//     "precio": 8000,
//     "imagen": "https://cdn.pixabay.com/photo/2015/05/15/14/47/ice-768781_1280.jpg",
//     "categoria": "Cono",
//     "sabores": ["vainilla"],
//     "emocion": "relajado"
//   },
//   {
//     "id": 8,
//     "nombre": "Vaso de Chocolate",
//     "descripcion": "Helado cremoso de chocolate servido en vaso",
//     "precio": 10000,
//     "imagen": "https://cdn.pixabay.com/photo/2017/07/16/10/43/ice-2509849_1280.jpg",
//     "categoria": "Vaso",
//     "sabores": ["chocolate"],
//     "emocion": "intenso"
//   },
//   {
//     "id": 9,
//     "nombre": "Cono de Fresa",
//     "descripcion": "Barquillo dulce con helado de fresa natural",
//     "precio": 8500,
//     "imagen": "https://cdn.pixabay.com/photo/2015/11/09/21/47/ice-ice-cream-1030795_1280.jpg",
//     "categoria": "Cono",
//     "sabores": ["fresa"],
//     "emocion": "feliz"
//   },
//   {
//     "id": 10,
//     "nombre": "Vaso de Limón",
//     "descripcion": "Refrescante sorbete de limón en vaso",
//     "precio": 9000,
//     "imagen": "https://cdn.pixabay.com/photo/2016/01/05/13/58/ice-1120007_1280.jpg",
//     "categoria": "Vaso",
//     "sabores": ["limon"],
//     "emocion": "intenso"
//   },
//   {
//     "id": 11,
//     "nombre": "Cono Mixto Choco-Vainilla",
//     "descripcion": "Doble sabor: chocolate y vainilla en barquillo",
//     "precio": 9500,
//     "imagen": "https://cdn.pixabay.com/photo/2016/05/25/12/30/ice-cream-1418496_1280.jpg",
//     "categoria": "Cono",
//     "sabores": ["chocolate", "vainilla"],
//     "emocion": "feliz"
//   },
//   {
//     "id": 12,
//     "nombre": "Vaso de Vainilla",
//     "descripcion": "Porción sencilla de vainilla en vaso",
//     "precio": 7000,
//     "imagen": "https://cdn.pixabay.com/photo/2016/11/29/04/22/ice-cream-1869875_1280.jpg",
//     "categoria": "Vaso",
//     "sabores": ["vainilla"],
//     "emocion": "relajado"
//   },
//   {
//     "id": 13,
//     "nombre": "Cono Mixto Fresa-Vainilla",
//     "descripcion": "Combinación suave de fresa y vainilla",
//     "precio": 9500,
//     "imagen": "https://cdn.pixabay.com/photo/2019/06/18/16/49/ice-4281894_1280.jpg",
//     "categoria": "Cono",
//     "sabores": ["fresa", "vainilla"],
//     "emocion": "feliz"
//   },
//   {
//     "id": 14,
//     "nombre": "Vaso de Limón Grande",
//     "descripcion": "Ideal para refrescarse, porción doble",
//     "precio": 12000,
//     "imagen": "https://cdn.pixabay.com/photo/2018/03/10/19/52/ice-3219928_1280.jpg",
//     "categoria": "Vaso",
//     "sabores": ["limon"],
//     "emocion": "intenso"
//   },
//   {
//     "id": 15,
//     "nombre": "Cono de Chocolate Doble",
//     "descripcion": "Doble bola de chocolate intenso en barquillo",
//     "precio": 11500,
//     "imagen": "https://cdn.pixabay.com/photo/2020/06/05/21/07/ice-cream-5266228_1280.jpg",
//     "categoria": "Cono",
//     "sabores": ["chocolate"],
//     "emocion": "intenso"
//   },
//   {
//     "id": 16,
//     "nombre": "Vaso Mixto Fresa-Chocolate",
//     "descripcion": "El balance perfecto entre dulce y frutal",
//     "precio": 11000,
//     "imagen": "https://cdn.pixabay.com/photo/2017/09/10/17/22/ice-2734660_1280.jpg",
//     "categoria": "Vaso",
//     "sabores": ["fresa", "chocolate"],
//     "emocion": "feliz"
//   },
//   {
//     "id": 17,
//     "nombre": "Cono de Vainilla Especial",
//     "descripcion": "Vainilla cremosa en barquillo artesanal",
//     "precio": 9000,
//     "imagen": "https://cdn.pixabay.com/photo/2017/03/11/18/46/ice-cream-2139031_1280.jpg",
//     "categoria": "Cono",
//     "sabores": ["vainilla"],
//     "emocion": "relajado"
//   },
//   {
//     "id": 18,
//     "nombre": "Vaso de Fresa",
//     "descripcion": "Helado cremoso de fresa en vaso",
//     "precio": 9000,
//     "imagen": "https://cdn.pixabay.com/photo/2017/07/22/20/38/ice-cream-2527881_1280.jpg",
//     "categoria": "Vaso",
//     "sabores": ["fresa"],
//     "emocion": "feliz"
//   },
//   {
//     "id": 19,
//     "nombre": "Cono de Chocolate Negro",
//     "descripcion": "Sabor a chocolate profundo en barquillo",
//     "precio": 10000,
//     "imagen": "https://cdn.pixabay.com/photo/2020/05/18/16/46/ice-5189207_1280.jpg",
//     "categoria": "Cono",
//     "sabores": ["chocolate"],
//     "emocion": "intenso"
//   },
//   {
//     "id": 20,
//     "nombre": "Vaso de Vainilla Clásico",
//     "descripcion": "Sabor tradicional en formato práctico",
//     "precio": 8500,
//     "imagen": "https://cdn.pixabay.com/photo/2017/04/05/00/58/ice-2198079_1280.jpg",
//     "categoria": "Vaso",
//     "sabores": ["vainilla"],
//     "emocion": "relajado"
//   }
// ]
];
