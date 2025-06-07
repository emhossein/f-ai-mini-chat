export interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: string; // ISO string
}

export type SuggestionLength = "short" | "medium" | "long";
export type SuggestionCreativity = "low" | "medium" | "high";
