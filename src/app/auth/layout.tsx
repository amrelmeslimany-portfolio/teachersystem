import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="my-[7%] max-w-sm mx-auto shadow-lg border dark:border-white/10 border-gray-100 dark:shadow-sm shadow-gray-100 p-4 rounded-md">
            {/* <div className="text-center mb-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/">
                        <Home className="text-gray-600" />
                    </Link>
                </Button>
            </div> */}
            {children}
        </div>
    );
};

export default layout;
