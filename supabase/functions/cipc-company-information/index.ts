import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { "content-type": "application/json", "cache-control": "no-store" }
});

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const authorization = req.headers.get("authorization");
  if (!supabaseUrl || !anonKey || !authorization?.startsWith("Bearer ")) return json({ error: "Authentication required" }, 401);
  const userResponse = await fetch(supabaseUrl + "/auth/v1/user", {
    headers: { authorization, apikey: anonKey }
  });
  if (!userResponse.ok) return json({ error: "Authentication required" }, 401);
  let input: unknown;
  try { input = await req.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
  const number = (input as Record<string, unknown> | null)?.enterprise_number;
  if (typeof number !== "string" || !/^\d{4}\/\d{6}\/\d{2}$/.test(number)) {
    return json({ error: "Enter a company number such as 2020/939681/07" }, 400);
  }
  const endpoint = Deno.env.get("CIPC_INFORMATION_URL");
  const token = Deno.env.get("CIPC_ACCESS_TOKEN");
  if (!endpoint || !token) return json({ error: "CIPC integration is awaiting approved API configuration" }, 503);
  let url: URL;
  try {
    url = new URL(endpoint);
    if (url.protocol !== "https:" || !url.hostname.endsWith(".cipc.co.za")) throw Error("Unapproved endpoint");
  } catch { return json({ error: "CIPC endpoint is not configured correctly" }, 503); }
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: "Bearer " + token },
      body: JSON.stringify({ enterprise_number: number }),
      signal: AbortSignal.timeout(12000)
    });
    if (response.status === 401) return json({ error: "CIPC authorization failed; administrator action required" }, 502);
    if (!response.ok) return json({ error: "CIPC service unavailable", upstream_status: response.status }, 502);
    const raw: unknown = await response.json();
    // The published schema is inconsistent (string root with an Enterprise property).
    // Preserve the actual payload until a verified example confirms its structure.
    return json({ source: "CIPC", retrieved_at: new Date().toISOString(), data: raw });
  } catch { return json({ error: "CIPC request failed or timed out" }, 502); }
});
