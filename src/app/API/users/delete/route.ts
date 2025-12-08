import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase-server";


export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Delete from profiles table
    const { error } = await supabase.from("profiles").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    // Optional: delete user from Supabase Auth
    const { error: authError } = await supabase.auth.admin.deleteUser(id);
    if (authError) return NextResponse.json({ error: authError.message }, { status: 400 });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
