import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { highlight } from "sugar-high";
import { CodeBlock } from "./CodeBlock";

interface HastNode {
  type: string;
  tagName?: string;
  data?: { meta?: string };
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

/**
 * 코드 블록 언어 뒤에 적은 글자(```tsx page.tsx)를 code 요소의 data-meta로 넘겨요.
 * 그래야 코드 위에 파일 이름을 보여줄 수 있어요.
 */
export function rehypeCodeMeta() {
  const visit = (node: HastNode) => {
    if (node.type === "element" && node.tagName === "code" && node.data?.meta) {
      node.properties = { ...node.properties, dataMeta: node.data.meta };
    }
    node.children?.forEach(visit);
  };
  return (tree: HastNode) => visit(tree);
}

type CodeProps = { className?: string; children?: ReactNode; "data-meta"?: string };

function Pre({ children }: ComponentPropsWithoutRef<"pre">) {
  const code = children as ReactElement<CodeProps> | undefined;
  const raw = typeof code?.props?.children === "string" ? code.props.children.replace(/\n$/, "") : "";
  const lang = code?.props?.className?.replace(/^language-/, "");
  const name = code?.props?.["data-meta"]?.trim() || lang || "code";
  return <CodeBlock name={name} raw={raw} html={highlight(raw)} />;
}

export const mdxComponents = {
  pre: Pre,
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) =>
    /^https?:\/\//.test(href) ? (
      <a href={href} target="_blank" rel="noreferrer" {...props} />
    ) : (
      <a href={href} {...props} />
    ),
};
