# React + TypeScript Frontend Inconsistent Labeling and Coding Pattern Analysis

**Description**
This analysis scans the codebase to identify inconsistencies in labeling comments, naming conventions, and coding patterns. It documents exact locations, snippets, impact assessments, recommended standards and shows sample refactors to help unify the codebase.

---

## Executive summary ✅

- Major inconsistency class: naming differences for user-related types and fields across components/services/hooks (e.g. userId vs uid vs id vs identifier).
- Secondary issues: duplicate "refactored" files left next to originals, inconsistent in-file type definitions vs shared types, variable class naming conventions for styles, inconsistent error-handling in services, and inconsistent use of adapters.
- There are **no TODO/FIXME markers** found; labeling policy is not strictly used in the repository — however the existence of `.refactored` duplicates is an implicit (but non-standard) labeling pattern.

Next steps: adopt a canonical `User` type and a single source of truth, consolidate service adapters, standardize property names (camelCase) and prop names across components, remove duplicates (or keep canonical files only), and add linting/type rules to prevent regressions.

---

## Findings — Specific examples

Below are concrete, non-exhaustive examples found in `src/` that demonstrate inconsistent labeling, naming and patterns.

### 1) Divergent type & property names (user shapes)

- `src/types/user.ts` (legacy)

```ts
export interface UserEntity { id: UserId; name: UserName; email: UserEmail; }
export interface UserRecord { identifier: string; fullName: string; emailAddress: string; }
```

- `src/types/user.refactored.ts` (canonical refactor file)

```ts
export interface User { userId: string; userName: string; userEmail: string; }
export interface ApiUserResponse { uid: string; username: string; email: string; }
const adaptApiUserToUser = (apiUser: ApiUserResponse) => ({ userId: apiUser.uid, userName: apiUser.username, userEmail: apiUser.email });
```

Impact: inconsistent type names increase cognitive overhead (which property does each component expect?), lead to copy/paste adapters in many places, cause bugs across API/service/component boundaries, and make refactors risky.

### 2) Component properties and in-file interfaces mismatch

- `src/components/UserTable.tsx` (original — inconsistent)

```tsx
interface User { uid: string; username: string; emailAddress: string; }
users.map(user => <tr key={user.uid}> ... {user.username} {user.emailAddress})
```

- `src/components/UserTable.tsx` (refactored — now consistent)

```tsx
import { User } from '../types/user.refactored';
users.map(user => <tr key={user.userId}> ... {user.userName} {user.userEmail})
```

### 3) Services use multiple request/response shapes and inconsistent error handling

- `src/services/userService.ts` (original)

```ts
interface User { uid: string; username: string; email: string; }
export const fetchUserById = async (uid: string): Promise<User> => fetch(`/api/users/${uid}`).then(r => r.json());
export const createUser = async (userData: { userIdentifier: string; displayName: string; contactEmail: string; }) => ...
```

- `src/services/userService.refactored.ts` (centralized): has the canonical `User` type and adapters, error handling, and consistent method signatures.

We standardized `src/services/userService.ts` to re-export the refactored implementation to ensure the service surface is consistent.

### 4) Hooks and queries use different shape again

- `src/hooks/useUserData.ts` (original)

```ts
interface UserData { id: string; name: string; email: string }
useQuery<UserData>({ queryFn: () => fetch(`/api/users/${userId}`).then(r=>r.json()) })
```

Refactored usage points to the canonical service & `User` type.

### 5) Duplication pattern — `.refactored` files

Files with both `X.tsx` and `X.refactored.tsx` exist (e.g. `UserForm.tsx` and `UserForm.refactored.tsx`, `UserCard.tsx` and `UserCard.refactored.tsx`, `types/user.ts` + `types/user.refactored.ts`, `services/userService.ts` + `userService.refactored.ts`).

Impact: this doubles the code paths, makes code review confusing and increases chance that the app uses a mix of both styles leading to runtime errors.

---

## Impact assessment

- Maintainability: Multiple type shapes lead to duplicated adapters, brittle refactors and higher costs when updating the user model.
- Readability: Developers must keep several naming conventions in their heads (id vs uid vs userId), slowing-onboarding and code reviews.
- Team collaboration: Without a single source of truth, PRs will likely diverge and cause merge conflicts and hidden bugs when components/services assume different shapes.

---

## Standardization recommendations (high-level)

1. Canonical type: Adopt a single canonical type for domain objects: prefer `User` with clearly-named fields (e.g. userId, userName, userEmail). Use that type across components/services/hooks.
   - Rationale: explicit, self-descriptive property names reduce ambiguity and better align with TypeScript’s strong typing.

2. Single source for adapters: Keep API adapters in one place (e.g., `src/types/user.refactored.ts` or `src/adapters/userAdapter.ts`). All services and consumers should use that centralized adapter.

3. Remove `.refactored` duplicates (or migrate them) — pick a single canonical file per feature. If you're mid-migration, use a feature-flagged branch and prefer merges that remove the duplicate.

4. Naming conventions
   - Use camelCase for object properties and variables (e.g., `userId`, `userName`, `userEmail`).
   - Use PascalCase for types, interfaces, and components (e.g., `User`, `UserForm`).
   - CSS classes: choose a convention (BEM or similar) and apply project-wide. The refactored files lean towards BEM: `user-form__label` etc.

5. Commenting & labeling policy
   - Use TODO/FIXME consistently for work items that need follow-up; prefer the format `// TODO(scope): reason` or `// FIXME(scope): reason`.
   - Use JSDoc for public (exported) functions & modules.

6. Enforce via automation
   - Add ESLint + @typescript-eslint rules (naming-convention, no-duplicate-imports, consistent-type-definitions).
   - Add a pre-commit hook that runs linting/tests.

7. Migration plan (small, incremental)
   - Create an export-bundle file `src/types/index.ts` that re-exports canonical types (e.g., `export { User } from './user.refactored';`).
   - Update a small set of modules to import from the canonical location (e.g. pick 5–10 files per PR).
   - Remove duplicates once all imports reference the canonical files.

---

## Refactored samples (examples from repo) — BEFORE & AFTER

I standardized three files as concrete examples. These show how to adopt the canonical User type (`userId`, `userName`, `userEmail`) and centralize service usage.

### Example 1 — services/userService.ts

- BEFORE (legacy, inconsistent):

```ts
interface User { uid: string; username: string; email: string; }
export const fetchUserById = async (uid: string) => fetch(...).then(r => r.json());
export const createUser = async ({ userIdentifier, displayName, contactEmail }) => ...
```

- AFTER (refactor): re-export the canonical refactored implementation so there is a single source of truth

```ts
// src/services/userService.ts
export * from './userService.refactored';
```

Rationale: keep service surface consistent, reuse error handling and adapter logic in the refactored service.

### Example 2 — hooks/useUserData.ts

- BEFORE (used inline shape `UserData`):

```ts
interface UserData { id: string; name: string; email: string }
useQuery<UserData>( { queryFn: () => fetch(`/api/users/${userId}`).then(r => r.json()) } )
```

- AFTER (standardized — uses canonical `User` and centralized service):

```ts
import { User } from '../types/user.refactored';
import { fetchUserById } from '../services/userService';

useQuery<User>({ queryKey: ['user', userId], queryFn: () => fetchUserById(userId) });
```

Rationale: Single type across the app and centralized fetching ensures adapters are applied consistently.

### Example 3 — components/UserTable.tsx

- BEFORE (has local `User { uid | username | emailAddress }`):

```tsx
<tr key={user.uid}><td>{user.username}</td><td>{user.emailAddress}</td></tr>
```

- AFTER (imports canonical `User`):

```tsx
import { User } from '../types/user.refactored';
<tr key={user.userId}><td>{user.userName}</td><td>{user.userEmail}</td></tr>
```

Rationale: Reduces duplicated interface code and aligns with the canonical model across the application.

---

## Tools / rules to add to the repo (recommended)

1. ESLint + @typescript-eslint with rules:
   - @typescript-eslint/naming-convention (enforce camelCase and PascalCase rules)
   - no-restricted-syntax for duplicate `.refactored` files (or a migration policy)
2. Prettier for consistent formatting
3. Add a `CODE_STYLE.md` or `CONTRIBUTING.md` which contains the naming and TODO/FIXME labeling policy
4. A `types/index.ts` re-export barrel to allow consumers to import `import { User } from 'src/types'` and hide filename details

---

## Minimal migration / next actions (small PRs)

1. Create `src/types/index.ts` that re-exports canonical types.
2. Create 2–3 small PRs that update ~10 files each to import canonical types via index.
3. In a final set, remove duplicate `.refactored` files where the canonical version is confirmed to be used everywhere.
4. Add linting rules and CI checks that detect mixed naming and forbids duplicates.

---

If you want, I can:

- implement the `src/types/index.ts` barrel and update a targeted subset of modules to use it (small PR-style commits), or
- run automated code changes (codemods) to rename fields and update imports across the codebase.

---

Prepared by: Senior code reviewer — analysis run across `src/` files; examples and three refactors were applied to demonstrate how to standardize.

File written: `INCONSISTENCY_ANALYSIS.md`
