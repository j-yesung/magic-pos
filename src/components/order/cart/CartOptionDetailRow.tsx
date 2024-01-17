import React from 'react';
import { Tables } from '@/types/supabase';

const CartOptionDetailRow = ({ details }: { details: Tables<'menu_option_detail'>[] }) => {
  return (
    <span>
      {details.map(detail => (
        <span key={detail.id}>{detail.name}</span>
      ))}
    </span>
  );
};

export default CartOptionDetailRow;
