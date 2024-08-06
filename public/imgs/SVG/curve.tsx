import { cn } from "@/lib/utils";
import * as React from "react";

type Props = { className?: string };

const SVGCurve: React.FC<Props> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 2" viewBox="0 0 1366 369.66" className={cn([className])}>
        <defs>
            <linearGradient id="a" x1={633.79} x2={693.18} y1={400.11} y2={-82.74} gradientUnits="userSpaceOnUse">
                <stop offset={0} stopColor="#121481" />
                <stop offset={1} stopColor="#0a0b4a" />
            </linearGradient>
        </defs>
        <path
            d="M0 0s86.5 378.5 423.5 369.5S1366 0 1366 0H0Z"
            data-name="Layer 1"
            style={{
                fill: "url(#a)",
                strokeWidth: 0,
            }}
        />
    </svg>
);
export default SVGCurve;
