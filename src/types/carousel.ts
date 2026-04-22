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

export type Slide = SlidePortada | SlideMito | SlideRealidad | SlideCTA

export type CarouselData = {
  tema: string
  slides: Slide[]
}
