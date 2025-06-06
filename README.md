
---
# Learnify

**Learnify** is a next-generation, AI-enhanced learning platform designed to offer a seamless and engaging user experience. Built with the latest advancements in web technologies, Learnify empowers users through personalized learning journeys, secure authentication, interactive virtual companions, and flexible subscription options. Its modular architecture ensures scalability, while its sleek UI promotes focused and intuitive learning.

Whether you're an educator, a student, or an enthusiast looking to explore new topics, Learnify redefines the way learning is delivered and consumed in the digital age.

## ✨ Key Features

1. **User Authentication**: Seamless authentication system powered by **Clerk** for a secure and fluid login experience.
2. **Journey Tracking**: Monitor user learning progression with an organized and engaging journey tracking feature.
3. **Companion System**: Interact with virtual companions designed to enhance the learning experience.
4. **Subscription Management**: Simplified subscription handling, including tiers and payment integration.
5. **Database Integration**: Efficient and scalable database interactions via **Supabase**.

---

## ⚡ Technology Stack

### Frontend Technologies
- **Framework**: [Next.js](https://nextjs.org/) `15.4 (Canary)`
- **Library**: [React](https://reactjs.org/) `19.1`
- **Styling**: [TailwindCSS](https://tailwindcss.com/) with custom configurations
- **Language**: TypeScript for reliable and scalable development

### Core Packages
- **Authentication**: [Clerk](https://clerk.dev/) for user management
- **Database**: [Supabase](https://supabase.io/) as the backend service
- **UI Components**:
  - Radix UI: `@radix-ui/react-*`
  - Class Variance Authority for styling
  - Lucide React for icons
- **Form Handling**:
  - [React Hook Form](https://react-hook-form.com/)
  - [Zod](https://zod.dev/) for validation and schemas
- **Utilities**:
  - `clsx` & `tailwind-merge` for merging and managing CSS class names
  - `tw-animate-css` for smooth animations

---

## 🏗️ Project Structure

The project follows a modular structure for better organization:

```
learnify/
├── app/                     # Next.js application layer
│   ├── companions/          # Feature: Learning companions
│   ├── my-journey/          # Feature: User journey management
│   ├── sign-in/             # Feature: Authentication pages
│   ├── subscription/        # Feature: Subscription management
│   └── globals.css          # Global styling
├── components/              # Reusable components
├── constants/               # Application constant values
├── lib/                     # Shared utilities and helper functions
├── public/                  # Static assets for the app
└── types/                   # TypeScript types used throughout the project
```

---

## 🚀 Getting Started

### Requirements

- **Node.js** (latest version recommended)
- **npm** or **yarn**

### Installation Steps

1. Clone this repository:
   ```bash
   git clone https://github.com/mo-abdulai/learnify.git
   ```
2. Navigate to the project directory:
   ```bash
   cd learnify
   ```
3. Install all dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

The application will start locally using **Turbopack**, designed for fast development environments.

---

## ⚙️ Available Scripts

- `npm run dev` - Start the development server (powered by Turbopack)
- `npm run build` - Build the application for production
- `npm run start` - Launch the production server
- `npm run lint` - Check and fix linting issues

---

## 🔧 Configuration

The following configuration files define the behavior of Learnify:

- **`next.config.ts`**: Configurations for Next.js
- **`tsconfig.json`**: TypeScript configurations
- **`postcss.config.mjs`**: PostCSS setup for TailwindCSS
- **`components.json`**: Organizational metadata for components
- **`middleware.ts`**: Middleware configurations

---

## 🎨 Styling Approach

**TailwindCSS** is used for consistent and responsive styling, augmented with utilities like `clsx` and `tailwind-merge`. Animations are powered by **tw-animate-css**, ensuring smooth and modern transitions.

---

## 🤝 Contributing

We welcome contributions to Learnify! Please follow these steps:

1. Fork the repository.
2. Create a new feature branch (`feature/your-feature-name`).
3. Commit your changes.
4. Push the branch to your fork.
5. Create a Pull Request to the main repository.

---

## 🛡️ License

This repository is licensed under the **MIT License**. See the `LICENSE` file for more details.

---

## 🌐 Useful Links

- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **React Documentation**: [https://reactjs.org/docs](https://reactjs.org/docs)
- **TailwindCSS Documentation**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Clerk Documentation**: [https://clerk.dev/docs](https://clerk.dev/docs)

For any assistance, feel free to raise an issue or contact the team.

Happy Building! 🚀

--- 