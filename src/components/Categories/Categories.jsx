import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Style from './Categories.module.css';

async function getCategories() {
  try {
    const response = await axios.get(
      'https://ecommerce.routemisr.com/api/v1/categories'
    );
    console.log('API Response:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export default function Categories() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  console.log('Query Data:', data); // Debug log

  if (isLoading) {
    return <div className={Style.loading}>Loading categories...</div>;
  }

  if (isError) {
    return (
      <div className={Style.error}>
        Error: {error.message || 'Failed to load categories'}
      </div>
    );
  }

  if (!data?.data?.length) {
    return (
      <div className={Style.empty}>
        No categories found. Please try again later.
      </div>
    );
  }

  return (
    <div className={Style.categoriesGrid + ' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 m-auto'}>
      {data.data.map((category) => (
        <div
          key={category._id}
          className="hover:shadow-green-200 hover:shadow-xl transition-all duration-300  max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
        >
          <Link to={`/categories/${category.slug}`}>
            <img
              className="rounded-t-lg w-full h-48 object-cover"
              src={category.image || '/default-category.jpg'}
              alt={category.name}
              onError={(e) => {
                e.currentTarget.src = '/default-category.jpg';
              }}
            />
          </Link>
          <div className="p-5">
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              {category.name}
            </h3>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {category.description || 'Explore our products in this category'}
            </p>
            <Link
              to={`/categories/${category.slug}`}
              className=" inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-700 transition-all duration-300"
            >
              View Products
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}