import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../container/src/store';

const OrderHistory: React.FC = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Beklemede':
        return 'bg-warning-main text-white';
      case 'Onaylandı':
        return 'bg-primary-main text-white';
      case 'Kargoda':
        return 'bg-primary-main text-white';
      case 'Tamamlandı':
        return 'bg-success-main text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Sipariş Geçmişi
            </h2>
            <p className="text-gray-600">Henüz siparişiniz bulunmuyor</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
        Sipariş Geçmişi
      </h2>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="card">
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-800">
                    Sipariş #{order.id}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Tarih: {new Date(order.date).toLocaleDateString('tr-TR')}
                  </p>
                </div>
                <div className={`${getStatusColor(order.status)} px-4 py-2 rounded-md text-sm font-medium self-start`}>
                  {order.status}
                </div>
              </div>
              <div className="space-y-2 mb-4">
                {order.items.map(item => (
                  <div
                    key={item.id}
                    className="flex justify-between py-2 border-b border-gray-200 last:border-0"
                  >
                    <span className="text-gray-800">{item.name}</span>
                    <span className="text-gray-600">
                      {item.quantity} x {item.price} TL
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 text-right">
                <span className="text-xl font-medium text-primary-main">
                  Toplam: {order.total} TL
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory; 