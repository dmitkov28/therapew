import { Database } from "@/types/supabase";
declare global {
  type ClientInsert = Database["public"]["Tables"]["client"]["Insert"];
  type ClientRead = Database["public"]["Tables"]["client"]["Row"];
  type SessionInsert = Database["public"]["Tables"]["session"]["Insert"];
  type SessionRead = Database["public"]["Tables"]["session"]["Row"];
}

export {};
