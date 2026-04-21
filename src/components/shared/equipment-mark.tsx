import { cn } from "@/lib/utils";

type EquipmentMarkKind =
  | "wheelchair"
  | "power"
  | "walker"
  | "shower"
  | "cushion"
  | "transfer"
  | "ramp"
  | "scooter"
  | "standing"
  | "other";

type Tone = "teal" | "orange" | "cream" | "ink";

interface Props {
  kind?: EquipmentMarkKind;
  tone?: Tone;
  className?: string;
}

const TONE_FILL: Record<Tone, string> = {
  teal: "#14525B",
  orange: "#EE732F",
  cream: "#C25A22",
  ink: "#2B3D45",
};

export function EquipmentMark({
  kind = "wheelchair",
  tone = "teal",
  className,
}: Props) {
  const stroke = TONE_FILL[tone];
  const fill = kind === "power" || kind === "wheelchair" ? stroke : "none";

  return (
    <svg
      viewBox="0 0 160 120"
      className={cn("w-full h-auto", className)}
      fill="none"
      stroke={stroke}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {kind === "wheelchair" && (
        <>
          <circle cx="55" cy="92" r="22" strokeWidth="3" />
          <circle cx="115" cy="92" r="22" strokeWidth="3" />
          <circle cx="55" cy="92" r="6" fill={stroke} stroke="none" />
          <circle cx="115" cy="92" r="6" fill={stroke} stroke="none" />
          <path d="M45 58 L45 30 L80 30 L100 70" fill={fill} opacity="0.9" />
          <path d="M45 46 L85 46" strokeWidth="3" stroke="#FBF9F4" opacity="0.9" />
          <path d="M80 30 L55 60" strokeWidth="2.5" opacity="0.6" />
        </>
      )}
      {kind === "power" && (
        <>
          <circle cx="50" cy="95" r="18" strokeWidth="3" />
          <circle cx="115" cy="95" r="18" strokeWidth="3" />
          <rect x="55" y="38" width="60" height="30" rx="4" fill={fill} />
          <path d="M70 38 L70 20 L100 20 L100 38" />
          <path d="M115 68 L120 85" strokeWidth="3" />
        </>
      )}
      {kind === "walker" && (
        <>
          <path d="M35 25 L35 85" />
          <path d="M125 25 L125 85" />
          <path d="M35 25 L125 25" />
          <path d="M35 55 L125 55" />
          <circle cx="35" cy="100" r="10" strokeWidth="3" />
          <circle cx="125" cy="100" r="10" strokeWidth="3" />
        </>
      )}
      {kind === "shower" && (
        <>
          <path d="M80 20 L80 40" />
          <path d="M60 40 L100 40" />
          <path d="M52 48 C44 60 40 80 40 98 L120 98 C120 80 116 60 108 48" fill={fill} opacity="0.3" />
          <circle cx="70" cy="72" r="2" fill={stroke} stroke="none" />
          <circle cx="80" cy="80" r="2" fill={stroke} stroke="none" />
          <circle cx="90" cy="72" r="2" fill={stroke} stroke="none" />
        </>
      )}
      {kind === "cushion" && (
        <>
          <rect x="30" y="55" width="100" height="22" rx="8" fill={fill} opacity="0.3" />
          <path d="M36 55 C36 45 44 35 60 35 L100 35 C116 35 124 45 124 55" />
          <rect x="34" y="77" width="92" height="16" rx="4" />
        </>
      )}
      {kind === "transfer" && (
        <>
          <path d="M70 22 L100 22 L100 32 L70 32 Z" fill={fill} />
          <path d="M85 32 L85 58" />
          <path d="M55 58 L115 58" />
          <path d="M55 58 L55 98" />
          <path d="M115 58 L115 98" />
          <path d="M45 98 L125 98" />
          <path d="M70 78 L100 78 L100 98 L70 98 Z" fill={fill} opacity="0.2" />
        </>
      )}
      {kind === "ramp" && (
        <>
          <path d="M25 98 L135 42" />
          <path d="M25 98 L135 98" />
          <path d="M135 42 L135 98" fill={fill} opacity="0.2" />
          <path d="M70 78 L70 98" strokeWidth="2" />
          <path d="M105 58 L105 98" strokeWidth="2" />
        </>
      )}
      {kind === "scooter" && (
        <>
          <circle cx="40" cy="92" r="16" strokeWidth="3" />
          <circle cx="120" cy="92" r="16" strokeWidth="3" />
          <path d="M60 92 L85 92 L100 50 L125 50" fill={fill} opacity="0.2" />
          <path d="M100 50 L112 26" />
          <path d="M105 26 L130 26" />
          <path d="M90 78 L70 78 L70 60" />
        </>
      )}
      {kind === "standing" && (
        <>
          <path d="M55 20 L55 108" />
          <path d="M105 20 L105 108" />
          <path d="M55 20 L105 20" />
          <path d="M55 52 L105 52" />
          <path d="M55 108 L105 108" />
          <path d="M68 52 L68 88" />
          <path d="M92 52 L92 88" />
          <circle cx="80" cy="36" r="8" fill={fill} opacity="0.6" />
        </>
      )}
      {kind === "other" && (
        <>
          <circle cx="80" cy="60" r="42" strokeWidth="3" fill={fill} opacity="0.1" />
          <circle cx="80" cy="44" r="8" fill={fill} opacity="0.6" />
          <path d="M80 54 L80 72" />
          <path d="M80 72 L60 98" />
          <path d="M80 72 L100 98" />
          <path d="M60 82 L100 82" />
        </>
      )}
    </svg>
  );
}
