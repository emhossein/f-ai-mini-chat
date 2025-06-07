import { Button } from "@/components/ui/button";

interface SuggestionChipProps {
  suggestion: string;
  onClick: (suggestion: string) => void;
}

export function SuggestionChip({ suggestion, onClick }: SuggestionChipProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="bg-accent/10 text-foreground hover:bg-accent/20 border-accent/30 transition-all hover:scale-105 hover:shadow-md active:scale-95"
      onClick={() => onClick(suggestion)}
    >
      {suggestion}
    </Button>
  );
}
