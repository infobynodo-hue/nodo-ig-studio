'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { CarouselData } from '@/types/carousel'
import CarouselPreview from '@/components/CarouselPreview'

export default function CarruselDetalle() {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<CarouselData | null>(null)
  const [meta, setMeta] = useState<{ idea?: string; tono?: string }>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/carousels/${id}`)
      .then(r => r.json())
      .then(row => {
        if (row.error) { setError(row.error); return }
        setData({ tema: row.tema, slides: row.slides })
        setMeta({ idea: row.idea, tono: row.tono })
      })
      .catch(() => setError('No se pudo cargar el carrusel'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="p-8 flex items-center justify-center min-h-[60vh]">
      <Loader2 size={28} className="animate-spin text-lima" />
    </div>
  )

  if (error || !data) return (
    <div className="p-8">
      <p className="text-sm text-red-500">{error || 'No encontrado'}</p>
      <Link href="/carruseles" className="text-sm text-muted hover:text-text mt-2 inline-block">← Volver</Link>
    </div>
  )

  return (
    <div className="p-8">
      <Link href="/carruseles" className="flex items-center gap-2 text-sm text-muted hover:text-text transition-colors mb-6">
        <ArrowLeft size={15} /> Carruseles
      </Link>
      <CarouselPreview data={data} idea={meta.idea} tono={meta.tono} carouselId={id} />
    </div>
  )
}
