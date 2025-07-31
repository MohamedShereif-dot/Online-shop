import React, { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import toast from 'react-hot-toast';

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const loadOrders = () => {
      try {
        const storedData = localStorage.getItem('cartItems');
        
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          
          const ordersData = parsedData.data?.data || parsedData.data || parsedData;
          
          setOrders(Array.isArray(ordersData) ? ordersData : [ordersData].filter(Boolean));
        }
      } catch (err) {
        setError('Failed to load orders');
        toast.error('Failed to load your orders');
        console.error('Error loading orders:', err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(loadOrders, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Oval
          height={50}
          width={50}
          color="#3b82f6"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#93c5fd"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="parent w-full gap-3 m-auto bg-gray-50 p-8 rounded-lg shadow-lg">
      <h2 className='text-3xl font-medium mb-6 text-gray-800'>My Orders</h2>

      {orders.length === 0 ? (
        <div className='bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative text-center' role="alert">
          <span className="block sm:inline">You haven't placed any orders yet.</span>
        </div>
      ) : (
        <div className='text-center'>
          {orders.map((order) => (
            <div key={order._id} className='flex flex-col p-4 my-3 border-b-2 border-gray-200 last:border-b-0 rounded-md bg-white shadow-sm'>
              <div className='flex flex-col sm:flex-row justify-between items-start mb-4'>
                <div className='flex flex-col gap-1'>
                  {order.createdAt && (
                    <span className='text-gray-600'>Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                  )}
                </div>
                <div className='flex flex-col gap-1 mt-2 sm:mt-0'>
                  <span className='text-gray-600'>Total: <span className='font-medium'>{order.totalOrderPrice || order.price || 0} EGP</span></span>
                  <span className='text-gray-600'>Payment Method: {order.paymentMethodType || 'cash'}</span>
                </div>
              </div>

              {order.cartItems && (
                <div className='border-t pt-4'>
                  <h3 className='text-lg font-medium mb-3 text-left'>Products:</h3>
                  {order.cartItems.map((item) => (
                    <div key={item._id} className='flex flex-col sm:flex-row justify-between items-center p-3 mb-3 bg-gray-50 rounded-md'>
                      <div className='flex items-center w-full sm:w-3/4'>
                        
                        <div className='text-left'>
                          <h4 className='font-medium'>{item.product?.title || item.title || 'Unknown Product'}</h4>
                          <span className='text-gray-600'>{item.price || 0} EGP × {item.count || 0}</span>
                        </div>
                      </div>
                      <div className='w-full sm:w-1/4 text-right mt-2 sm:mt-0'>
                        <span className='font-medium'>Subtotal: {(item.price || 0) * (item.count || 0)} EGP</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}