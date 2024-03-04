const product = [
    {
        id: 1,
        name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
        category: "women",
        image: require('../images/productsImg/product_1.jpg'),
        new_price: 50.0,
        old_price: 80.5,
        slug: "striped-flutter-sleeve-1",
    },
    {
        id: 2,
        name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
        category: "women",
        image: require('../images/productsImg/product_2.jpg'),
        new_price: 85.0,
        old_price: 120.5,
        slug: "striped-flutter-sleeve-2",
    },
    {
        id: 3,
        name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
        category: "women",
        image: require('../images/productsImg/product_3.jpg'),
        new_price: 60.0,
        old_price: 100.5,
        slug: "striped-flutter-sleeve-3",
    },
    {
        id: 4,
        name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
        category: "women",
        image: require('../images/productsImg/product_4.jpg'),
        new_price: 100.0,
        old_price: 150.0,
        slug: "striped-flutter-sleeve-4",
    },
    {
        id: 5,
        name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
        category: "women",
        image: require('../images/productsImg/product_5.jpg'),
        new_price: 85.0,
        old_price: 120.5,
        slug: "striped-flutter-sleeve-5",
    },
    {
        id: 6,
        name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
        category: "men",
        image: require('../images/productsImg/product_6.jpg'),
        new_price: 85.0,
        old_price: 120.5,
        slug: "men-bomber-jacket-1",
      },
      {
        id: 7,
        name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
        category: "men",
        image: require('../images/productsImg/product_7.jpg'),
        new_price: 85.0,
        old_price: 120.5,
        slug: "men-bomber-jacket-2",
      },
      {
        id: 8,
        name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
        category: "men",
        image: require('../images/productsImg/product_8.jpg'),
        new_price: 85.0,
        old_price: 120.5,
        slug: "men-bomber-jacket-3",
      },
      {
        id: 9,
        name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
        category: "men",
        image: require('../images/productsImg/product_9.jpg'),
        new_price: 85.0,
        old_price: 120.5,
        slug: "men-bomber-jacket-4",
      },
      {
        id: 10,
        name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
        category: "men",
        image: require('../images/productsImg/product_10.jpg'),
        new_price: 85.0,
        old_price: 120.5,
        slug: "men-bomber-jacket-5",
      },
      {
        id: 11,
        name: "Boys Orange Colourblocked Hooded Sweatshirt",
        category: "kid",
        image: require('../images/productsImg/product_11.jpg'),
        new_price: 85.0,
        old_price: 120.5,
        slug: "kid-boy-1",
      },
      {
        id: 12,
        name: "Boys Orange Colourblocked Hooded Sweatshirt",
        category: "kid",
        image: require('../images/productsImg/product_12.jpg'),
        new_price: 85.0,
        old_price: 120.5,
        slug: "kid-boy-2",
      },
]

const getAllProducts = () => product

const getProduct = (count) => {
    const max = books.length - count
    const min = 0
    const start = Math.floor(Math.random() * (max - min) + min)
    return books.slice(start, start + count)
}

const getProductBySlug = (slug) => product.find(e => e.slug === slug)

const productData = {
    getAllProducts,
    getProduct,
    getProductBySlug
}

export default productData