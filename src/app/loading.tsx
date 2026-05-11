import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24">
      <Card className="w-full max-w-lg animate-pulse">
        <CardHeader>
          <div className="bg-muted h-6 w-40 rounded-md" />
          <div className="bg-muted mt-2 h-4 w-full max-w-md rounded-md" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="bg-muted/60 h-24 rounded-lg" />
          <div className="bg-muted/60 h-10 w-full rounded-lg" />
        </CardContent>
      </Card>
    </div>
  );
}
