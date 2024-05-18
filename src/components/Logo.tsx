import image from "@/assets/therapew.svg";
import textImage from "@/assets/therapew.jpg";

import { useEffect, useState } from "react";

export default function Logo({ animate = false }: { animate?: boolean }) {
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (animate) {
      setBounce(true);
      setTimeout(() => {
        setBounce(false);
      }, 3000);
    }
  }, []);
  return (
    <div className="inline-flex">
      <img
        className={`h-10 ${bounce && "animate-bounce"}`}
        src={image}
        alt=""
      />
      <img className="h-10" src={textImage} />
    </div>
  );
}
