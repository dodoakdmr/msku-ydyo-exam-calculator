import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="bg-white px-48 max-md:px-4">
      <div className=" flex justify-start items-center border-b pb-2 pt-2">
        <Image src={"/msku_logo.png"} alt="msku logo" width={40} height={100} />
        <div className="text-zinc-900 px-4 w-full">
          <h1 className="text-base max-md:text-sm">
            Muğla Sıtkı Koçman Üniversitesi
          </h1>
          <h1 className="text-4xl max-md:text-xl font-semibold">
            Yabancı Diller Yüksekokulu
          </h1>
        </div>
      </div>
      <div className="text-zinc-500 flex justify-start items-center gap-4 pb-1">
        <Link href="/" className="hover:text-zinc-600">
          Not Hesaplama
        </Link>
        <Link href="/takvim" className="hover:text-zinc-600">
          Sınav Takvimi
        </Link>
      </div>
    </div>
  );
};

export default Header;
