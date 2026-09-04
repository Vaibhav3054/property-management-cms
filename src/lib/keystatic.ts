import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';

export const reader = createReader(process.cwd(), config);

export async function getProperties() {
  const properties = await reader.collections.properties.all();
  return properties.map((property) => ({
    slug: property.slug,
    ...property.entry,
  }));
}

export async function getProperty(slug: string) {
  const property = await reader.collections.properties.read(slug);
  if (!property) return null;
  return {
    slug,
    ...property,
  };
}
