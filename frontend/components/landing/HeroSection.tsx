import Link from "next/link";
import React from "react";

function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10"></div>
      <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Summer Collection 2025
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Discover the latest trends in fashion with up to 50% off
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/collections/summer"
            className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </Link>
          <Link
            href="/collections/new-arrivals"
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition-colors"
          >
            Explore Collection
          </Link>
        </div>
      </div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      ></div>
    </section>
  );
}

export default HeroSection;
