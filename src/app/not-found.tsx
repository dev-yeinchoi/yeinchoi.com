import { Button, PageTitle } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="l-container" style={{ paddingBottom: 80 }}>
      <PageTitle
        eyebrow="404"
        title="Not found"
        description="찾는 페이지가 없어요. 주소를 다시 확인해 주세요."
      />
      <Button href="/" variant="outline">
        처음으로
      </Button>
    </div>
  );
}
