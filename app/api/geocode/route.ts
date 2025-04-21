import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`

  try {
    const response = await fetch(nominatimUrl)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching from Nominatim:", error)
    return NextResponse.json({ error: "Failed to fetch location data" }, { status: 500 })
  }
}
