"use client";

import { useCopied } from "./useCopied";

export function CopyLinkButton() {
  const [copied, copy] = useCopied();
  return (
    <span className="b-copy-link">
      <button type="button" className="b-outline-btn" onClick={() => copy(window.location.href)}>
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
          <path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
        </svg>
        링크 복사
      </button>
      {copied ? (
        <span role="status" className="b-ok">
          복사됨
        </span>
      ) : null}
    </span>
  );
}
