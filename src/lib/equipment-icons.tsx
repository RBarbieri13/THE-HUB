import { type SVGProps } from "react";

type IconComponent = (props: SVGProps<SVGSVGElement>) => React.ReactElement;

function createIcon(paths: string): IconComponent {
  return function Icon(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
        dangerouslySetInnerHTML={{ __html: paths }}
      />
    );
  };
}

export const ManualWheelchairIcon = createIcon(
  `<circle cx="15" cy="38" r="7"/><circle cx="35" cy="38" r="7"/><path d="M15 31V16h6l8 15"/><path d="M15 22h10"/>`
);

export const PowerWheelchairIcon = createIcon(
  `<circle cx="13" cy="38" r="7"/><circle cx="35" cy="38" r="7"/><path d="M13 31V16h6l8 15"/><path d="M13 22h10"/><path d="M36 8l-3 6h6l-3 6" fill="currentColor" stroke="none"/>`
);

export const CushionSeatingIcon = createIcon(
  `<rect x="8" y="24" width="32" height="8" rx="3"/><path d="M10 24c0-3 2-6 6-6h16c4 0 6 3 6 6"/><rect x="10" y="32" width="28" height="6" rx="2"/>`
);

export const WalkerRollatorIcon = createIcon(
  `<path d="M12 8v28"/><path d="M36 8v28"/><path d="M12 8h24"/><path d="M12 20h24"/><circle cx="12" cy="40" r="4"/><circle cx="36" cy="40" r="4"/>`
);

export const BathShowerIcon = createIcon(
  `<path d="M24 6v8"/><path d="M18 14h12"/><path d="M16 18c-2 4-4 10-4 16h24c0-6-2-12-4-16"/><circle cx="20" cy="26" r="1" fill="currentColor" stroke="none"/><circle cx="24" cy="30" r="1" fill="currentColor" stroke="none"/><circle cx="28" cy="26" r="1" fill="currentColor" stroke="none"/>`
);

export const TransferEquipmentIcon = createIcon(
  `<path d="M20 6h8v4H20z" fill="currentColor" stroke="none"/><path d="M24 10v8"/><path d="M16 18h16"/><path d="M16 18v16"/><path d="M32 18v16"/><path d="M12 34h24"/><path d="M20 26h8v8h-8z"/>`
);

export const RampAccessibilityIcon = createIcon(
  `<path d="M6 40L42 16"/><path d="M6 40h36"/><path d="M42 16v24"/><path d="M18 34v6"/><path d="M30 26v14"/>`
);

export const ScooterIcon = createIcon(
  `<circle cx="12" cy="38" r="6"/><circle cx="38" cy="38" r="6"/><path d="M18 38h8l4-14h6"/><path d="M30 24l2-8"/><path d="M28 16h8"/><path d="M26 28h-4v-4"/>`
);

export const StandingFrameIcon = createIcon(
  `<path d="M16 6v36"/><path d="M32 6v36"/><path d="M16 6h16"/><path d="M16 18h16"/><path d="M16 42h16"/><path d="M20 18v12"/><path d="M28 18v12"/><circle cx="24" cy="12" r="3"/>`
);

export const OtherAdaptiveIcon = createIcon(
  `<circle cx="24" cy="24" r="18"/><circle cx="24" cy="16" r="4"/><path d="M24 20v6"/><path d="M24 26l-8 10"/><path d="M24 26l8 10"/><path d="M16 30h16"/>`
);

const EQUIPMENT_ICON_MAP: Record<string, IconComponent> = {
  "Manual Wheelchair": ManualWheelchairIcon,
  "Power Wheelchair": PowerWheelchairIcon,
  "Cushion / Seating": CushionSeatingIcon,
  "Walker / Rollator": WalkerRollatorIcon,
  "Bath / Shower Equipment": BathShowerIcon,
  "Transfer Equipment": TransferEquipmentIcon,
  "Ramp / Accessibility": RampAccessibilityIcon,
  "Scooter": ScooterIcon,
  "Standing Frame": StandingFrameIcon,
  "Other Adaptive Equipment": OtherAdaptiveIcon,
};

export function getEquipmentIcon(category: string): IconComponent {
  return EQUIPMENT_ICON_MAP[category] ?? OtherAdaptiveIcon;
}
