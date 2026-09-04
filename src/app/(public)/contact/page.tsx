export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-600 max-w-2xl mx-auto mb-8">
        Get in touch with us for any property related queries.
      </p>
      <div className="bg-white p-8 max-w-md mx-auto rounded-xl shadow-sm border border-gray-100 text-left">
        <p className="mb-2"><strong>Address:</strong> Zone 1, MP Nagar, Bhopal, MP</p>
        <p className="mb-2"><strong>Phone:</strong> +91 98765 43210</p>
        <p className="mb-2"><strong>Email:</strong> info@bhopalproperties.in</p>
      </div>
    </div>
  );
}
