"use client";

import React, { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
// Smart suggestions (getSmartSuggestions, SuggestionControls, SuggestionChip, useDebounce) have been removed for static export compatibility.
// import { useToast } from "@/hooks/use-toast"; // Only used for suggestions, can be removed if no other toasts here.

interface MessageInputSectionProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

export function MessageInputSection({
  onSendMessage,
  disabled = false,
}: MessageInputSectionProps) {
  const [currentMessage, setCurrentMessage] = useState("");
  // const { toast } = useToast(); // Removed as suggestions are disabled

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (currentMessage.trim() && !disabled) {
      onSendMessage(currentMessage.trim());
      setCurrentMessage("");
    }
  };

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder={
            disabled ? "AI is responding..." : "Type your message..."
          }
          className="flex-grow text-base"
          aria-label="Message input"
          disabled={disabled}
        />
        <Button
          type="submit"
          size="icon"
          aria-label="Send message"
          disabled={!currentMessage.trim() || disabled}
        >
          <SendHorizonal className="h-5 w-5" />
        </Button>
      </form>
      {/* Suggestion-related UI and logic removed for static export */}
    </div>
  );
}
