"use client"

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/components/auth/auth-provider'
import { format } from 'date-fns'
import { mockMoodHistory } from '@/lib/mock-data'

export function MoodTrends() {
  const { user } = useAuth()
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMoods = async () => {
      if (!user) return
      
      const { data: logs, error } = await supabase
        .from("mood_logs")
        .select("created_at, intensity")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true })
        .limit(7)

      if (logs && logs.length > 0) {
        setData(logs.map(log => ({
          date: format(new Date(log.created_at), 'MMM dd'),
          value: log.intensity
        })))
      } else {
        setData(mockMoodHistory)
      }
      setIsLoading(false)
    }

    fetchMoods()
  }, [user])

  return (
    <div className="w-full h-64 p-6 rounded-3xl bg-brand-surface border border-brand-border/50 shadow-soft">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-medium text-brand-text uppercase tracking-wider">Weekly Energy</h3>
        <span className="text-xs text-brand-text-muted italic">{isLoading ? "Loading..." : "Live Data"}</span>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#A3B5A6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#A3B5A6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDE8E0" />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#7A7875', fontSize: 10 }}
            dy={10}
          />
          <YAxis hide domain={[0, 10]} />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '16px', 
              border: 'none', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              backgroundColor: '#FDFCF8',
              fontSize: '12px',
              fontFamily: 'var(--font-serif)'
            }}
            labelStyle={{ display: 'none' }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#A3B5A6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorValue)" 
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
