import { Button } from '@/components/ui/button'

export default function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-bg-page gap-4">
      <h1 className="font-heading text-text-heading text-4xl">Forever Clean</h1>
      <p className="text-text-body">Servicii de curățenie în Chișinău</p>
      <Button>Book Now</Button>
    </main>
  )
}
