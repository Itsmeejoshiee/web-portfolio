const BUTTONS = [
  { label: 'Bold', command: (chain) => chain.toggleBold(), isActive: (editor) => editor.isActive('bold') },
  { label: 'Italic', command: (chain) => chain.toggleItalic(), isActive: (editor) => editor.isActive('italic') },
  {
    label: 'H2',
    command: (chain) => chain.toggleHeading({ level: 2 }),
    isActive: (editor) => editor.isActive('heading', { level: 2 }),
  },
  {
    label: 'H3',
    command: (chain) => chain.toggleHeading({ level: 3 }),
    isActive: (editor) => editor.isActive('heading', { level: 3 }),
  },
  {
    label: 'Bullet list',
    command: (chain) => chain.toggleBulletList(),
    isActive: (editor) => editor.isActive('bulletList'),
  },
  {
    label: 'Numbered list',
    command: (chain) => chain.toggleOrderedList(),
    isActive: (editor) => editor.isActive('orderedList'),
  },
  { label: 'Quote', command: (chain) => chain.toggleBlockquote(), isActive: (editor) => editor.isActive('blockquote') },
];

export function EditorToolbar({ editor }) {
  if (!editor) return null;

  function setLink() {
    const url = window.prompt('Link URL');
    if (!url) return;
    editor.chain().focus().setLink({ href: url }).run();
  }

  return (
    <div className="flex flex-wrap gap-1.5 rounded-lg border-2 border-ink bg-paper p-1.5">
      {BUTTONS.map((button) => (
        <button
          key={button.label}
          type="button"
          onClick={() => button.command(editor.chain().focus()).run()}
          className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
            button.isActive(editor) ? 'bg-accent text-paper' : 'text-ink hover:bg-[var(--color-border)]'
          }`}
        >
          {button.label}
        </button>
      ))}
      <button
        type="button"
        onClick={setLink}
        className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
          editor.isActive('link') ? 'bg-accent text-paper' : 'text-ink hover:bg-[var(--color-border)]'
        }`}
      >
        Link
      </button>
    </div>
  );
}
