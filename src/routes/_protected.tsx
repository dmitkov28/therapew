import { supabase } from "@/supabase";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !(data.user.aud === "authenticated")) {
      throw redirect({ to: "/" });
    }
  },
});
