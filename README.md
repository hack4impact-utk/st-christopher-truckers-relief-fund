# St. Christopher Truckers Relief Fund (SCF)

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

Your pull request title must follow the conventional commits specification. An example of a valid pull request title is:

```text
feat: Add pending form submissions table
```

Your PR must pass linting, formatting, and PR title checks before it can be merged.

The `pnpm run lint` command can be used to check for linting errors.

The `pnpm run check-format` command can be used to check for formatting errors.

The `pnpm run format` command can be used to fix formatting errors.

### Testing

#### Testing components and actions

For your convenience, there are many tools available to test out components, actions, etc.

`/test/client/page.tsx` is a page that can be accessed at `/test/client` and is used to test out client-side components.

`/test/server/page.tsx` is a page that can be accessed at `/test/server` and is used to test out server-side components.

#### Testing accounts

`/test/account/page.tsx` is a page that can be accessed at `/test/account` and is used to make test accounts.

#### Testing emails

Run `pnpm run email-dev` to preview the emails that live in the `src/emails` directory.

#### Debugging

The `.vscode/launch.json` file is configured to run Next.js in debug mode. This can let you step through your code line by line and inspect variables.
To start debug mode, navigate to the `Run and Debug` tab in VSCode, select the mode, and click the green play button.
