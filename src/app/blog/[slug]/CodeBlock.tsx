"use client";

import { useCopied } from "./useCopied";

/** 파일 이름 + 복사 버튼이 붙은 코드 블록. html은 서버에서 색을 입혀 온 코드예요. */
export function CodeBlock({ name, raw, html }: { name: string; raw: string; html: string }) {
  const [copied, copy] = useCopied();
  return (
    <figure className="b-code">
      <div className="b-code__head">
        <span className="b-code__name">{name}</span>
        <span className="b-code__actions">
          {copied ? (
            <span role="status" className="b-ok">
              복사됨
            </span>
          ) : null}
          <button type="button" className="b-icon-btn" aria-label="코드 복사" onClick={() => copy(raw)}>
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
              <rect x="9" y="9" width="11" height="11" rx="2" />
              <path d="M5 15V6a2 2 0 0 1 2-2h9" />
            </svg>
          </button>
        </span>
      </div>
      <pre>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: 빌드 때 sugar-high가 만든 코드 색이에요 */}
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </figure>
  );
}
