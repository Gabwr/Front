import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const res = await fetch(`https://reactws.onrender.com/videogameStore/videogames`);
  const data = await res.json();

  return NextResponse.json(data);
}