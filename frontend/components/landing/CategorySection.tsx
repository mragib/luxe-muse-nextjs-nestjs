import { getCategory } from "@/lib/data-service";
import Link from "next/link";
import React from "react";

async function CategorySection() {
  const { data: categories } = await getCategory();
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg">
            Find exactly what you're looking for
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={"/categories/" + category.slug}
              className="group text-center"
            >
              <div className="aspect-square bg-gray-100 rounded-full mb-4 overflow-hidden group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-4xl">👕</span>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
