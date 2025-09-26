import { LoginApi } from "@/api/LoginApi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useLogin() {
  const { mutate: Login, isLoading } = useMutation({
    mutationFn: LoginApi,
    onSuccess: () => {
      toast.success("Succesfully Logged in");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
  return { Login, isLoading };
}
