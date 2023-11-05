import { icons } from "@/utils/images";
import Image from "next/image";

function Root() {
  return (
    <div className="h-full pt-7">
      <div className="">
        <Image src={icons.banner} alt="banner" className="" />
      </div>
    </div>
  );
}

export default Root;
