# Qodum Engineering Log

## Context

Qodum is a school ERP originally built between November 2023 and January
2025. Development paused in 2025 to focus on academic exams. Development resumed in August 2026 with a
different goal: instead of adding new features, this phase is a structured
audit of the existing codebase — finding real architectural, security, and
dependency issues, understanding their root causes, and fixing them
properly.

This log exists so the reasoning behind each change is on record, not just
the diff. Entries are written as they're found and fixed, in the order they
happened. A `pre-refactor` git tag marks the state of the codebase before
this work began, so any entry here can be diffed against the original.

Each entry follows the same structure: what was found, why it was
happening, what changed, how it was verified, and what it affects.

---

## [Dependencies] Next.js 14 → 16, React 18 → 19

**Found:** Qodum was on Next.js `^14.2.4` and React `^18`, two major
versions behind current stable (Next 16.2.x, React 19.2.x) at the time of
this audit.

**Root cause:** No maintenance had been done on the project since active
development stopped, so dependencies simply aged in place.

**Fix:** Ran the official `@next/codemod` upgrade wizard on an isolated
branch (`upgrades`), separate from any other fix, so this
change has its own clean diff and history. Upgraded to Next.js `16.3.3`
and React `19`.

**Verification:** Clean `npm run build` after resolving the issues logged
below.

**Impact:** Brings the app onto a supported, current major version before
any further architectural work is done on top of it — avoids fixing bugs
against a version that would need to be re-migrated later anyway.

---

## [Architecture] No server-side dynamic routing or Server Component data access

**Found:** While verifying the `next-async-request-api` codemod's "0 files
modified" result, a manual audit confirmed: zero `[param]`-style dynamic
route folders under `app/`, zero server-side reads of `params` or
`searchParams` in page/layout functions, zero usage of `cookies()` or
`headers()` from `next/headers` anywhere in the codebase. The 6 usages of
route params that do exist are all the client-side `useParams`/
`useSearchParams` hooks from `next/navigation` — a different, unaffected
API.

**Root cause:** Qodum is built almost entirely with client components.
Routing state, IDs, and data fetching are handled client-side (hooks +
`useEffect` + server actions called from the client) rather than through
Next.js's App Router server-rendering model. This is consistent with a
separate finding in the auth system: route protection is also implemented
as a client-side `useEffect` redirect rather than a server-side check.

**Fix:** No code change from this entry alone — this is a diagnostic
finding, not a bug fix. It's the reason the async-request-api migration
required no changes, and it directly informs the auth remediation work,
since any server-side session check that gets added will need to be
introduced deliberately rather than extended from existing patterns.

**Verification:** `grep`-based audit of `app/` and `components/` for
dynamic route folders, `params`/`searchParams` destructuring, and
`next/headers` imports — zero matches for all three, confirming the
codemod's result was correct rather than a silent no-op failure.

**Impact:** Not a bug in itself, but an architectural fact that shapes
every subsequent fix in this codebase.

---

## Known issues found, not yet fixed

Logged here for visibility; each will get its own full entry once
addressed.

- **No server-side authorization on any server action** (`lib/actions/`,
  76 files) — auth is enforced client-side only.
- **Client-side-only route guard** in `components/Layout/index.tsx`
  (`useEffect` + `redirect`, runs after render, protects nothing at the
  data layer).
- **JWT expiry check in `context/AuthContext.js`** compares `exp`
  (seconds) against `Date.now()` (milliseconds) and has inverted branch
  logic — effectively treats stored tokens as valid regardless of actual
  expiration.
- **Auth token stored in `localStorage`** rather than an httpOnly cookie.
- **Leftover commented-out code** in `sign-in/page.tsx` containing a
  hardcoded credential — needs to be scrubbed, not just left commented.
- **`images.domains` deprecated** in favor of `images.remotePatterns` in
  `next.config.js` — flagged by build, not yet updated.
- **`npm audit`: 28 vulnerabilities (3 critical, 7 high)** as of the
  Next/React upgrade — not yet triaged.
- **Tailwind CSS 3 → 4**, **ESLint 8 → 9**, and removal of the legacy
  `aws-sdk` v2 package (superseded by `@aws-sdk/client-s3` already in
  use) — planned, not started.