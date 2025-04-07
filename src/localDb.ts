import Dexie, { Table } from "dexie";
import { Database } from "./types/supabase";

export class LocalDB extends Dexie {
    clients!: Table<Database["public"]["Tables"]["client"]["Row"], string>;

    constructor() {
        super("clients");
        this.version(1).stores({
            clients: "id, name, age, email, facts, phone, fee, occupation",
        });
    }
}

export const localDb = new LocalDB();
