import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/ComingSoon";

export const metadata: Metadata = { title: "Work" };

export default function Page() {
  return <ComingSoon title="Work" description="한 활동이 책 한 권이에요. 오래 한 일일수록 책이 두꺼워요." />;
}
