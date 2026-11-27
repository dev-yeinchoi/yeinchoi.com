import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/ComingSoon";

export const metadata: Metadata = { title: "Project" };

export default function Page() {
  return <ComingSoon title="Project" description="만든 것과 받은 상을 종류별 폴더에 모아 두었어요." />;
}
