import Link from "next/link";
import { Search, MapPin, Key, TrendingUp, BedDouble, Bath, Square } from "lucide-react";
import { getProperties } from "@/lib/keystatic";
import Image from "next/image";

export default async function HomePage() {
  const properties = await getProperties();
  const featuredProperties = properties.filter((p) => p.featured).slice(0, 3);
  const displayProperties = featuredProperties.length > 0 ? featuredProperties : properties.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Perfect Home in <span className="text-yellow-500">Bhopal</span></h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-gray-200">
            Discover premium flats, independent houses, and commercial spaces across Kolar Road, MP Nagar, Arera Colony, and more.
          </p>
          
          {/* Search Box */}
          <div className="bg-white p-4 rounded-lg shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
            <div className="flex-1 text-left">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Looking For</label>
              <select className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Any Type</option>
                <option>Buy Property</option>
                <option>Rent Property</option>
              </select>
            </div>
            <div className="flex-1 text-left">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Locality</label>
              <select className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none">
                <option>All Bhopal</option>
                <option>Kolar Road</option>
                <option>Arera Colony</option>
                <option>MP Nagar</option>
                <option>Hoshangabad Road</option>
              </select>
            </div>
            <div className="flex-1 text-left">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Property Type</label>
              <select className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none">
                <option>All Types</option>
                <option>Apartment / Flat</option>
                <option>Independent House</option>
                <option>Plot / Land</option>
              </select>
            </div>
            <div className="flex items-end">
              <Link href="/properties" className="w-full md:w-auto bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-md flex items-center justify-center gap-2 transition">
                <Search size={18} /> Search
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Properties</h2>
              <p className="text-gray-600">Handpicked premium properties in Bhopal just for you.</p>
            </div>
            <Link href="/properties" className="text-blue-700 font-semibold hover:underline hidden sm:block">View All</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProperties.length > 0 ? (
              displayProperties.map((property) => (
                <div key={property.slug} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100">
                  <div className="relative h-64 bg-gray-200">
                    {property.images && property.images.length > 0 ? (
                      <Image 
                        src={property.images[0]} 
                        alt={property.title || 'Property Image'} 
                        fill 
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                    )}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        For {property.listingType}
                      </span>
                      {property.featured && (
                        <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 font-bold px-4 py-2 rounded-lg shadow-sm">
                      {property.price}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-blue-600 font-semibold mb-2 uppercase tracking-wide">
                      {property.propertyType?.replace('-', ' ')}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{property.title}</h3>
                    <p className="text-gray-500 flex items-center gap-1 text-sm mb-4">
                      <MapPin size={16} /> {property.address || property.location?.replace('-', ' ')}
                    </p>
                    <div className="flex items-center gap-4 text-gray-600 text-sm border-t border-gray-100 pt-4 mb-4">
                      {property.bedrooms ? (
                        <span className="flex items-center gap-1"><BedDouble size={16}/> {property.bedrooms} Beds</span>
                      ) : null}
                      {property.bathrooms ? (
                        <span className="flex items-center gap-1"><Bath size={16}/> {property.bathrooms} Baths</span>
                      ) : null}
                      {property.area ? (
                        <span className="flex items-center gap-1"><Square size={16}/> {property.area}</span>
                      ) : null}
                    </div>
                    <Link href={`/properties/${property.slug}`} className="block w-full text-center bg-gray-50 hover:bg-blue-50 text-blue-700 font-semibold py-2 rounded-md transition border border-gray-200 hover:border-blue-200">
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100">
                <p className="text-gray-500 mb-4">No properties listed yet.</p>
                <Link href="/keystatic" className="text-blue-600 hover:underline">Go to Admin Panel to add properties</Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Why Choose Bhopal Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 text-blue-700">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Local Expertise</h3>
              <p className="text-gray-600">We have deep knowledge of the Bhopal real estate market, from emerging areas in Hoshangabad Road to premium spots in Arera Colony.</p>
            </div>
            <div className="p-6">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 text-blue-700">
                <Key size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Properties</h3>
              <p className="text-gray-600">Every listing on our platform goes through a strict verification process to ensure zero legal hassles for our buyers.</p>
            </div>
            <div className="p-6">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 text-blue-700">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Best Deals</h3>
              <p className="text-gray-600">We negotiate on your behalf to get the best possible price, whether you are renting a 1 BHK or buying a luxury villa.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
