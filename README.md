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
  - MySQL Database
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
- It can handle both the Frontend and Backend which is perfect for this assessment
- I don't have experience in Drupal and/or Laravel (although I have some experience in `.blade` syntax due to Sage Themes in WP)
- I use prisma because I'm currently using it at other projects

**Small sidenote:**
Normally I would create stories of all the phases/tasks and create feature branches. But since I was missing that structure I was kind of like freewheeling, although the assignment was to be clear up front so that you could monitor my process. I more or less just started with the project to get results as quickly as possible.
- `feature/BOL-123-setup-and-connection`
- `feature/BOL-345-remove-boilerplate-code`
- `feature/BOL-678-create-api-endpoints`
- `docs/BOL-111-create-readme-file`
- etc

My commits would have looked like, 
```
feat(BOL-123): setup and connection
- created and setup nextjs app
- created remote database with user
- installed prisma 
- connected with database
- created env file
- added env to git ignore
```

## Step 1: Setup and DB Connection
- create github repo
- install a fresh next.js app
- create a remote mysql on cloud86 (thats where I host my sites)
- make sure the connection is created
- remove some boilerplate code

## Step 2: Define the Prisma Schema
- configure prisma by setting up the models in the schema
- in this phase i was stuck with the migrations of prisma and appearantly prisma needs to be able to create a shadow table on the remote host but my hosting provider doesnt allow that. I bypassed this by using `prisma db push`.

## Step 3: Setting up the API endpoints
- create the api directory in `app/api/article` 
- setup the get and post endppoints

## Step 4: Create the basic UI
- Homepage (list all articles)
- Article page (view of full article)
- Login page
- Signup page
- Create new article page 


### CSS
I didn't gave much attention to the CSS since I was more focused on the functional side of the app then with the layout.

### MySQL / Prisma
I'm using a shared MySQL database on Cloud86 so migrations won't work because prisma needs to be able to create a shadow database. On my shared database at Cloud86.io that's not possible. To bypass this I'm just matching the remote database with my schema.prisma configuration where I've defined my database models.




```bash
# this will look for the schema file and makes sure the database match it
npx prisma db push
```

```bash
# this will manually generate the prisma client locally
npx prisma generate
```

```bash
# this will launch a local database GUI server
npx prisma studio
```


## Features
- Prisma
- Authtentication
- Typescript
- API 

## Missing features
- All extra challenges
