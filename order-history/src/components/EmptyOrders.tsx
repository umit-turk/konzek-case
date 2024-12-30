import React, { memo } from 'react';
import { useCustomNavigate } from '../../../container/src/utils/navigation';
import { Button } from '../../../container/src/components/common/Button';
import { ORDER_MESSAGES } from '../constants/messages';

export const EmptyOrders: React.FC = memo(() => {
  const { navigate } = useCustomNavigate();

  return (
    <div className="card">
      <div className="text-center p-8">
        <p className="text-xl text-text-secondary mb-6">
          {ORDER_MESSAGES.EMPTY_ORDERS}
        </p>
        <Button
          onClick={() => navigate('/')}
        >
          Alışverişe Başla
        </Button>
      </div>
    </div>
  );
}); 