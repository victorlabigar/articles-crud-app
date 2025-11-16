# Assessment: Full Stack Developer (React + Drupal/Laravel)

## Goal of the Assignment

We would like to gain insight into your skills as a full stack developer.
This assignment simulates realistic work: a simple content application with a backend (**Laravel or Drupal**) and a frontend (**React**).

---

## Assignment Description

Build a small web application where users can manage articles.

### Backend (Laravel or Drupal)

Create an API with the following endpoints:

```
GET /articles        → list of articles
POST /articles       → create a new article
PUT /articles/{id}   → edit an article
DELETE /articles/{id} → delete an article
```

**Database:**

* Table: `articles`
* Fields: `id`, `title`, `content`, `created_at`

**Requirements:**

* Input validation (e.g. title required, minimum content length, etc.)
* Authentication & authorization (login system)

---

### Frontend (React)

Build a user interface with the following pages and features:

* **Overview page:** list of articles
* **Login page & form:** authenticate users
* **Article form:** create and edit an article (available only to logged-in users)
* **Validation:** e.g. title required
* Use **fetch** or **axios** to communicate with the API

---

## Extra Challenges

*(Do at least two — the more, the better!)*

Choose what you like to showcase your skills:

### 1. Search and Filtering

* Search by title or filter by date.

### 2. File Uploads

* Add an option to upload an image with an article.

### 3. Performance Optimization

* Backend caching.
* Code-splitting / lazy loading in React.

### 4. Testing

* Unit test for a React component.
* PHPUnit test for the API.

### 5. Deployment / CI

* Provide a Dockerfile or short deployment instructions.
* **Bonus:** GitHub Actions or other CI/CD.

### 6. Security

* Safe storage of tokens.
* Protection against XSS/CSRF.

---

## General Requirements

* Start your project by writing down a **small plan**, and share this with us.
* Keep track of progress using **separate git commits** with meaningful messages.
* Choose external packages wisely — don’t reinvent the wheel.

---

## Things We Will Look Out For

* Proper interpretation of the assignment and specifications.
* **State management:** how you handle and share data.
* Balanced use of animations (functional, not flashy).
* Proper use of existing packages (and reasoning behind choices).
* **Code quality:** readability, maintainability, adherence to standards.
* A **README** explaining your thoughts and design choices.
* Use of tests (not mandatory but a big plus!).
* Good Git usage — please provide a git repository.

---

## Constraints

* Keep the assignment **doable within 3–4 hours**.
* Provide short documentation on how the app works and how to start it.

---

## Evaluation Criteria

We will review based on:

1. **Correctness:** Does the app work as required?
2. **Code Quality:** Structure, readability, best practices.
3. **Security & Validation:** Safe handling of input and data.
4. **Frontend UX:** Clean components and proper state handling.
5. **Documentation:** Clarity on setup and reasoning behind choices.
