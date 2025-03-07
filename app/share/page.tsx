import { redirect } from 'next/navigation'

export default function SharePage({
  searchParams,
}: {
  searchParams: { title?: string; text?: string; url?: string }
}) {
  if (!searchParams.url) {
    redirect('/')
  }

  // Redirect to article if URL matches our article pattern
  if (searchParams.url.includes('/article/')) {
    redirect(searchParams.url)
  }

  // Otherwise redirect to home with the shared content
  const params = new URLSearchParams({
    sharedTitle: searchParams.title || '',
    sharedText: searchParams.text || '',
    sharedUrl: searchParams.url || ''
  })
  redirect(`/?${params.toString()}`)
}
