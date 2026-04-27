<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project

## Getting Started <a name="-getting-started"></a>

" https://glitter-theta.vercel.app "
 - Live VERCEL deployed URL -


-- Table Of Contents --

-[Getting Started](#-getting-started) </br>
-[Highlights](#-highlights)</br>
-[What I Built](#-whats-built)</br>
-[Tech-Stack](#-tech-stack)</br>
-[Above And Beyond](#-above-and-beyond)</br>
-[Stand Out Features](#-stand-out)</br>
-[Closing](#-closing)</br>


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Glitter - Where you shine Online. #

A full-stack social platform inspired by X/Twitter, rebuilt with custom branding, expanded features, and a more PG-13, family-friendlier product direction.

I built Glitter as a social media experience centered around real account flow, post creation, profile customization, feed interaction, and a cleaner alternative to the usual more vulgar X/Twitter energy. While it began from a tutorial foundation, I pushed it much further by customizing the brand, expanding the feature set, reworking the layout and product identity, and building additional functionality beyond what the tutorial covered.

Instead of stopping at a direct Twitter clone, I treated the project more like a product build. I added my own branding direction, built out profile and social interaction features, created custom naming concepts like **Brok** for AI chat and **Deeems** for direct messages, and shaped the app into a more approachable, portfolio-ready social platform.

This project reflects the kind of front-end and product work I enjoy most: interaction-heavy UI, account-aware features, social app structure, strong customization, and solving real implementation issues directly instead of relying on prebuilt templates or drag-and-drop abstractions.

## Highlights <a name="-highlights"></a>

- Custom-branded social platform inspired by X/Twitter
- Family-friendlier, PG-13-ish product direction instead of a vulgar clone
- Full sign up, sign in, sign out, and authenticated session flow
- Real post creation and feed rendering
- Dynamic user profile pages with editable user details
- Scroll-centered social feed layout with left navigation and right-side discovery cards
- Follow / unfollow groundwork and account-aware social actions
- Like / comment interaction structure
- Profile hero, avatar, bio, follow/edit states, and joined date handling
- Trending / who-to-follow style sidebar UI
- Brok AI chat concept and Deeems messaging concept added as custom product extensions
- Built beyond the tutorial by expanding branding, product identity, and feature scope


## What I Built ##<a name="-whats-built"></a>


### 1. Authentication and Account Flow ###

I implemented a real account system rather than a static social mockup.

That includes:
- sign up
- sign in
- sign out
- modal-based auth flow
- account-aware UI states
- conditional behavior depending on whether a user is logged in

This gave the app real product behavior instead of just a visual shell.


### 2. Social Feed Layout ###

The app is structured around a central scrolling body the way a real social product would be.

That includes:
- left-side navigation
- center feed / content column
- right-side follow / discovery content
- responsive social layout behavior
- a post composer on the home feed

I wanted the page to feel like an actual app layout, not just a tutorial page with components stacked vertically.


### 3. Post Creation and Feed Rendering ###

I wired in real post logic rather than leaving the feed as placeholder content.

That includes:
- post composer form
- post API route
- feed fetching hook
- post feed rendering
- post item rendering
- user-filtered post feed behavior
- dedicated single-post API groundwork

This moved the project from “UI clone” into something much closer to a usable product foundation.


### 4. Dynamic Profile Pages ###

Each user has a real profile route and profile-specific UI sections.

That includes:
- dynamic user profile routing
- profile header
- avatar rendering
- hero section
- bio section
- joined date formatting
- follow/edit button state logic
- following / follower display

This was one of the biggest steps in making the app feel like a complete social product instead of just a homepage clone.


### 5. Profile Editing ###

I built a full edit profile flow with real update behavior.

That includes:
- edit modal
- name, username, and bio editing
- profile image and cover image support
- save flow through API routes
- data refresh after update

The goal here was to make profile ownership feel real, not simulated.


### 6. Social Interaction Foundation ###

I built the foundation for user-to-user interaction rather than stopping at a feed-only interface.

That includes:
- follow / unfollow logic structure
- signed-out gating for account-only actions
- like interaction groundwork
- conditional UI for self vs other user profiles
- account-aware buttons and sidebar behavior

Some of these features are still evolving, but the structure is in place and tied into the actual app logic.


### 7. Custom Branding and Product Identity ###

One of the most important parts of this project was pushing it past tutorial identity.

That includes:
- naming direction like **Brok** and **Deeems**
- a cleaner, more approachable tone
- custom labels, product naming, and feature direction
- a more PG-13 / family-friendlier alternative to the tone of X/Twitter
- expanding the clone into a more original concept

That mattered because I wanted the portfolio value to come from product thinking too, not just copying a known interface.


## Above And Beyond ## <a name="-above-and-beyond"></a>

This project went meaningfully beyond the original expectation and example scope.

I expanded and customized it by:
- changing the branding and naming direction
- building more profile functionality
- adding product concepts beyond the original walkthrough
- wiring in more real app behavior
- adapting older tutorial code to current TypeScript, linting, and framework expectations
- solving version drift and stricter tooling issues directly
- making structural and product decisions instead of copying the tutorial literally

A lot of clones stop at visual similarity. I wanted this one to behave more like a real product and reflect more of my own taste and decision-making.


## Technical Notes ##

This project was built with real front-end state, routing, data fetching, API routes, and UI logic rather than relying on templates to fake the experience.

Key technical areas include:
- authenticated UI flow
- conditional rendering based on user state
- modal-driven UX
- dynamic route handling
- Prisma + MongoDB data flow
- profile editing and revalidation
- post feed fetching and filtering
- follow-state logic


## Tech-Stack ##<a name="-tech-stack"></a>

- Next.js
- React
- TypeScript
- Tailwind CSS
- Prisma
- MongoDB
- NextAuth
- Zustand
- SWR
- Axios
- Date-fns
- React Hot Toast
- React Icons
  

## Why This Project Stands Out ## <a name="-stand-out"></a>

What makes this project stronger than a basic tutorial clone is the combination of:
- real auth and account state
- real feed and profile behavior
- custom branding and naming
- expanded product thinking
- debugging through outdated tutorial assumptions
- adapting older code to a stricter modern toolchain
- building beyond the expected feature set

This project shows that I can do more than reproduce a UI. It shows I can:
- take a foundation and extend it
- adapt when the tutorial falls behind the ecosystem
- solve real implementation problems
- make product decisions
- build a more complete and more intentional user experience


## Future Improvements

- full Deeems messaging flow
- Brok AI chat integration
- stronger optimistic updates for likes and follows
- expanded notifications
- richer single-post and comment flows
- media attachments in posts
- stronger moderation and family-friendly content systems
- better trend discovery and recommendation logic


## Closing ##<a name="-closing"></a>

Glitter reflects the kind of work I want to keep doing: product-style front-end engineering with real logic, strong UI structure, social interaction, customization beyond the tutorial, and enough original direction that the finished build feels like mine rather than just a copied clone.


You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
>>>>>>> dc55ab8 (readme)
# Glitter

A full-stack social platform inspired by X/Twitter, built with custom branding, real account flows, dynamic profiles, posting, follow logic, and a cleaner PG-13 product direction.

I built Glitter with Next.js, TypeScript, Tailwind, Prisma, MongoDB, NextAuth, Zustand, and SWR, expanding well beyond the tutorial foundation by adding custom branding, profile editing, feed rendering, social interaction groundwork, and original product concepts like **Brok** AI chat and **Deeems** messaging.

Instead of stopping at a direct Twitter clone, I treated this as a product build: scroll-centered feed layout, authenticated user flows, dynamic profile pages, trending/follow cards, editable accounts, and a more approachable family-friendlier alternative to the usual X/Twitter tone.

## Overview
Glitter is a full-stack social media experience centered around real account flow, post creation, profile customization, feed interaction, and a cleaner alternative to the usual more vulgar X/Twitter energy. While it began from a tutorial foundation, I pushed it much further by customizing the brand, expanding the feature set, reworking the layout and product identity, and building additional functionality beyond what the tutorial covered.

Instead of stopping at a direct Twitter clone, I treated the project more like a product build. I added my own branding direction, built out profile and social interaction features, created custom naming concepts like **Brok** for AI chat and **Deeems** for direct messages, and shaped the app into a more approachable, portfolio-ready social platform.

This project reflects the kind of front-end and product work I enjoy most: interaction-heavy UI, account-aware features, social app structure, strong customization, and solving real implementation issues directly instead of relying on prebuilt templates or drag-and-drop abstractions.

## Highlights
- Custom-branded social platform inspired by X/Twitter
- Family-friendlier, PG-13-ish product direction instead of a vulgar clone
- Full sign up, sign in, sign out, and authenticated session flow
- Real post creation and feed rendering
- Dynamic user profile pages with editable user details
- Scroll-centered social feed layout with left navigation and right-side discovery cards
- Follow / unfollow groundwork and account-aware social actions
- Like / comment interaction structure
- Profile hero, avatar, bio, follow/edit states, and joined date handling
- Trending / who-to-follow style sidebar UI
- Brok AI chat concept and Deeems messaging concept added as custom product extensions
- Built beyond the tutorial by expanding branding, product identity, and feature scope

## What I Built

### 1. Authentication and Account Flow
I implemented a real account system rather than a static social mockup.

That includes:
- sign up
- sign in
- sign out
- modal-based auth flow
- account-aware UI states
- conditional behavior depending on whether a user is logged in

This gave the app real product behavior instead of just a visual shell.

### 2. Social Feed Layout
The app is structured around a central scrolling body the way a real social product would be.

That includes:
- left-side navigation
- center feed / content column
- right-side follow / discovery content
- responsive social layout behavior
- a post composer on the home feed

I wanted the page to feel like an actual app layout, not just a tutorial page with components stacked vertically.

### 3. Post Creation and Feed Rendering
I wired in real post logic rather than leaving the feed as placeholder content.

That includes:
- post composer form
- post API route
- feed fetching hook
- post feed rendering
- post item rendering
- user-filtered post feed behavior
- dedicated single-post API groundwork

This moved the project from “UI clone” into something much closer to a usable product foundation.

### 4. Dynamic Profile Pages
Each user has a real profile route and profile-specific UI sections.

That includes:
- dynamic user profile routing
- profile header
- avatar rendering
- hero section
- bio section
- joined date formatting
- follow/edit button state logic
- following / follower display

This was one of the biggest steps in making the app feel like a complete social product instead of just a homepage clone.

### 5. Profile Editing
I built a full edit profile flow with real update behavior.

That includes:
- edit modal
- name, username, and bio editing
- profile image and cover image support
- save flow through API routes
- data refresh after update

The goal here was to make profile ownership feel real, not simulated.

### 6. Social Interaction Foundation
I built the foundation for user-to-user interaction rather than stopping at a feed-only interface.

That includes:
- follow / unfollow logic structure
- signed-out gating for account-only actions
- like interaction groundwork
- conditional UI for self vs other user profiles
- account-aware buttons and sidebar behavior

Some of these features are still evolving, but the structure is in place and tied into the actual app logic.

### 7. Custom Branding and Product Identity
One of the most important parts of this project was pushing it past tutorial identity.

That includes:
- naming direction like **Brok** and **Deeems**
- a cleaner, more approachable tone
- custom labels, product naming, and feature direction
- a more PG-13 / family-friendlier alternative to the tone of X/Twitter
- expanding the clone into a more original concept

That mattered because I wanted the portfolio value to come from product thinking too, not just copying a known interface.

## Built Beyond the Tutorial
This project went meaningfully beyond the original tutorial scope.

I expanded and customized it by:
- changing the branding and naming direction
- building more profile functionality
- adding product concepts beyond the original walkthrough
- wiring in more real app behavior
- adapting older tutorial code to current TypeScript, linting, and framework expectations
- solving version drift and stricter tooling issues directly
- making structural and product decisions instead of copying the tutorial literally

A lot of clones stop at visual similarity. I wanted this one to behave more like a real product and reflect more of my own taste and decision-making.

## Technical Notes
This project was built with real front-end state, routing, data fetching, API routes, and UI logic rather than relying on templates to fake the experience.

Key technical areas include:
- authenticated UI flow
- conditional rendering based on user state
- modal-driven UX
- dynamic route handling
- Prisma + MongoDB data flow
- profile editing and revalidation
- post feed fetching and filtering
- follow-state logic

## Stack
- Next.js
- React
- TypeScript
- Tailwind CSS
- Prisma
- MongoDB
- NextAuth
- Zustand
- SWR
- Axios
- Date-fns
- React Hot Toast
- React Icons

## Why This Project Stands Out
What makes this project stronger than a basic tutorial clone is the combination of:
- real auth and account state
- real feed and profile behavior
- custom branding and naming
- expanded product thinking
- debugging through outdated tutorial assumptions
- adapting older code to a stricter modern toolchain
- building beyond the expected feature set

This project shows that I can do more than reproduce a UI. It shows I can:
- take a foundation and extend it
- adapt when the tutorial falls behind the ecosystem
- solve real implementation problems
- make product decisions
- build a more complete and more intentional user experience

## Future Improvements
- full Deeems messaging flow
- Brok AI chat integration
- stronger optimistic updates for likes and follows
- expanded notifications
- richer single-post and comment flows
- media attachments in posts
- stronger moderation and family-friendly content systems
- better trend discovery and recommendation logic

## Closing
Glitter reflects the kind of work I want to keep doing: product-style front-end engineering with real logic, strong UI structure, social interaction, customization beyond the tutorial, and enough original direction that the finished build feels like mine rather than just a copied clone.
