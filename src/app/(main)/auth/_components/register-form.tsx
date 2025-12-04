/*"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z
  .object({
    fullName: z.string().min(2, { message: "Full name is required." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string().min(6, { message: "Confirm Password must be at least 6 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);

    const fullName = data.fullName.trim();
    const email = data.email.trim();
    const password = data.password;

    // Sign up with Supabase Auth
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError) {
      toast.error(signUpError.message);
      setIsLoading(false);
      return;
    }

    // Save extra user info in 'profiles' table
    const userId = signUpData.user?.id;
    if (userId) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        full_name: fullName,
        email,
      });

      if (profileError) {
        toast.error("Profile creation failed: " + profileError.message);
        setIsLoading(false);
        return;
      }
    }

    toast.success("Registration successful! Please check your email to confirm.");
    setIsLoading(false);
    router.push("/login");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input id="fullName" placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input id="email" type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input id="password" type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input id="confirmPassword" type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          type="submit"
          disabled={isLoading}
          key={isLoading ? "loading" : "register"} // ✅ key added to fix the DevTools warning
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>
    </Form>
  );
}*/
/*"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/lib/supabase-client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z
  .object({
    fullName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    try {
      // 1️⃣ Sign up with Supabase Auth
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (signUpError) throw signUpError;
      if (!signUpData.user) throw new Error("Registration failed.");

      const userId = signUpData.user.id;

      // 2️⃣ Insert into admins table with Auth user id
      const { error: adminError } = await supabase.from("admins").insert({
        id: userId,
        full_name: data.fullName,
        email: data.email,
        role: "admin",
      });

      if (adminError) throw adminError;

      toast.success("Admin registered successfully!");
      router.push("/auth/v1/login");
    } catch (err: any) {
      toast.error(err.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="fullName" render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="John Doe" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} type="email" placeholder="you@example.com" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="password" render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input {...field} type="password" placeholder="••••••••" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="confirmPassword" render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input {...field} type="password" placeholder="••••••••" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>
    </Form>
  );
}*/
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/lib/supabase-client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z
  .object({
    fullName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    try {
      // 1️⃣ Sign up
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: { emailRedirectTo: window.location.origin + "/auth/v1/login" },
      });

      if (signUpError) throw signUpError;
      if (!signUpData.user) throw new Error("Registration failed");

      // 2️⃣ Insert into admins table using Auth user id
      const { error: adminError } = await supabase.from("admins").insert({
        id: signUpData.user.id,
        full_name: data.fullName,
        email: data.email,
        role: "admin",
      });

      if (adminError) throw adminError;

      toast.success("Registration successful! Please confirm your email before logging in.");
      router.push("/auth/v1/login");
    } catch (err: any) {
      toast.error(err.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="fullName" render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="John Doe" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} type="email" placeholder="you@example.com" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="password" render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input {...field} type="password" placeholder="••••••••" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="confirmPassword" render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input {...field} type="password" placeholder="••••••••" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>
    </Form>
  );
}

