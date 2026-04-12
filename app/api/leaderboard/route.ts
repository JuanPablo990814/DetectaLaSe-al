import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'leaderboard.json');

export async function GET() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return NextResponse.json([]);
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    const scores = JSON.parse(data);
    return NextResponse.json(scores);
  } catch (error) {
    console.error("Error reading leaderboard:", error);
    return NextResponse.json({ error: "Could not read leaderboard" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const newEntry = await req.json();
    
    // Read existing
    let scores = [];
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, 'utf-8');
      scores = JSON.parse(data);
    }

    // Add new
    scores.push(newEntry);
    
    // Sort logic happens strictly on reads/displays to save time, but we can also store only top N
    // But since it's local json we can store everything, or we can sort and keep top 100 just to avoid huge files
    scores.sort((a: any, b: any) => b.score - a.score);
    scores = scores.slice(0, 100);

    fs.writeFileSync(DB_PATH, JSON.stringify(scores, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error writing leaderboard:", error);
    return NextResponse.json({ error: "Could not write leaderboard" }, { status: 500 });
  }
}
