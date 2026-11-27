import { cx } from "@/lib/cx";

export interface ProgressProps {
  /** 0–100 */
  value: number;
  /** 화면 낭독기용 이름 */
  label?: string;
  /** 2px (글 읽기 바) */
  thin?: boolean;
  className?: string;
}

/** 높이 4px, 채움은 primary. 채워진 정도는 width로. */
export function Progress({ value, label, thin, className }: ProgressProps) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <span
      className={cx("c-progress", thin && "c-progress--thin", className)}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v)}
    >
      <span className="c-progress__bar" style={{ width: `${v}%` }} />
    </span>
  );
}

export interface ProgressStepsProps {
  /** 전체 단계 수 (카드 수) */
  total: number;
  /** 지금 단계 (0부터) */
  current: number;
  /** 지금 단계가 채워진 정도 0–100 */
  value: number;
  label?: string;
  className?: string;
}

/** 자동으로 넘어가는 캐러셀의 단계 막대. 카드 수만큼 나란히 놓여요. */
export function ProgressSteps({ total, current, value, label, className }: ProgressStepsProps) {
  return (
    <div className={cx("c-progress-steps", className)} role="group" aria-label={label}>
      {Array.from({ length: total }, (_, i) => (
        <Progress
          // biome-ignore lint/suspicious/noArrayIndexKey: 단계는 순서가 곧 정체예요
          key={i}
          value={i < current ? 100 : i === current ? value : 0}
        />
      ))}
    </div>
  );
}
