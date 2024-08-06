import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import { ThemeProvider } from "@/components/shared/theme-provider";
import ReduxProvider from "@/redux/redux-provider";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import CustomDirection from "@/components/shared/direction-provider";
import { setDefaultOptions } from "date-fns";
import { ar } from "date-fns/locale";

setDefaultOptions({ locale: ar });

const tjwal = Tajawal({
    subsets: ["latin"],
    display: "swap",
    adjustFontFallback: false,
    weight: ["200", "300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "درس",
    description: "مرحبا بك في منصة درس",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ar" dir="rtl" suppressHydrationWarning>
            <body className={tjwal.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <CustomDirection>
                        <ReduxProvider>
                            {children}
                            <Toaster />
                        </ReduxProvider>
                    </CustomDirection>
                </ThemeProvider>
            </body>
        </html>
    );
}
