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

function getFecha(): string {
  return new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
    .replace(/^(\w)/, c => c.toUpperCase())
}

export async function POST(req: Request) {
  const { idea, tono = 'Directo', arquetipo = 'ia', cantidad = 3, modificacion } = await req.json()

  const ideaFinal = modificacion
    ? `${idea}\n\nMODIFICACIÓN SOLICITADA: ${modificacion}`
    : idea

  if (!ideaFinal?.trim()) {
    return Response.json({ error: 'Idea requerida' }, { status: 400 })
  }

  const fecha = getFecha()

  let prompt: string
  switch (arquetipo) {
    case 'mito-realidad':
      prompt = buildMitoRealidadPrompt(ideaFinal, tono, cantidad, fecha)
      break
    case 'lista':
      prompt = buildListaPrompt(ideaFinal, tono, cantidad, fecha)
      break
    case 'dato':
      prompt = buildDatoPrompt(ideaFinal, tono, cantidad, fecha)
      break
    case 'comparacion':
      prompt = buildComparacionPrompt(ideaFinal, tono, cantidad, fecha)
      break
    case 'ia':
    default:
      prompt = buildIaEligePrompt(ideaFinal, tono, fecha)
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
