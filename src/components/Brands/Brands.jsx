import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Style from './Brands.module.css';

async function getBrands() {
  try {
    const response = await axios.get(
      'https://ecommerce.routemisr.com/api/v1/brands',
      {
        params: {
          limit: 10,
          page: 1,
        },
      }
    );
    console.log('Brands API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Brands API Error:', error);
    throw error;
  }
}

export default function Brands() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
  });

  console.log('Brands Query Data:', data);

  if (isLoading) {
    return <div className={Style.loading}>Loading brands...</div>;
  }

  if (isError) {
    return (
      <div className={Style.error}>
        Error: {error.message || 'Failed to load brands'}
      </div>
    );
  }

  if (!data?.data?.length) {
    return (
      <div className={Style.empty}>
        No brands found. Please try again later.
      </div>
    );
  }

  return (
    <div className={Style.brandsGrid + ' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 m-auto'}>
      {data.data.map((brand) => (
        <div
          key={brand._id}
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
        >
          <Link to={`/brands/${brand.slug}`}>
            <img
              className="rounded-t-lg w-full h-48 object-contain p-4 bg-white"
              src={brand.image}
              alt={brand.name}
              onError={(e) => {
                e.currentTarget.src = '/default-brand.jpg';
                e.currentTarget.classList.add('object-contain');
              }}
            />
          </Link>
          <div className="p-5 text-center">
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              {brand.name}
            </h3>
            <Link
              to={`/brands/${brand.slug}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-700 transition-all duration-300"
            >
              View Products
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}