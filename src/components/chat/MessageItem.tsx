import type { Message } from "@/types";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  const isUser = message.sender === "user";
  const alignmentClass = isUser ? "justify-end" : "justify-start";
  // Apply new glass utility classes
  const bubbleClass = isUser
    ? "glass-primary-bubble text-primary-foreground rounded-br-none"
    : "glass-secondary-bubble text-secondary-foreground rounded-bl-none";

  const formattedTimestamp = formatDistanceToNow(new Date(message.timestamp), {
    addSuffix: true,
  });

  return (
    <div className={cn("flex w-full animate-fade-in", alignmentClass)}>
      <div
        className={cn(
          "max-w-[70%] p-3 prose dark:prose-invert prose-sm",
          bubbleClass,
        )}
      >
        {" "}
        {/* Removed shadow-md */}
        {isUser ? (
          <p className="text-sm break-words m-0">{message.text}</p>
        ) : (
          <ReactMarkdown
            className="text-sm break-words"
            components={{
              p: ({ node, ...props }) => <p className="m-0" {...props} />,
            }}
          >
            {message.text}
          </ReactMarkdown>
        )}
        <p
          className={cn(
            "text-xs mt-1",
            isUser
              ? "text-primary-foreground/70 text-right"
              : "text-secondary-foreground/70 text-left",
          )}
        >
          {formattedTimestamp}
        </p>
      </div>
    </div>
  );
}
