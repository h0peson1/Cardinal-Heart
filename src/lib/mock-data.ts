export type ReflectionCategory = "All" | "Anxiety" | "Gratitude" | "Growth" | "Mindfulness" | "Grief"

export interface Reflection {
  id: string
  content: string
  category: ReflectionCategory
  createdAt: string
  hasResonated: boolean
  hasSaved: boolean
  authorName?: string
}

export interface JournalEntry {
  id: string
  content: string
  mood: string
  isPublic: boolean
  createdAt: string
  category: ReflectionCategory
}

export interface MoodData {
  date: string
  value: number // 1-10
  label: string
}

export const mockReflections: Reflection[] = [
  {
    id: "1",
    category: "Mindfulness",
    content: "The way the light filters through the trees this morning reminded me that even on cold days, there is warmth to be found if we look for it.",
    createdAt: "2026-05-10T08:30:00Z",
    hasResonated: true,
    hasSaved: false,
  },
  {
    id: "2",
    category: "Gratitude",
    content: "Thankful for the sound of rain against the window. It makes the world feel smaller, quieter, and more manageable for a moment.",
    createdAt: "2026-05-10T10:15:00Z",
    hasResonated: false,
    hasSaved: true,
  },
  {
    id: "3",
    category: "Growth",
    content: "I finally set a boundary today that I've been afraid of for months. It didn't feel like a victory immediately—it felt like a heavy sigh. But now, there is room to breathe.",
    createdAt: "2026-05-09T14:20:00Z",
    hasResonated: true,
    hasSaved: false,
  },
  {
    id: "4",
    category: "Anxiety",
    content: "Feeling a bit overwhelmed by the week ahead. Trying to break it down into just 'this morning' and 'this afternoon' instead of the whole mountain.",
    createdAt: "2026-05-09T09:00:00Z",
    hasResonated: false,
    hasSaved: false,
  },
  {
    id: "5",
    category: "Grief",
    content: "Missing someone today. The silence they left behind is louder than any noise I can make to fill it.",
    createdAt: "2026-05-08T18:45:00Z",
    hasResonated: true,
    hasSaved: true,
  },
]

export const mockJournalEntries: JournalEntry[] = [
  {
    id: "j1",
    content: "I woke up feeling surprisingly rested today. The morning air was crisp and clear. I spent 10 minutes just breathing before starting my day.",
    mood: "Calm",
    isPublic: false,
    createdAt: "2026-05-11T07:30:00Z",
    category: "Mindfulness"
  },
  {
    id: "j2",
    content: "Work was a bit stressful, but I managed to stay centered. I'm proud of how I handled the meeting with the client.",
    mood: "Growing",
    isPublic: true,
    createdAt: "2026-05-10T17:00:00Z",
    category: "Growth"
  },
  {
    id: "j3",
    content: "Had a wonderful dinner with my family. It reminded me of what's truly important.",
    mood: "Grateful",
    isPublic: false,
    createdAt: "2026-05-09T20:30:00Z",
    category: "Gratitude"
  }
]

export const mockMoodHistory: MoodData[] = [
  { date: "Mon", value: 7, label: "Growing" },
  { date: "Tue", value: 6, label: "Reflective" },
  { date: "Wed", value: 8, label: "Calm" },
  { date: "Thu", value: 5, label: "Anxious" },
  { date: "Fri", value: 7, label: "Grateful" },
  { date: "Sat", value: 9, label: "Healing" },
  { date: "Sun", value: 8, label: "Calm" },
]

export type ResourceType = "Article" | "PDF" | "Book" | "Campus"

export interface Resource {
  id: string
  title: string
  type: ResourceType
  description: string
  duration?: string
  author?: string
  tags: string[]
}

export const mockResources: Resource[] = [
  {
    id: "r1",
    title: "The Art of Slow Living",
    type: "Article",
    description: "Finding peace in a world that never stops moving.",
    duration: "5 min read",
    author: "Dr. Elena Vance",
    tags: ["Mindfulness", "Balance"]
  },
  {
    id: "r2",
    title: "Guided Breathing Exercises",
    type: "PDF",
    description: "A printable guide for your daily mindfulness practice.",
    duration: "1.2 MB",
    tags: ["Anxiety", "Practice"]
  },
  {
    id: "r3",
    title: "Radical Acceptance",
    type: "Book",
    description: "Embracing your life with the heart of a Buddha.",
    author: "Tara Brach",
    tags: ["Healing", "Growth"]
  },
  {
    id: "r4",
    title: "Vaden Health Center",
    type: "Campus",
    description: "Student health and wellness services at Stanford.",
    duration: "Open 8am-5pm",
    tags: ["Support", "Campus"]
  },
  {
    id: "r5",
    title: "The Body Keeps the Score",
    type: "Book",
    description: "Brain, mind, and body in the healing of trauma.",
    author: "Bessel van der Kolk",
    tags: ["Grief", "Healing"]
  }
]

export const mockAdminStats = [
  { label: "Community Mood", value: "7.8", trend: "+12%", color: "text-brand-sage" },
  { label: "Daily Reflections", value: "142", trend: "+5%", color: "text-brand-accent" },
  { label: "Resonations", value: "892", trend: "+24%", color: "text-brand-accent" },
  { label: "Campus Reach", value: "1.2k", trend: "+8%", color: "text-brand-sage" },
]
