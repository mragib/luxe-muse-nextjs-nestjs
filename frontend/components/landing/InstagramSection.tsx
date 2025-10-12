import React from "react";
const instagramPosts = [
  { id: 1, image: "/insta-1.jpg", likes: 1234, comments: 56 },
  { id: 2, image: "/insta-2.jpg", likes: 987, comments: 43 },
  { id: 3, image: "/insta-3.jpg", likes: 1456, comments: 78 },
  { id: 4, image: "/insta-4.jpg", likes: 876, comments: 32 },
  { id: 5, image: "/insta-5.jpg", likes: 1123, comments: 67 },
  { id: 6, image: "/insta-6.jpg", likes: 1543, comments: 89 },
];
function InstagramSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Follow Us on Instagram
          </h2>
          <p className="text-gray-600 text-lg">
            Get inspired by our latest looks and customer favorites
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              className="aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-full h-full bg-gradient-to-br from-pink-200 to-purple-300 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-3xl">📸</span>
                  <div className="mt-2 text-xs text-gray-600">
                    <span>❤️ {post.likes}</span>
                    <span className="ml-2">💬 {post.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href="https://instagram.com/fashionhub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Follow @fashionhub
          </a>
        </div>
      </div>
    </section>
  );
}

export default InstagramSection;
