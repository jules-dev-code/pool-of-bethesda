import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/services/availability";

export async function GET(request: NextRequest) {
  const dateParam = request.nextUrl.searchParams.get("date");

  if (!dateParam) {
    return NextResponse.json(
      { error: "Le paramètre 'date' est requis." },
      { status: 400 }
    );
  }

  const date = new Date(dateParam);
  if (Number.isNaN(date.getTime())) {
    return NextResponse.json({ error: "Date invalide." }, { status: 400 });
  }

  try {
    const slots = await getAvailableSlots(date);
    return NextResponse.json({ slots });
  } catch (error) {
    console.error("GET /api/appointments/availability error:", error);
    return NextResponse.json(
      { error: "Erreur lors du calcul des disponibilités." },
      { status: 500 }
    );
  }
}
