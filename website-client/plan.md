# Clerk + Supabase Auth Plan

## Goal
Implement `login` and `signup` with Clerk for authentication, and use Supabase as the backend for user data, profiles, and app content that needs persistence.

## Target Architecture
- Clerk handles identity, sessions, and UI for sign in / sign up.
- Supabase stores application data in Postgres.
- A user record in Supabase is created or updated from Clerk user events so the app can link authenticated users to backend rows.
- Next.js app routes use Clerk session context to guard user-only pages.

## Implementation Plan

### 1. Confirm environment variables
Add the required keys for both services:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` for server-side writes only

### 2. Wrap the app with Clerk
- Update the root layout to include `ClerkProvider`.
- Add a navigation state that shows `Sign In`, `Sign Up`, `UserButton`, or account links based on auth state.
- Keep the current site styling intact while adding auth entry points in the header.

### 3. Create auth routes
- Add Clerk hosted or custom routes for:
  - `/login`
  - `/signup`
- Decide whether the app will use Clerk prebuilt components or custom pages.
- Redirect authenticated users to the main storefront or account area after sign in.

### 4. Protect user-only pages
- Use Clerk middleware or route protection for pages such as:
  - cart
  - favorites
  - account/profile pages if added later
- Allow public browsing for storefront content.

### 5. Set up Supabase schema
Create the minimum backend tables needed for user-linked data:
- `profiles` with `id`, `clerk_user_id`, `email`, `name`, `image_url`, `created_at`, `updated_at`
- future app tables such as `favorites`, `cart_items`, `orders`, or `addresses`

### 6. Sync Clerk users to Supabase
Choose one of these sync paths:
- Clerk webhook on `user.created` and `user.updated` to upsert profile rows into Supabase.
- Server action or API route that creates the profile on first authenticated request.

Preferred approach:
- Use Clerk webhooks for reliable profile creation.
- Use Supabase service role only on the server.

### 7. Add server-side Supabase access helpers
- Create a Supabase client for server components and route handlers.
- Create a safe client for browser reads if needed.
- Enforce row-level security so users only read and write their own rows.

### 8. Implement user flows
- Sign up: Clerk creates the identity, webhook creates the Supabase profile.
- Login: Clerk returns the session, app loads user-specific data from Supabase.
- Logout: Clerk clears session, app returns to public state.

### 9. Add account-linked features
Once auth is in place, connect backend data to the logged-in user:
- favorites list
- cart persistence
- saved addresses
- order history

### 10. Validate the integration
- Verify sign up creates a Clerk user and a matching Supabase profile.
- Verify login restores the correct profile and user data.
- Verify unauthorized users cannot access protected routes or rows.
- Verify public pages still work without auth.

## Suggested File Areas
- `src/app/layout.tsx` for the provider wrapper
- `src/app/login/page.tsx` and `src/app/signup/page.tsx` for auth entry points
- `src/middleware.ts` for route protection
- `src/lib/supabase.ts` for clients and helpers
- `src/app/api/webhooks/clerk/route.ts` for Clerk to Supabase sync

## Recommended Build Order
1. Add env vars and Clerk provider.
2. Add login and signup routes.
3. Add Supabase schema and webhook sync.
4. Protect private routes.
5. Connect favorites, cart, and profile data.

## Notes
- Keep Clerk as the source of truth for authentication.
- Keep Supabase as the source of truth for persisted app data.
- Do not expose the Supabase service role key to the browser.

password : Av38uasastrong