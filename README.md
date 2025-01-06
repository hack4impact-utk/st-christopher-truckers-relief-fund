<h1 align="center">
  <br>
    <img src="public/icon-192.png" alt="SCF Logo width="25%">  
  <br>
    St. Christopher Truckers Relief Fund (SCF)
</h1>

## Description

SCF is a non-profit that has multiple programs that promote the health and well-being of truckers.

They have multiple intake forms, with some on their website and some on Google Forms. Each program is managed either through an Excel spreadsheet or a database.

The goal is to consolidate all of the programs into one intake form and create admin and user dashboards.

Please read the Product Requirement Document here: (insert link later)

## Getting Started

### Prerequisites

Please have the following installed on your machine:

- Node.js
- PNPM
- MongoDB Compass
- VSCode

Please have the following VSCode extensions installed:

- Prettier
- ESLint
- Code Spell Checker
- markdownlint

### Environment Variables

Create a `.env.local` file in the root directory of the project and add the following variables:

```text
MONGODB_URI=mongodb+srv://<username>:<password>@scf-cluster.ukm7k.mongodb.net/scf-test?retryWrites=true&w=majority&appName=SCF-Cluster
NEXTAUTH_URL=http://localhost:3000/
NEXTAUTH_SECRET=
SCF_GMAIL=utkscf@gmail.com
SCF_GMAIL_APP_PASSWORD=
BASE_URL=http://localhost:3000
```

Please contact leadership to obtain the following:

- `MONGODB_URI` username and password
- `NEXTAUTH_SECRET`
- `SCF_GMAIL_APP_PASSWORD`

### Running the App

1. Run `pnpm install` to install the dependencies.
2. Run `pnpm run dev` to start the development server.

### Contributing

Branch protections are enabled on this repository.
To contribute, please create a new branch and make a pull request.
The rules for branch names are lax, just be sure to include your name.

An example branch name for a card that adds a reset password email would be:

```text
rudra-reset-password-email
```

Your pull request title must follow the conventional commits specification. An example of a valid pull request title is:

```text
feat: Add pending form submissions table
```

Your PR must pass linting, formatting, and PR title checks before it can be merged.

The `pnpm run lint` command can be used to fix linting errors.

The `pnpm run check-lint` command can be used to check for linting errors.

The `pnpm run check-format` command can be used to check for formatting errors.

The `pnpm run format` command can be used to fix formatting errors.

### Testing

#### Testing components and actions

For your convenience, there are many tools available to test out components, actions, etc.

`/test/client/page.tsx` is a page that can be accessed at `/test/client` and is used to test out client components and server actions.

`/test/server/page.tsx` is a page that can be accessed at `/test/server` and is used to test out server components and server functions.

#### Testing accounts

Fill out the enrollment form to create client accounts.

To create an admin account, you must set the `ADMIN_CREATION_KEY` environment variable to a secret key and provide it in the `x-api-key` header when making a POST request to `/api/users/actions/create-admin`.

#### Testing emails

Run `pnpm run email-dev` to preview the emails that live in the `src/components/emails` directory.

Once the email looks good, fill out the sending function in `src/server/actions/emails/actions.tsx`

Then, go to `/test/client` and add a button that calls the send function.

#### Debugging

The `.vscode/launch.json` file is configured to run Next.js in debug mode. This can let you step through your code line by line and inspect variables.
To start debug mode, navigate to the `Run and Debug` tab in VSCode, select the mode, and click the green play button.
