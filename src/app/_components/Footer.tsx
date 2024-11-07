import Link from "next/link";
import React from "react";

const Footer = () => {
	return (
		<div className="text-xs bg-white px-48 max-md:px-4 max-md:text-[0.5rem] text-zinc-700 py-1 text-center">
			Resmi Araç Değildir - Detaylı Bilgi İçin Okul Sayfasını Ziyaret Ediniz{" "}
			<Link
				target="_blank"
				href={"https://ydyo.mu.edu.tr/tr"}
				className="hover:text-blue-700"
			>
				Tıkla
			</Link>
		</div>
	);
};

export default Footer;
