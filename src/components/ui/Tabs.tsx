"use client";

import { type KeyboardEvent, useRef } from "react";
import { cx } from "@/lib/cx";

export interface TabItem<T extends string> {
  value: T;
  label: string;
  /** 옆에 작게 붙는 개수 */
  count?: number;
}

export interface TabsProps<T extends string> {
  label: string;
  items: ReadonlyArray<TabItem<T>>;
  value: T;
  onChange: (value: T) => void;
  /** 탭 패널 id 앞부분. 주면 aria-controls가 `${idPrefix}-panel-${value}`로 연결돼요. */
  idPrefix?: string;
  className?: string;
}

/** 콘텐츠를 큰 묶음으로 나눌 때. 밑줄로 지금 탭을 표시하고, 개수를 옆에 작게 붙여요. */
export function Tabs<T extends string>({ label, items, value, onChange, idPrefix, className }: TabsProps<T>) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = -1;
    if (e.key === "ArrowRight") next = (index + 1) % items.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    if (next < 0) return;
    e.preventDefault();
    onChange(items[next].value);
    refs.current[next]?.focus();
  }

  return (
    <div className={cx("c-tabs", className)} role="tablist" aria-label={label}>
      {items.map((t, i) => {
        const on = t.value === value;
        return (
          <button
            key={t.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={idPrefix ? `${idPrefix}-tab-${t.value}` : undefined}
            aria-controls={idPrefix ? `${idPrefix}-panel-${t.value}` : undefined}
            aria-selected={on}
            tabIndex={on ? 0 : -1}
            className="c-tab"
            onClick={() => onChange(t.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {t.label}
            {t.count !== undefined ? <span className="c-tab__n">{t.count}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
