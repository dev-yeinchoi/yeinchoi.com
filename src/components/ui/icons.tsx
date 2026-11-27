import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 18, ...rest }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...rest,
  };
}

export const ChevronLeft = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);
export const ChevronRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 18l6-6-6-6" />
  </svg>
);
export const Pause = (p: IconProps) => (
  <svg {...base({ size: 16, strokeWidth: 2.2, ...p })}>
    <path d="M9 5v14M15 5v14" />
  </svg>
);
export const Play = (p: IconProps) => (
  <svg {...base({ size: 16, ...p })}>
    <path d="M7 5l12 7-12 7z" />
  </svg>
);
export const Plus = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const Minus = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
  </svg>
);
export const Target = (p: IconProps) => (
  <svg {...base({ strokeWidth: 1.8, ...p })}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
export const Close = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
export const ArrowRight = (p: IconProps) => (
  <svg {...base({ size: 16, ...p })}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const Download = (p: IconProps) => (
  <svg {...base({ size: 16, ...p })}>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </svg>
);
export const ArrowUpRight = (p: IconProps) => (
  <svg {...base({ size: 16, ...p })}>
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);
export const Spinner = (p: IconProps) => (
  <svg {...base({ strokeWidth: 2.2, ...p })}>
    <path d="M21 12a9 9 0 1 1-9-9" />
  </svg>
);
export const Mail = (p: IconProps) => (
  <svg {...base({ size: 20, strokeWidth: 1.7, ...p })}>
    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6" />
  </svg>
);
export const GitHub = (p: IconProps) => (
  <svg {...base({ size: 20, strokeWidth: 1.7, ...p })}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
export const LinkedIn = (p: IconProps) => (
  <svg {...base({ size: 20, strokeWidth: 1.7, ...p })}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
  </svg>
);
export const Instagram = (p: IconProps) => (
  <svg {...base({ size: 20, strokeWidth: 1.7, ...p })}>
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zM16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
  </svg>
);
