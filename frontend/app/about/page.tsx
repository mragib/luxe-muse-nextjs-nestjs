"use client";

import { useState } from "react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    bio: "With over 15 years in fashion retail, Sarah founded our company with a vision to make quality fashion accessible to everyone.",
    image: "/team/sarah.jpg",
  },
  {
    name: "Michael Chen",
    role: "Head of Design",
    bio: "Michael brings creativity and innovation to our product design, ensuring we stay ahead of fashion trends.",
    image: "/team/michael.jpg",
  },
  {
    name: "Emma Rodriguez",
    role: "Customer Experience Manager",
    bio: "Emma ensures every customer has an exceptional shopping experience, from browsing to post-purchase support.",
    image: "/team/emma.jpg",
  },
  {
    name: "David Kim",
    role: "Operations Director",
    bio: "David oversees our supply chain and logistics, ensuring products reach customers efficiently and sustainably.",
    image: "/team/david.jpg",
  },
];

const stats = [
  { label: "Happy Customers", value: "50,000+", icon: "😊" },
  { label: "Products Sold", value: "250,000+", icon: "📦" },
  { label: "Countries Served", value: "25+", icon: "🌍" },
  { label: "Years of Excellence", value: "8+", icon: "⭐" },
];

const values = [
  {
    title: "Quality First",
    description:
      "We never compromise on quality. Every product in our collection meets our high standards.",
    icon: "✨",
  },
  {
    title: "Sustainable Fashion",
    description:
      "We are committed to sustainable practices and ethical sourcing throughout our supply chain.",
    icon: "🌱",
  },
  {
    title: "Customer Centric",
    description:
      "Our customers are at the heart of everything we do. Your satisfaction is our top priority.",
    icon: "💝",
  },
  {
    title: "Innovation",
    description:
      "We continuously innovate to bring you the latest trends and technology in fashion.",
    icon: "🚀",
  },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("story");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About Our Fashion</h1>
            <p className="text-xl max-w-3xl mx-auto text-blue-100">
              We're passionate about bringing you the latest fashion trends with
              quality, style, and sustainability at the forefront of everything
              we do.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="mb-12">
          <nav className="flex justify-center">
            <div className="bg-white rounded-lg shadow-sm p-1">
              {[
                { id: "story", label: "Our Story" },
                { id: "values", label: "Our Values" },
                { id: "team", label: "Our Team" },
                { id: "commitment", label: "Our Commitment" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-md font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Story Tab */}
        {activeTab === "story" && (
          <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Fashion Journey
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Founded in 2016, our fashion company began with a simple
                    mission: to make high-quality, stylish clothing accessible
                    to everyone. What started as a small boutique has grown into
                    a beloved fashion destination serving customers worldwide.
                  </p>
                  <p>
                    We've always believed that fashion should be inclusive,
                    sustainable, and empowering. Every piece in our collection
                    is carefully curated to ensure it meets our standards for
                    quality, comfort, and style.
                  </p>
                  <p>
                    Today, we're proud to offer a diverse range of fashion items
                    that cater to all body types, styles, and occasions. From
                    casual wear to formal attire, we have something for
                    everyone.
                  </p>
                </div>
              </div>
              <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">👗</div>
                  <p className="text-gray-500">Fashion Journey Illustration</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Values Tab */}
        {activeTab === "values" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-8">
                <div className="text-center">
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Team Tab */}
        {activeTab === "team" && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="bg-gray-200 h-64 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-2">👤</div>
                      <p className="text-gray-500 text-sm">Team Member</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Commitment Tab */}
        {activeTab === "commitment" && (
          <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Our Commitment to Sustainability
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  Environmental Responsibility
                </h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>
                      100% sustainable materials in our eco-collection
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Carbon-neutral shipping on all orders</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Ethical sourcing from certified suppliers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Recycling program for old clothing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Plastic-free packaging for all shipments</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  Community Impact
                </h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">✓</span>
                    <span>Supporting local artisans and manufacturers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">✓</span>
                    <span>Donating 5% of profits to fashion education</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">✓</span>
                    <span>Fair wages for all workers in our supply chain</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">✓</span>
                    <span>Women-led initiatives in fashion industry</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">✓</span>
                    <span>Regular charity fashion shows and events</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join Our Fashion Community
          </h2>
          <p className="text-xl mb-6 text-blue-100">
            Be part of our journey to make fashion more sustainable, inclusive,
            and beautiful
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-semibold">
              Shop Our Collection
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-blue-600 transition-colors font-semibold">
              Follow Our Journey
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Get In Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Email Us
              </h3>
              <p className="text-gray-600">hello@fashionstore.com</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Call Us
              </h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Visit Us
              </h3>
              <p className="text-gray-600">
                123 Fashion Street
                <br />
                New York, NY 10001
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
