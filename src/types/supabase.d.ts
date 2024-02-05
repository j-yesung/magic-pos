export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      menu_category: {
        Row: {
          id: string;
          name: string | null;
          position: number | null;
          store_id: string;
        };
        Insert: {
          id?: string;
          name?: string | null;
          position?: number | null;
          store_id: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          position?: number | null;
          store_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'menu_category_store_id_fkey';
            columns: ['store_id'];
            isOneToOne: false;
            referencedRelation: 'store';
            referencedColumns: ['id'];
          },
        ];
      };
      menu_item: {
        Row: {
          category_id: string;
          id: string;
          image_url: string | null;
          name: string | null;
          position: number;
          price: number;
          recommended: boolean;
          remain_ea: number | null;
        };
        Insert: {
          category_id: string;
          id?: string;
          image_url?: string | null;
          name?: string | null;
          position?: number;
          price?: number;
          recommended?: boolean;
          remain_ea?: number | null;
        };
        Update: {
          category_id?: string;
          id?: string;
          image_url?: string | null;
          name?: string | null;
          position?: number;
          price?: number;
          recommended?: boolean;
          remain_ea?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'menu_item_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'menu_category';
            referencedColumns: ['id'];
          },
        ];
      };
      menu_option: {
        Row: {
          id: string;
          is_use: boolean | null;
          max_detail_count: number;
          menu_id: string;
          name: string | null;
        };
        Insert: {
          id?: string;
          is_use?: boolean | null;
          max_detail_count?: number;
          menu_id: string;
          name?: string | null;
        };
        Update: {
          id?: string;
          is_use?: boolean | null;
          max_detail_count?: number;
          menu_id?: string;
          name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'menu_option_menu_id_fkey';
            columns: ['menu_id'];
            isOneToOne: false;
            referencedRelation: 'menu_item';
            referencedColumns: ['id'];
          },
        ];
      };
      menu_option_detail: {
        Row: {
          id: string;
          name: string;
          option_id: string;
          price: number;
        };
        Insert: {
          id?: string;
          name?: string;
          option_id: string;
          price?: number;
        };
        Update: {
          id?: string;
          name?: string;
          option_id?: string;
          price?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'menu_option_detail_option_id_fkey';
            columns: ['option_id'];
            isOneToOne: false;
            referencedRelation: 'menu_option';
            referencedColumns: ['id'];
          },
        ];
      };
      order_number: {
        Row: {
          id: string;
          is_done: boolean;
          is_togo: boolean;
          menu_list: Json[];
          order_id: string;
          order_number: number;
          order_time: string;
          payment_method: string;
          store_id: string;
          total_price: number;
        };
        Insert: {
          id?: string;
          is_done?: boolean;
          is_togo?: boolean;
          menu_list: Json[];
          order_id?: string;
          order_number?: number;
          order_time?: string;
          payment_method?: string;
          store_id: string;
          total_price?: number;
        };
        Update: {
          id?: string;
          is_done?: boolean;
          is_togo?: boolean;
          menu_list?: Json[];
          order_id?: string;
          order_number?: number;
          order_time?: string;
          payment_method?: string;
          store_id?: string;
          total_price?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'order_number_store_id_fkey';
            columns: ['store_id'];
            isOneToOne: false;
            referencedRelation: 'store';
            referencedColumns: ['id'];
          },
        ];
      };
      order_store: {
        Row: {
          id: string;
          is_done: boolean;
          menu_list: Json[];
          order_id: string;
          order_number: number;
          order_time: string;
          payment_method: string;
          store_id: string;
          table_id: string;
          total_price: number;
        };
        Insert: {
          id?: string;
          is_done?: boolean;
          menu_list: Json[];
          order_id?: string;
          order_number?: number;
          order_time?: string;
          payment_method?: string;
          store_id: string;
          table_id: string;
          total_price?: number;
        };
        Update: {
          id?: string;
          is_done?: boolean;
          menu_list?: Json[];
          order_id?: string;
          order_number?: number;
          order_time?: string;
          payment_method?: string;
          store_id?: string;
          table_id?: string;
          total_price?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'order_store_store_id_fkey';
            columns: ['store_id'];
            isOneToOne: false;
            referencedRelation: 'store';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_store_table_id_fkey';
            columns: ['table_id'];
            isOneToOne: false;
            referencedRelation: 'store_table';
            referencedColumns: ['id'];
          },
        ];
      };
      payment_method: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      platform: {
        Row: {
          created_at: string;
          id: string;
          image_url: string | null;
          link_url: string | null;
          name: string | null;
          store_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          image_url?: string | null;
          link_url?: string | null;
          name?: string | null;
          store_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          image_url?: string | null;
          link_url?: string | null;
          name?: string | null;
          store_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'platform_store_id_fkey';
            columns: ['store_id'];
            isOneToOne: false;
            referencedRelation: 'store';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          email: string | null;
          id: string;
          is_disabled: boolean | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id: string;
          is_disabled?: boolean | null;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: string;
          is_disabled?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      sales: {
        Row: {
          id: string;
          order_type: string | null;
          product_category: string | null;
          product_ea: number;
          product_name: string | null;
          product_price: number;
          sales_date: string | null;
          store_id: string;
        };
        Insert: {
          id?: string;
          order_type?: string | null;
          product_category?: string | null;
          product_ea?: number;
          product_name?: string | null;
          product_price?: number;
          sales_date?: string | null;
          store_id: string;
        };
        Update: {
          id?: string;
          order_type?: string | null;
          product_category?: string | null;
          product_ea?: number;
          product_name?: string | null;
          product_price?: number;
          sales_date?: string | null;
          store_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'sales_store_id_fkey';
            columns: ['store_id'];
            isOneToOne: false;
            referencedRelation: 'store';
            referencedColumns: ['id'];
          },
        ];
      };
      store: {
        Row: {
          business_id: string;
          business_name: string | null;
          business_number: string | null;
          end_time: string | null;
          id: string;
          order_number: number;
          start_time: string | null;
          use_table: boolean;
        };
        Insert: {
          business_id: string;
          business_name?: string | null;
          business_number?: string | null;
          end_time?: string | null;
          id?: string;
          order_number?: number;
          start_time?: string | null;
          use_table?: boolean;
        };
        Update: {
          business_id?: string;
          business_name?: string | null;
          business_number?: string | null;
          end_time?: string | null;
          id?: string;
          order_number?: number;
          start_time?: string | null;
          use_table?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: 'store_business_id_fkey';
            columns: ['business_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      store_table: {
        Row: {
          id: string;
          is_disabled: number | null;
          max_guest: number | null;
          position: number | null;
          store_id: string;
        };
        Insert: {
          id?: string;
          is_disabled?: number | null;
          max_guest?: number | null;
          position?: number | null;
          store_id: string;
        };
        Update: {
          id?: string;
          is_disabled?: number | null;
          max_guest?: number | null;
          position?: number | null;
          store_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'store_table_store_id_fkey';
            columns: ['store_id'];
            isOneToOne: false;
            referencedRelation: 'store';
            referencedColumns: ['id'];
          },
        ];
      };
      user_tokens: {
        Row: {
          id: string;
          order_id: string;
          token: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          token: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          token?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'constraint_order_number';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'order_number';
            referencedColumns: ['order_id'];
          },
          {
            foreignKeyName: 'user_tokens_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'order_store';
            referencedColumns: ['order_id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      decrement_remain_ea: {
        Args: {
          menu_id: string;
        };
        Returns: undefined;
      };
      increment_order_number: {
        Args: {
          row_id: string;
        };
        Returns: number;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] & Database['public']['Views'])
    ? (Database['public']['Tables'] & Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never;

interface StoreWithStoreTable extends Tables<'store'> {
  store_table: Tables<'store_table'>[];
  order_store: Tables<'order_store'>[];
}

interface StoreWithOrderInfo extends Tables<'store'> {
  store_table: Tables<'store_table'>[];
  order_store: Tables<'order_store'>[];
  order_number: Tables<'order_number'>[];
}
interface CategoryWithMenuItem extends Tables<'menu_category'> {
  menu_item: MenuItemWithOption[];
}

interface CategoryWithMenuItemWithStore extends CategoryWithMenuItem {
  store: Pick<Tables<'store'>, 'business_name', 'use_table'>;
}

type StoreOrderWithStoreName = Tables<'order_store'>['Row'] & {
  store: Pick<Tables<'store'>, 'business_name'>;
};

type NumberOrderWithStoreName = Tables<'order_number'>['Row'] & {
  store: Pick<Tables<'store'>, 'business_name'>;
};

type OrderDataWithStoreName = NumberOrderWithStoreName & StoreOrderWithStoreName;

interface MenuOptionWithDetail extends Tables<'menu_option'> {
  menu_option_detail: Tables<'menu_option_detail'>[];
}

type MenuItemWithOption = Tables<'menu_item'> & { menu_option: MenuOptionWithDetail[]; unique: string };

type StoreTableInQRCode = Pick<StoreWithStoreTable, 'store_table'>;
