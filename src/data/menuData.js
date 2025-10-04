// src/data/menuData.js - Sample restaurant menu data
export const menuData = {
  restaurant: {
    name: "Spice Garden",
    tagline: "Authentic Flavors, Digital Experience",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdDg5Ytz_FUJSW2rpmddN765JFvh6R0U5BVQ&s",
    phone: "+91 98765 43210",
    address: "123 Food Street, Mumbai"
  },

  categories: [
    { id: 1, name: "Starters", icon: "🥗", count: 8 },
    { id: 2, name: "Main Course", icon: "🍛", count: 12 },
    { id: 3, name: "Beverages", icon: "🥤", count: 6 },
    { id: 4, name: "Desserts", icon: "🍨", count: 5 }
  ],

  menuItems: [
    // Starters
    {
      id: 1,
      name: "Paneer Tikka",
      description: "Grilled cottage cheese cubes marinated in aromatic spices and yogurt, served with mint chutney and onion rings",
      price: 280,
      originalPrice: 320,
      currency: "₹",
      category: "Starters",
      categoryId: 1,
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1564758866813-579dacd410f6?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1604908177522-4023ac76c597?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=900&h=700&fit=crop"
      ],
      isVeg: true,
      isVegan: false,
      isGlutenFree: true,
      spiceLevel: 2,
      prepTime: "15-20 mins",
      calories: 320,
      rating: 4.6,
      reviewCount: 124,
      tags: ["Popular", "Chef's Special"],
      ingredients: ["Paneer", "Yogurt", "Spices", "Bell Peppers"],
      allergens: ["Dairy"],
      isAvailable: true,
      isBestseller: true
    },
    {
      id: 2,
      name: "Chicken Seekh Kebab",
      description: "Juicy minced chicken skewers grilled to perfection with traditional spices and fresh herbs",
      price: 350,
      currency: "₹",
      category: "Starters",
      categoryId: 1,
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1589308078056-fb81df62d0f8?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1604908177330-56e67c8ca4a0?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&h=700&fit=crop"
      ],
      isVeg: false,
      spiceLevel: 3,
      prepTime: "20-25 mins",
      calories: 420,
      rating: 4.8,
      reviewCount: 89,
      tags: ["Spicy", "Non-Veg"],
      ingredients: ["Chicken", "Spices", "Herbs"],
      allergens: [],
      isAvailable: true
    },
    {
      id: 3,
      name: "Crispy Corn",
      description: "Golden fried corn kernels tossed with chat masala and fresh herbs",
      price: 180,
      currency: "₹",
      category: "Starters",
      categoryId: 1,
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1604908178039-1196d6ed86c8?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1550426735-5c2d0f1e1d4d?w=900&h=700&fit=crop"
      ],
      isVeg: true,
      isVegan: true,
      spiceLevel: 1,
      prepTime: "10-15 mins",
      calories: 250,
      rating: 4.4,
      reviewCount: 67,
      tags: ["Vegan", "Crunchy"],
      ingredients: ["Corn", "Chat Masala", "Herbs"],
      allergens: [],
      isAvailable: true
    },

    // Main Course
    {
      id: 4,
      name: "Butter Chicken",
      description: "Tender chicken pieces in rich, creamy tomato-based curry with aromatic spices, served with basmati rice",
      price: 420,
      currency: "₹",
      category: "Main Course",
      categoryId: 2,
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1612872087720-bb876e8edc51?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1559050019-6d7d84afd394?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1543352634-873f17a7a088?w=900&h=700&fit=crop"
      ],
      isVeg: false,
      spiceLevel: 2,
      prepTime: "25-30 mins",
      calories: 580,
      rating: 4.9,
      reviewCount: 234,
      tags: ["Popular", "Creamy"],
      ingredients: ["Chicken", "Tomatoes", "Butter", "Cream", "Spices"],
      allergens: ["Dairy"],
      isAvailable: true,
      isBestseller: true
    },
    {
      id: 5,
      name: "Dal Makhani",
      description: "Slow-cooked black lentils in creamy tomato gravy with butter and aromatic spices",
      price: 280,
      originalPrice: 320,
      currency: "₹",
      category: "Main Course",
      categoryId: 2,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1631452180499-b0934fe414f3?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1625944528957-b81960b4f0e7?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1604908177210-39fb8bcbac2b?w=900&h=700&fit=crop"
      ],
      isVeg: true,
      spiceLevel: 2,
      prepTime: "20-25 mins",
      calories: 350,
      rating: 4.7,
      reviewCount: 156,
      tags: ["Vegetarian", "Creamy"],
      ingredients: ["Black Lentils", "Tomatoes", "Butter", "Cream"],
      allergens: ["Dairy"],
      isAvailable: true
    },
    {
      id: 6,
      name: "Biryani Special",
      description: "Fragrant basmati rice layered with marinated meat/vegetables, cooked with saffron and aromatic spices",
      price: 380,
      currency: "₹",
      category: "Main Course",
      categoryId: 2,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDZ3ZQJE5fBRi12IW4NEz_y0VuCfctrITCCQ&s",
      gallery: [
        "https://images.unsplash.com/photo-1604908178091-5983e88f3673?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1598514982626-1b1b845a70d2?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1574920162043-8f6333eeff09?w=900&h=700&fit=crop"
      ],
      isVeg: false,
      spiceLevel: 3,
      prepTime: "35-40 mins",
      calories: 650,
      rating: 4.8,
      reviewCount: 198,
      tags: ["Signature", "Aromatic"],
      ingredients: ["Basmati Rice", "Meat", "Saffron", "Spices"],
      allergens: [],
      isAvailable: true,
      isBestseller: true
    },

    // Beverages
    {
      id: 7,
      name: "Mango Lassi",
      description: "Refreshing yogurt-based drink blended with fresh mango pulp and cardamom",
      price: 120,
      currency: "₹",
      category: "Beverages",
      categoryId: 3,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu8P05JVnj_B0a2aViUUrZM9Ar2Bn47jc13w&s",
      gallery: [
        "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1527169402691-feff5539e52c?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=900&h=700&fit=crop"
      ],
      isVeg: true,
      spiceLevel: 0,
      prepTime: "5 mins",
      calories: 180,
      rating: 4.7,
      reviewCount: 98,
      tags: ["Refreshing", "Sweet"],
      ingredients: ["Mango", "Yogurt", "Sugar", "Cardamom"],
      allergens: ["Dairy"],
      isAvailable: true
    },
    {
      id: 8,
      name: "Fresh Lime Soda",
      description: "Zesty fresh lime juice mixed with soda water and a hint of black salt",
      price: 80,
      currency: "₹",
      category: "Beverages",
      categoryId: 3,
      image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1527169402691-feff5539e52c?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1604908177990-5228be894ae2?w=900&h=700&fit=crop"
      ],
      isVeg: true,
      isVegan: true,
      spiceLevel: 0,
      prepTime: "3 mins",
      calories: 40,
      rating: 4.3,
      reviewCount: 45,
      tags: ["Refreshing", "Healthy"],
      ingredients: ["Fresh Lime", "Soda Water", "Black Salt"],
      allergens: [],
      isAvailable: true
    },

    // Desserts
    {
      id: 9,
      name: "Gulab Jamun",
      description: "Soft milk-based dumplings soaked in aromatic rose-flavored sugar syrup",
      price: 150,
      currency: "₹",
      category: "Desserts",
      categoryId: 4,
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1599785209707-28a7e53b5e26?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1570197788417-0b21131a978e?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&h=700&fit=crop"
      ],
      isVeg: true,
      spiceLevel: 0,
      prepTime: "5 mins",
      calories: 350,
      rating: 4.8,
      reviewCount: 145,
      tags: ["Traditional", "Sweet"],
      ingredients: ["Milk Powder", "Sugar", "Rose Water"],
      allergens: ["Dairy", "Gluten"],
      isAvailable: true
    },
    {
      id: 10,
      name: "Kulfi Falooda",
      description: "Traditional Indian ice cream layered with vermicelli, rose syrup, and nuts",
      price: 140,
      currency: "₹",
      category: "Desserts",
      categoryId: 4,
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1589308078056-fb81df62d0f8?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1570197788417-0b21131a978e?w=900&h=700&fit=crop"
      ],
      isVeg: true,
      spiceLevel: 0,
      prepTime: "5 mins",
      calories: 280,
      rating: 4.6,
      reviewCount: 78,
      tags: ["Cold", "Creamy"],
      ingredients: ["Milk", "Sugar", "Vermicelli", "Nuts"],
      allergens: ["Dairy", "Nuts"],
      isAvailable: true
    }
  ]
}
