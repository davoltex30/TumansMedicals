import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatWhatsAppMessage(productName: string, productSku?: string): string {
  const base = `Bonjour Tumans Medicals SARL, je suis intéressé(e) par le produit suivant:\n\n*${productName}*`
  const sku = productSku ? `\nSKU: ${productSku}` : ''
  return encodeURIComponent(`${base}${sku}\n\nMerci de m'envoyer plus d'informations.`)
}

export function getWhatsAppUrl(productName: string, productSku?: string): string {
  const phone = '237699000001' // Replace with actual WhatsApp number (Douala HQ)
  const message = formatWhatsAppMessage(productName, productSku)
  return `https://wa.me/${phone}?text=${message}`
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length).trimEnd() + '…'
}
