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
          created_at: string
          email: string
          expertise: string | null
          full_name: string
          genre: Database["public"]["Enums"]["genre_type"] | null
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
          created_at?: string
          email: string
          expertise?: string | null
          full_name: string
          genre?: Database["public"]["Enums"]["genre_type"] | null
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
          created_at?: string
          email?: string
          expertise?: string | null
          full_name?: string
          genre?: Database["public"]["Enums"]["genre_type"] | null
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
          created_at: string
          genre: Database["public"]["Enums"]["genre_type"] | null
          id: string
          image_url: string | null
          instagram_handle: string | null
          is_featured: boolean | null
          location: string | null
          name: string
          spotify_url: string | null
          stage_name: string | null
          updated_at: string
          youtube_handle: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          genre?: Database["public"]["Enums"]["genre_type"] | null
          id?: string
          image_url?: string | null
          instagram_handle?: string | null
          is_featured?: boolean | null
          location?: string | null
          name: string
          spotify_url?: string | null
          stage_name?: string | null
          updated_at?: string
          youtube_handle?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          genre?: Database["public"]["Enums"]["genre_type"] | null
          id?: string
          image_url?: string | null
          instagram_handle?: string | null
          is_featured?: boolean | null
          location?: string | null
          name?: string
          spotify_url?: string | null
          stage_name?: string | null
          updated_at?: string
          youtube_handle?: string | null
        }
        Relationships: []
      }
      blogs: {
        Row: {
          author: string | null
          content: string
          created_at: string
          excerpt: string | null
          featured_image_url: string | null
          id: string
          published: boolean | null
          title: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          published?: boolean | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          published?: boolean | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          date_time: string
          description: string | null
          event_type: Database["public"]["Enums"]["event_type"] | null
          id: string
          image_url: string | null
          ticket_url: string | null
          title: string
          updated_at: string
          venue: string
        }
        Insert: {
          created_at?: string
          date_time: string
          description?: string | null
          event_type?: Database["public"]["Enums"]["event_type"] | null
          id?: string
          image_url?: string | null
          ticket_url?: string | null
          title: string
          updated_at?: string
          venue: string
        }
        Update: {
          created_at?: string
          date_time?: string
          description?: string | null
          event_type?: Database["public"]["Enums"]["event_type"] | null
          id?: string
          image_url?: string | null
          ticket_url?: string | null
          title?: string
          updated_at?: string
          venue?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
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
          created_at: string
          description: string | null
          genre: Database["public"]["Enums"]["genre_type"] | null
          id: string
          release_date: string | null
          teaser_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          album_art_url?: string | null
          artist_name: string
          created_at?: string
          description?: string | null
          genre?: Database["public"]["Enums"]["genre_type"] | null
          id?: string
          release_date?: string | null
          teaser_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          album_art_url?: string | null
          artist_name?: string
          created_at?: string
          description?: string | null
          genre?: Database["public"]["Enums"]["genre_type"] | null
          id?: string
          release_date?: string | null
          teaser_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      event_type:
        | "CONCERT"
        | "GIG"
        | "ALBUM_LAUNCH"
        | "MUSIC_VIDEO_PREMIERE"
        | "OTHER"
      genre_type:
        | "HIP_HOP"
        | "RAP"
        | "ELECTRONIC"
        | "INDIE_POP"
        | "ALTERNATIVE_ROCK"
        | "TRAP"
        | "SYNTHWAVE"
        | "PUNK_ROCK"
        | "EXPERIMENTAL"
        | "RNB"
        | "SOUL"
        | "OTHER"
      project_status: "UPCOMING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
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
      event_type: [
        "CONCERT",
        "GIG",
        "ALBUM_LAUNCH",
        "MUSIC_VIDEO_PREMIERE",
        "OTHER",
      ],
      genre_type: [
        "HIP_HOP",
        "RAP",
        "ELECTRONIC",
        "INDIE_POP",
        "ALTERNATIVE_ROCK",
        "TRAP",
        "SYNTHWAVE",
        "PUNK_ROCK",
        "EXPERIMENTAL",
        "RNB",
        "SOUL",
        "OTHER",
      ],
      project_status: ["UPCOMING", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
    },
  },
} as const
