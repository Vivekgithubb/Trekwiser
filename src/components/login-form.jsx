import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({ className, ...props }) {
  return (
    <form
      className={cn("flex flex-col gap-6 font-figtree", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-0 font-figtree text-center">
        <h1 className="text-2xl font-bold font-title">Login to your account</h1>
        <p className="text-muted-foreground mt-2 text-[12px] text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6 font-light">
        <div className="grid gap-1">
          <Label htmlFor="email" className="text-[14px]">
            Email
          </Label>
          <Input
            className="text-[12px] border-1 border-black bg-transparent"
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-1">
          <div className="flex items-center">
            <Label htmlFor="password" className="text-[14px]">
              Password
            </Label>
            {/* <a
              href="#"
              className="ml-auto text-[12px] underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a> */}
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}
