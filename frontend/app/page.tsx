import CategorySection from "@/components/landing/CategorySection";
import CollectionSection from "@/components/landing/CollectionSection";
import HeroSection from "@/components/landing/HeroSection";
import InstagramSection from "@/components/landing/InstagramSection";
import Footer from "@/components/master/Footer";
import Header from "@/components/master/Header";
import { Metadata } from "next";
import Image from "next/image";
export const metadata: Metadata = {
  title: "Fashion Store - Latest Trends & Premium Fashion",
  description:
    "Discover the latest fashion trends with our curated collection of premium clothing, shoes, and accessories. Shop the newest arrivals and find your perfect style.",
  keywords:
    "fashion, clothing, shoes, accessories, online shopping, latest trends, premium fashion, style",
  openGraph: {
    title: "Fashion Store - Latest Trends & Premium Fashion",
    description:
      "Discover the latest fashion trends with our curated collection of premium clothing, shoes, and accessories.",
    type: "website",
    locale: "en_US",
    siteName: "Fashion Store",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fashion Store - Latest Trends & Premium Fashion",
    description:
      "Discover the latest fashion trends with our curated collection of premium clothing, shoes, and accessories.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <CollectionSection />
        <CategorySection />
        <InstagramSection />
      </main>
      <Footer />
    </div>
  );
}
