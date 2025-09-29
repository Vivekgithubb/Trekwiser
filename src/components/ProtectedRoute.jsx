import { useCurrentUser } from "@/hooks/useCurrentUser";

import LoginPlease from "./LoginPlease";
import Loading from "./Loading";

export const ProtectedRute = ({ children }) => {
  const { data: user, isLoading, error } = useCurrentUser();
 

  if (isLoading) return <Loading />;
  if (!user || error) return <LoginPlease />;

  return children;
};
