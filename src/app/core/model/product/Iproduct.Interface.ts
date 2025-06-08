export interface Product {
  id: string;
  productCategory: string;
  name: string;
  description: string;
  price: Price;
  stock: Stock;
  details: Details;
  specifications: Specifications;
  images: Image[];
  createdAt: string;
  updatedAt: string;
  tags: string[];
  partitionKey: string;
}

export interface Price {
  value: number;
  currency: string;
  discount?: number | null;
}

export interface Stock {
  quantity: number;
  available: boolean;
}

export interface Details {
  category: string;
  platform: string;
  brand: string;
  condition: string;
  releaseYear: number;
}

export interface Specifications {
  videogame?: Videogame | null;
  console?: Console | null;
  accessory?: Accessory | null;
}

export interface Videogame {
  genre: string;
  rating: string;
  multiplayer: boolean;
}

export interface Console {
  type: string;
  storage: string;
  color: string;
}

export interface Accessory {
  type: string;
  compatibility: string[];
}

export interface Image {
  url: string;
  description: string;
}
