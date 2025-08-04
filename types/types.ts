// types/types.ts

// 🔹 Note item structure
export interface Note {
    id: string;
    title: string;
    description: string;
    }

    // 🔹 Auth state structure
    export interface AuthState {
    isAuthenticated: boolean;
    username: string | null;
    }

    // 🔹 Notes state structure
    export interface NotesState {
    notes: Note[];
}
