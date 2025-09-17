"use client"

import { createClient } from "@supabase/supabase-js"
import SupabaseCardStack from "./supabase-card-stack"

// Example of how to use in your local project:
export default function NewsCardExample() {
  // Initialize your Supabase client
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  return (
    <div className="min-h-screen bg-black p-4">
      <h1 className="text-3xl font-bold text-white text-center mb-8">Teknoloji Haberleri</h1>

      {/* Single mixed category stack */}
      <div className="max-w-md mx-auto mb-8">
        <SupabaseCardStack
          supabaseClient={supabase}
          tableName="news" // Your Supabase table name
          realTimeUpdates={true}
          limit={30}
        />
      </div>

      {/* Or multiple category-specific stacks */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <SupabaseCardStack supabaseClient={supabase} tableName="news" category="AI & ML" limit={15} />
        <SupabaseCardStack supabaseClient={supabase} tableName="news" category="Gaming" limit={15} />
        <SupabaseCardStack supabaseClient={supabase} tableName="news" category="Mobile" limit={15} />
      </div>
    </div>
  )
}

/*
SUPABASE TABLE STRUCTURE:
Create a table called 'news' with these columns:

CREATE TABLE news (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  summary TEXT,
  image_url TEXT,
  author TEXT NOT NULL,
  published_at TEXT NOT NULL,
  read_time TEXT DEFAULT '5 dk',
  views TEXT DEFAULT '0',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON news
  FOR SELECT USING (true);

-- Create policy for authenticated insert (optional)
CREATE POLICY "Allow authenticated insert" ON news
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
*/
