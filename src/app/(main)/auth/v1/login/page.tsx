import Link from "next/link";
import { BookOpenText } from "lucide-react"; // better icon for study platform
import { LoginForm } from "../../_components/login-form";
import { GoogleButton } from "../../_components/social-auth/google-button";

export default function LoginV1() {
  return (
    <div className="flex h-dvh">
      {/* Left Section */}
      <div className="bg-primary hidden lg:block lg:w-1/3">
        <div className="flex h-full flex-col items-center justify-center p-12 text-center">
          <div className="space-y-6">
            <BookOpenText className="text-primary-foreground mx-auto size-12" />
            <div className="space-y-2">
              <h1 className="text-primary-foreground text-4xl font-light">
                AI StudyStation
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                Intelligent Note Generation & Automated Printing System
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="bg-background flex w-full items-center justify-center p-8 lg:w-2/3">
        <div className="w-full max-w-md space-y-10 py-24 lg:py-32">
          <div className="space-y-4 text-center">
            <div className="font-semibold tracking-tight text-xl">
              Welcome to AI StudyStation
            </div>
            <div className="text-muted-foreground mx-auto max-w-xl">
              Login to your account to access intelligent note generation, AI-powered summaries, 
              and automated printing dashboard.
            </div>
          </div>

          <div className="space-y-4">
            <LoginForm />

            <GoogleButton
              className="w-full"
              variant="outline"
            />

            <p className="text-muted-foreground text-center text-xs">
              Don&apos;t have an account?{" "}
              <Link href="/main/auth/v1/register" className="text-primary font-medium">
                Register
              </Link>
            </p>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            © Department of Computer Science, University of Gujrat
          </p>
        </div>
      </div>
    </div>
  );
}
