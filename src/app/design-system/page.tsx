import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { EmptyState } from "@/components/ui/empty-state"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Wind, Feather } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-8 md:p-16 flex flex-col gap-12 max-w-5xl mx-auto">
      <header className="space-y-4 animate-slide-up">
        <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-foreground">
          Cardinal Hearts
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl text-balance">
          A calm, emotionally safe, and reflective wellness platform. This page demonstrates the foundational UI primitives designed for warmth and clarity.
        </p>
      </header>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif font-medium">Buttons</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="default">Primary Action</Button>
          <Button variant="secondary">Secondary Mist</Button>
          <Button variant="calm">Calm Sage</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost Soft</Button>
          <Button variant="text">Plain Text</Button>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif font-medium">Badges & Inputs</h2>
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <Badge variant="default">Completed</Badge>
          <Badge variant="secondary">In Progress</Badge>
          <Badge variant="outline">Draft</Badge>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Reflection Title</label>
            <Input placeholder="How are you feeling today?" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Journal Entry</label>
            <Textarea placeholder="Take a deep breath and begin typing..." />
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-medium">Journal Card</h2>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Morning Intention</CardTitle>
                  <CardDescription>Tuesday, Oct 12</CardDescription>
                </div>
                <Badge variant="secondary">Daily</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80 leading-relaxed">
                Today, I choose to focus on what I can control. I will approach challenges with curiosity rather than fear, and offer myself the same grace I give others.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                <Heart className="mr-2 h-4 w-4" />
                Reflect Again
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-medium">Loading State</h2>
          <Card>
            <CardHeader className="gap-2">
              <Skeleton className="h-5 w-1/2 rounded-full" />
              <Skeleton className="h-4 w-1/3 rounded-full" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-full rounded-full" />
              <Skeleton className="h-4 w-[90%] rounded-full" />
              <Skeleton className="h-4 w-[75%] rounded-full" />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif font-medium">Empty State</h2>
        <EmptyState 
          icon={<Wind className="h-6 w-6" />}
          title="No entries yet"
          description="Your journal is a quiet space waiting for your thoughts. Begin whenever you feel ready."
          action={<Button variant="calm">Start writing</Button>}
        />
      </section>

      <section className="space-y-6 pb-20">
        <h2 className="text-2xl font-serif font-medium">Tabs Navigation</h2>
        <Tabs defaultValue="reflections" className="w-full">
          <TabsList className="bg-brand-surface border border-brand-border/50 rounded-full p-1">
            <TabsTrigger value="reflections" className="rounded-full px-6">Reflections</TabsTrigger>
            <TabsTrigger value="exercises" className="rounded-full px-6">Exercises</TabsTrigger>
            <TabsTrigger value="insights" className="rounded-full px-6">Insights</TabsTrigger>
          </TabsList>
          <TabsContent value="reflections" className="mt-6">
            <div className="p-6 rounded-2xl bg-white border border-brand-border/50 shadow-soft">
              <p className="text-muted-foreground">Your past reflections will appear here.</p>
            </div>
          </TabsContent>
          <TabsContent value="exercises" className="mt-6">
            <div className="p-6 rounded-2xl bg-white border border-brand-border/50 shadow-soft">
              <p className="text-muted-foreground">Breathing and grounding exercises will appear here.</p>
            </div>
          </TabsContent>
          <TabsContent value="insights" className="mt-6">
            <div className="p-6 rounded-2xl bg-white border border-brand-border/50 shadow-soft">
              <p className="text-muted-foreground">Patterns and insights over time will appear here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  )
}
