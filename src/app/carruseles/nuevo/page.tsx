import { Sparkles } from 'lucide-react'

const tonos = ['Directo', 'Educativo', 'Polémico']
const arquetipos = ['Auto (IA decide)', 'Mito vs Realidad', 'Lista educativa', 'Testimonial']

export default function NuevoCarrusel() {
  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo mb-1">
          Nuevo carrusel
        </p>
        <h1 className="text-2xl font-brand font-bold text-text">
          ¿De qué va el post?
        </h1>
        <p className="text-sm text-muted mt-1">
          Dale una idea al agente. Él elige el arquetipo y genera el copy completo.
        </p>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-6 space-y-6">
        {/* Idea */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-indigo mb-2">
            Tu idea
          </label>
          <textarea
            rows={4}
            placeholder="Ej: quiero hablar sobre por qué los dueños de negocio creen que la IA es cara y no es para ellos..."
            className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm text-text placeholder-muted
              outline-none focus:border-[#C8F135] focus:ring-2 focus:ring-[#C8F135]/15 resize-none transition-all"
          />
        </div>

        {/* Arquetipo */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-indigo mb-2">
            Arquetipo
          </label>
          <div className="grid grid-cols-2 gap-2">
            {arquetipos.map((a) => (
              <button
                key={a}
                className="px-4 py-2.5 rounded-xl border border-border text-sm text-text hover:border-[#C8F135] hover:bg-lima/5 transition-all text-left"
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Tono */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-indigo mb-2">
            Tono
          </label>
          <div className="flex gap-2">
            {tonos.map((t) => (
              <button
                key={t}
                className="px-4 py-2 rounded-lg border border-border text-sm text-text hover:border-[#C8F135] hover:bg-lima/5 transition-all"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-sidebar bg-lima hover:bg-[#D4F53C] transition-colors">
          <Sparkles size={16} />
          Generar con IA
        </button>
      </div>
    </div>
  )
}
