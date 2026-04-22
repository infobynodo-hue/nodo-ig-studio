import Anthropic from '@anthropic-ai/sdk'
import { NODO_SYSTEM_PROMPT } from '@/lib/nodoContext'
import { CarouselData } from '@/types/carousel'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: Request) {
  const { idea, tono } = await req.json()

  if (!idea?.trim()) {
    return Response.json({ error: 'Idea requerida' }, { status: 400 })
  }

  const userMessage = `
Crea un carrusel MITO VS REALIDAD de Instagram sobre el siguiente tema:

IDEA: ${idea}
TONO: ${tono || 'Directo'}

Asegúrate de que:
- Los mitos sean objeciones REALES que escuchan los dueños de negocio en llamadas de venta
- Las realidades respondan con datos concretos de NODO ONE
- El copy sea en español latinoamericano, directo y sin corporativismo
- La portada capture la atención en los primeros 2 segundos
`

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    system: NODO_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userMessage }],
  })

  const raw = message.content[0].type === 'text' ? message.content[0].text : ''

  // Extract JSON even if Claude wraps it in markdown code blocks
  const jsonMatch = raw.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    return Response.json({ error: 'No se pudo generar el carrusel' }, { status: 500 })
  }

  const data: CarouselData = JSON.parse(jsonMatch[0])
  return Response.json(data)
}
