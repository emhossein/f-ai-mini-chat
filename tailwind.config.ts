import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["PT Sans", "sans-serif"],
        headline: ["Playfair Display", "serif"],
        code: ["monospace"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
      typography: ({ theme }: { theme: any }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.foreground"),
            "--tw-prose-headings": theme("colors.primary.DEFAULT"),
            "--tw-prose-lead": theme("colors.foreground"),
            "--tw-prose-links": theme("colors.accent.DEFAULT"),
            "--tw-prose-bold": theme("colors.foreground"),
            "--tw-prose-counters": theme("colors.muted.foreground"),
            "--tw-prose-bullets": theme("colors.muted.foreground"),
            "--tw-prose-hr": theme("colors.border"),
            "--tw-prose-quotes": theme("colors.primary.DEFAULT"),
            "--tw-prose-quote-borders": theme("colors.accent.DEFAULT"),
            "--tw-prose-captions": theme("colors.muted.foreground"),
            "--tw-prose-code": theme("colors.accent.foreground"), // Text color for inline code
            "--tw-prose-pre-code": theme("colors.secondary.foreground"), // Text color for code blocks
            "--tw-prose-pre-bg": theme("colors.secondary.DEFAULT"), // Background for code blocks
            "--tw-prose-th-borders": theme("colors.border"),
            "--tw-prose-td-borders": theme("colors.border"),
            "--tw-prose-invert-body": theme("colors.foreground"),
            "--tw-prose-invert-headings": theme("colors.primary.DEFAULT"),
            "--tw-prose-invert-lead": theme("colors.foreground"),
            "--tw-prose-invert-links": theme("colors.accent.DEFAULT"),
            "--tw-prose-invert-bold": theme("colors.foreground"),
            "--tw-prose-invert-counters": theme("colors.muted.foreground"),
            "--tw-prose-invert-bullets": theme("colors.muted.foreground"),
            "--tw-prose-invert-hr": theme("colors.border"),
            "--tw-prose-invert-quotes": theme("colors.primary.DEFAULT"),
            "--tw-prose-invert-quote-borders": theme("colors.accent.DEFAULT"),
            "--tw-prose-invert-captions": theme("colors.muted.foreground"),
            "--tw-prose-invert-code": theme("colors.accent.foreground"), // Text color for inline code (dark)
            "--tw-prose-invert-pre-code": theme("colors.secondary.foreground"), // Text color for code blocks (dark)
            "--tw-prose-invert-pre-bg": theme("colors.secondary.DEFAULT"), // Background for code blocks (dark)
            "--tw-prose-invert-th-borders": theme("colors.border"),
            "--tw-prose-invert-td-borders": theme("colors.border"),
            // Remove Tailwind typography's default quote styling for cleaner look
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:first-of-type::after": { content: "none" },
            // Ensure p inside ReactMarkdown has no extra margin if we add our own
            p: {
              marginTop: "0",
              marginBottom: "0",
            },
            // Basic styling for lists if not overridden by components prop
            ul: {
              marginTop: "0.5em",
              marginBottom: "0.5em",
              paddingLeft: "1.5em",
            },
            ol: {
              marginTop: "0.5em",
              marginBottom: "0.5em",
              paddingLeft: "1.5em",
            },
            code: {
              // Styling for inline code
              padding: "0.2em 0.4em",
              margin: "0",
              fontSize: "85%",
              backgroundColor: "hsl(var(--muted))", // Use muted for background
              borderRadius: "3px",
              color: "hsl(var(--accent))", // Use accent for text color
              fontWeight: "normal", // Override bold from prose if any
            },
            "code::before": {
              content: "none", // Remove backticks from inline code
            },
            "code::after": {
              content: "none", // Remove backticks from inline code
            },
            pre: {
              // Styling for code blocks
              marginTop: "1em",
              marginBottom: "1em",
              padding: "1em",
              borderRadius: "0.375rem", // Tailwind's rounded-md
              backgroundColor: "hsl(var(--secondary))", // Use secondary for background
              color: "hsl(var(--secondary-foreground))", // Use secondary-foreground for text
              overflowX: "auto",
            },
            "pre code": {
              // Reset inline code styling within pre
              backgroundColor: "transparent",
              padding: "0",
              color: "inherit",
              fontSize: "inherit",
            },
          },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
