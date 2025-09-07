import { Link } from "react-router";
import logo from "/logo.png";
export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-transparent bg-blur-[1px] text p-4 font-zinc-800 font-logo flex flex-row justify-between items-center ">
      <div className="font-logo flex flex-row justify-center items-center gap relative right-7">
        <img src={logo} className="h-[40px] relative left-2 bottom-0.5" />
        <Link to="/">TREKWISER</Link>
      </div>
      <ul className="list-none flex flex-row gap-[10px] font-figtree text-[10px]">
        <li>
          <Link to="/treks">Treks</Link>
        </li>
        <li>
          <Link to="/community">Community</Link>
        </li>
        <li>
          <Link to="/profile/:id">Profile</Link>
        </li>
      </ul>
    </div>
  );
}
