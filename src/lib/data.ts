import { supabase } from "@/supabase";

export const getClient = async (clientId: string) => {
  const { data, error } = await supabase
    .from("client")
    .select("*, session(*)")
    .eq("id", clientId)
    .limit(10, { referencedTable: "session" })
    .order("date", {referencedTable: "session", ascending: false})
    .single();
  if (!error) {
    return data;
  }
  throw new Error(error.message);
};

export const getClients = async () => {
  const { data, error } = await supabase.from("client").select("*");
  if (!error) {
    return data;
  }
  throw new Error(error.message);
};

export const addClient = async (newClient: ClientInsert) => {
  const { data, error } = await supabase
    .from("client")
    .upsert(newClient, { onConflict: "id", ignoreDuplicates: false })
    .select()
    .single();
  if (!error) {
    return data;
  }
  throw new Error(error.message);
};

export const searchByText = async (searchValue: string) => {
  const { data, error } = await supabase.rpc("search_client", {
    search_query: searchValue,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getPaginatedClients = async ({
  from = 0,
  to = 10,
  searchFilter,
}: {
  from: number;
  to: number;
  searchFilter?: string;
}) => {
  if (searchFilter) {
    const data = await searchByText(searchFilter);
    return data;
  }

  const { data, error } = await supabase
    .from("client")
    .select("*")
    .range(from, to);
  if (!error) {
    return data;
  }
  throw new Error(error.message);
};

export const deleteClient = async (clientId: string) => {
  const { error } = await supabase.from("client").delete().eq("id", clientId);
  if (error) {
    throw new Error(error.message);
  }
};

export const addSession = async (session: SessionInsert) => {
  const { data, error } = await supabase
    .from("session")
    .upsert(session, { onConflict: "id", ignoreDuplicates: false })
    .select()
    .single();
  if (!error) {
    return data;
  }
  throw new Error(error.message);
};

export const getSession = async (sessionId: string) => {
  const { data, error } = await supabase
    .from("session")
    .select("*, client(*)")
    .eq("id", sessionId)
    .single();
  if (!error) {
    return data;
  }
  throw new Error(error.message);
};
