import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, ExternalLink, User, ChevronRight, ArrowLeft } from 'lucide-react'

// Links da Kiwify
const KIWI_MEMBER_AREA_URL = "https://members.kiwify.com/?club=8e69a7cf-e5ff-4894-840a-f0afbfad394c";
const KIWI_LOGIN_URL = "https://novenario.online";

// Produto principal
const PRODUCTS = [
  {
    id: "novenario",
    title: "Novenário Completo + Coletânea Espiritual",
    price: 19.9,
    image: "https://images.unsplash.com/photo-1531219432768-9f540ce91ef1?q=80&w=1200&auto=format&fit=crop",
    checkoutUrl: "https://pay.kiwify.com.br/4Fjji3c",
    shortDescription:
      "Uma coletânea completa com mais de 80 Novenas organizadas passo a passo, bônus exclusivos e acesso vitalício para fortalecer sua espiritualidade.",
  },
];

const cardClass = "rounded-2xl shadow-lg p-4 bg-white/80 backdrop-blur border border-gray-100 hover:shadow-xl transition-all";

function Header({ onNavigate }) {
  return (
    <div className="sticky top-0 z-10 bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <button onClick={() => onNavigate('catalog')} className="text-lg font-semibold tracking-tight">
          <span className="font-bold">Estudo com Fé</span>
        </button>
        <nav className="flex items-center gap-3">
          <a href={KIWI_LOGIN_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm">
            <User size={18} /> Entrar
          </a>
          <a href={KIWI_MEMBER_AREA_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-3 py-1.5 rounded-xl text-sm font-medium hover:bg-white/90">
            Minha área
          </a>
        </nav>
      </div>
    </div>
  )
}

function ProductCard({ product, onOpen }) {
  return (
    <motion.div className={cardClass} whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 250, damping: 20 }}>
      <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
      </div>
      <div className="mt-3">
        <h3 className="text-lg font-semibold line-clamp-1">{product.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{product.shortDescription}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xl font-bold">R$ {product.price.toFixed(2)}</span>
        <button onClick={() => onOpen(product)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">
          Ver detalhes <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  )
}

function Catalog({ onOpenProduct }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold">Produtos</h1>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} onOpen={onOpenProduct} />
        ))}
      </div>
    </div>
  )
}

function ProductPage({ product, onBack }) {
  const priceLabel = useMemo(() => `R$ ${product.price.toFixed(2)}`, [product.price])
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-indigo-600 hover:underline">
        <ArrowLeft size={18} /> voltar
      </button>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl overflow-hidden bg-gray-100">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <p className="text-gray-600 mt-2">
            Mais de 80 novenas organizadas, bônus exclusivos (versículos explicados, Quaresma de São Miguel, espiritualidade das novenas, história das novenas) e acesso vitalício em qualquer dispositivo.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-bold">{priceLabel}</span>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a href={product.checkoutUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">
              <ShoppingCart size={18} /> Liberar Acesso
            </a>
            <a href={KIWI_MEMBER_AREA_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-300 hover:bg-gray-50">
              <ExternalLink size={18} /> Acessar conteúdo
            </a>
          </div>
          <div className="mt-6 text-xs text-gray-500">
            * Pagamento e acesso são processados pela Kiwify. Compra 100% segura, com garantia de 7 dias.
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [route, setRoute] = useState({ name: 'catalog' })
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header onNavigate={(to) => setRoute({ name: to })} />
      {route.name === 'catalog' && <Catalog onOpenProduct={(p) => setRoute({ name: 'product', data: p })} />}
      {route.name === 'product' && route.data && <ProductPage product={route.data} onBack={() => setRoute({ name: 'catalog' })} />}
      <footer className="py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} — Estudo com Fé. Conteúdo digital via Kiwify.
      </footer>
    </div>
  )
}
