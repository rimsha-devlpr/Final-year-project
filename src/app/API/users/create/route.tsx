// src/app/API/users/create/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client with Service Role Key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { username, email, full_name, phone_no, password } = await req.json();

    // 1️⃣ Validate input
    if (!username || !email || !full_name || !phone_no || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    let userId = "";
    let profileData: any = null;

    // 2️⃣ Try creating user in Supabase Auth
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { username, full_name, phone_no },
      email_confirm: true,
    });

    // 3️⃣ Handle existing email
    if (authError && authError.message.includes("already been registered")) {
      // Fetch existing Auth users
      const { data: existingUsersData, error: listError } = await supabase.auth.admin.listUsers({ limit: 100 });
      if (listError) return NextResponse.json({ error: listError.message }, { status: 400 });

      // users array
      const existingUser = existingUsersData.users.find(u => u.email === email);
      if (!existingUser) return NextResponse.json({ error: "Auth user exists but cannot fetch user" }, { status: 400 });

      userId = existingUser.id;

      // Check if profile exists safely
      const { data: existingProfile, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 400 });

      if (existingProfile) {
        profileData = existingProfile;
      } else {
        // Create missing profile
        const { data: newProfile, error: insertError } = await supabase
          .from("profiles")
          .insert([{
            id: userId,
            username: existingUser.user_metadata?.username || username,
            email,
            full_name: existingUser.user_metadata?.full_name || full_name,
            phone_no: existingUser.user_metadata?.phone_no || phone_no,
          }]);

        if (insertError || !newProfile || newProfile.length === 0) {
          return NextResponse.json({ error: insertError?.message || "Failed to create profile" }, { status: 400 });
        }

        profileData = newProfile[0];
      }

      return NextResponse.json({ data: profileData, info: "User already exists" }, { status: 200 });
    }

    // 4️⃣ New user: insert profile
    userId = authUser.user.id;
    const { data: newProfileData, error: profileError } = await supabase
      .from("profiles")
      .insert([{
        id: userId,
        username,
        email,
        full_name,
        phone_no,
      }]);

    if (profileError || !newProfileData || newProfileData.length === 0) {
      // Rollback Auth user if profile insert fails
      await supabase.auth.admin.deleteUser(userId);
      return NextResponse.json({ error: profileError?.message || "Failed to create profile" }, { status: 400 });
    }

    profileData = newProfileData[0];
    return NextResponse.json({ data: profileData, info: "User created successfully" }, { status: 201 });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
