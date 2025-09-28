import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Frown } from "lucide-react";
import { Link, useLocation } from "react-router";
import { FaRegFaceSadTear } from "react-icons/fa6";
import LoginPlease from "./LoginPlease";
import Loading from "./Loading";

export const ProtectedRute = ({ children }) => {
  const { data: user, isLoading, error } = useCurrentUser();
  const location = useLocation();

  if (isLoading) return <Loading />;
  if (!user || error) return <LoginPlease />;

  return children;
};
