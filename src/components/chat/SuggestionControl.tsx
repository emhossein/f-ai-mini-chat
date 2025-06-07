"use client";
import React, { useCallback } from "react";
import type { SuggestionLength, SuggestionCreativity } from "@/types";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils"; // Added this import

interface SuggestionControlsProps {
  length: SuggestionLength;
  setLength: (length: SuggestionLength) => void;
  creativity: SuggestionCreativity;
  setCreativity: (creativity: SuggestionCreativity) => void;
  disabled?: boolean; // Added disabled prop
}

const lengthOptions: { value: SuggestionLength; label: string }[] = [
  { value: "short", label: "Short" },
  { value: "medium", label: "Medium" },
  { value: "long", label: "Long" },
];

const creativityOptions: { value: SuggestionCreativity; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export function SuggestionControls({
  length,
  setLength,
  creativity,
  setCreativity,
  disabled = false, // Default value for disabled
}: SuggestionControlsProps) {
  const handleLengthChange = useCallback(
    (value: string) => {
      if (disabled) return;
      setLength(value as SuggestionLength);
    },
    [setLength, disabled],
  );

  const handleCreativityChange = useCallback(
    (value: string) => {
      if (disabled) return;
      setCreativity(value as SuggestionCreativity);
    },
    [setCreativity, disabled],
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mt-3">
      <div className="flex items-center gap-2">
        <Label
          htmlFor="suggestion-length"
          className={cn(
            "text-sm font-medium",
            disabled && "text-muted-foreground/70",
          )}
        >
          Length:
        </Label>
        <Select
          value={length}
          onValueChange={handleLengthChange}
          disabled={disabled}
        >
          <SelectTrigger id="suggestion-length" className="w-[120px] h-9">
            <SelectValue placeholder="Length" />
          </SelectTrigger>
          <SelectContent>
            {lengthOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Label
          htmlFor="suggestion-creativity"
          className={cn(
            "text-sm font-medium",
            disabled && "text-muted-foreground/70",
          )}
        >
          Creativity:
        </Label>
        <Select
          value={creativity}
          onValueChange={handleCreativityChange}
          disabled={disabled}
        >
          <SelectTrigger id="suggestion-creativity" className="w-[120px] h-9">
            <SelectValue placeholder="Creativity" />
          </SelectTrigger>
          <SelectContent>
            {creativityOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
