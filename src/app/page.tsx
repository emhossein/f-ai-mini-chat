"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import type { Message } from "@/types";
import { Header } from "@/components/layout/Header";
import { MessageList } from "@/components/chat/MessageList";
import { MessageInputSection } from "@/components/chat/MessageInputSection";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export default function ChatPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const localStorageKey = user
    ? `chatHistory_${user.uid}`
    : "chatHistory_guest";
  const [messages, setMessages] = useLocalStorage<Message[]>(
    localStorageKey,
    [],
  );

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isAiResponding, setIsAiResponding] = useState(false);
  const { toast } = useToast();

  const EXTERNAL_AI_BACKEND_URL = "https://ai-mini-app.vercel.app/api/ai-sync";

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    // console.log('[ChatPage] localStorageKey changed to:', localStorageKey);
  }, [localStorageKey]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!user || !text.trim()) return;

      const newUserMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: "user",
        timestamp: new Date().toISOString(),
      };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      setIsAiResponding(true);

      try {
        console.log(
          "[ChatPage] Sending message to external AI. URL:",
          EXTERNAL_AI_BACKEND_URL,
        );
        const requestBody = { messageText: text, userId: user.uid };
        console.log("[ChatPage] Request Body:", JSON.stringify(requestBody));

        const response = await fetch(EXTERNAL_AI_BACKEND_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        console.log(
          "[ChatPage] External AI service response status:",
          response.status,
        );
        console.log("[ChatPage] External AI service response ok:", response.ok);

        const responseHeaders: Record<string, string> = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        console.log(
          "[ChatPage] External AI service response headers:",
          responseHeaders,
        );

        if (!response.ok) {
          let errorData;
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
            errorData = await response.json().catch(() => ({
              error: "Failed to parse JSON error response from server",
            }));
          } else {
            const textError = await response
              .text()
              .catch(() => "Unable to read error text from server");
            const sanitizedTextError =
              textError.length > 200
                ? textError.substring(0, 200) + "..."
                : textError;
            errorData = {
              error: `Server returned non-JSON error (${response.status}): ${sanitizedTextError}`,
            };
          }

          console.error(
            "[ChatPage] External AI service responded with an error. Status:",
            response.status,
            "Data:",
            errorData,
          );
          throw new Error(
            errorData.error ||
              errorData.message ||
              `External AI service failed: ${response.status}`,
          );
        }

        const data = await response.json();
        console.log("[ChatPage] External AI service response data:", data);

        const aiMessageText =
          data.responseText || "Sorry, I couldn't get a response.";

        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: aiMessageText,
          sender: "ai",
          timestamp: new Date().toISOString(),
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      } catch (error: any) {
        console.error("Error sending message to external AI service:", error);
        toast({
          title: "Error Communicating with AI",
          description:
            error.message || "Failed to get AI response. Please try again.",
          variant: "destructive",
        });
        const errorResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "Sorry, I encountered an error connecting to the AI service. Please try again.",
          sender: "ai",
          timestamp: new Date().toISOString(),
        };
        setMessages((prevMessages) => [...prevMessages, errorResponse]);
      } finally {
        setIsAiResponding(false);
      }
    },
    [setMessages, user, toast, EXTERNAL_AI_BACKEND_URL],
  );

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-background text-foreground">
        <Header />
        <main className="flex-grow overflow-y-auto p-4 space-y-4 pt-[80px] pb-[180px]">
          <Skeleton className="h-16 w-1/2 mb-4" />
          <Skeleton className="h-12 w-3/4 self-end mb-4" />
          <Skeleton className="h-20 w-2/3 mb-4" />
        </main>
        <div className="glass-input-area p-4 fixed bottom-0 left-0 right-0 z-10">
          <Skeleton className="h-10 w-full" />
          <div className="flex justify-between mt-3">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-28" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <p className="text-lg text-foreground">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <Header />
      <main
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto p-4 space-y-4 pt-[96px] pb-[180px]"
      >
        <MessageList messages={messages} />
        {isAiResponding && (
          <div className="flex justify-start">
            <div className="max-w-[70%] p-3 rounded-xl glass-secondary-bubble text-secondary-foreground rounded-bl-none">
              <p className="text-sm italic">Chatty is thinking...</p>
            </div>
          </div>
        )}
      </main>
      <div className="glass-input-area p-4 fixed bottom-0 left-0 right-0 z-10">
        <MessageInputSection
          onSendMessage={handleSendMessage}
          disabled={isAiResponding}
        />
      </div>
    </div>
  );
}
