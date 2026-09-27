export default function SiteHeader() {
  return (
    <header className="w-full bg-white border-b border-neutral-100 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <span className="font-instrument text-2xl tracking-tight text-neutral-900">
            Bookmark Tickets
          </span>
          <span className="text-[11px] font-georgia italic text-neutral-400 font-light hidden sm:inline">
            visual display of your bookmarks
          </span>
        </div>
      </div>
    </header>
  );
}
