import { create } from "zustand";

export interface Email {
  id: string;
  sender: {
    name: string;
    email: string;
    avatar?: string;
  };
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  labels: string[];
  body?: string; // Full content
  aiAnalysis?: {
    type: "meeting" | "inquiry" | "follow-up" | "other";
    summary: string;
    suggestedActions?: string[];
    draftReply?: string;
  };
}

interface InboxState {
  emails: Email[];
  selectedEmailIds: Set<string>;
  currentEmailId: string | null;
  searchQuery: string;
  filter: "all" | "unread" | "starred";

  // Actions
  setEmails: (emails: Email[]) => void;
  selectEmail: (id: string) => void;
  deselectEmail: (id: string) => void;
  toggleSelection: (id: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
  setCurrentEmail: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setFilter: (filter: "all" | "unread" | "starred") => void;
}

export const useInboxStore = create<InboxState>((set) => ({
  emails: [], // We'll populate this with mock data later
  selectedEmailIds: new Set(),
  currentEmailId: null,
  searchQuery: "",
  filter: "all",

  setEmails: (emails) => set({ emails }),

  selectEmail: (id) =>
    set((state) => ({
      selectedEmailIds: new Set(state.selectedEmailIds).add(id),
    })),

  deselectEmail: (id) =>
    set((state) => {
      const newSet = new Set(state.selectedEmailIds);
      newSet.delete(id);
      return { selectedEmailIds: newSet };
    }),

  toggleSelection: (id) =>
    set((state) => {
      const newSet = new Set(state.selectedEmailIds);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return { selectedEmailIds: newSet };
    }),

  selectAll: () =>
    set((state) => ({
      selectedEmailIds: new Set(state.emails.map((e) => e.id)),
    })),

  deselectAll: () => set({ selectedEmailIds: new Set() }),

  setCurrentEmail: (id) => set({ currentEmailId: id }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setFilter: (filter) => set({ filter }),
}));
