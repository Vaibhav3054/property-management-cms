import Link from "next/link";
import { getProperties } from "@/lib/keystatic";
import Image from "next/image";
import { MapPin, BedDouble, Bath, Square, Search } from "lucide-react";

export default async function PropertiesPage(
  props: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const searchParams = await props.searchParams;
  const type = searchParams?.type as string | undefined;
  
  let properties = await getProperties();

  // Basic filtering
  if (type === 'sale') properties = properties.filter(p => p.listingType === 'sale');
  if (type === 'rent') properties = properties.filter(p => p.listingType === 'rent');

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {type === 'sale' ? 'Properties for Sale in Bhopal' : 
             type === 'rent' ? 'Properties for Rent in Bhopal' : 
             'All Properties in Bhopal'}
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Browse our extensive collection of premium properties across Bhopal. Use the filters to find the perfect home that matches your requirements.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2"><Search size={20}/> Filters</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Listing Type</label>
                <div className="flex flex-col gap-2">
                  <Link href="/properties" className={`px-3 py-2 rounded-md text-sm ${!type ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>All Properties</Link>
                  <Link href="/properties?type=sale" className={`px-3 py-2 rounded-md text-sm ${type === 'sale' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>For Sale</Link>
                  <Link href="/properties?type=rent" className={`px-3 py-2 rounded-md text-sm ${type === 'rent' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>For Rent</Link>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Property Type</label>
                <select className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                  <option>All Types</option>
                  <option>Apartment / Flat</option>
                  <option>Independent House</option>
                  <option>Villa</option>
                  <option>Plot / Land</option>
                  <option>Commercial</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Locality</label>
                <select className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                  <option>All Localities</option>
                  <option>Kolar Road</option>
                  <option>Arera Colony</option>
                  <option>MP Nagar</option>
                  <option>Hoshangabad Road</option>
                  <option>Bawadiya Kalan</option>
                </select>
              </div>

              <button className="w-full bg-blue-700 text-white font-semibold py-2 rounded-md hover:bg-blue-800 transition">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Property Grid */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {properties.length > 0 ? (
                properties.map((property) => (
                  <div key={property.slug} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col">
                    <div className="relative h-60 bg-gray-200 shrink-0">
                      {property.images && property.images.length > 0 ? (
                        <Image 
                          src={property.images[0]!} 
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
                        {property.status === 'sold' && (
                          <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            Sold Out
                          </span>
                        )}
                        {property.status === 'rented' && (
                          <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            Rented Out
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 font-bold px-4 py-2 rounded-lg shadow-sm">
                        {property.price}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="text-xs text-blue-600 font-semibold mb-2 uppercase tracking-wide">
                        {property.propertyType?.replace('-', ' ')}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{property.title}</h3>
                      <p className="text-gray-500 flex items-center gap-1 text-sm mb-4">
                        <MapPin size={16} className="shrink-0"/> <span className="line-clamp-1">{property.address || property.location?.replace('-', ' ')}</span>
                      </p>
                      
                      <div className="mt-auto">
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
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                  <p className="text-gray-500 mb-2 text-lg">No properties found matching your criteria.</p>
                  <p className="text-gray-400">Try adjusting your filters or checking back later.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
