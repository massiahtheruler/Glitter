# Glitter

A full-stack social platform inspired by X/Twitter, rebuilt with custom branding, real account flows, dynamic profiles, posting, follow logic, and a cleaner PG-13 product direction.

I treated Glitter like a product build instead of leaving it at tutorial level. The app combines authenticated user flow, a structured social feed, editable profiles, follow logic, modal-driven UX, and custom product concepts like **Brok** AI chat and **Deeems** messaging into a more original, portfolio-ready social platform.

What stands out most in this project is the combination of product thinking and interface structure. The goal was not only to recreate a familiar social layout, but to shape a platform with its own identity, tone, and feature direction.

## Live Demo

[https://glitter-theta.vercel.app](https://glitter-theta.vercel.app)

## Core Features

- Full sign up, sign in, sign out, and authenticated session flow
- Social feed with post creation, feed rendering, and user-specific content behavior
- Dynamic user profile pages with editable user details
- Follow and unfollow groundwork with account-aware social actions
- Like and comment interaction structure
- Scroll-centered social layout with left navigation and right-side discovery panels
- Profile hero, avatar, bio, join date, and self-versus-other-user state handling
- Brok AI chat concept and Deeems messaging concept added as custom product extensions
- Custom branding and product direction beyond the original tutorial baseline

## Architecture Snapshot

Frontend:
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

Backend and Data:
- NextAuth
- Prisma ORM
- MongoDB
- Next.js API routes

State and UX:
- Zustand for modal and local interaction state
- SWR and React Query for data flow and fetch coordination
- Modal-driven auth and profile editing experience

## Demo Accounts

### Primary Demo Account
- Email: `massiah024@gmail.com`
- Password: `random123!321`
- Use this account to test the fuller social experience with more seeded posts, profile content, and image-driven profile state

### Secondary Demo Account
- Email: `justin.henry0024@gmail.com`
- Password: `random123!321`
- Use this account to test a second signed-in user state for feed, profile, and interaction behavior

## What I Built

### 1. Authentication and Account Flow

I implemented a real account system rather than a static social mockup.

Key features include:

- sign up
- sign in
- sign out
- modal-based auth flow
- account-aware UI states
- conditional behavior depending on whether a user is logged in

This gave the app real product behavior instead of just a visual shell.

### 2. Social Feed Layout

The app is structured around a central scrolling body the way a real social product would be.

The layout supports:

- left-side navigation
- center feed and content column
- right-side follow and discovery content
- responsive social layout behavior
- a post composer on the home feed

I wanted the page to feel like an actual app layout, not just a tutorial page with components stacked vertically.

### 3. Post Creation and Feed Rendering

I wired in real post logic rather than leaving the feed as placeholder content.

The posting flow handles:

- post composer form
- post API route
- feed fetching hooks
- post feed rendering
- post item rendering
- user-filtered post feed behavior
- dedicated single-post API groundwork

This moved the project much closer to a usable product foundation.

### 4. Dynamic Profile Pages

Each user has a real profile route and profile-specific UI sections.

Profile behavior includes:

- dynamic user profile routing
- profile header
- avatar rendering
- hero section
- bio section
- joined date formatting
- follow and edit button state logic
- following and follower display

This was one of the biggest steps in making the app feel like a complete social product instead of just a homepage clone.

### 5. Profile Editing

I built a full edit profile flow with real update behavior.

The edit system supports:

- edit modal
- name, username, and bio editing
- profile image and cover image support
- save flow through API routes
- data refresh after update

The goal here was to make profile ownership feel real, not simulated.

### 6. Social Interaction Foundation

I built the foundation for user-to-user interaction instead of stopping at a feed-only interface.

Social behavior includes:

- follow and unfollow logic structure
- signed-out gating for account-only actions
- like interaction groundwork
- conditional UI for self versus other user profiles
- account-aware buttons and sidebar behavior

Some of these features are still evolving, but the structure is already tied into the actual app logic.

### 7. Custom Branding and Product Identity

One of the most important parts of this project was pushing it past tutorial identity.

Brand direction includes:

- naming concepts like **Brok** and **Deeems**
- a cleaner, more approachable tone
- custom labels, product naming, and feature direction
- a more PG-13, family-friendlier alternative to the tone of X/Twitter
- expanding the build into a more original concept

That mattered because I wanted the portfolio value to come from product thinking too, not just visual similarity.

## Technical Challenges

- Adapting older tutorial patterns to a stricter modern Next.js, TypeScript, and linting setup
- Structuring authenticated UI so feed, profile, follow, and modal behavior all respond correctly to account state
- Keeping profile editing, route updates, and data refresh behavior in sync
- Extending a tutorial foundation into something with stronger branding, more complete user flow, and clearer product direction

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- NextAuth
- Prisma
- MongoDB
- Zustand
- SWR
- React Query
- Axios
- Date-fns
- React Hot Toast
- React Icons
- Motion

## Project Structure

```text
components/
  layout/
  messages/
  modals/
  posts/
  users/
hooks/
libs/
pages/
  api/
prisma/
styles/
types/
```

- `pages/` contains the route views and API routes.
- `components/` holds the reusable UI system for feed, profiles, modals, layout, and messaging surfaces.
- `hooks/` contains the account-aware and interaction-driven client logic.
- `libs/` contains helpers for auth, fetching, Prisma access, notifications, and messages.
- `prisma/` defines the database schema and Prisma configuration.

## Running Locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

For a production build:

```bash
npm run build
```

## Current Scope

The project intentionally focuses on:

- account-aware social UI
- post and profile behavior
- custom branding and product identity
- interaction structure for follows, likes, and messaging concepts
- a stronger social product foundation than a basic tutorial clone

Future expansion can include:

- full Deeems messaging flow
- Brok AI chat integration
- stronger optimistic updates for likes and follows
- expanded notifications
- richer single-post and comment flows
- media attachments in posts
- stronger moderation and family-friendly content systems
- better trend discovery and recommendation logic

## Why This Project Stands Out

What makes Glitter stronger than a basic tutorial clone is the combination of real auth and account state, real feed and profile behavior, custom branding and naming, expanded product thinking, and the work of adapting older tutorial assumptions to a more current toolchain.

## Closing

Glitter reflects the kind of work I want to keep doing: product-style front-end engineering with real logic, strong UI structure, social interaction, customization beyond the tutorial, and enough original direction that the finished build feels like mine rather than copied.
