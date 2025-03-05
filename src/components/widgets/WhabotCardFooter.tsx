// next
import Link from "next/link";

// shadcn-ui
import { CardFooter } from "../ui/card";

// ----------------------------------------------------------------------

export default function WhabotCardFooter() {
  return (
    <CardFooter className="justify-center text-sm text-muted-foreground">
      Developed & Maintained by
      <Link
        href="/developer"
        rel="noopener noreferrer"
        className="text-primary font-semibold hover:underline mx-1"
      >
        Astro Labs
      </Link>
      ❤️
    </CardFooter>
  );
}
