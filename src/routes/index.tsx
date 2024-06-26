import { createFileRoute, redirect } from "@tanstack/react-router";
import LoginForm from "../components/LoginForm";
import { supabase } from "@/supabase";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (!error && data.user.aud === "authenticated") {
      throw redirect({ to: "/clients" });
    }
  },
  component: () => <LoginPage />,
});

const LoginPage = () => {
  return (
    <div className="flex flex-col flex-grow gap-8 items-center justify-center w-full">
      <LoginForm />
    </div>
  );
};
