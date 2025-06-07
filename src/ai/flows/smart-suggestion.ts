"use server";

/**
 * @fileOverview Provides AI-powered suggestions as the user types.
 *
 * - getSmartSuggestions - A function that generates smart suggestions for user messages.
 * - SmartSuggestionsInput - The input type for the getSmartSuggestions function.
 * - SmartSuggestionsOutput - The return type for the getSmartSuggestions function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const SmartSuggestionsInputSchema = z.object({
  message: z.string().describe("The current message the user is typing."),
  length: z
    .enum(["short", "medium", "long"])
    .default("short")
    .describe("The desired length of the suggestion."),
  creativity: z
    .enum(["low", "medium", "high"])
    .default("medium")
    .describe("The desired creativity level of the suggestion."),
});
export type SmartSuggestionsInput = z.infer<typeof SmartSuggestionsInputSchema>;

const SmartSuggestionsOutputSchema = z.object({
  suggestion: z.string().describe("The AI-powered suggestion."),
});
export type SmartSuggestionsOutput = z.infer<
  typeof SmartSuggestionsOutputSchema
>;

export async function getSmartSuggestions(
  input: SmartSuggestionsInput,
): Promise<SmartSuggestionsOutput> {
  return smartSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: "smartSuggestionsPrompt",
  input: { schema: SmartSuggestionsInputSchema },
  output: { schema: SmartSuggestionsOutputSchema },
  prompt: `You are an AI assistant helping users formulate messages.

  The user is currently typing the following message: "{{message}}".

  Provide a suggestion to complete the message, considering the desired length and creativity level.

  Length: {{length}}
  Creativity: {{creativity}}

  Suggestion:`,
});

const smartSuggestionsFlow = ai.defineFlow(
  {
    name: "smartSuggestionsFlow",
    inputSchema: SmartSuggestionsInputSchema,
    outputSchema: SmartSuggestionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  },
);
