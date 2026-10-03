import type { Ticket } from "@/types/ticket";

type BookmarkNode = chrome.bookmarks.BookmarkTreeNode;

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

function collect(
  node: BookmarkNode,
  path: string[],
  out: Omit<Ticket, "no">[],
) {
  if (node.url) {
    out.push({
      id: node.id,
      url: node.url,
      title: node.title || hostnameOf(node.url),
      folderId: node.parentId ?? "",
      folderPath: path,
      dateAdded: node.dateAdded ?? 0,
    });
    return;
  }
  const childPath = node.title ? [...path, node.title] : path;
  node.children?.forEach((child) => collect(child, childPath, out));
}

export async function fetchTickets(): Promise<Ticket[]> {
  const tree = await chrome.bookmarks.getTree();
  const items: Omit<Ticket, "no">[] = [];
  tree.forEach((root) => collect(root, [], items));
  items.sort((a, b) => b.dateAdded - a.dateAdded);
  return items.map((item, i) => ({ ...item, no: i + 1 }));
}
