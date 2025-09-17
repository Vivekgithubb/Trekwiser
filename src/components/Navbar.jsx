// import { Link } from "react-router";
import logo from "/logo.png";
import CardNav from "./CardNav";
export default function Navbar() {
  const items = [
    {
      label: "TREKS",
      bgColor: "#4B5563",
      textColor: "#fff",
      links: [
        {
          label: "Explore Treks",
          ariaLabel: "Find your next adventure",
          to: "/treks",
        },
      ],
    },
    {
      label: "Community",
      bgColor: "#4B5563",
      textColor: "#fff",
      links: [
        {
          label: "View community",
          ariaLabel: "View pictures others have posted",
          to: "/community",
        },
        { label: "Gallery", ariaLabel: "View all photos", to: "/gallery" },
        { label: "Add new Post", ariaLabel: "Add new post", to: "/gallery" },
      ],
    },

    {
      label: "Profile",
      bgColor: "#4B5563",
      textColor: "#fff",
      links: [
        {
          label: "Profile",
          ariaLabel: "View user profile",
          to: "/profile/:id",
        },
      ],
    },
  ];
  return (
    // <div>
    //   <div className="fixed top-0 left-0 w-full z-50 bg-white/5 backdrop-blur-[1px] text font-logo flex flex-row justify-between items-center p-4">
    //     <div className="font-logo flex flex-row justify-center items-center gap relative right-7">
    //       <img src={logo} className="h-[40px] relative left-2 bottom-0.5" />
    //       <Link to="/">TREKWISER</Link>
    //     </div>
    //     <ul className="list-none flex flex-row gap-[10px] font-figtree text-[10px]">
    //       <li>
    //         <Link to="/treks">Treks</Link>
    //       </li>
    //       <li>
    //         <Link to="/community">Community</Link>
    //       </li>
    //       <li>
    //         <Link to="/profile/:id">Profile</Link>
    //       </li>
    //     </ul>
    //   </div>
    //   <div>
    <CardNav
      logo={logo}
      logoAlt="Company Logo"
      items={items}
      baseColor="#fff"
      className=""
      menuColor="#000"
      buttonBgColor="#111"
      buttonTextColor="#fff"
      ease="power3.out"
      Websitetitle="TREKWISER"
    />
  );
}
