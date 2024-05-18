import { useNavigate } from "@tanstack/react-router";
import { FormEvent } from "react";
import { supabase } from "../supabase";
import Logo from "./Logo";

export default function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const { email, password } = Object.fromEntries(formData) as {
      email: string;
      password: string;
    };

    if (email && password) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!error) {
        navigate({ to: "/clients" });
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-md border border-gray-100 shadow-md max-w-[600px] p-8 flex flex-col space-y-4"
    >
      <Logo animate={true} />
      <input
        className="rounded-md border border-slate-400 px-2 py-1"
        type="email"
        name="email"
        placeholder="Имейл"
        autoComplete="off"
      />
      <input
        className="rounded-md border border-slate-400 px-2 py-1"
        type="password"
        name="password"
        placeholder="Парола"
      />
      <button
        type="submit"
        className="flex items-center justify-center px-2 py-1 text-white bg-emerald-600 rounded-md"
      >
        Вход
      </button>
    </form>
  );
}
