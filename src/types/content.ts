import type { TocItem } from "@/plugins/remark-collect-headings";
import type { MarkdownHeading } from "astro";

export type RenderResultWithToc = {
    Content: any;
    headings?: MarkdownHeading[];
    toc?: TocItem[];
};