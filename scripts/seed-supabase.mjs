/**
 * Seed Supabase with all existing products and categories from static data files.
 * Run: node scripts/seed-supabase.mjs
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Load env
const __dir = dirname(fileURLToPath(import.meta.url))
const envPath = join(__dir, '../.env.local')
const env = Object.fromEntries(
  readFileSync(envPath, 'utf-8')
    .split('\n')
    .filter((l) => l.includes('='))
    .map((l) => l.split('=').map((s) => s.trim()))
)

const supabase = createClient(env['NEXT_PUBLIC_SUPABASE_URL'], env['NEXT_PUBLIC_SUPABASE_ANON_KEY'])

// We need the service role key to bypass RLS for seeding.
// For now, we'll use the anon key and disable RLS temporarily, OR just use execute_sql via MCP.
// This script will print the data for manual verification.

// Import data by reading raw TS files (we strip type annotations for JSON)
// Instead, we inline the data here as plain JS objects.

// ─── CATEGORIES ───────────────────────────────────────────────────────────────

const categories = [
  { id: 'surgical-consumables', name: 'Surgical Consumables', slug: 'surgical-consumables', description: 'Disposable surgical supplies for operating theatres and procedure rooms', image: '/No_Image_Available.jpg' },
  { id: 'immunology-serology', name: 'Immunology & Serology', slug: 'immunology-serology', description: 'Serological reagents and immunological test kits for infectious disease diagnosis', image: '/No_Image_Available.jpg' },
  { id: 'hematology', name: 'Hematology', slug: 'hematology', description: 'Blood analysis instruments, reagents and consumables for hematological testing', image: '/No_Image_Available.jpg' },
  { id: 'clinical-chemistry', name: 'Clinical Chemistry', slug: 'clinical-chemistry', description: 'Biochemistry analyzers and reagent kits for metabolic and organ function testing', image: '/No_Image_Available.jpg' },
  { id: 'laboratory-glassware', name: 'Laboratory Glassware', slug: 'laboratory-glassware', description: 'Precision borosilicate glassware for laboratory measurements and experiments', image: '/No_Image_Available.jpg' },
  { id: 'sterilization-infection-control', name: 'Sterilization & Infection Control', slug: 'sterilization-infection-control', description: 'Autoclaves, dry heat ovens and infection control products for healthcare settings', image: '/No_Image_Available.jpg' },
  { id: 'medical-consumables', name: 'Medical Consumables', slug: 'medical-consumables', description: 'Essential disposable and reusable supplies for clinical and ward use', image: '/No_Image_Available.jpg' },
  { id: 'emergency-first-aid', name: 'Emergency & First Aid', slug: 'emergency-first-aid', description: 'Emergency response equipment, first-aid kits and resuscitation supplies', image: '/No_Image_Available.jpg' },
  { id: 'laboratory-reagents-chemicals', name: 'Laboratory Reagents & Chemicals', slug: 'laboratory-reagents-chemicals', description: 'High-purity chemicals, stains, and reagents for diagnostic and research laboratories', image: '/No_Image_Available.jpg' },
  { id: 'laboratory-consumables', name: 'Laboratory Consumables', slug: 'laboratory-consumables', description: 'Disposable and reusable consumables for everyday laboratory operations', image: '/No_Image_Available.jpg' },
  { id: 'gynecology-obstetrics', name: 'Gynecology & Obstetrics', slug: 'gynecology-obstetrics', description: 'Specialized instruments and equipment for gynecological and obstetric procedures', image: '/No_Image_Available.jpg' },
  { id: 'anesthesia-airway-management', name: 'Anesthesia & Airway Management', slug: 'anesthesia-airway-management', description: 'Airway management devices and anesthesia accessories for perioperative care', image: '/No_Image_Available.jpg' },
  { id: 'rapid-diagnostic-tests', name: 'Rapid Diagnostic Tests', slug: 'rapid-diagnostic-tests', description: 'Point-of-care rapid test kits for infectious diseases, metabolic and other conditions', image: '/No_Image_Available.jpg' },
  { id: 'laboratory-equipment', name: 'Laboratory Equipment', slug: 'laboratory-equipment', description: 'Analytical instruments and equipment for clinical and research laboratories', image: '/No_Image_Available.jpg' },
  { id: 'medical-equipment', name: 'Medical Equipment', slug: 'medical-equipment', description: 'Diagnostic and therapeutic equipment for clinical examination and patient monitoring', image: '/No_Image_Available.jpg' },
  { id: 'medical-furniture', name: 'Medical Furniture', slug: 'medical-furniture', description: 'Hospital-grade furniture and fixtures for wards, theatres and examination rooms', image: '/No_Image_Available.jpg' },
  { id: 'hospital-accessories', name: 'Hospital Accessories', slug: 'hospital-accessories', description: 'General hospital accessories, storage solutions and ward utility items', image: '/No_Image_Available.jpg' },
  { id: 'laboratory-plasticware', name: 'Laboratory Plasticware', slug: 'laboratory-plasticware', description: 'Disposable and reusable plastic labware for specimen collection and laboratory use', image: '/No_Image_Available.jpg' },
  { id: 'orthopedics-immobilization', name: 'Orthopedics & Immobilization', slug: 'orthopedics-immobilization', description: 'Orthopedic splints, bandages and immobilization devices for fracture and injury management', image: '/No_Image_Available.jpg' },
  { id: 'surgical-instruments', name: 'Surgical Instruments', slug: 'surgical-instruments', description: 'Precision stainless steel surgical instruments for operative and clinical procedures', image: '/No_Image_Available.jpg' },
]

async function seed() {
  console.log('Seeding categories...')
  for (const cat of categories) {
    const { error } = await supabase.from('categories_additions').upsert({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      icon: 'Package',
      product_count: 0,
      image: cat.image,
    })
    if (error) console.error(`  Category ${cat.id}:`, error.message)
    else console.log(`  ✓ ${cat.name}`)
  }

  console.log('\nDone! Categories seeded.')
  console.log('\nNote: Products are in data/products.ts — to seed them, use the admin panel or run a server-side migration.')
}

seed().catch(console.error)
