[Full assessment can be found here](https://github.com/victorlabigar/articles-crud-app/blob/main/README_ASSIGNMENT.md)

## Getting Started

```bash
# Install the dependencies if its the first time
npm i

# Run npx prisma generate
npx prisma generate

# Start the app
npm run dev

# Start Prisma Studio to get a database GUI
npx prisma studio
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Goal

Let's build a Articles app with authentication.

**Acceptance Criteria**

- Backend (API & MySQL) (Drupal/Laravel)
  - GET /articles           → list of articles
  - POST /articles          → create a new article
  - PUT /articles/{id}      → edit an article
  - DELETE /articles/{id}   → delete an article
- Frontend (User Interface)
  - User can all articles (Homepage)
  - User can signup/register with validation (Signup Page)
  - User can signin with validation
  - User can create a new article (Create Article Page)
  - User can edit a existing article (Edit Article Page)
  - User can view an article (Article Page)
  - User can logout (Redirects to Homepage)
  - User can only view the Create Article Page when logged in

## Development Plan

I'm picking Next.js with Prisma for the following reasons:
- I'm the most familiar with React/Next.js
- It can handle both the Frontend and Backend which is perfect
- I don't have experience in Drupal and/or Laravel
- 

## Blueprint

## MySQL / Prisma
I'm using a shared MySQL database on Cloud86 so migrations won't work because prisma needs to be able to create a shadow database. On my shared database that's not possible. To bypass this I'm just matching the remote database with my schema.prisma configuration where I've defined my database models.

```bash
npx prisma db push
```

Once the 

```bash
npx prisma generate
```


## Features

## Decisions


