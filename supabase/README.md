# Swift Start Supabase backend

Dedicated Supabase project: `oxhrhhraiooovnhxoviq` (EU West).

Applied migration `initial_secure_launch_application_schema` creates:

- `public.launch_applications` — owner-scoped onboarding drafts and statuses.
- `public.application_tasks` — read-only customer-visible progress tasks.
- `public.application_documents` — owner-scoped private document metadata.
- Private storage bucket `application-documents` — file paths must start with the authenticated user's UUID.

All three public tables have RLS enabled. Security advisors reported no lints after migration.

## Next implementation steps

1. Integrate Supabase Auth (email verification, login/logout and password recovery) in frontend.
2. Save drafts in `launch_applications` only after a user is authenticated. Keep browser localStorage as a non-sensitive pre-signup draft only.
3. Create separate privileged operations API for task status changes, using server-side authorization, audit logs and scoped staff roles. Never expose service role keys to the browser.
4. Create protected document uploader with MIME/content validation and malware scanning.
5. Add application submission as a server-side transactional operation; clients cannot set submitted or completed statuses directly.
6. Configure authentication redirect URLs for the actual Vercel domain in Supabase dashboard.
7. Run tests for cross-user read/write denial, auth redirects, document path isolation and task authorization.

Do not collect sensitive personal information through the prototype before steps 1–4 are complete. The existing frontend remains a demo.
