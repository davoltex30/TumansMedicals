'use client'

import { motion } from 'motion/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react'
import { staggerContainer, slideUp } from '@/lib/animations'
import { ContactFormSchema, type ContactFormData } from '@/lib/schemas/product'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const branches = [
  {
    city: 'Yaounde',
    label: 'Head Office',
    address: 'Yaounde, Cameroon',
    phone: '+237 699 000 001',
    phonePlain: '237699000001',
    whatsapp: '237699000001',
  },
  {
    city: 'Douala',
    label: 'Douala Branch',
    address: 'Douala, Cameroon',
    phone: '+237 699 000 002',
    phonePlain: '237699000002',
    whatsapp: '237699000002',
  },
  {
    city: 'Maroua',
    label: 'Maroua Branch',
    address: 'Maroua, Cameroon',
    phone: '+237 699 000 003',
    phonePlain: '237699000003',
    whatsapp: '237699000003',
  },
  {
    city: 'Tchad',
    label: 'Tchad Branch',
    address: 'N\'Djamena, Tchad',
    phone: '+235 660 000 004',
    phonePlain: '235660000004',
    whatsapp: '235660000004',
  },
]

export function ContactPageContent() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API
      toast.success("Message sent! We'll get back to you within 24 hours.")
      reset()
    } catch {
      toast.error('Something went wrong. Please try again or contact us via WhatsApp.')
    }
  }

  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-[#f7f9fb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.span variants={slideUp} className="text-xs font-bold uppercase tracking-[0.2em] text-[#00288e]">
              Contact Us
            </motion.span>
            <motion.h1 variants={slideUp} className="text-5xl md:text-6xl font-black tracking-tighter text-[#191c1e] mt-3 mb-4">
              Get in Touch
            </motion.h1>
            <motion.div variants={slideUp} className="h-1.5 w-24 bg-[#00288e] rounded-full mt-4 mb-6" />
            <motion.p variants={slideUp} className="text-lg text-[#444653] leading-relaxed">
              Get in touch for product inquiries and supply solutions. Reach any of our branches in Yaounde, Douala, Maroua, or Tchad.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Section>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-12 gap-12"
        >
          {/* Left col — Email + Branch cards */}
          <motion.div variants={slideUp} className="lg:col-span-5 space-y-5">

            {/* Email card */}
            <div className="bg-white p-6 rounded-xl border border-[#c4c5d5]/20 flex items-start gap-5 hover:shadow-lg hover:shadow-[#00288e]/5 transition-all duration-300">
              <div className="w-12 h-12 bg-[#dde1ff] rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-[#00288e]" />
              </div>
              <div>
                <p className="font-bold text-lg text-[#191c1e] mb-1">Email</p>
                <a href="mailto:info@tumansmedicals.cm" className="text-[#757684] hover:text-[#00288e] transition-colors text-sm">
                  info@tumansmedicals.cm
                </a>
              </div>
            </div>

            {/* Branch cards */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#00288e] mb-3">Our Branches</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {branches.map((branch) => (
                  <div
                    key={branch.city}
                    className="bg-white p-5 rounded-xl border border-[#c4c5d5]/20 hover:shadow-lg hover:shadow-[#00288e]/5 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-[#dde1ff] rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-[#00288e]" />
                      </div>
                      <div>
                        <p className="font-bold text-[#191c1e] text-sm leading-tight">{branch.city}</p>
                        <p className="text-xs text-[#757684]">{branch.label}</p>
                      </div>
                    </div>
                    <p className="text-xs text-[#757684] mb-3">{branch.address}</p>
                    <a
                      href={`tel:+${branch.phonePlain}`}
                      className="flex items-center gap-2 text-xs text-[#191c1e] font-medium hover:text-[#00288e] transition-colors mb-3"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#757684]" />
                      {branch.phone}
                    </a>
                    <a
                      href={`https://wa.me/${branch.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-lg text-xs font-bold py-2 px-3 w-full transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right col — Form */}
          <motion.div variants={slideUp} className="lg:col-span-7">
            <div className="bg-white rounded-xl border border-[#c4c5d5]/20 p-8 lg:p-10">
              <h2 className="text-2xl font-extrabold tracking-tight text-[#191c1e] mb-2">Send Us a Message</h2>
              <p className="text-[#757684] text-sm mb-8">Fill in the form below and we'll get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-sm font-semibold text-[#191c1e]">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      className="bg-[#f2f4f6] border-none rounded-lg h-12 text-sm focus:ring-2 focus:ring-[#00288e]/30 focus:bg-white transition-all"
                      {...register('name')}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm font-semibold text-[#191c1e]">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="bg-[#f2f4f6] border-none rounded-lg h-12 text-sm focus:ring-2 focus:ring-[#00288e]/30 focus:bg-white transition-all"
                      {...register('email')}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-sm font-semibold text-[#191c1e]">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+237 6XX XXX XXX"
                      className="bg-[#f2f4f6] border-none rounded-lg h-12 text-sm focus:ring-2 focus:ring-[#00288e]/30 focus:bg-white transition-all"
                      {...register('phone')}
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="company" className="text-sm font-semibold text-[#191c1e]">
                      Company / Facility <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="company"
                      placeholder="Hospital or clinic name"
                      className="bg-[#f2f4f6] border-none rounded-lg h-12 text-sm focus:ring-2 focus:ring-[#00288e]/30 focus:bg-white transition-all"
                      {...register('company')}
                      aria-invalid={!!errors.company}
                    />
                    {errors.company && <p className="text-xs text-red-500">{errors.company.message}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="subject" className="text-sm font-semibold text-[#191c1e]">
                    Subject <span className="text-red-500">*</span>
                  </Label>
                  <Select onValueChange={(v) => setValue('subject', v, { shouldValidate: true })}>
                    <SelectTrigger
                      id="subject"
                      className="bg-[#f2f4f6] border-none rounded-lg h-12 text-sm focus:ring-2 focus:ring-[#00288e]/30 focus:bg-white transition-all"
                      aria-invalid={!!errors.subject}
                    >
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product-inquiry">Product Inquiry</SelectItem>
                      <SelectItem value="request-quote">Request a Quote</SelectItem>
                      <SelectItem value="bulk-order">Bulk Order</SelectItem>
                      <SelectItem value="after-sales">After-Sales Support</SelectItem>
                      <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-sm font-semibold text-[#191c1e]">
                    Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your needs, list the products you're interested in, or ask any questions..."
                    rows={5}
                    className="bg-[#f2f4f6] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#00288e]/30 focus:bg-white transition-all"
                    {...register('message')}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#00288e] hover:bg-[#1e40af] text-white w-full rounded-xl font-bold h-14 text-base transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </Section>
    </>
  )
}
