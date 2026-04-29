import React, { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { APP_CONFIG } from '../../constants/api';

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getItemTitle = (item) => {
    // Support multiple field structures for product names
    return item.product?.title
      || item.product?.name
      || item.product?.product?.title
      || item.product?.product?.name
      || item.title
      || item.name
      || 'Unknown Product';
  };

  const getItemPrice = (item) => {
    return item.price ?? item.product?.price ?? item.product?.product?.price ?? 0;
  };

  const getItemCount = (item) => {
    return item.count ?? item.quantity ?? item.qty ?? 0;
  };

  const getOrderTotal = (order) => {
    if (order.totalOrderPrice != null) return order.totalOrderPrice;
    if (order.price != null) return order.price;
    if (order.totalCartPrice != null) return order.totalCartPrice;
    if (order.totalPrice != null) return order.totalPrice;
    return order.cartItems?.reduce((sum, item) => sum + getItemPrice(item) * getItemCount(item), 0) ?? 0;
  };

  useEffect(() => {
    const loadOrders = () => {
      try {
        const storedData = localStorage.getItem(APP_CONFIG.CART_STORAGE_KEY);
        
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          
          const ordersData = parsedData.data?.data || parsedData.data || parsedData;
          
          setOrders(Array.isArray(ordersData) ? ordersData : [ordersData].filter(Boolean));
        }
      } catch (err) {
        setError('Failed to load orders');
        toast.error('Failed to load your orders');
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(loadOrders, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
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
                  <span className='text-gray-600'>Total: <span className='font-medium'>{getOrderTotal(order)} EGP</span></span>
                  <span className='text-gray-600'>Payment Method: {order.paymentMethodType || 'cash'}</span>
                </div>
              </div>

              {order.cartItems && (
                <div className='border-t pt-4'>
                  <h3 className='text-lg font-medium mb-3 text-left'>Products:</h3>
                  {order.cartItems.map((item) => {
                    const itemPrice = getItemPrice(item);
                    const itemCount = getItemCount(item);
                    const itemSubtotal = itemPrice * itemCount;

                    return (
                      <div key={item._id || `${item.product?._id || item.product?.id || item.title || item.name}-${itemCount}` } className='flex flex-col sm:flex-row justify-between items-center p-3 mb-3 bg-gray-50 rounded-md'>
                        <div className='flex items-center w-full sm:w-3/4'>
                          <div className='text-left'>
                            <h4 className='font-medium'>{getItemTitle(item)}</h4>
                            <span className='text-gray-600'>{itemPrice} EGP × {itemCount}</span>
                          </div>
                        </div>
                        <div className='w-full sm:w-1/4 text-right mt-2 sm:mt-0'>
                          <span className='font-medium'>Subtotal: {itemSubtotal} EGP</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}