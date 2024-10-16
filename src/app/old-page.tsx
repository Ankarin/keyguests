import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)] ">
      <main className="flex-1 flex items-center justify-center">
        <div className="container relative pb-10">
          <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-6">
            <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
              Share your health and preferences with hotel staff in a secure way
              and get tailored experience.
            </h1>
            <span className="max-w-[750px] text-center text-lg font-light text-foreground"></span>
            <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
              <Button variant="default" size="lg" asChild>
                <Link href="/">Get Started</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
      <footer className="py-6 md:py-0 border-t border-border/40">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Keyguests
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
