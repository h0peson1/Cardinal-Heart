"use client"

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: 'Mon', reflections: 45, resonations: 120 },
  { name: 'Tue', reflections: 52, resonations: 145 },
  { name: 'Wed', reflections: 38, resonations: 98 },
  { name: 'Thu', reflections: 65, resonations: 210 },
  { name: 'Fri', reflections: 48, resonations: 160 },
  { name: 'Sat', reflections: 72, resonations: 250 },
  { name: 'Sun', reflections: 58, resonations: 190 },
]

export function CommunityAnalytics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-none bg-brand-surface shadow-soft rounded-3xl">
        <CardHeader className="p-6">
          <CardTitle className="text-sm font-medium text-brand-text uppercase tracking-wider">Engagement Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDE8E0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#7A7875', fontSize: 10 }} />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backgroundColor: '#FDFCF8' }}
              />
              <Bar dataKey="reflections" fill="#8C1515" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="resonations" fill="#A3B5A6" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-none bg-brand-surface shadow-soft rounded-3xl">
        <CardHeader className="p-6">
          <CardTitle className="text-sm font-medium text-brand-text uppercase tracking-wider">Mood Stability</CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDE8E0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#7A7875', fontSize: 10 }} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backgroundColor: '#FDFCF8' }}
              />
              <Line type="monotone" dataKey="reflections" stroke="#8C1515" strokeWidth={3} dot={{ fill: '#8C1515', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
