export type MetaStatus = "pending" | "ok" | "failed" | "no-permission";

export interface TicketMeta {
  image?: string;
  description?: string;
  siteName?: string;
  fetchedAt: number;
  status: MetaStatus;
}

export interface TicketOverride {
  title?: string;
  note?: string;
  image?: string;
}

export interface Ticket {
  id: string;
  no: number;
  url: string;
  title: string;
  folderId: string;
  folderPath: string[];
  dateAdded: number;
  meta?: TicketMeta;
  override?: TicketOverride;
}
