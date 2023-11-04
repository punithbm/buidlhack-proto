import { icons } from "@/utils/images";
import Image from "next/image";

const Header = () => {
  return (
    <>
      <header
        className={`h-[64px] w-full fixed left-0 bg-[#1C1C1F] dark:bg-secondaryDark-50 top-0 z-[99] lg:flex items-center hidden`}
      >
        <nav className="flex items-center justify-between w-full px-8 gap-x-6">
          <Image src={icons.logo} alt="logo" />
        </nav>
      </header>
    </>
  );
};

export default Header;
