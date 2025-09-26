import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useLogin } from "@/hooks/LoginHook";
import toast from "react-hot-toast";

export function LoginForm({ className, ...props }) {
  const { Login, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log("sending login data to backend");
    Login(data, {
      onSuccess: () => {
        toast.success("Login successfull");
        navigate("/");
      },
      onError: () => {
        toast.error("Login unSucessfull");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
        {/* Email */}
        <div className="grid gap-1">
          <Label htmlFor="email" className="text-[14px]">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            className="text-[12px] border-1 border-black bg-transparent backdrop-blur-[2px]"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-[12px]">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="grid gap-1">
          <div className="flex items-center">
            <Label htmlFor="password" className="text-[14px]">
              Password
            </Label>
          </div>
          <Input
            id="password"
            type="password"
            className="text-[12px] border-1 border-black bg-transparent backdrop-blur-[2px]"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-[12px]">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </div>

      <div className="text-center text-sm text-white italic">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
