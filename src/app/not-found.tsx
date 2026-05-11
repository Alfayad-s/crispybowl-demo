import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md text-center sm:text-left">
        <CardHeader>
          <CardTitle>Page not found</CardTitle>
          <CardDescription>
            The URL does not match a route in this application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Check the address or return to the homepage.
          </p>
        </CardContent>
        <CardFooter className="justify-center sm:justify-start">
          <Button asChild>
            <Link href="/">Back home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
