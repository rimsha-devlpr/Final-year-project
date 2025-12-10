// src/app/API/users/update/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client with Service Role Key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PUT(req: Request) {
  try {
    const { id, username, full_name, phone_no, email } = await req.json();

    // 1️⃣ Validate Input
    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // 2️⃣ Check user exists in Auth
    const { data: usersData, error: listError } = await supabase.auth.admin.listUsers({
      limit: 1000,
    });

    if (listError)
      return NextResponse.json({ error: listError.message }, { status: 400 });

    const authUser = usersData.users.find((u) => u.id === id);

    if (!authUser) {
      return NextResponse.json(
        { error: "User not found in authentication system" },
        { status: 404 }
      );
    }

    // 3️⃣ Update Auth Metadata
    const { error: updateAuthError } = await supabase.auth.admin.updateUserById(
      id,
      {
        email: email || authUser.email,
        user_metadata: {
          username: username ?? authUser.user_metadata?.username,
          full_name: full_name ?? authUser.user_metadata?.full_name,
          phone_no: phone_no ?? authUser.user_metadata?.phone_no,
        },
      }
    );

    if (updateAuthError) {
      return NextResponse.json(
        { error: updateAuthError.message },
        { status: 400 }
      );
    }

    // 4️⃣ Update Profile Table
    const { data: updatedProfile, error: profileError } = await supabase
      .from("profiles")
      .update({
        username,
        full_name,
        phone_no,
        email,
      })
      .eq("id", id)
      .select()
      .maybeSingle();

    if (profileError) {
      return NextResponse.json(
        { error: profileError.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        data: updatedProfile,
        info: "User updated successfully",
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
