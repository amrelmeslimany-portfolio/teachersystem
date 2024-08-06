import Image from "next/image";
import React from "react";
import AuthEnterImage from "@/public/imgs/auth-enter.webp";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div className="fixed top-0 left-0 h-full w-1/2">
                <Image src={AuthEnterImage} alt="مرحبا" fill placeholder="blur" />
            </div>
            <div className="p-4 w-1/2 h-full">{children}</div>
        </div>
    );
};

export default layout;
