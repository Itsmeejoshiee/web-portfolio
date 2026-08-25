import { Bold, Italic, Heading2, Heading3, List, ListOrdered, Quote, Link as LinkIcon } from 'lucide-react';

const GROUPS = [
  [
    { label: 'Bold', icon: Bold, command: (chain) => chain.toggleBold(), isActive: (editor) => editor.isActive('bold') },
    { label: 'Italic', icon: Italic, command: (chain) => chain.toggleItalic(), isActive: (editor) => editor.isActive('italic') },
  ],
  [
    {
      label: 'Heading 2',
      icon: Heading2,
      command: (chain) => chain.toggleHeading({ level: 2 }),
      isActive: (editor) => editor.isActive('heading', { level: 2 }),
    },
    {
      label: 'Heading 3',
      icon: Heading3,
      command: (chain) => chain.toggleHeading({ level: 3 }),
      isActive: (editor) => editor.isActive('heading', { level: 3 }),
    },
  ],
  [
    {
      label: 'Bullet list',
      icon: List,
      command: (chain) => chain.toggleBulletList(),
      isActive: (editor) => editor.isActive('bulletList'),
    },
    {
      label: 'Numbered list',
      icon: ListOrdered,
      command: (chain) => chain.toggleOrderedList(),
      isActive: (editor) => editor.isActive('orderedList'),
    },
  ],
  [
    { label: 'Quote', icon: Quote, command: (chain) => chain.toggleBlockquote(), isActive: (editor) => editor.isActive('blockquote') },
  ],
];

function ToolbarButton({ label, icon: Icon, active, onClick }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-md p-1.5 transition-colors ${
        active ? 'bg-accent text-paper' : 'text-ink hover:bg-[var(--color-border)]'
      }`}
    >
      <Icon size={16} strokeWidth={2.25} />
    </button>
  );
}

export function EditorToolbar({ editor }) {
  if (!editor) return null;

  function setLink() {
    const url = window.prompt('Link URL');
    if (!url) return;
    editor.chain().focus().setLink({ href: url }).run();
  }

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 rounded-lg border-2 border-ink bg-paper p-1.5">
      {GROUPS.map((group, groupIndex) => (
        <div key={groupIndex} className="flex items-center gap-1 border-r border-[var(--color-border)] pr-1 last:border-r-0 last:pr-0">
          {group.map((button) => (
            <ToolbarButton
              key={button.label}
              label={button.label}
              icon={button.icon}
              active={button.isActive(editor)}
              onClick={() => button.command(editor.chain().focus()).run()}
            />
          ))}
        </div>
      ))}
      <ToolbarButton label="Link" icon={LinkIcon} active={editor.isActive('link')} onClick={setLink} />
    </div>
  );
}
