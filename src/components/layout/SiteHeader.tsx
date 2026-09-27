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

        <nav className="flex items-center gap-7 text-[11px] font-inter font-light tracking-widest uppercase text-neutral-500">
          <span className="text-neutral-900 border-b border-neutral-900 pb-0.5 font-normal">
            Collection
          </span>
          <span className="text-neutral-400">2026 Edition</span>
        </nav>
      </div>
    </header>
  );
}
