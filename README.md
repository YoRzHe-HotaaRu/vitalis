# Vitalis - AI Health Companion

<div align="center">
  <h3>A Proactive, User-Centric Intelligence for Human Performance</h3>
  <p>
    <i>Stop tracking. Start optimizing.</i>
  </p>
</div>

---

**Vitalis** is a next-generation AI health companion designed to move beyond generic fitness advice and passive data logging. It combines **real-time biometric tracking simulations** with **hyper-personalized, evidence-based coaching** powered by Google's Gemini 2.5 Flash model.

Built with a striking **Neo-Brutalist** design system, Vitalis focuses on high-contrast visibility, actionable intelligence, and a user-centric experience that treats your health management like a high-performance "Mission Control."

## 🚀 Core Philosophy

Most health apps are **reactive**: they wait for you to log data.
**Vitalis is proactive**: It analyzes your context and intervenes before you ask.

*   **Context Aware**: Knows you didn't sleep well and adjusts your workout intensity automatically.
*   **Evidence-Based**: Prioritizes clinical consensus over fad diets.
*   **Psychology First**: Uses "Quick Wins" and "Habit Stacking" to build momentum.

## ✨ Key Features

### 🧠 Intelligent "Mission Control" Dashboard
*   **Energy Score**: A synthesized metric (0-100) derived from sleep, movement, and hydration data.
*   **Live Intelligence**: Dynamic sidebar widgets that offer real-time "micro-interventions" (e.g., *"You're 56oz behind on water. Drink a glass now to boost focus"*).
*   **Contextual Widgets**: Dynamic cards for nutrition plans, training previews, and daily challenges.

### 💬 Proactive AI Chat Interface
*   **Gemini 2.5 Powered**: Utilizes the latest multimodal models for natural, context-aware conversations.
*   **Memory**: The AI remembers your onboarding goals (Hypertrophy, Longevity, Stress Management) and references them in every response.
*   **Streaming Responses**: Fast, typewriter-style output for a responsive feel.
*   **Smart Suggestions**: Contextual chips for quick actions like "Why am I tired?" or "Generate Meal Plan."

### 🎨 Neo-Brutalist Design System
*   **High Visibility**: High-contrast OKLCH color space for accessibility and visual impact.
*   **Tangible UI**: Hard borders (`2px`), deep shadows, and mono-spaced typography create a tool-like aesthetic.
*   **Responsive**: Full mobile and desktop support with a collapsible sidebar architecture.

## 🛠️ Tech Stack

*   **Frontend Framework**: [React 19](https://react.dev/)
*   **Language**: TypeScript
*   **AI Engine**: [Google GenAI SDK](https://www.npmjs.com/package/@google/genai) (`gemini-2.5-flash`)
*   **Styling**: Tailwind CSS with custom OKLCH theming
*   **Icons**: Lucide React
*   **Markdown Rendering**: React Markdown

## 📦 Installation & Setup

### Prerequisites
*   Node.js (v18 or higher)
*   A Google Cloud Project with the **Gemini API** enabled.
*   An API Key from [Google AI Studio](https://aistudiocdn.com/ai.google.dev/).

### Steps

1.  **Clone the repository**
    ```bash
    git clone https://github.com/YoRzHe-HotaaRu/vitalis
    cd vitalis
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory:
    ```env
    # Your Google Gemini API Key
    API_KEY=AIzaSy...
    ```

4.  **Run the Development Server**
    ```bash
    npm start
    # or
    npm run dev
    ```

5.  **Launch**: Open `http://localhost:5173` (or your exposed port) in your browser.

## 🖥️ Application Architecture

```
src/
├── components/
│   ├── Chat/          # AI Chat interface logic & streaming
│   ├── Dashboard/     # Main stats, widgets, and layout
│   ├── ui/            # Reusable Neo-Brutalist components (Cards, Buttons)
│   └── Onboarding.tsx # Multi-step user profile wizard
├── services/
│   └── geminiService.ts # Google GenAI configuration & API calls
├── types.ts           # TypeScript interfaces for User Profile & Biometrics
├── App.tsx            # Main router and state manager
└── index.tsx          # Entry point
```

## 🎨 Design Tokens

Vitalis uses a strict set of design tokens defined in `index.html` via CSS variables.

| Token | Usage | Value (Dark Mode) |
| :--- | :--- | :--- |
| `--primary` | Call to actions, active states | `oklch(0.70 0.18 23.18)` (Orange) |
| `--accent` | Highlights, energy score | `oklch(0.67 0.17 252.25)` (Electric Blue) |
| `--muted` | Backgrounds, inactive states | `oklch(0.21 0 0)` (Dark Grey) |
| `--border` | Structural lines | `oklch(1.0 0 0)` (White) |

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <small>Built with ❤️ and ☕ by [Your Name]</small>
</div>
