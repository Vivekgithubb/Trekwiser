import { useState } from "react";
import { LoginForm } from "@/components/login-form";
import SplitText from "@/components/SplitText";

export default function Login() {
  const [videoEnded, setVideoEnded] = useState(false);

  return (
    <div className="flex flex-col w-full h-screen text-center relative justify-center items-center">
      {!videoEnded ? (
        <div className="w-[270px]">
          <video
            src="/LoginVideo.mp4"
            className="rounded-lg object-cover w-full h-[150px]"
            autoPlay
            muted
            playsInline
            onEnded={() => setVideoEnded(true)} // 👈 detect when video ends
          />
        </div>
      ) : (
        <div className="relative w-full h-screen grid grid-rows-[25%_75%] justify-center items-top">
          {/* Background Image */}
          {/* <img
            src="/home2.jpg"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover -z-10"
            /> */}

          {/* Overlay (optional, to darken the bg for better contrast) */}
          {/* <div className="absolute inset-0 bg-black/40 -z-10" /> */}

          {/* Foreground Content */}

          <SplitText
            text="Welcome to TREKWISER"
            className="text-4xl font-semibold mt-20 font-logo text-zinc-700 text-center"
            delay={80}
            duration={0.2}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.4}
            rootMargin="-10px"
            textAlign="center"
          />

          <div className="w-[300px]">
            <LoginForm />
          </div>
        </div>
      )}
    </div>
  );
}
