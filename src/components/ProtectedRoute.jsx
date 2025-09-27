import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Frown } from "lucide-react";
import { Link, useLocation } from "react-router";
import { FaRegFaceSadTear } from "react-icons/fa6";

export const ProtectedRute = ({ children }) => {
  const { data: user, isLoading } = useCurrentUser();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user)
    return (
      <div className="flex h-screen gap-12  font-logo  w-full justify-center items-center flex-col">
        <div className="text-center flex flex-col justify-center items-center gap-2">
          <FaRegFaceSadTear color="blue" size={30} />
          <h1>Ooops Seems like you missed something</h1>
        </div>

        <div className="text-center">
          <h1 className="text-xl">
            Your must be logged in to view Profile page
          </h1>
          <Link
            to="/login"
            className="italic text-yellow-400 font-bold font-title"
            replace
            state={{ from: location }}
          >
            Login now
          </Link>
        </div>
      </div>
    );

  return children;
};
