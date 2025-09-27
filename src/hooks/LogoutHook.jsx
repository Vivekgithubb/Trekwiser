import { LogoutApi } from "@/api/LogoutApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: LogoutApi,
    onSuccess: () => {
      toast.success("Succesfully Logged Out");
      queryClient.invalidateQueries(["currentUser"]);
      navigate("/home");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Logout failed");
    },
  });
  return { logout, isLoading };
}
