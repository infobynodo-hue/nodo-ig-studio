import Anthropic from '@anthropic-ai/sdk'
import {
  buildMitoRealidadPrompt,
  buildListaPrompt,
  buildDatoPrompt,
  buildComparacionPrompt,
  buildIaEligePrompt,
} from '@/lib/nodoContext'
import { CarouselData } from '@/types/carousel'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: Request) {
  const { idea, tono = 'Directo', arquetipo = 'ia', cantidad = 3 } = await req.json()

  if (!idea?.trim()) {
    return Response.json({ error: 'Idea requerida' }, { status: 400 })
  }

  let prompt: string
  switch (arquetipo) {
    case 'mito-realidad':
      prompt = buildMitoRealidadPrompt(idea, tono, cantidad)
      break
    case 'lista':
      prompt = buildListaPrompt(idea, tono, cantidad)
      break
    case 'dato':
      prompt = buildDatoPrompt(idea, tono, cantidad)
      break
    case 'comparacion':
      prompt = buildComparacionPrompt(idea, tono, cantidad)
      break
    case 'ia':
    default:
      prompt = buildIaEligePrompt(idea, tono)
      break
  }

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 3000,
    messages: [{ role: 'user', content: prompt }],
  })

  const raw = message.content[0].type === 'text' ? message.content[0].text : ''

  const jsonMatch = raw.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    return Response.json({ error: 'No se pudo generar el carrusel' }, { status: 500 })
  }

  const data: CarouselData = JSON.parse(jsonMatch[0])
  return Response.json(data)
}
