export type SlidePortada = {
  tipo: 'portada'
  eyebrow: string
  big_num: string
  titulo_pre: string
  titulo_tachado: string
  titulo_post: string
  titulo_lima: string
}

export type SlideMito = {
  tipo: 'mito'
  numero: number
  total: number
  tachado: string
  continuacion: string
  contexto: string
  contexto_negrita: string
}

export type SlideRealidad = {
  tipo: 'realidad'
  numero: number
  total: number
  titulo: string
  destacado: string
  titulo_post: string
  contexto: string
  contexto_negrita: string
}

export type SlideCTA = {
  tipo: 'cta'
  eyebrow: string
  label: string
  palabra: string
  subtext: string
}

// Arquetipo: Lista / Pasos
export type SlideItem = {
  tipo: 'item'
  numero: number
  total: number
  titulo: string
  descripcion: string
  descripcion_negrita: string
}

// Arquetipo: Dato Impacto
export type SlideDato = {
  tipo: 'dato'
  numero: number
  total: number
  stat: string
  stat_label: string
  contexto: string
  contexto_negrita: string
}

// Arquetipo: Antes / Después
export type SlideComparacion = {
  tipo: 'comparacion'
  numero: number
  total: number
  label_a: string
  texto_a: string
  label_b: string
  texto_b: string
  diferencia: string
}

export type Slide =
  | SlidePortada
  | SlideMito
  | SlideRealidad
  | SlideCTA
  | SlideItem
  | SlideDato
  | SlideComparacion

export type CarouselData = {
  tema: string
  slides: Slide[]
  arquetipo?: string
}
