import React, { memo } from 'react';
import { OrderCard } from './OrderCard';
import type { Order } from '../../../container/src/types/index';

interface OrderListProps {
  orders: Order[];
}

export const OrderList: React.FC<OrderListProps> = memo(({ orders }) => {
  return (
    <div className="space-y-4">
      {orders.map(order => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}); 