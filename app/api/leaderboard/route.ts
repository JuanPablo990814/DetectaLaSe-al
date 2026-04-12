import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Use Edge Runtime for Cloudflare compatibility
export const runtime = 'edge';

export async function GET() {
  if (!supabase) {
    return NextResponse.json({ error: "Supabase connection not configured" }, { status: 500 });
  }

  try {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('name, score, created_at')
      .order('score', { ascending: false })
      .limit(10);

    if (error) throw error;
    
    // Map created_at to date for compatibility with the frontend
    const formattedData = data.map(item => ({
      ...item,
      date: item.created_at
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error reading leaderboard:", error);
    return NextResponse.json({ error: "Could not read leaderboard" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!supabase) {
    return NextResponse.json({ error: "Supabase connection not configured" }, { status: 500 });
  }

  try {
    const { name, score } = await req.json();

    if (!name || score === undefined) {
      return NextResponse.json({ error: "Missing name or score" }, { status: 400 });
    }

    const { error } = await supabase
      .from('leaderboard')
      .insert([{ name, score }]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error writing leaderboard:", error);
    return NextResponse.json({ error: "Could not write leaderboard" }, { status: 500 });
  }
}
