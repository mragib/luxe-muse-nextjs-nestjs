import Link from "next/link";
import React from "react";

const collections = [
  {
    id: 1,
    name: "New Arrivals",
    image: "/collection-1.jpg",
    link: "/collections/new-arrivals",
    itemCount: 156,
  },
  {
    id: 2,
    name: "Best Sellers",
    image: "/collection-2.jpg",
    link: "/collections/best-sellers",
    itemCount: 89,
  },
  {
    id: 3,
    name: "Seasonal Collection",
    image: "/collection-3.jpg",
    link: "/collections/seasonal",
    itemCount: 234,
  },
];

function CollectionSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Curated Collections
          </h2>
          <p className="text-gray-600 text-lg">
            Discover our carefully selected collections for every style
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={collection.link}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-[4/5] bg-gray-200 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
                  <h3 className="text-2xl font-bold mb-2">{collection.name}</h3>
                  <p className="text-sm opacity-90">
                    {collection.itemCount} items
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CollectionSection;
