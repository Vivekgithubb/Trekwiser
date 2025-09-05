import Button from "../components/Button";
import home1 from "/home2.jpg";
export default function Home() {
  return (
    <div className=" w-full h-full">
      <img
        src={home1}
        className="absolute inset-0 w-full h-full object-cover opacity-85"
      />
      <div className="relative top-26">
        <div className="text-center font-title text-3xl leading-[33px]">
          <h1>Discover Treks</h1>
          <h1>Join Tribes</h1>
          <h1>Live the Journey</h1>
        </div>
        <div className="flex flex-row gap-6 justify-center items-center mt-15">
          <Button text="Exlpore treks" to="treks" arrow="yes" />
          <Button text="View Community" to="commmunity" arrow="no" />
        </div>
      </div>
    </div>
  );
}
