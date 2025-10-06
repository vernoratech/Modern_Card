import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { menuData } from '../../data/menuData';
import './ProductDetails.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const foundProduct = menuData.menuItems.find(item => String(item.id) === productId);
        if (foundProduct) {
          setProduct(foundProduct);
          setActiveImageIdx(0);
        } else {
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [productId, navigate]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Added to cart:', { ...product, quantity });
  };

  const images = product?.gallery?.length
    ? product.gallery
    : product?.image
      ? [product.image]
      : [];

  const handlePrevImage = () => {
    if (!images.length) return;
    setActiveImageIdx(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if (!images.length) return;
    setActiveImageIdx(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index) => {
    if (!images.length) return;
    setActiveImageIdx(index);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-primary-600 mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Menu
        </button>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Gallery */}
            <div className="product-gallery">
              <div className="product-gallery-main">
                {images.length > 1 && (
                  <button
                    type="button"
                    className="gallery-nav prev"
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                )}
                {images.length > 0 ? (
                  <img
                    src={images[activeImageIdx]}
                    alt={`${product.name} view ${activeImageIdx + 1}`}
                    className="product-gallery-image"
                  />
                ) : (
                  <div className="product-gallery-placeholder">No image available</div>
                )}
                {images.length > 1 && (
                  <button
                    type="button"
                    className="gallery-nav next"
                    onClick={handleNextImage}
                    aria-label="Next image"
                  >
                    ›
                  </button>
                )}
                {product.isBestseller && (
                  <span className="gallery-badge">
                    🏆 Bestseller
                  </span>
                )}
              </div>

              {images.length > 1 && (
                <div className="product-gallery-thumbs">
                  {images.map((imgSrc, index) => (
                    <button
                      key={imgSrc}
                      type="button"
                      className={`thumb ${index === activeImageIdx ? 'active' : ''}`}
                      onClick={() => handleThumbnailClick(index)}
                      aria-label={`View image ${index + 1}`}
                    >
                      <img src={imgSrc} alt={`${product.name} thumbnail ${index + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col h-full">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <p className="text-lg text-gray-600 mb-6">{product.description}</p>
                  
                  <div className="flex items-center mb-6">
                    <div className="flex items-center mr-6">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span className="font-medium text-gray-900">{product.rating}</span>
                      <span className="text-gray-400 ml-1">({product.reviewCount} reviews)</span>
                    </div>
                    {product.spiceLevel > 0 && (
                      <div className="flex items-center text-gray-500">
                        <span className="mr-1">🌶️</span>
                        <span>Spice Level: {product.spiceLevel}/3</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline mb-2">
                      <span className="text-3xl font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="ml-2 text-gray-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">Inclusive of all taxes</p>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Ingredients</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.ingredients?.map((ingredient, index) => (
                        <span 
                          key={index} 
                          className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <button 
                          onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                          className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-4 py-2">{quantity}</span>
                        <button 
                          onClick={() => setQuantity(prev => prev + 1)}
                          className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        onClick={handleAddToCart}
                        className="flex-1 add-to-cart-btn"
                      >
                        Add to Cart
                      </button>
                      
                      <button 
                        className="p-3 text-gray-600 hover:text-primary-600 transition-colors"
                        onClick={() => console.log('Added to favorites:', product.id)}
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
