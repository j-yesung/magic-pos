export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];
export interface Database {
  public: {
    Tables: {
      cart: {
        Row: {
          id: string;
          is_done: boolean;
          menu_list: Json[] | null;
          order_id: string | null;
          order_number: number;
          order_time: string;
          payment_method_id: number | null;
          '\bstore_id': string;
          table_id: string | null;
          total_price: number;
        };
        Insert: {
          id?: string;
          is_done?: boolean;
          menu_list?: Json[] | null;
          order_id?: string | null;
          order_number?: number;
          order_time?: string;
          payment_method_id?: number | null;
          '\bstore_id': string;
          table_id?: string | null;
          total_price?: number;
        };
        Update: {
          id?: string;
          is_done?: boolean;
          menu_list?: Json[] | null;
          order_id?: string | null;
          order_number?: number;
          order_time?: string;
          payment_method_id?: number | null;
          '\bstore_id'?: string;
          table_id?: string | null;
          total_price?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'cart_payment_method_id_fkey';
            columns: ['payment_method_id'];
            isOneToOne: false;
            referencedRelation: 'payment_method';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'cart_\bstore_id_fkey';
            columns: ['\bstore_id'];
            isOneToOne: false;
            referencedRelation: 'store';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'cart_table_id_fkey';
            columns: ['table_id'];
            isOneToOne: false;
            referencedRelation: 'store_table';
            referencedColumns: ['id'];
          },
        ];
      };
      distribution: {
        Row: {
          company_name: string | null;
          id: string;
          menu_id: string;
        };
        Insert: {
          company_name?: string | null;
          id?: string;
          menu_id: string;
        };
        Update: {
          company_name?: string | null;
          id?: string;
          menu_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'distribution_menu_id_fkey';
            columns: ['menu_id'];
            isOneToOne: false;
            referencedRelation: 'menu_item';
            referencedColumns: ['id'];
          },
        ];
      };
      distribution_detail: {
        Row: {
          distribution_id: string;
          id: string;
          min_ea: number | null;
          name: string | null;
          price: number | null;
        };
        Insert: {
          distribution_id: string;
          id?: string;
          min_ea?: number | null;
          name?: string | null;
          price?: number | null;
        };
        Update: {
          distribution_id?: string;
          id?: string;
          min_ea?: number | null;
          name?: string | null;
          price?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'distribution_detail_distribution_id_fkey';
            columns: ['distribution_id'];
            isOneToOne: false;
            referencedRelation: 'distribution';
            referencedColumns: ['id'];
          },
        ];
      };
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
          price: number;
          remain_ea: number | null;
        };
        Insert: {
          category_id: string;
          id?: string;
          image_url?: string | null;
          name?: string | null;
          price?: number;
          remain_ea?: number | null;
        };
        Update: {
          category_id?: string;
          id?: string;
          image_url?: string | null;
          name?: string | null;
          price?: number;
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
          menu_id: string;
          name: string | null;
          option_kind: string[] | null;
        };
        Insert: {
          id?: string;
          is_use?: boolean | null;
          menu_id: string;
          name?: string | null;
          option_kind?: string[] | null;
        };
        Update: {
          id?: string;
          is_use?: boolean | null;
          menu_id?: string;
          name?: string | null;
          option_kind?: string[] | null;
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
          product_category: string | null;
          product_ea: number | null;
          product_name: string | null;
          product_price: number | null;
          sales_date: string | null;
          store_id: string;
        };
        Insert: {
          id?: string;
          product_category?: string | null;
          product_ea?: number | null;
          product_name?: string | null;
          product_price?: number | null;
          sales_date?: string | null;
          store_id: string;
        };
        Update: {
          id?: string;
          product_category?: string | null;
          product_ea?: number | null;
          product_name?: string | null;
          product_price?: number | null;
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
        };
        Insert: {
          business_id: string;
          business_name?: string | null;
          business_number?: string | null;
          end_time?: string | null;
          id?: string;
          order_number?: number;
          start_time?: string | null;
        };
        Update: {
          business_id?: string;
          business_name?: string | null;
          business_number?: string | null;
          end_time?: string | null;
          id?: string;
          order_number?: number;
          start_time?: string | null;
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
          store_id?: string;
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
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      increment_order_number: {
        Args: {
          row_id: string;
        };
        Returns: undefined;
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
}
interface CategoryWithMenuItem extends Tables<'menu_category'> {
  menu_item: Tables<'menu_item'>[];
}