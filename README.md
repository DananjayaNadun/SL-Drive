# Sri Lankan Driving Exam Learner 🚗

A modern, mobile-first web application designed to help Sri Lankan learner drivers study and pass their written driving exams with ease. Inspired by the sleek, gamified interface of Duolingo, this app makes learning road signs engaging and intuitive.

![Sri Lankan Driving Exam Learner](public/signs/sign_p1_0_0.png) <!-- Feel free to replace with an actual screenshot of the app -->

## 🌟 Features

- **Modern & Responsive UI**: Fully optimized for mobile phones (since most learners use mobile devices) using Next.js and Tailwind CSS.
- **Dark & Light Mode**: Seamlessly switch between themes via an intuitive toggle.
- **Three Learning Modes**:
  - 📖 **Learning Mode**: Study mode that reveals the correct answer upon selection with detailed feedback.
  - 🎮 **Quiz Mode**: Endless practice mode. Answers are constantly shuffled so you memorize the signs, not the pattern!
  - ⏱️ **Mock Exam**: A realistic 40-question, 40-minute timed exam to simulate the real test environment.
- **Sinhala Language Support**: Legacy Sinhala PDFs containing exam content were parsed, decoded into Unicode, and seamlessly integrated into the application.
- **Score Tracking**: Integrated with Firebase to save exam and quiz scores!

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components & Icons**: Radix UI primitives & Lucide React
- **Animations**: Framer Motion
- **Database**: [Firebase Firestore](https://firebase.google.com/)

## 🚀 Getting Started

First, clone the repository to your local machine:

```bash
git clone https://github.com/DananjayaNadun/sl-driving-exam-learner.git
cd sl-driving-exam-learner
```

Install the dependencies:

```bash
npm install
```

### Firebase Configuration

To enable score tracking, you need to add your Firebase config. Open `src/lib/firebase.ts` and replace the placeholder variables with your actual Firebase project credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
# ... etc
```

### Run the Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📂 Project Structure

- `src/app/` - Application routes (Home, Learning, Quiz, Exam)
- `src/components/` - Reusable UI components (Buttons, Cards, Progress Bars, ThemeProvider)
- `src/lib/` - Utilities, data fetching logic, and Firebase initialization
- `public/questions.json` - Parsed JSON database of Sinhala questions and answers
- `public/signs/` - Extracted road sign images

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/DananjayaNadun/sl-driving-exam-learner/issues).

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
