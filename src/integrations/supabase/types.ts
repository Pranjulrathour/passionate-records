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
      artist_enrollments: {
        Row: {
          created_at: string | null
          email: string
          expertise: string | null
          full_name: string
          genre: string | null
          id: string
          instagram_handle: string | null
          message: string | null
          phone: string | null
          portfolio_url: string | null
          spotify_url: string | null
          stage_name: string | null
          status: string | null
          youtube_handle: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          expertise?: string | null
          full_name: string
          genre?: string | null
          id?: string
          instagram_handle?: string | null
          message?: string | null
          phone?: string | null
          portfolio_url?: string | null
          spotify_url?: string | null
          stage_name?: string | null
          status?: string | null
          youtube_handle?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          expertise?: string | null
          full_name?: string
          genre?: string | null
          id?: string
          instagram_handle?: string | null
          message?: string | null
          phone?: string | null
          portfolio_url?: string | null
          spotify_url?: string | null
          stage_name?: string | null
          status?: string | null
          youtube_handle?: string | null
        }
        Relationships: []
      }
      artists: {
        Row: {
          bio: string | null
          created_at: string | null
          genre: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          location: string | null
          master_link: string | null
          name: string
          stage_name: string | null
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          genre?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          location?: string | null
          master_link?: string | null
          name: string
          stage_name?: string | null
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          genre?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          location?: string | null
          master_link?: string | null
          name?: string
          stage_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      claims: {
        Row: {
          beneficiaries_count: number | null
          claim_type: string | null
          claimant_id: string
          claimed_at: string | null
          created_at: string | null
          delivered_at: string | null
          delivery_location: string | null
          donation_id: string
          id: string
          ngo_id: string | null
          notes: string | null
          picked_up_at: string | null
          status: Database["public"]["Enums"]["claim_status"] | null
          updated_at: string | null
          volunteer_id: string | null
        }
        Insert: {
          beneficiaries_count?: number | null
          claim_type?: string | null
          claimant_id: string
          claimed_at?: string | null
          created_at?: string | null
          delivered_at?: string | null
          delivery_location?: string | null
          donation_id: string
          id?: string
          ngo_id?: string | null
          notes?: string | null
          picked_up_at?: string | null
          status?: Database["public"]["Enums"]["claim_status"] | null
          updated_at?: string | null
          volunteer_id?: string | null
        }
        Update: {
          beneficiaries_count?: number | null
          claim_type?: string | null
          claimant_id?: string
          claimed_at?: string | null
          created_at?: string | null
          delivered_at?: string | null
          delivery_location?: string | null
          donation_id?: string
          id?: string
          ngo_id?: string | null
          notes?: string | null
          picked_up_at?: string | null
          status?: Database["public"]["Enums"]["claim_status"] | null
          updated_at?: string | null
          volunteer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "claims_claimant_id_fkey"
            columns: ["claimant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "claims_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "donations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "claims_ngo_id_fkey"
            columns: ["ngo_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "claims_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      },
      demo_submissions: {
        Row: {
          id: string
          created_at: string
          artist_name: string
          email: string
          genre: string
          demo_link: string
          message: string | null
          status: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          artist_name: string
          email: string
          genre: string
          demo_link: string
          message?: string | null
          status?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          artist_name?: string
          email?: string
          genre?: string
          demo_link?: string
          message?: string | null
          status?: string | null
        }
        Relationships: []
      },
      donations: {
        Row: {
          claim_type: string | null
          contact_phone: string | null
          created_at: string | null
          description: string | null
          dietary_info: string[] | null
          donor_id: string
          expiry_hours: number
          food_type: string
          id: string
          image_url: string | null
          latitude: number | null
          location: string
          longitude: number | null
          pickup_instructions: string | null
          quantity: number
          status: Database["public"]["Enums"]["donation_status"] | null
          unit: string | null
          updated_at: string | null
        }
        Insert: {
          claim_type?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          dietary_info?: string[] | null
          donor_id: string
          expiry_hours: number
          food_type: string
          id?: string
          image_url?: string | null
          latitude?: number | null
          location: string
          longitude?: number | null
          pickup_instructions?: string | null
          quantity: number
          status?: Database["public"]["Enums"]["donation_status"] | null
          unit?: string | null
          updated_at?: string | null
        }
        Update: {
          claim_type?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          dietary_info?: string[] | null
          donor_id?: string
          expiry_hours?: number
          food_type?: string
          id?: string
          image_url?: string | null
          latitude?: number | null
          location?: string
          longitude?: number | null
          pickup_instructions?: string | null
          quantity?: number
          status?: Database["public"]["Enums"]["donation_status"] | null
          unit?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string | null
          date_time: string
          description: string | null
          event_type: string | null
          id: string
          image_url: string | null
          ticket_url: string | null
          title: string
          updated_at: string | null
          venue: string
        }
        Insert: {
          created_at?: string | null
          date_time: string
          description?: string | null
          event_type?: string | null
          id?: string
          image_url?: string | null
          ticket_url?: string | null
          title: string
          updated_at?: string | null
          venue: string
        }
        Update: {
          created_at?: string | null
          date_time?: string
          description?: string | null
          event_type?: string | null
          id?: string
          image_url?: string | null
          ticket_url?: string | null
          title?: string
          updated_at?: string | null
          venue?: string
        }
        Relationships: []
      }
      impact: {
        Row: {
          carbon_footprint_reduced: number | null
          created_at: string | null
          deliveries_completed: number | null
          id: string
          meals_distributed: number | null
          meals_donated: number | null
          points: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          carbon_footprint_reduced?: number | null
          created_at?: string | null
          deliveries_completed?: number | null
          id?: string
          meals_distributed?: number | null
          meals_donated?: number | null
          points?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          carbon_footprint_reduced?: number | null
          created_at?: string | null
          deliveries_completed?: number | null
          id?: string
          meals_distributed?: number | null
          meals_donated?: number | null
          points?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "impact_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      latest_releases: {
        Row: {
          artist_id: string | null
          artist_name: string
          audio_preview_url: string | null
          cover_art_url: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          genre: string | null
          id: string
          is_featured: boolean | null
          master_link: string | null
          release_date: string | null
          release_type: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          artist_id?: string | null
          artist_name: string
          audio_preview_url?: string | null
          cover_art_url?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          genre?: string | null
          id?: string
          is_featured?: boolean | null
          master_link?: string | null
          release_date?: string | null
          release_type?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          artist_id?: string | null
          artist_name?: string
          audio_preview_url?: string | null
          cover_art_url?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          genre?: string | null
          id?: string
          is_featured?: boolean | null
          master_link?: string | null
          release_date?: string | null
          release_type?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "latest_releases_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string
          description: string | null
          id: string
          read: boolean
          related_entity_id: string | null
          related_entity_type: string | null
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          read?: boolean
          related_entity_id?: string | null
          related_entity_type?: string | null
          title: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          read?: boolean
          related_entity_id?: string | null
          related_entity_type?: string | null
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string | null
          email: string
          first_name: string | null
          full_name: string | null
          id: string
          last_name: string | null
          latitude: number | null
          longitude: number | null
          organization_name: string | null
          phone: string | null
          profile_image_url: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          verified: boolean | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email: string
          first_name?: string | null
          full_name?: string | null
          id: string
          last_name?: string | null
          latitude?: number | null
          longitude?: number | null
          organization_name?: string | null
          phone?: string | null
          profile_image_url?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          verified?: boolean | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string
          first_name?: string | null
          full_name?: string | null
          id?: string
          last_name?: string | null
          latitude?: number | null
          longitude?: number | null
          organization_name?: string | null
          phone?: string | null
          profile_image_url?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          artist_id: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          project_type: string | null
          release_date: string | null
          status: Database["public"]["Enums"]["project_status"] | null
          teaser_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          artist_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          project_type?: string | null
          release_date?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          teaser_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          artist_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          project_type?: string | null
          release_date?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          teaser_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
        ]
      }
      upcoming_albums: {
        Row: {
          album_art_url: string | null
          artist_name: string
          created_at: string | null
          description: string | null
          genre: string | null
          id: string
          release_date: string | null
          teaser_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          album_art_url?: string | null
          artist_name: string
          created_at?: string | null
          description?: string | null
          genre?: string | null
          id?: string
          release_date?: string | null
          teaser_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          album_art_url?: string | null
          artist_name?: string
          created_at?: string | null
          description?: string | null
          genre?: string | null
          id?: string
          release_date?: string | null
          teaser_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      claims_with_profiles: {
        Row: {
          beneficiaries_count: number | null
          claimant_id: string | null
          claimed_at: string | null
          created_at: string | null
          delivered_at: string | null
          delivery_location: string | null
          donation_id: string | null
          id: string | null
          ngo_first_name: string | null
          ngo_id: string | null
          ngo_last_name: string | null
          ngo_organization_name: string | null
          notes: string | null
          picked_up_at: string | null
          status: Database["public"]["Enums"]["claim_status"] | null
          updated_at: string | null
          volunteer_first_name: string | null
          volunteer_id: string | null
          volunteer_last_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "claims_claimant_id_fkey"
            columns: ["claimant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "claims_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "donations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "claims_ngo_id_fkey"
            columns: ["ngo_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "claims_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      make_user_admin: {
        Args: { user_email: string }
        Returns: string
      }
    }
    Enums: {
      claim_status: "claimed" | "picked_up" | "delivered" | "cancelled"
      project_status: "upcoming" | "active" | "completed" | "cancelled"
      donation_status:
        | "submitted"
        | "claimed"
        | "picked_up"
        | "delivered"
        | "cancelled"
      user_role: "donor" | "ngo" | "volunteer" | "admin"
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
    Enums: {
      claim_status: ["claimed", "picked_up", "delivered", "cancelled"],
      donation_status: [
        "submitted",
        "claimed",
        "picked_up",
        "delivered",
        "cancelled",
      ],
      user_role: ["donor", "ngo", "volunteer", "admin"],
    },
  },
} as const
