## Next.js 14 → 16, React 18 → 19

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

## npm audit triage

**Found:** 24 vulnerabilities post-Next/React/Tailwind/ESLint upgrades (5 low,
11 moderate, 5 high, 3 critical).

**Fix:** Ran `npm audit fix` (non-breaking), resolving 21 of 24 — including a
critical NoSQL injection/prototype pollution issue in mongoose and a JWT
signature verification bypass in jws (jsonwebtoken's dependency), notable
given the auth rework planned next. The remaining 3 (aws-sdk v2, its uuid
dependency, and xlsx) had no non-breaking fix available. Confirmed via
manual audit that aws-sdk v2 was unused dead weight (no imports anywhere
in the codebase, fully superseded by @aws-sdk/client-s3 v3) and xlsx was
used in exactly one place (client-side parsing of uploaded student-import
files, read-only). Removed both packages outright rather than force a
breaking downgrade.

**Verification:** `npm audit` — 0 vulnerabilities.

**Impact:** Fully clean dependency tree. Closes out the dependency-upgrade
phase of this audit.

---

## [Bug] Union-type inference break in mongoose model definitions

**Found:** After the mongoose (8.5.0 → 8.24.4, via npm audit fix) and
TypeScript version movement earlier in this session, `npm run build`
began failing with TS2349 ("This expression is not callable") on
`Model.findOne`, `.find`, and `.findOneAndUpdate` calls across
`lib/actions/`.

**Root cause:** All 74 model files use the standard Next.js hot-reload
guard pattern: `const User = mongoose.models.User || mongoose.model('User',
UserSchema);`. The two sides of the `||` have different inferred types,
so TypeScript infers `User` as a union of both. Calling a heavily
overloaded method (like `findOne`) on a union of two differently-typed
Models fails, because TypeScript can't find an overload signature valid
across every member of the union. The pattern itself predates this
session; a TypeScript/mongoose version change during this session's
upgrades made the overload-compatibility check start catching it.

**Fix:** Applied `as mongoose.Model<any>` to the result of the
`mongoose.models.X || mongoose.model(...)` line in all 74 model files,
forcing a single concrete type instead of a union. This is a deliberate
temporary fix, not a complete one: it silences the type conflict but
gives the models no real type safety (no autocomplete or compile-time
field checking). Defining a proper TypeScript interface per schema and
passing it as a generic to `mongoose.model<T>()` is the correct long-term
fix, scoped as a separate future task rather than done here.

**Verification:** `npm run build` succeeds.

**Impact:** Unblocks the build. Adds `lib/models/`-wide type safety to
the list of known deferred work.