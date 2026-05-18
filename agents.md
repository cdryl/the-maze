# AGENTS.md

## Project Overview

This project is a landing page for a mobile game called **The Maze**.

**The Maze** is a mobile endless runner game set in a dark jungle maze. The player runs forward as far as possible while avoiding incoming arrows. The gameplay is simple, addictive, and inspired by games like Flappy Bird: easy to understand, but hard to master.

The game has been submitted to both the **App Store** and **Google Play**.

The main purpose of this website is to inform users about the game and encourage them to play.

---

## Tech Stack

Use the following stack:

- Next.js App Router
- TypeScript
- Tailwind CSS
- React components
- Mobile-first responsive design

Do not add backend implementation unless explicitly requested.

The project should remain simple, clean, and easy to maintain.

---

## Design Direction

The website should feel like a premium mobile game landing page.

Visual style:

- Dark jungle adventure atmosphere
- Ancient temple / explorer mood
- Mysterious but accessible
- Cinematic, low-light feeling
- Dark green and black backgrounds
- Warm torch/fire accent colors
- Subtle gold details
- Clean modern layout
- Not childish
- Not too horror-like

Prefer atmospheric gradients, shadows, borders, and glow effects over heavy image-based decoration.

Avoid designs that require many custom image assets.

---

## Main Sections

The landing page should currently include only:

1. Hero section
2. Leaderboard section
3. Short game description section

Do not add extra sections unless requested.

---

## Hero Section

The hero should be full-screen or near full-screen.

Content:

- Logo
- Headline: `Run Deeper Into The Maze`
- Supporting text: `Dodge arrows, survive the jungle, and chase the highest score.`
- Main CTA button: `Play Now`
- Secondary text: `Coming soon on App Store and Google Play`

Design notes:

- The hero should be cinematic and immersive.
- Use dark green / black gradients.
- Use warm orange/gold CTA styling.
- Add soft glow around the CTA.
- Keep the content readable on mobile.
- The logo should be prominent but not oversized.

If using images, assume:

- `/hero.png`
- `/logo.png`

However, prefer layouts that still look good without many additional background assets.

---

## Leaderboard Section

Content:

- Section title: `Leaderboard`
- Subtitle: `Top explorers who survived the longest.`

Use this mock leaderboard data for now:

```ts
const leaderboardPlayers = [
  { rank: 1, name: "ShadowRunner", score: 12450 },
  { rank: 2, name: "JungleFox", score: 10980 },
  { rank: 3, name: "ArrowDodger", score: 9870 },
  { rank: 4, name: "MazeHunter", score: 8420 },
  { rank: 5, name: "TorchWalker", score: 7760 },
];
