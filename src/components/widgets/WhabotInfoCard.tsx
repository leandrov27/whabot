// next
import Image from "next/image";

// shadcn-ui
import { Card, CardDescription, CardTitle } from "../ui/card";

// ----------------------------------------------------------------------

export default function WhabotInfoCard() {
  return (
    <Card className="py-4">
      <div className="px-3 flex items-center space-x-2 rounded-md">
        <Image
          src="/logo_single.png"
          width={50}
          height={50}
          alt="astro_labs_logo"
          draggable={false}
        />
        <div className="flex-1 space-y-1">
          <CardTitle>WhaBot v.1.0</CardTitle>
          <CardDescription>
            Bienvenido al dashboard de <strong>Astro Labs</strong>. 🎯
          </CardDescription>
        </div>
      </div>
    </Card>
  );
}
