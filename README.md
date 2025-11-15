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

Let's build a Articles app that users can manage by logging in. What we'll be using:

- Backend (API & MySQL) (Drupal/Laravel)
- Frontend (User Interface)

I'm picking Next.js since it can handle both sides of the spectrum. And because I'm more familiar with React/Next.js then with Drupal or Laravel

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


