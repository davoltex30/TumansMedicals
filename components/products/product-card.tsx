'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getWhatsAppUrl } from '@/lib/utils'
import { slideUp } from '@/lib/animations'
import type { Product } from '@/lib/schemas/product'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const whatsappUrl = getWhatsAppUrl(product.name, product.sku)

  return (
    <motion.div
      variants={slideUp}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={cn(
        'group bg-white rounded-xl border border-[#e0e3e5] overflow-hidden flex flex-col hover:shadow-lg transition-all duration-200',
        className
      )}
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f2f4f6]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={(e) => {
            const img = e.currentTarget
            img.src = '/No_Image_Available.jpg'
          }}
        />
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className="text-xs text-[#00288e] font-bold uppercase tracking-widest bg-white px-2.5 py-1 rounded-md shadow-sm">
              {product.badge}
            </span>
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-sm font-medium text-[#757684] bg-white px-3 py-1 rounded-full border border-[#e0e3e5]">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="mb-1.5">
          <span className="text-xs text-[#00288e] font-bold uppercase tracking-widest">
            {product.categoryName}
          </span>
        </div>
        <h3 className="font-bold text-[#191c1e] text-base leading-tight mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-[#444653] leading-relaxed mb-4 line-clamp-2 flex-1">
          {product.shortDescription}
        </p>

        {/* SKU */}
        <div className="flex items-center justify-end mb-4">
          <span className="text-xs text-[#757684] font-mono">SKU: {product.sku}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-1 border border-[#c4c5d5] text-[#191c1e] rounded-lg text-xs font-bold px-2.5 py-1.5 whitespace-nowrap hover:border-[#00288e] hover:text-[#00288e] transition-all"
          >
            <span>View Details</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-lg text-xs font-bold px-2.5 py-1.5 whitespace-nowrap transition-all"
          >
            <MessageCircle className="w-3 h-3" />
            <span>Enquire</span>
          </a>
        </div>
      </div>
    </motion.div>
  )
}
