This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Features Implemented

Dynamic Routing
Lessons are accessed via dynamic route: /lesson/[lessonId].

Content Rendering

TEXT: Markdown rendering using react-markdown.

IMAGE: Rendered with standard <img> tag using Tailwind CSS styling.

PDF: Embedded using Google Docs Viewer via an <iframe>.

VIDEO: Embedded YouTube player with auto-complete tracking on video end.

Lesson Completion Tracking

Video lessons: automatically marked as complete when video ends.

Other lesson types: manually marked using "Mark as Completed" button.

State Management

Uses global AppContext to track completed lessons across the app.

Responsive UI

Built with Tailwind CSS.

Supports dark mode and mobile responsiveness.

## Assumptions Made

The lessons data is static and hardcoded; in a real-world scenario, this would come from an API or CMS.

PDF files are rendered using Google Docs Viewer, requiring an internet connection.

Only YouTube links are supported for video lessons.

No authentication system is implemented; user identity and lesson tracking are local.

All lessons strictly fall under one of the four content types: TEXT, IMAGE, PDF, or VIDEO.
