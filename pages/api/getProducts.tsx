import type { NextApiRequest, NextApiResponse } from 'next';

interface Product {
  name: string;
  url: string;
  logo: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {

  // Example product data. 
  const products: Product[] = [
    { name: 'Formal Shirt', url: 'https://salespage.com/formal-shirt', logo: 'https://imagepath.com/formal-shirt.png' },
    { name: 'Business Suit', url: 'https://salespage.com/business-suit', logo: 'https://imagepath.com/business-suit.png' },
    // Add more products as needed
  ];

  res.status(200).json(products);
};
