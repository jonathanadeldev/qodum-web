## No server-side dynamic routing or Server Component data access

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