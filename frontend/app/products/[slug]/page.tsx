import { Metadata } from "next";
import { notFound } from "next/navigation";
import { api } from "../../../lib/api";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    // Fetch product data from API
    const productData = await api.getProduct(params.slug);

    return {
      title: `${productData.name} - Fashion Store`,
      description: productData.description,
      keywords: `${productData.name}, ${
        productData.category?.name || "fashion"
      }, fashion, clothing, online shopping`,
      openGraph: {
        title: `${productData.name} - Fashion Store`,
        description: productData.description,
        type: "website",
        images: ["/product-placeholder.jpg"], // Default image since API doesn't provide images yet
      },
      twitter: {
        card: "summary_large_image",
        title: `${productData.name} - Fashion Store`,
        description: productData.description,
      },
    };
  } catch (error) {
    return {
      title: "Product - Fashion Store",
      description: "View product details",
    };
  }
}

("use client");

import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "../../../lib/api";
import { ProductImageGallery } from "../../../components/product/product-image-gallery";
import { ProductVariants } from "../../../components/product/product-variants";
import { SizeGuideModal } from "../../../components/product/size-guide-modal";
import { ProductReviews } from "../../../components/product/product-reviews";
import { RelatedProducts } from "../../../components/product/related-products";
import { Button } from "../../../components/ui/button";

interface Product {
  id: number;
  name: string;
  description: string;
  sku?: string;
  slug?: string;
  price: number;
  cost_price?: number;
  category?: {
    id: number;
    name: string;
  };
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [productData, setProductData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("White");
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const product = await api.getProduct(params.slug);
        setProductData(product);
      } catch (err) {
        setError("Failed to load product");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !productData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            href="/products"
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    // Add to cart logic here
    alert(
      `Added ${quantity} ${productData.name} (${selectedColor}, ${selectedSize}) to cart`
    );
  };

  const handleAddToWishlist = () => {
    alert("Added to wishlist");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <ProductImageGallery
            images={[]} // API doesn't provide images yet
            productName={productData.name}
          />

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <nav className="text-sm text-gray-500 mb-4">
                <Link href="/" className="hover:text-gray-700">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <Link href="/products" className="hover:text-gray-700">
                  Products
                </Link>
                <span className="mx-2">/</span>
                {productData.category && (
                  <>
                    <Link
                      href={`/categories/${productData.category.name.toLowerCase()}`}
                      className="hover:text-gray-700"
                    >
                      {productData.category.name}
                    </Link>
                    <span className="mx-2">/</span>
                  </>
                )}
                <span className="text-gray-900">{productData.name}</span>
              </nav>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {productData.name}
              </h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < 4 // Default 4-star rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    4.5 (128 reviews) {/* Mock data */}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${productData.price}
                </span>
                {productData.cost_price &&
                  productData.cost_price > productData.price && (
                    <span className="text-xl text-gray-500 line-through">
                      ${productData.cost_price}
                    </span>
                  )}
                {productData.cost_price &&
                  productData.cost_price > productData.price && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                      Save $
                      {(productData.cost_price - productData.price).toFixed(2)}
                    </span>
                  )}
              </div>
            </div>

            {/* Variants */}
            <ProductVariants
              onSizeChange={setSelectedSize}
              onColorChange={setSelectedColor}
              onQuantityChange={setQuantity}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              quantity={quantity}
              onSizeGuideOpen={() => setShowSizeGuide(true)}
            />

            {/* Add to Cart */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 px-6"
                  size="lg"
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={handleAddToWishlist}
                  variant="outline"
                  size="icon"
                  className="p-4"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </Button>
              </div>

              <div className="text-sm text-gray-600">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✓ In Stock
                </span>
                <span className="ml-4">Free shipping on orders over $50</span>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Product Details
              </h3>
              <p className="text-gray-700 mb-4">{productData.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Features</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {[
                      "100% Premium Cotton",
                      "Machine Washable",
                      "Pre-shrunk Fabric",
                      "Reinforced Stitching",
                      "Tagless Design",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Care Instructions
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {[
                      "Machine wash cold",
                      "Tumble dry low",
                      "Do not bleach",
                      "Iron on low heat",
                    ].map((instruction, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 border-t pt-16">
          <ProductReviews />
        </div>

        {/* Related Products */}
        <div className="mt-16 border-t pt-16">
          <RelatedProducts />
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
      />
    </div>
  );
}
