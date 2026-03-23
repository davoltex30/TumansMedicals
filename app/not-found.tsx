import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-muted mb-4">404</div>
        <h1 className="text-2xl font-bold text-foreground mb-3">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild>
            <Link href="/"><Home className="w-4 h-4 mr-2" /> Go Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/products"><Search className="w-4 h-4 mr-2" /> Browse Products</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
