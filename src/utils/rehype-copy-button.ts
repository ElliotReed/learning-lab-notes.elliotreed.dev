import { visit } from 'unist-util-visit';

export default function rehypeCopyButton() {
    return (tree: any) => {
        visit(tree, 'element', (node) => {
            if (
                node.tagName === 'pre' &&
                node.children?.some((n: any) => n.tagName === 'code')
            ) {
                node.properties ??= {};
                const existing = node.properties?.className ?? [];
                console.log("existing: ", existing)
                const classList = Array.isArray(existing)
                    ? existing
                    : String(existing).split(/\s+/);

                node.properties.className = Array.from(new Set([
                    ...classList,
                    'copyable-code-block',
                ]));

                node.children.push({
                    type: 'element',
                    tagName: 'button',
                    properties: {
                        className: ['copy-button'],
                        onclick: 'copyCode(this)',
                    },
                    children: [{ type: 'text', value: 'Copy' }],
                });
            }
        });
    };
}
