# CIPC integration

Source: https://developer.cipc.co.za/api-details#api=685ea852410172270da78f9d-v1&operation=post-information

## Current state
The linked API detail page is a JavaScript application; its request schema, authentication requirements and production base URL could not be retrieved from the publicly visible page. **Do not assume the operation is company search** based on its name or identifier.

## Before enabling live calls
1. Export the operation's OpenAPI specification (or copy its method, URL, headers, request and response schema) from the authenticated developer portal.
2. Confirm that Swift Start is subscribed to the correct API product and authorized to use the operation.
3. Store credentials only in Supabase server-side secrets; never in GitHub or browser JavaScript.
4. Implement a Supabase Edge Function that validates authenticated requests, rate limits callers, and calls only the documented CIPC endpoint.
5. Map returned company information to an explicitly versioned response; record the source and retrieval time.
6. Restrict access to sensitive information until authority to act for the company has been verified.
7. Test failure cases and production permissions before replacing any demo data.

Supabase project: `oxhrhhraiooovnhxoviq`

**Do not publish a working CIPC integration until the actual endpoint contract and credentials have been verified.**
