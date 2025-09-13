// src/pages/Menu/MenuPage.jsx
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MenuTemplate from '../../components/MenuTemplate/MenuTemplate.jsx'
import { sampleMenuData } from '../../data/menuData.js'

const MenuPage = () => {
  const { restaurantId } = useParams()
  const [menuData, setMenuData] = useState(null)
  const [restaurantData, setRestaurantData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, you'd fetch data based on restaurantId
    // For now, we'll use sample data
    const loadMenuData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Load restaurant data from localStorage or API
        const savedRestaurantData = localStorage.getItem('restaurantData')
        if (savedRestaurantData) {
          const restaurantInfo = JSON.parse(savedRestaurantData)
          setRestaurantData({
            name: restaurantInfo.restaurantName || 'Restaurant',
            tagline: 'Delicious Food & Great Service',
            phone: restaurantInfo.restaurantContactNumber || '+91 98765 43210',
            email: restaurantInfo.restaurantEmail || 'info@restaurant.com',
            address: restaurantInfo.restaurantAddress || 'Restaurant Address',
            logo: restaurantInfo.logoUrl || 'https://via.placeholder.com/200',
            coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=400&fit=crop',
            socialMedia: {
              instagram: '@restaurant',
              facebook: 'Restaurant',
              whatsapp: restaurantInfo.restaurantContactNumber || '+91 98765 43210'
            },
            timing: {
              monday: "11:00 AM - 11:00 PM",
              tuesday: "11:00 AM - 11:00 PM",
              wednesday: "11:00 AM - 11:00 PM",
              thursday: "11:00 AM - 11:00 PM",
              friday: "11:00 AM - 12:00 AM",
              saturday: "11:00 AM - 12:00 AM",
              sunday: "11:00 AM - 10:00 PM"
            }
          })
        }
        
        setMenuData(sampleMenuData)
      } catch (error) {
        console.error('Error loading menu data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadMenuData()
  }, [restaurantId])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading menu...</p>
        </div>
      </div>
    )
  }

  return (
    <MenuTemplate 
      restaurantData={restaurantData}
      menuData={menuData}
    />
  )
}

export default MenuPage
