import { FeedList } from "@/features/feed/components/feed-list"

export default function FeedPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-serif text-brand-text">Community Feed</h1>
        <p className="text-brand-text-muted">Read and gently resonate with others' reflections.</p>
      </header>

      <FeedList />
    </div>
  )
}
