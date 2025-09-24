import { SignUpApi } from "@/api/SignUpApi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: SignUpApi,
    onSuccess: () => {
      toast.success("Succesfully signed Up");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Signup failed");
    },
  });
  return { signUp, isLoading };
}
