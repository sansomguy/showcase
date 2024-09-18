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
      deployments: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      never_shutdown_crons: {
        Row: {
          created_at: string
          id: number
          update_time: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          update_time?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          update_time?: string | null
        }
        Relationships: []
      }
      notion_pages: {
        Row: {
          category: string | null
          content: string | null
          created: string
          created_at: string
          id: string
          last_edited: string | null
          order: number
          series: string | null
          status: string | null
          summary: string | null
          title: string
        }
        Insert: {
          category?: string | null
          content?: string | null
          created?: string
          created_at?: string
          id: string
          last_edited?: string | null
          order?: number
          series?: string | null
          status?: string | null
          summary?: string | null
          title: string
        }
        Update: {
          category?: string | null
          content?: string | null
          created?: string
          created_at?: string
          id?: string
          last_edited?: string | null
          order?: number
          series?: string | null
          status?: string | null
          summary?: string | null
          title?: string
        }
        Relationships: []
      }
      workflow_actions: {
        Row: {
          created_at: string
          id: number
          name: string
          well_known_work_type: string
          workflow_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          well_known_work_type: string
          workflow_id: number
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          well_known_work_type?: string
          workflow_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "workflow_actions_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_conditions: {
        Row: {
          created_at: string
          id: number
          name: string
          well_known_condition_type: string
          workflow_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          well_known_condition_type: string
          workflow_id: number
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          well_known_condition_type?: string
          workflow_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "workflow_conditions_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_runs: {
        Row: {
          created_at: string
          id: number
          workflow_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          workflow_id: number
        }
        Update: {
          created_at?: string
          id?: number
          workflow_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "workflow_runs_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_runs_actions: {
        Row: {
          created_at: string
          finished_at: string | null
          id: number
          input: Json | null
          output: Json | null
          status: string
          workflow_action_id: number
          workflow_run_id: number
        }
        Insert: {
          created_at?: string
          finished_at?: string | null
          id?: number
          input?: Json | null
          output?: Json | null
          status?: string
          workflow_action_id: number
          workflow_run_id: number
        }
        Update: {
          created_at?: string
          finished_at?: string | null
          id?: number
          input?: Json | null
          output?: Json | null
          status?: string
          workflow_action_id?: number
          workflow_run_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "workflow_runs_actions_workflow_action_id_fkey"
            columns: ["workflow_action_id"]
            isOneToOne: false
            referencedRelation: "workflow_actions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_runs_actions_workflow_run_id_fkey"
            columns: ["workflow_run_id"]
            isOneToOne: false
            referencedRelation: "workflow_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_transitions: {
        Row: {
          created_at: string
          from_action: number | null
          from_condition: number | null
          id: number
          to_action: number | null
          to_condition: number | null
          workflow_id: number
        }
        Insert: {
          created_at?: string
          from_action?: number | null
          from_condition?: number | null
          id?: number
          to_action?: number | null
          to_condition?: number | null
          workflow_id: number
        }
        Update: {
          created_at?: string
          from_action?: number | null
          from_condition?: number | null
          id?: number
          to_action?: number | null
          to_condition?: number | null
          workflow_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "workflow_transitions_from_action_fkey"
            columns: ["from_action"]
            isOneToOne: false
            referencedRelation: "workflow_actions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_transitions_from_condition_fkey"
            columns: ["from_condition"]
            isOneToOne: false
            referencedRelation: "workflow_conditions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_transitions_to_action_fkey"
            columns: ["to_action"]
            isOneToOne: false
            referencedRelation: "workflow_actions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_transitions_to_condition_fkey"
            columns: ["to_condition"]
            isOneToOne: false
            referencedRelation: "workflow_conditions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_transitions_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflows: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      call_notion_oauth_token: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      fetch_notion_blogs: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      upsert_vercel_deployment: {
        Args: Record<PropertyKey, never>
        Returns: Json
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
