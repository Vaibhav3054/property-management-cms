import { getProperty, getProperties } from "@/lib/keystatic";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, BedDouble, Bath, Square, Car, Check, Phone, MessageCircle, ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.map((p) => ({ slug: p.slug }));
}

export default async function PropertyDetailsPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const property = await getProperty(params.slug);

  if (!property) {
    notFound();
  }

  // Generate WhatsApp Message
  const whatsappMessage = encodeURIComponent(`Hi, I am interested in the following property: ${property.title} (${process.env.NEXT_PUBLIC_SITE_URL || 'https://bhopalproperties.in'}/properties/${property.slug})`);
  const whatsappLink = `https://wa.me/919876543210?text=${whatsappMessage}`;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <Link href="/properties" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-6">
          <ArrowLeft size={16} /> Back to Properties
        </Link>

        {/* Header Section */}
        <div className="bg-white p-6 rounded-t-xl border border-gray-200 border-b-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex gap-2 mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                For {property.listingType}
              </span>
              <span className="bg-gray-100 text-gray-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {property.propertyType?.replace('-', ' ')}
              </span>
              {property.status !== 'available' && (
                <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {property.status}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{property.title}</h1>
            <p className="text-gray-600 flex items-center gap-1">
              <MapPin size={18} /> {property.address || property.location?.replace('-', ' ')}
            </p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Asking Price</p>
            <p className="text-3xl font-bold text-blue-700">{property.price}</p>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Column (Images & Details) */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            
            {/* Image Gallery */}
            <div className="bg-white rounded-b-xl rounded-tr-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="relative h-[400px] md:h-[500px] bg-gray-100">
                {property.images && property.images.length > 0 ? (
                  <Image 
                    src={property.images[0]} 
                    alt={property.title} 
                    fill 
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">No images available</div>
                )}
              </div>
              {/* Thumbnails (if multiple images) */}
              {property.images && property.images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto bg-gray-50 border-t border-gray-200">
                  {property.images.map((img, i) => (
                    <div key={i} className="relative w-24 h-24 shrink-0 rounded-md overflow-hidden border-2 border-transparent hover:border-blue-500 cursor-pointer transition">
                      <Image src={img} alt={`Thumbnail ${i+1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Overview */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                  <BedDouble size={28} className="text-blue-600 mb-2" />
                  <span className="font-bold text-gray-900">{property.bedrooms || '-'}</span>
                  <span className="text-sm text-gray-500">Bedrooms</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                  <Bath size={28} className="text-blue-600 mb-2" />
                  <span className="font-bold text-gray-900">{property.bathrooms || '-'}</span>
                  <span className="text-sm text-gray-500">Bathrooms</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                  <Square size={28} className="text-blue-600 mb-2" />
                  <span className="font-bold text-gray-900">{property.area || '-'}</span>
                  <span className="text-sm text-gray-500">Area</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                  <Car size={28} className="text-blue-600 mb-2" />
                  <span className="font-bold text-gray-900">{property.parking ? 'Yes' : 'No'}</span>
                  <span className="text-sm text-gray-500">Parking</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-4">Description</h3>
              <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {property.description || "No description provided."}
              </div>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-700">
                      <div className="bg-green-100 text-green-700 p-1 rounded-full"><Check size={14} /></div>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Location Map */}
            {property.googleMapsUrl && (
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Location</h2>
                <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
                  <a href={property.googleMapsUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center gap-2">
                    <MapPin /> View on Google Maps
                  </a>
                </div>
              </div>
            )}
            
          </div>

          {/* Right Column (Sidebar Contact) */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Interested in this property?</h3>
              <p className="text-gray-500 mb-6 text-sm">Contact us today to schedule a site visit or get more information.</p>
              
              <div className="flex flex-col gap-4">
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition shadow-sm">
                  <MessageCircle size={20} /> WhatsApp Us
                </a>
                
                <a href="tel:+919876543210" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition shadow-sm">
                  <Phone size={20} /> Call Now
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <h4 className="font-bold text-gray-900 mb-4">Send an Enquiry</h4>
                <form className="flex flex-col gap-3">
                  <input type="text" placeholder="Your Name" className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                  <input type="tel" placeholder="Your Phone Number" className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                  <textarea placeholder="Message (Optional)" rows={3} className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm"></textarea>
                  <button type="button" className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 rounded-md transition mt-2">
                    Submit Enquiry
                  </button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
