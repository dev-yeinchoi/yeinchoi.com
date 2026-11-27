import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/ComingSoon";

export const metadata: Metadata = { title: "About" };

export default function Page() {
  return <ComingSoon title="About" description="학력, 경력, 활동과 연락처를 소개해요." />;
}
