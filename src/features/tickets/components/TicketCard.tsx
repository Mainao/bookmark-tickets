import type { Ticket } from "@/types/ticket";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface TicketCardProps {
  ticket: Ticket;
}

export function TicketCard({ ticket }: TicketCardProps) {
  const targetUrl = ticket.url;
  const title = ticket.override?.title || ticket.title;
  const image = ticket.override?.image || ticket.meta?.image;
  const note = ticket.override?.note || ticket.meta?.description;
  const number = `NO ${String(ticket.no).padStart(3, "0")}`;

  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col w-full max-w-[320px] mx-auto select-none transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
      title={`Open ${title} in new window`}
    >
      <div className="w-full overflow-hidden leading-none h-2.5 text-[#FDFCFB] dark:text-[#181818] transition-colors duration-200">
        <svg
          className="w-full h-2.75 block filter drop-shadow-[0_-1px_1px_rgba(0,0,0,0.04)] dark:drop-shadow-[0_-1px_2px_rgba(0,0,0,0.4)]"
          viewBox="0 0 320 12"
          preserveAspectRatio="none"
        >
          <path
            d="
              M 0,12 
              L 0,6 
              A 8,6 0 0,1 16,6 
              A 8,6 0 0,1 32,6 
              A 8,6 0 0,1 48,6 
              A 8,6 0 0,1 64,6 
              A 8,6 0 0,1 80,6 
              A 8,6 0 0,1 96,6 
              A 8,6 0 0,1 112,6 
              A 8,6 0 0,1 128,6 
              A 8,6 0 0,1 144,6 
              A 8,6 0 0,1 160,6 
              A 8,6 0 0,1 176,6 
              A 8,6 0 0,1 192,6 
              A 8,6 0 0,1 208,6 
              A 8,6 0 0,1 224,6 
              A 8,6 0 0,1 240,6 
              A 8,6 0 0,1 256,6 
              A 8,6 0 0,1 272,6 
              A 8,6 0 0,1 288,6 
              A 8,6 0 0,1 304,6 
              A 8,6 0 0,1 320,6 
              L 320,12 
              Z
            "
            className="fill-[#FAF8F5] dark:fill-[#1A1A1A] stroke-neutral-300 dark:stroke-neutral-700/80 stroke-[0.85] transition-colors duration-200"
          />
        </svg>
      </div>

      <Card className="rounded-none border-x border-t-0 border-b border-neutral-200/90 dark:border-neutral-800 bg-[#FAF8F5] dark:bg-[#1A1A1A] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] group-hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] dark:group-hover:shadow-[0_8px_25px_rgba(0,0,0,0.5)] transition-all duration-200">
        <CardContent className="p-5 flex flex-col">
          <AspectRatio
            ratio={16 / 10}
            className="relative border border-neutral-900 dark:border-neutral-700 overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-4 rounded-[1px]"
          >
            <img
              src={image}
              alt={title}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </AspectRatio>

          <div className="space-y-1 mb-1">
            <Badge
              variant="outline"
              className="rounded-none border-none p-0 h-auto shadow-none bg-transparent focus:outline-none focus:ring-0 focus:ring-offset-0 text-[10px] font-mono-clean font-light tracking-[0.25em] text-neutral-400 dark:text-neutral-500 uppercase"
            >
              {number}
            </Badge>

            <h2 className="font-inter font-bold tracking-tight text-xl text-neutral-950 dark:text-neutral-100 uppercase leading-snug group-hover:text-neutral-800 dark:group-hover:text-white transition-colors">
              {title}
            </h2>
          </div>

          <div className="relative my-4 flex items-center justify-between">
            <div className="absolute -left-5 w-4 h-5 rounded-r-full bg-white dark:bg-[#121212] border-r border-t border-b border-dashed border-neutral-300 dark:border-neutral-700 transition-colors duration-200" />

            <Separator className="w-full h-0 shrink-0 bg-transparent border-b border-dashed border-neutral-300 dark:border-neutral-700 transition-colors duration-200" />

            <div className="absolute -right-5 w-4 h-5 rounded-l-full bg-white dark:bg-[#121212] border-l border-t border-b border-dashed border-neutral-300 dark:border-neutral-700 transition-colors duration-200" />
          </div>

          <div>
            <p className="font-mono-clean text-xs font-light leading-relaxed text-neutral-700 dark:text-neutral-300">
              {note}
            </p>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
