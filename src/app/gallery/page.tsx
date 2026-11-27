import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/ComingSoon";

export const metadata: Metadata = { title: "Gallery" };

export default function Page() {
  return <ComingSoon title="Gallery" description="카메라를 들었던 곳들이에요." />;
}
