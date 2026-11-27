import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/cx";

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** 화면 낭독기용 이름. 꼭 달아요. */
  label: string;
  icon: ReactNode;
  /** 앞으로 가는 쪽(다음)을 강조할 때 */
  solid?: boolean;
  /** 32px */
  small?: boolean;
}

/** 둥근 40px 아이콘 버튼. 캐러셀이면 옆에 StatusText를 붙여요. */
export function IconButton({
  label,
  icon,
  solid,
  small,
  className,
  type = "button",
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cx("c-icbtn", solid && "c-icbtn--solid", small && "c-icbtn--sm", className)}
      {...rest}
    >
      {icon}
    </button>
  );
}
