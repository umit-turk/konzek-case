import React, { memo } from 'react';
import { useOrders } from '../hooks/useOrders';
import { OrderList } from './OrderList';
import { EmptyOrders } from './EmptyOrders';

export const OrderHistory: React.FC = memo(() => {
  const { orders, isLoading } = useOrders();

  if (isLoading) {
    return (
      <div className="flex-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary-main" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-text-primary">
        Sipariş Geçmişi
      </h2>
      
      {orders.length === 0 ? (
        <EmptyOrders />
      ) : (
        <OrderList orders={orders} />
      )}
    </div>
  );
}); 
export default OrderHistory;