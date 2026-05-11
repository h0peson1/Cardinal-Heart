import { useMemo } from "react"

interface Resource {
  title: string
  description: string
  type: "audio" | "pdf" | "tool"
  url: string
}

export function useRecommendations(mood: string, category: string) {
  const recommendations = useMemo(() => {
    const list: Resource[] = []

    // Rule: Anxious or Stressed -> Grounding & Breathing
    if (mood === "Anxious" || mood === "Stressed") {
      list.push({
        title: "5-4-3-2-1 Grounding",
        description: "Re-center yourself by identifying sensory details in your environment.",
        type: "tool",
        url: "/sanctuary?tool=grounding"
      })
      list.push({
        title: "Box Breathing Guide",
        description: "A simple breathing technique to calm the nervous system.",
        type: "pdf",
        url: "#"
      })
    }

    // Rule: Loneliness -> Community Reflection
    if (category === "Loneliness") {
      list.push({
        title: "Community Heartbeat",
        description: "Read reflections from others who have felt similarly. You are not alone.",
        type: "tool",
        url: "/feed?filter=Loneliness"
      })
    }

    // Rule: Academic Stress -> Focus Ambience
    if (category === "Academic" && (mood === "Stressed" || mood === "Tired")) {
      list.push({
        title: "Green Library Ambience",
        description: "A focus-enhancing soundscape from Stanford's most quiet corners.",
        type: "audio",
        url: "#"
      })
    }

    // Default: General Grounding
    if (list.length === 0) {
      list.push({
        title: "Daily Sanctuary Practice",
        description: "Start your day with a simple 5-minute breathing exercise.",
        type: "tool",
        url: "/sanctuary"
      })
    }

    return list
  }, [mood, category])

  return recommendations
}
