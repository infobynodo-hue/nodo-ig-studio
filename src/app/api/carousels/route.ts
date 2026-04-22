import { createClient } from '@supabase/supabase-js'

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function POST(req: Request) {
  const { tema, slides, tono, idea } = await req.json()
  const { data, error } = await db()
    .from('carousels')
    .insert({ tema, slides, tono, idea, status: 'draft' })
    .select('id')
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ id: data.id })
}

export async function GET() {
  const { data, error } = await db()
    .from('carousels')
    .select('id, created_at, tema, status, tono')
    .order('created_at', { ascending: false })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}
