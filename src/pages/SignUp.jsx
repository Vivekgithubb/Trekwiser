import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useSignUp } from "@/hooks/SignupHook";
import toast from "react-hot-toast";

export function SignUp({ className, ...props }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { signUp, isLoading } = useSignUp();
  const onSubmit = async (formData) => {
    console.log("Sending data to backend:", formData);
    signUp(formData, {
      onSuccess: () => {
        console.log("Signup succeeded!");
        navigate("/login");
      },
      onError: (error) => {
        const errData = error.response?.data;

        if (!errData) {
          toast.error("Signup failed!");
          return;
        }

        // Handle Mongoose validation errors
        if (errData.error && errData.error.name === "ValidationError") {
          // Collect all messages
          const messages = Object.values(errData.error.errors).map(
            (e) => e.message
          );
          messages.forEach((msg) => toast.error(msg));
        }
        // Handle duplicate key errors
        else if (
          errData.message &&
          errData.message.includes("already exists")
        ) {
          toast.error(errData.message);
        }
        // Fallback
        else {
          toast.error(errData.message || "Signup failed!");
        }
      },
    });
  };
  const password = watch("password");

  return (
    <div className=" m-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "flex flex-col gap-6 font-figtree max-w-md mx-auto",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-0 text-center">
          <h1 className="text-2xl font-bold font-title">Create your account</h1>
          <p className="text-muted-foreground mt-2 text-[12px] text-balance">
            Fill in your details below to sign up
          </p>
        </div>

        {/* Inputs */}
        <div className="grid gap-4">
          {/* Name */}
          <div className="grid gap-1">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="username"
              placeholder="John Doe"
              {...register("username", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="grid gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: 6,
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="grid gap-1">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="passwordConf"
              type="password"
              {...register("passwordConf", {
                required: "Please confirm password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* City */}
          <div className="grid gap-1">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="Your city"
              {...register("city", { required: "City is required" })}
            />
            {errors.city && (
              <p className="text-red-500 text-xs">{errors.city.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="grid gap-1">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phonenumber"
              type="tel"
              placeholder="1234567890"
              {...register("phonenumber", {
                required: "Phone number is required",
              })}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone.message}</p>
            )}
          </div>

          {/* Short Description */}
          <div className="grid gap-1">
            <Label htmlFor="description">Short Description</Label>
            <textarea
              id="description"
              placeholder="Write a short bio (max 50 chars)"
              maxLength={50}
              className="border rounded p-2 text-sm"
              {...register("description", { maxLength: 50 })}
            />
            {errors.description && (
              <p className="text-red-500 text-xs">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            Sign Up
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-white italic">
          Already have an account?{" "}
          <Link to="/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
