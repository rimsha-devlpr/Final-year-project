// src/app/api/users/delete/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    let ids: string[] = [];

    // Accept single id or array of ids
    if (body.id) ids = [body.id];
    else if (body.ids && Array.isArray(body.ids)) ids = body.ids;

    if (!ids || ids.length === 0) {
      return NextResponse.json({ error: "User ID(s) required" }, { status: 400 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    for (const id of ids) {
      console.log("Deleting user ID:", id);

      // Delete from profiles table
      const { error: profileError } = await supabaseAdmin
        .from("profiles")
        .delete()
        .eq("id", id);

      if (profileError) {
        console.error("Profile delete error:", profileError);
        return NextResponse.json({ error: profileError.message }, { status: 400 });
      }

      // Delete from auth
      const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);
      if (authError) {
        console.error("Auth delete error:", authError);
        return NextResponse.json({ error: authError.message }, { status: 400 });
      }
    }

    return NextResponse.json({ message: "User(s) deleted successfully" });
  } catch (err: any) {
    console.error("Delete API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
