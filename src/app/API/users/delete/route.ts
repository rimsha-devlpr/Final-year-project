// src/app/api/users/delete/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    let ids: string[] = [];

    if (body.id) ids = [body.id];
    else if (Array.isArray(body.ids)) ids = body.ids;

    if (ids.length === 0) {
      return NextResponse.json(
        { error: "User ID(s) required" },
        { status: 400 }
      );
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    for (const id of ids) {
      console.log("Deleting auth user:", id);

      const { error } =
        await supabaseAdmin.auth.admin.deleteUser(id);

      if (error) {
        console.error("Auth delete error:", error);
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({
      message: "User(s) deleted successfully",
    });
  } catch (err: any) {
    console.error("Delete API error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
