## Client-side-only auth guard replaced with server-side verification

**Found:** Route protection previously lived entirely in a client-side
useEffect redirect (components/Layout/index.tsx) and none of the 76
server actions verified a session at all.

**Root cause:** Auth was implemented as a UI concern rather than a
server concern; Server Actions are POST endpoints regardless of what
the client renders, so a client-side check never touched them.

**Fix:** Added proxy.ts performing real JWT verification via jose
(Edge/Node-compatible, unlike jsonwebtoken which depends on Node's
crypto module) directly against the cookie on the incoming request.
next/headers' cookies() cannot be used at this point in the request
lifecycle regardless of runtime — confirmed this is a lifecycle
constraint, not a runtime one, after Next 16 moved proxy to the
Node.js runtime by default.

**Verification:** Manually tested sign-in redirect and authenticated
dashboard load; confirmed via browser devtools that the session cookie
is httpOnly and the user object renders correctly from a real,
server-verified session.

**Impact:** Route-level access is no longer purely cosmetic — an
unauthenticated request is now rejected before rendering, not just
hidden after the fact. Server-action-level authorization (the actual
data-layer protection) is scoped separately and not yet done — see
"Still open" below.

---

## [Architecture] JWT payload redesigned after discovering real permission scale

**Found:** The original plan was to carry the full permission tree
(module -> sub-menu -> add/modify/delete/print/read_only) in the JWT.
The actual data has ~550 distinct sub-pages across 12 modules — one
superadmin's permission array alone serializes to 80-100+ KB, far
past the browser's 4KB per-cookie limit.

**Root cause:** The permission model was designed before the real
scale of the page/module structure was measured against it.

**Fix:** Split enforcement into two tiers. The JWT now carries only a
flat 12-key boolean map (module-level: "does this user have any
access to Fees at all"), used by proxy.ts for route gating. The full
granular tree stays database-only, checked at the point of actual
action, not baked into the token.

**Verification:** Confirmed cookie size is now trivially small
regardless of how many permissions a user has, since the token shape
no longer scales with the permission tree size.

**Impact:** Removes a scaling failure that would have silently broken
login for high-permission users (like admins) specifically, while
low-permission test accounts would have appeared to work fine.
Page-level and action-level granular checks are deferred — see below.

---

## Still open (auth-adjacent, deliberately not done in this pass)

- No server-side authorization at the individual action level yet —
  the original 76-action problem is unchanged; proxy.ts only gates at
  the module/route level.
- Granular page-level permission checks (a specific sub-menu's
  add/modify/delete/print) are designed but not implemented — blocked
  on the page-per-route architecture refactor, deferred separately.
- Old localStorage-based AuthContext.js client auth code has not been
  confirmed fully removed — needs a check that nothing still depends
  on the old client-only token/expiry logic.
- Token lifetime is still 30 days with no refresh mechanism; the
  short-lived-token-plus-refresh design was discussed but not built.