import { visit } from "unist-util-visit";
import type { Node } from "unist";
import type { VFile } from "vfile";

export type TocItem = {
    depth: number,
    text: string,
    slug: string,
}

export default function remarkCollectHeadings() {
    return (tree: Node, file: VFile) => {
        const toc: TocItem[] = [];

        visit(tree, 'heading', (node: any) => {
            if (node.depth >= 2 && node.depth <= 3) {
                const text = node.children
                    .filter((n: { type: string }) => n.type === 'text')
                    .map((n: { value: string }) => n.value)
                    .join('');
                toc.push({
                    depth: node.depth,
                    text,
                    slug: text
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[^\w-]/g, ''),
                });
            }
        });

        file.data.toc = toc;
    }
}