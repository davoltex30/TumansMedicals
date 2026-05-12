'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, ChevronRight, CheckCircle2, Package } from 'lucide-react'
import { staggerContainer, slideUp } from '@/lib/animations'
import { getWhatsAppUrl } from '@/lib/utils'
import { Section, SectionHeader } from '@/components/layout/section'
import { ProductCard } from './product-card'
import type { Product } from '@/lib/schemas/product'

interface Props {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetailContent({ product, relatedProducts }: Props) {
  const whatsappUrl = getWhatsAppUrl(product.name, product.sku)

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-24 pb-4 border-b border-[#e0e3e5] bg-[#f7f9fb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-[#757684]">
            <Link href="/products" className="hover:text-[#191c1e] transition-colors">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <Link
              href={`/products?category=${product.categoryId}`}
              className="hover:text-[#191c1e] transition-colors"
            >
              {product.categoryName}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-[#191c1e] font-medium truncate max-w-xs">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <Section className="bg-[#f7f9fb]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12"
        >
          {/* Image */}
          <motion.div variants={slideUp}>
            <div className="relative bg-white rounded-xl overflow-hidden aspect-square p-12 flex items-center justify-center hover:shadow-2xl transition-all duration-500 group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className="bg-[#c51611] text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div variants={slideUp} className="flex flex-col">
            <div className="mb-1">
              <Link
                href={`/products?category=${product.categoryId}`}
                className="text-xs font-bold uppercase tracking-widest text-[#c51611] hover:underline"
              >
                {product.categoryName}
              </Link>
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-[#191c1e] tracking-tight mb-3">
              {product.name}
            </h1>
            <p className="text-[#757684] text-sm mb-1">
              SKU: <span className="font-mono text-sm text-[#757684]">{product.sku}</span>
            </p>

            <div className="flex items-center gap-3 my-5">
              {product.inStock ? (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#006d2f] bg-[#5dfd8a]/20 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4" /> In Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#757684] bg-[#f2f4f6] px-3 py-1 rounded-full">
                  <Package className="w-4 h-4" /> Out of Stock
                </span>
              )}
            </div>

            <p className="text-[#444653] leading-relaxed mb-6">{product.description}</p>

            {/* Features */}
            {product.features.length > 0 && (
              <ul className="space-y-2 mb-6">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#191c1e]">
                    <CheckCircle2 className="w-4 h-4 text-[#006d2f] flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4 border-t border-[#e0e3e5]">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-xl font-bold h-14 flex-1 flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-5 h-5" /> Enquire on WhatsApp
              </a>
              <Link
                href="/contact"
                className="border-2 border-[#c51611] text-[#c51611] hover:bg-[#c51611] hover:text-white rounded-xl font-bold h-14 flex-1 flex items-center justify-center transition-all"
              >
                Request Quote
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Specifications */}
        {Object.keys(product.specifications).length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#191c1e] tracking-tight mb-6">Specifications</h2>
            <div className="rounded-xl overflow-hidden border border-[#e0e3e5]">
              {Object.entries(product.specifications).map(([key, value], i) => (
                <div
                  key={key}
                  className={`flex divide-x divide-[#e0e3e5] ${i % 2 === 0 ? 'bg-[#f2f4f6]' : 'bg-white'}`}
                >
                  <div className="w-1/3 px-6 py-4 text-sm font-semibold text-[#191c1e]">{key}</div>
                  <div className="flex-1 px-6 py-4 text-sm text-[#444653]">{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Section className="bg-white">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c51611]">Related Products</span>
            <h2 className="text-2xl font-bold text-[#191c1e] tracking-tight mt-2">You May Also Need</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Section>
      )}
    </>
  )
}
