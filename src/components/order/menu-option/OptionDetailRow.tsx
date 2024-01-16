import React from 'react';
import { Tables } from '@/types/supabase';

const OptionDetailRow = ({ detail }: { detail: Tables<'menu_option_detail'> }) => {
  return (
    <div>
      <input type="checkbox" />
      <span>{detail.name}</span>
    </div>
  );
};

export default OptionDetailRow;
