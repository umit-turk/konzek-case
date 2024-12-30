import React, { memo } from 'react';
import { formatDate } from '../utils/date';
import { formatCurrency } from '../utils/currency';
import type { Order } from '../../../container/src/types/index';

interface OrderCardProps {
  order: Order;
}

const statusColors = {
  'Beklemede': 'bg-warning-main',
  'Onaylandı': 'bg-success-main',
  'Kargoda': 'bg-primary-main',
  'Tamamlandı': 'bg-success-dark',
} as const;

export const OrderCard: React.FC<OrderCardProps> = memo(({ order }) => {
  return (
    <div className="card">
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-1">
              Sipariş #{order.id}
            </h3>
            <p className="text-text-secondary text-sm">
              {formatDate(order.date)}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-lg font-medium text-primary-main">
              {formatCurrency(order.total)} TL
            </p>
            <span className={`px-3 py-1 rounded-full text-white text-sm ${statusColors[order.status]}`}>
              {order.status}
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {order.items.map(item => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-text-primary font-medium">
                  {item.name}
                </p>
                <p className="text-text-secondary text-sm">
                  {formatCurrency(item.price)} TL x {item.quantity}
                </p>
              </div>
              <p className="text-text-primary font-medium">
                {formatCurrency(item.price * item.quantity)} TL
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}); 