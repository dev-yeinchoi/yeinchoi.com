import { Button, Card, PageTitle, StatusText } from "@/components/ui";

/** 화면별 PR이 들어오기 전까지 쓰는 자리 표시 화면 */
export function ComingSoon({ title, description }: { title: string; description: string }) {
  return (
    <div className="l-container">
      <PageTitle title={title} description={description} />
      <Card
        variant="line"
        style={{
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "flex-start",
          marginBottom: 80,
        }}
      >
        <StatusText>새 디자인으로 다시 만드는 중이에요.</StatusText>
        <Button href="/design-system" variant="outline" size="sm">
          디자인 시스템 보기
        </Button>
      </Card>
    </div>
  );
}
