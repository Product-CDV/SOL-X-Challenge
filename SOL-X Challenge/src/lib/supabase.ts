import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      challenges: {
        Row: {
          id: string
          name: string
          description: string
          category: string
          icon: string
          gradient: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          description: string
          category: string
          icon?: string
          gradient?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          category?: string
          icon?: string
          gradient?: string
          created_at?: string
          updated_at?: string
        }
      }
      prizes: {
        Row: {
          id: string
          challenge_id: string
          position: number
          title: string
          description: string
          value: string | null
          created_at: string
        }
        Insert: {
          id?: string
          challenge_id: string
          position: number
          title: string
          description: string
          value?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          challenge_id?: string
          position?: number
          title?: string
          description?: string
          value?: string | null
          created_at?: string
        }
      }
      participants: {
        Row: {
          id: string
          challenge_id: string
          name: string
          avatar: string
          score: number
          rank: number
          badge: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          challenge_id: string
          name: string
          avatar?: string
          score?: number
          rank?: number
          badge?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          challenge_id?: string
          name?: string
          avatar?: string
          score?: number
          rank?: number
          badge?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}