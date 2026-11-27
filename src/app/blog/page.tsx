import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/ComingSoon";

export const metadata: Metadata = { title: "Blog" };

export default function Page() {
  return <ComingSoon title="Blog" description="공부하고 경험한 것을 기록합니다." />;
}
