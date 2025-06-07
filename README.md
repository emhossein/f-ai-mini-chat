# Chatty: Your AI Conversation Partner

Welcome to Chatty – your sleek, modern, and intelligent conversation partner! Chatty is designed to be not just functional, but also a joy to use.

## Key Features

**1. The Core Chat Experience: Seamless & Intuitive**

- **Clean Interface:** A minimal, clutter-free chat interface. User messages appear on the right in a stylish primary-colored bubble, and AI responses appear on the left in a cool, secondary-colored bubble.
- **Real-time Interaction:** Type your message and hit send to watch the conversation unfold.
- **AI-Powered Responses:** Chatty processes messages using an external, sophisticated AI service (`https://ai-mini-app.vercel.app/api/ai-sync`) for intelligent replies.
- **"Thinking" Indicator:** A subtle "Chatty is thinking..." message appears while the AI formulates its response.

**2. Secure & Personalized: User Authentication**

- **Google Sign-In:** Users can securely sign in with their Google accounts.
- **Dedicated Login Page:** A clean, welcoming login page for a straightforward sign-in process.
- **Persistent Sessions:** Chatty remembers logged-in users.
- **Easy Sign-Out:** Sign out with a single click in the header.

**3. Never Lose a Thought: Chat History**

- **Browser-Based Storage:** Conversation history is saved in the user's browser using local storage.
- **User-Specific History:** Chat history is tied to the user's account, ensuring privacy and restoration upon login (on the same browser).

**4. A Feast for the Eyes: Futuristic & Minimal Design**

- **Glassmorphism Aesthetics:** Key UI elements (message bubbles, header, login card, input area) feature a semi-transparent, blurred background, creating a "glass" effect.
- **Minimalist Approach:** Clean and streamlined design to maximize focus on the conversation, using subtle borders and avoiding heavy shadows.
- **Curated Color Palette:**
  - Primary: Soothing Lilac (user messages, key interactive elements).
  - Background: Gentle, very light grey.
  - Accent: Teal (important information, interactive elements).
  - Colors use transparency to achieve the glass effect.
- **Elegant Typography:**
  - Body text: 'PT Sans' (modern warmth, readability).
  - Headlines: 'Playfair Display' (elegant, e.g., "Chatty" title).
- **Lucide Icons:** Crisp, simple line icons for actions (sending, logout, theme selection).
- **Consistent Layout:** Fixed header and message input area for a stable user experience.
- **Smooth Animations:** New messages fade in gently.

**5. Your App, Your Way: Theme Customization**

- **Light, Dark, & System Modes:** Easily switch between light, dark, or system-adaptive themes via a header toggle.

**6. Built on a Modern Stack**

- **Framework:** Next.js (configured for static export for optimal performance and easy hosting on Firebase).
- **UI Library:** React.
- **Components:** ShadCN UI.
- **Styling:** Tailwind CSS.
- **Authentication:** Firebase Authentication.
- **AI Backend:** External AI service for chat responses. (Note: The Genkit-based smart suggestion feature is present in the codebase but disabled in the UI for static export compatibility).

This combination of features makes Chatty a delightful and efficient application for engaging in AI-powered conversations.
