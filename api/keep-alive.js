export default async function handler(req, res) {
  if (process.env.CRON_SECRET) {
    const auth = req.headers.authorization || '';
    if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
      return res.status(401).json({ ok: false, error: 'unauthorized' });
    }
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    return res.status(500).json({ ok: false, error: 'missing Supabase env vars' });
  }

  try {
    const resp = await fetch(`${url}/rest/v1/pieces_detachees?select=id&limit=1`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(10_000),
    });
    if (!resp.ok) {
      return res.status(502).json({ ok: false, status: resp.status, error: await resp.text() });
    }
    return res.status(200).json({ ok: true, pingedAt: new Date().toISOString() });
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err) });
  }
}
