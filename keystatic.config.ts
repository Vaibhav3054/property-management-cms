import { config, fields, collection } from '@keystatic/core';

export default config({
  ui: {
    brand: { name: 'Bhopal Properties Admin' },
    navigation: {
      'Manage Properties': ['properties'],
    },
  },
  storage: process.env.NODE_ENV === 'production' ? {
    kind: 'github',
    repo: 'Vaibhav3054/property-management-cms',
  } : {
    kind: 'local',
  },
  collections: {
    properties: collection({
      label: 'Properties',
      slugField: 'title',
      path: 'src/content/properties/*/',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        propertyType: fields.select({
          label: 'Property Type',
          options: [
            { label: 'Apartment/Flat', value: 'apartment' },
            { label: 'Independent House', value: 'house' },
            { label: 'Villa', value: 'villa' },
            { label: 'Plot/Land', value: 'plot' },
            { label: 'Commercial', value: 'commercial' },
          ],
          defaultValue: 'apartment',
        }),
        listingType: fields.select({
          label: 'Listing Type',
          options: [
            { label: 'For Sale', value: 'sale' },
            { label: 'For Rent', value: 'rent' },
          ],
          defaultValue: 'sale',
        }),
        price: fields.text({ label: 'Price (e.g., ₹18,000/month or ₹45 Lakhs)' }),
        location: fields.select({
          label: 'Location (Bhopal)',
          options: [
            { label: 'Kolar Road', value: 'kolar-road' },
            { label: 'Arera Colony', value: 'arera-colony' },
            { label: 'MP Nagar', value: 'mp-nagar' },
            { label: 'Hoshangabad Road', value: 'hoshangabad-road' },
            { label: 'Shahpura', value: 'shahpura' },
            { label: 'Bawadiya Kalan', value: 'bawadiya-kalan' },
            { label: 'Misrod', value: 'misrod' },
            { label: 'Ayodhya Bypass', value: 'ayodhya-bypass' },
            { label: 'Lalghati', value: 'lalghati' },
            { label: 'Bairagarh', value: 'bairagarh' },
            { label: 'Saket Nagar', value: 'saket-nagar' },
            { label: 'Katara Hills', value: 'katara-hills' },
            { label: 'Other', value: 'other' },
          ],
          defaultValue: 'kolar-road',
        }),
        address: fields.text({ label: 'Full Address/Locality' }),
        area: fields.text({ label: 'Area (e.g., 1250 sq.ft)' }),
        bedrooms: fields.integer({ label: 'Bedrooms', defaultValue: 2 }),
        bathrooms: fields.integer({ label: 'Bathrooms', defaultValue: 2 }),
        parking: fields.checkbox({ label: 'Has Parking', defaultValue: true }),
        furnishing: fields.select({
          label: 'Furnishing Status',
          options: [
            { label: 'Fully Furnished', value: 'furnished' },
            { label: 'Semi-Furnished', value: 'semi-furnished' },
            { label: 'Unfurnished', value: 'unfurnished' },
          ],
          defaultValue: 'unfurnished',
        }),
        amenities: fields.array(fields.text({ label: 'Amenity (e.g., Gym, Security)' }), {
          label: 'Amenities',
          itemLabel: props => props.value,
        }),
        images: fields.array(
          fields.image({
            label: 'Property Image',
            directory: 'public/images/properties',
            publicPath: '/images/properties/',
          }),
          {
            label: 'Property Images',
            itemLabel: props => 'Image',
          }
        ),
        googleMapsUrl: fields.url({ label: 'Google Maps URL (Optional)' }),
        featured: fields.checkbox({ label: 'Featured Property', defaultValue: false }),
        status: fields.select({
          label: 'Availability Status',
          options: [
            { label: 'Available', value: 'available' },
            { label: 'Sold', value: 'sold' },
            { label: 'Rented', value: 'rented' },
          ],
          defaultValue: 'available',
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
      },
    }),
  },
});
