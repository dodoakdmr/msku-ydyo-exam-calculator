import Image from "next/image";
import React from "react";

const Header = () => {
	return (
		<div className="bg-white px-48 max-md:px-4 py-2 flex justify-start items-center">
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
	);
};

export default Header;
