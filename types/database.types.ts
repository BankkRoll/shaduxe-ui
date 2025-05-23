export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      paid_users: {
        Row: {
          amount_paid: number | null
          created_at: string | null
          email: string | null
          id: number
          license_type: string | null
          payment_status: string | null
          product_id: string | null
          product_type: string
          purchase_date: string | null
          stripe_checkout_session_id: string | null
          user_id: string
        }
        Insert: {
          amount_paid?: number | null
          created_at?: string | null
          email?: string | null
          id?: number
          license_type?: string | null
          payment_status?: string | null
          product_id?: string | null
          product_type: string
          purchase_date?: string | null
          stripe_checkout_session_id?: string | null
          user_id: string
        }
        Update: {
          amount_paid?: number | null
          created_at?: string | null
          email?: string | null
          id?: number
          license_type?: string | null
          payment_status?: string | null
          product_id?: string | null
          product_type?: string
          purchase_date?: string | null
          stripe_checkout_session_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      stripe_events: {
        Row: {
          created_at: string | null
          event_type: string
          id: number
          processed_at: string
          stripe_event_id: string
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: number
          processed_at: string
          stripe_event_id: string
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: number
          processed_at?: string
          stripe_event_id?: string
        }
        Relationships: []
      }
      team_licenses: {
        Row: {
          id: number
          max_seats: number | null
          owner_user_id: string
          purchase_date: string | null
          stripe_checkout_session_id: string | null
          used_seats: number | null
        }
        Insert: {
          id?: number
          max_seats?: number | null
          owner_user_id: string
          purchase_date?: string | null
          stripe_checkout_session_id?: string | null
          used_seats?: number | null
        }
        Update: {
          id?: number
          max_seats?: number | null
          owner_user_id?: string
          purchase_date?: string | null
          stripe_checkout_session_id?: string | null
          used_seats?: number | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          activation_date: string | null
          email: string
          id: number
          invitation_date: string | null
          invitation_token: string | null
          status: string
          team_license_id: number
          user_id: string | null
        }
        Insert: {
          activation_date?: string | null
          email: string
          id?: number
          invitation_date?: string | null
          invitation_token?: string | null
          status?: string
          team_license_id: number
          user_id?: string | null
        }
        Update: {
          activation_date?: string | null
          email?: string
          id?: number
          invitation_date?: string | null
          invitation_token?: string | null
          status?: string
          team_license_id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_license_id_fkey"
            columns: ["team_license_id"]
            isOneToOne: false
            referencedRelation: "team_licenses"
            referencedColumns: ["id"]
          },
        ]
      }
      template_downloads: {
        Row: {
          created_at: string | null
          download_date: string | null
          id: number
          ip_address: string | null
          template_id: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          download_date?: string | null
          id?: number
          ip_address?: string | null
          template_id: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          download_date?: string | null
          id?: number
          ip_address?: string | null
          template_id?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "template_downloads_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      templates: {
        Row: {
          author: string | null
          created_at: string | null
          description: string | null
          features: Json | null
          id: string
          image_url: string | null
          last_updated: string | null
          live_preview_url: string | null
          name: string
          preview_url: string | null
          price: number
          published: boolean | null
          tech_stack: Json | null
          updated_at: string | null
          version: string | null
          video_url: string | null
        }
        Insert: {
          author?: string | null
          created_at?: string | null
          description?: string | null
          features?: Json | null
          id: string
          image_url?: string | null
          last_updated?: string | null
          live_preview_url?: string | null
          name: string
          preview_url?: string | null
          price: number
          published?: boolean | null
          tech_stack?: Json | null
          updated_at?: string | null
          version?: string | null
          video_url?: string | null
        }
        Update: {
          author?: string | null
          created_at?: string | null
          description?: string | null
          features?: Json | null
          id?: string
          image_url?: string | null
          last_updated?: string | null
          live_preview_url?: string | null
          name?: string
          preview_url?: string | null
          price?: number
          published?: boolean | null
          tech_stack?: Json | null
          updated_at?: string | null
          version?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          access_granted_date: string | null
          created_at: string | null
          has_lifetime_access: boolean | null
          id: number
          stripe_customer_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_granted_date?: string | null
          created_at?: string | null
          has_lifetime_access?: boolean | null
          id?: number
          stripe_customer_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_granted_date?: string | null
          created_at?: string | null
          has_lifetime_access?: boolean | null
          id?: number
          stripe_customer_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_templates: {
        Row: {
          created_at: string | null
          id: number
          purchase_date: string | null
          stripe_checkout_session_id: string | null
          template_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          purchase_date?: string | null
          stripe_checkout_session_id?: string | null
          template_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          purchase_date?: string | null
          stripe_checkout_session_id?: string | null
          template_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_templates_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_team_member: {
        Args: { owner_id: string; email_address: string }
        Returns: Json
      }
      get_team_data_for_user: {
        Args: { user_id: string }
        Returns: Json
      }
      has_template_access: {
        Args: { p_user_id: string; p_template_id: string }
        Returns: boolean
      }
      is_team_member: {
        Args: { team_id: number }
        Returns: boolean
      }
      is_team_owner: {
        Args: { team_id: number }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
