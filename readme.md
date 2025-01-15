# 3D Image Pan Website

## Overview

This repository contains the code for a 3D image pan website. The project is built using Next.js, Tailwind CSS, and Prisma. It allows users to interact with 3D images by panning and zooming, with hotspots that provide additional information or links.

## Features

- 3D image panning and zooming
- Hotspots with tooltips and popovers
- Responsive design for mobile and desktop
- Integration with Prisma for database management
- Customizable UI components

## Getting Started

### Prerequisites

- Node.js (v18.3.1 or higher)
- PostgreSQL (for the database)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/azmine-iktidar/3d_image_pan_website.git
   cd 3d_image_pan_website
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a `.env` file based on the `.env.example` file:

   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your database connection details.

### Database Setup

1. Generate Prisma client:

   ```bash
   pnpm run db:generate
   ```

2. Apply database migrations:

   ```bash
   pnpm run db:migrate
   ```

3. Start Prisma Studio to manage your database:
   ```bash
   pnpm run db:studio
   ```

### Running the Application

1. Start the development server:

   ```bash
   pnpm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`.

### Building for Production

1. Build the application:

   ```bash
   pnpm run build
   ```

2. Start the production server:
   ```bash
   pnpm run start
   ```

## Project Structure

- `src/app` - Contains the main application components and pages.
- `src/components` - Contains reusable UI components.
- `src/constants` - Contains constant values used throughout the application.
- `src/context` - Contains context providers for managing global state.
- `src/hooks` - Contains custom hooks.
- `src/lib` - Contains utility functions.
- `src/server` - Contains server-side code, including database setup.
- `src/styles` - Contains global styles.

## Environment Variables

The environment variables are defined in the `.env` file. The schema for these variables is defined in `src/env.js`. Make sure to update the `.env` file with your own values.

## Scripts

- `pnpm run dev` - Start the development server.
- `pnpm run build` - Build the application for production.
- `pnpm run start` - Start the production server.
- `pnpm run db:generate` - Generate Prisma client.
- `pnpm run db:migrate` - Apply database migrations.
- `pnpm run db:push` - Push Prisma schema changes to the database.
- `pnpm run db:studio` - Start Prisma Studio.
- `pnpm run lint` - Run ESLint.
- `pnpm run lint:fix` - Fix ESLint issues.
- `pnpm run format:write` - Format code using Prettier.
- `pnpm run format:check` - Check code formatting using Prettier.

## License

This project is licensed under the MIT License.
