// src/data/menuData.js - Sample restaurant menu data
export const menuData = {
  restaurant: {
    name: "Spice Garden",
    tagline: "Authentic Flavors, Digital Experience",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdDg5Ytz_FUJSW2rpmddN765JFvh6R0U5BVQ&s",
    phone: "+91 98765 43210",
    address: "123 Food Street, Mumbai"
  },

  // API response format for categories
  categoriesApiResponse: {
    "success": true,
    "status": 200,
    "message": "Categories fetched successfully",
    "data": [
        {
            "_id": "68e0d4772ea12265636db3df",
            "name": "Starters & Appetizers(D)",
            "restaurantId": null,
            "isActive": 1,
            "createdAt": "2025-09-11T08:45:20.971Z",
            "updatedAt": "2025-09-13T10:45:55.242Z",
            "isDefault": 1
        },
        {
            "_id": "68e0d4772ea12265636db3e0",
            "name": "Main Course(D)",
            "restaurantId": null,
            "isActive": 1,
            "createdAt": "2025-09-11T08:45:20.971Z",
            "updatedAt": "2025-09-13T10:45:55.242Z",
            "isDefault": 1
        },
        {
            "_id": "68e0d4772ea12265636db3e1",
            "name": "Sides(D)",
            "restaurantId": null,
            "isActive": 1,
            "createdAt": "2025-09-11T08:45:20.971Z",
            "updatedAt": "2025-09-13T10:45:55.242Z",
            "isDefault": 1
        }
    ]
  },

  menuItems: [
    // Starters
    {
      "_id": "starter_001",
      "itemName": "Paneer Tikka",
      "description": "Grilled cottage cheese cubes marinated in aromatic spices and yogurt, served with mint chutney and onion rings",
      "price": 320,
      "discountPrice": 280,
      "quantity": "8 pieces",
      "itemCategory": "veg",
      "productCategory": "68e0d4772ea12265636db3df",
      "prepTime": "15-20 mins",
      "calories": 320,
      "spicyLevel": 2,
      "rating": 4.6,
      "ingredients": [
        "Paneer", "Yogurt", "Spices", "Bell Peppers"
      ],
      "image": [
        "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1564758866813-579dacd410f6?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1604908177522-4023ac76c597?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=900&h=700&fit=crop"
      ],
      "resId": "spice_garden_restaurant",
      "createdAt": "2025-01-01T10:00:00.000Z",
      "updatedAt": "2025-01-01T10:00:00.000Z",
      "__v": 0
    },
    {
      "_id": "starter_002",
      "itemName": "Chicken Seekh Kebab",
      "description": "Juicy minced chicken skewers grilled to perfection with traditional spices and fresh herbs",
      "price": 400,
      "discountPrice": 350,
      "quantity": "6 pieces",
      "itemCategory": "non-veg",
      "productCategory": "68e0d4772ea12265636db3df",
      "prepTime": "20-25 mins",
      "calories": 420,
      "spicyLevel": 3,
      "rating": 4.8,
      "ingredients": [
        "Chicken", "Spices", "Herbs"
      ],
      "image": [
        "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1589308078056-fb81df62d0f8?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1604908177210-39fb8bcbac2b?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&h=700&fit=crop"
      ],
      "resId": "spice_garden_restaurant",
      "createdAt": "2025-01-01T10:00:00.000Z",
      "updatedAt": "2025-01-01T10:00:00.000Z",
      "__v": 0
    },
    {
      "_id": "starter_003",
      "itemName": "Crispy Corn",
      "description": "Golden fried corn kernels tossed with chat masala and fresh herbs",
      "price": 200,
      "discountPrice": 180,
      "quantity": "1 bowl",
      "itemCategory": "veg",
      "productCategory": "68e0d4772ea12265636db3df",
      "prepTime": "10-15 mins",
      "calories": 250,
      "spicyLevel": 1,
      "rating": 4.4,
      "ingredients": [
        "Corn", "Chat Masala", "Herbs"
      ],
      "image": [
        "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1604908178091-5983e88f3673?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1550426735-5c2d0f1e1d4d?w=900&h=700&fit=crop"
      ],
      "resId": "spice_garden_restaurant",
      "createdAt": "2025-01-01T10:00:00.000Z",
      "updatedAt": "2025-01-01T10:00:00.000Z",
      "__v": 0
    },

    // Main Course
    {
      "_id": "main_001",
      "itemName": "Butter Chicken",
      "description": "Tender chicken pieces in rich, creamy tomato-based curry with aromatic spices, served with basmati rice",
      "price": 450,
      "discountPrice": 420,
      "quantity": "1 plate",
      "itemCategory": "non-veg",
      "productCategory": "68e0d4772ea12265636db3e0",
      "prepTime": "25-30 mins",
      "calories": 580,
      "spicyLevel": 2,
      "rating": 4.9,
      "ingredients": [
        "Chicken", "Tomatoes", "Butter", "Cream", "Spices"
      ],
      "image": [
        "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1612872087720-bb876e8edc51?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1559050019-6d7d84afd394?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1543352634-873f17a7a088?w=900&h=700&fit=crop"
      ],
      "resId": "spice_garden_restaurant",
      "createdAt": "2025-01-01T10:00:00.000Z",
      "updatedAt": "2025-01-01T10:00:00.000Z",
      "__v": 0
    },
    {
      "_id": "main_002",
      "itemName": "Dal Makhani",
      "description": "Slow-cooked black lentils in creamy tomato gravy with butter and aromatic spices",
      "price": 320,
      "discountPrice": 280,
      "quantity": "1 plate",
      "itemCategory": "veg",
      "productCategory": "68e0d4772ea12265636db3e0",
      "prepTime": "20-25 mins",
      "calories": 350,
      "spicyLevel": 2,
      "rating": 4.7,
      "ingredients": [
        "Black Lentils", "Tomatoes", "Butter", "Cream"
      ],
      "image": [
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1631452180499-b0934fe414f3?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1625944528957-b81960b4f0e7?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1604908177210-39fb8bcbac2b?w=900&h=700&fit=crop"
      ],
      "resId": "spice_garden_restaurant",
      "createdAt": "2025-01-01T10:00:00.000Z",
      "updatedAt": "2025-01-01T10:00:00.000Z",
      "__v": 0
    },
    {
      "_id": "main_003",
      "itemName": "Biryani Special",
      "description": "Fragrant basmati rice layered with marinated meat/vegetables, cooked with saffron and aromatic spices",
      "price": 420,
      "discountPrice": 380,
      "quantity": "1 plate",
      "itemCategory": "non-veg",
      "productCategory": "68e0d4772ea12265636db3e0",
      "prepTime": "35-40 mins",
      "calories": 650,
      "spicyLevel": 3,
      "rating": 4.8,
      "ingredients": [
        "Basmati Rice", "Meat", "Saffron", "Spices"
      ],
      "image": [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDZ3ZQJE5fBRi12IW4NEz_y0VuCfctrITCCQ&s",
        "https://images.unsplash.com/photo-1604908178091-5983e88f3673?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1598514982626-1b1b845a70d2?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1574920162043-8f6333eeff09?w=900&h=700&fit=crop"
      ],
      "resId": "spice_garden_restaurant",
      "createdAt": "2025-01-01T10:00:00.000Z",
      "updatedAt": "2025-01-01T10:00:00.000Z",
      "__v": 0
    },

    // Beverages
    {
      "_id": "bev_001",
      "itemName": "Mango Lassi",
      "description": "Refreshing yogurt-based drink blended with fresh mango pulp and cardamom",
      "price": 150,
      "discountPrice": 120,
      "quantity": "1 glass",
      "itemCategory": "veg",
      "productCategory": "68e0d4772ea12265636db3e3",
      "prepTime": "5 mins",
      "calories": 180,
      "spicyLevel": 0,
      "rating": 4.7,
      "ingredients": [
        "Mango", "Yogurt", "Sugar", "Cardamom"
      ],
      "image": [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu8P05JVnj_B0a2aViUUrZM9Ar2Bn47jc13w&s",
        "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1527169402691-feff5539e52c?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=900&h=700&fit=crop"
      ],
      "resId": "spice_garden_restaurant",
      "createdAt": "2025-01-01T10:00:00.000Z",
      "updatedAt": "2025-01-01T10:00:00.000Z",
      "__v": 0
    },
    {
      "_id": "bev_002",
      "itemName": "Fresh Lime Soda",
      "description": "Zesty fresh lime juice mixed with soda water and a hint of black salt",
      "price": 100,
      "discountPrice": 80,
      "quantity": "1 glass",
      "itemCategory": "veg",
      "productCategory": "68e0d4772ea12265636db3e3",
      "prepTime": "3 mins",
      "calories": 40,
      "spicyLevel": 0,
      "rating": 4.3,
      "ingredients": [
        "Fresh Lime", "Soda Water", "Black Salt"
      ],
      "image": [
        "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1527169402691-feff5539e52c?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1604908177990-5228be894ae2?w=900&h=700&fit=crop"
      ],
      "resId": "spice_garden_restaurant",
      "createdAt": "2025-01-01T10:00:00.000Z",
      "updatedAt": "2025-01-01T10:00:00.000Z",
      "__v": 0
    },

    // Desserts
    {
      "_id": "dessert_001",
      "itemName": "Gulab Jamun",
      "description": "Soft milk-based dumplings soaked in aromatic rose-flavored sugar syrup",
      "price": 180,
      "discountPrice": 150,
      "quantity": "4 pieces",
      "itemCategory": "veg",
      "productCategory": "68e0d4772ea12265636db3e2",
      "prepTime": "5 mins",
      "calories": 350,
      "spicyLevel": 0,
      "rating": 4.8,
      "ingredients": [
        "Milk Powder", "Sugar", "Rose Water"
      ],
      "image": [
        "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1599785209707-28a7e53b5e26?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1570197788417-0b21131a978e?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&h=700&fit=crop"
      ],
      "resId": "spice_garden_restaurant",
      "createdAt": "2025-01-01T10:00:00.000Z",
      "updatedAt": "2025-01-01T10:00:00.000Z",
      "__v": 0
    },
    {
      "_id": "dessert_002",
      "itemName": "Kulfi Falooda",
      "description": "Traditional Indian ice cream layered with vermicelli, rose syrup, and nuts",
      "price": 160,
      "discountPrice": 140,
      "quantity": "1 serving",
      "itemCategory": "veg",
      "productCategory": "68e0d4772ea12265636db3e2",
      "prepTime": "5 mins",
      "calories": 280,
      "spicyLevel": 0,
      "rating": 4.6,
      "ingredients": [
        "Milk", "Sugar", "Vermicelli", "Nuts"
      ],
      "image": [
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1589308078056-fb81df62d0f8?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1570197788417-0b21131a978e?w=900&h=700&fit=crop"
      ],
      "resId": "spice_garden_restaurant",
      "createdAt": "2025-01-01T10:00:00.000Z",
      "updatedAt": "2025-01-01T10:00:00.000Z",
      "__v": 0
    }
  ]
}
