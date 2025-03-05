// next
import Link from "next/link";

// shadcn-ui
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// config
import { 
  ASTRO_LABS_CEO_INSTAGRAM_URL, 
  ASTRO_LABS_FACEBOOK_URL, 
  ASTRO_LABS_INSTAGRAM_URL, 
  ASTRO_LABS_TIKTOK_URL, 
  ASTRO_LABS_WHATSAPP_URL 
} from "@/config/constants";

// [widgets]
import GoToHome from "@/components/widgets/GoToHome";
import { ExternalLink } from "lucide-react";

// ----------------------------------------------------------------------

export default function DeveloperPage() {
  return (
    <div className="w-full max-w-sm px-4 mx-auto">
      <Card className="mt-3 w-full">
        <CardContent className="px-3">
          <h2 className="scroll-m-20 border-b pb-2 text-sm font-semibold tracking-tight first:mt-0 text-center">
            Síguenos en las redes sociales 🥹💕
          </h2>

          <div className="flex flex-col mt-3">
            <div className="flex flex-col items-center mb-4">
              <p className="text-xs font-light mb-0.5">haz click en el ícono para seguirnos</p>
              <div className="flex flex-row gap-2" style={{ color: '#1AB4D1'}}>
                <Link href={ASTRO_LABS_INSTAGRAM_URL} target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      color="currentColor"
                    >
                      <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" />
                      <path d="M16.5 12a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m1.008-5.5h-.01" />
                    </g>
                  </svg>
                </Link>

                <Link href={ASTRO_LABS_FACEBOOK_URL} target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      color="currentColor"
                    >
                      <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" />
                      <path d="M16.927 8.026h-2.945a1.9 1.9 0 0 0-1.9 1.886l-.086 11.515m-1.914-7.425h4.803" />
                    </g>
                  </svg>
                </Link>

                <Link href={ASTRO_LABS_TIKTOK_URL} target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      color="currentColor"
                    >
                      <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" />
                      <path d="M10.536 11.008c-.82-.116-2.69.075-3.606 1.77s.007 3.459.584 4.129c.569.627 2.378 1.814 4.297.655c.476-.287 1.069-.502 1.741-2.747l-.078-8.834c-.13.973.945 3.255 4.004 3.525" />
                    </g>
                  </svg>
                </Link>
              </div>
              <p className="text-xs font-semibold mt-0.5"  style={{ color: '#1AB4D1'}}>@astrolabs.py</p>
            </div>

            <Separator className="mb-3"/>

            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <p className="text-xs font-light mb-1">Apoya también al fundador</p>
                <div className="flex flex-row mb-3">
                  <Link className="flex items-center gap-2 mt-1" href={ASTRO_LABS_CEO_INSTAGRAM_URL} target="_blank">
                    <Avatar className="-ms-2" style={{ width: '34px', height: '34px' }}>
                      <AvatarImage style={{objectFit: 'cover'}} src="./founder.jpg" />
                      <AvatarFallback>LV</AvatarFallback>
                    </Avatar>
                    <p className="text-xs font-semibold mt-0.5">@leandro_valdz</p>
                    <ExternalLink width={14}/>
                  </Link>
                </div>
              </div>

              <p className="text-xs font-semibold mt-0 italic text-center">
                Espero que este software gratuito te sea tan útil como un traje de astronauta en el espacio. 🚀🛸 
                Si necesitas ayuda, ¡aquí estoy para rescatarte! 😉
              </p>
              {/** 
              <p className="text-xs font-semibold mt-0 italic text-center">
                Espero que este software gratuito sea de gran utilidad para ti. Si tienes alguna pregunta, 
                necesitas una funcionalidad adicional o requieres un desarrollo personalizado, no dudes en 
                contactarme. Estoy aquí para ayudarte a crear soluciones que se adapten perfectamente a 
                tus necesidades.
              </p>
              */}
            </div>
          </div>
        </CardContent>

        <Separator />

        <CardFooter className="flex justify-center gap-3">
          <GoToHome />
          <Link href={ASTRO_LABS_WHATSAPP_URL} className={buttonVariants({ variant: "outline" })}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"/>
            </svg>
            WhatsApp
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
