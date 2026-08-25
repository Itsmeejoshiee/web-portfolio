import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { FieldInput } from '../admin/resources/FieldInput';
import { useResourceMutations } from '../admin/resources/useResourceMutations';
import { useBlogPost } from './hooks/useBlogPost';
import { PostBody } from './components/PostBody';
import { EditorToolbar } from './components/EditorToolbar';

const METADATA_FIELDS = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'readTimeMinutes', label: 'Read time (minutes)', type: 'number', required: true },
  { name: 'tag', label: 'Tag', type: 'text', required: true },
  { name: 'imageUrl', label: 'Image URL', type: 'text' },
];

const EMPTY_FIELDS = { title: '', date: '', readTimeMinutes: '', tag: '', imageUrl: '' };

function tabClassName(isActive) {
  return `rounded-full border-2 border-ink px-4 py-2 text-sm font-medium transition-transform duration-150 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02] ${
    isActive ? 'bg-accent text-paper' : 'bg-paper text-ink'
  }`;
}

export function BlogPostEditorPage({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { post, loading: loadingPost } = useBlogPost(mode === 'edit' ? id : undefined);
  const { create, update, submitting, error } = useResourceMutations('blog-posts');
  const [fields, setFields] = useState(EMPTY_FIELDS);
  const [contentHtml, setContentHtml] = useState('');
  const [activeTab, setActiveTab] = useState('edit');
  const [, forceToolbarUpdate] = useState(0);

  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: '',
    immediatelyRender: false,
    onUpdate: ({ editor: editorInstance }) => setContentHtml(editorInstance.getHTML()),
    onTransaction: () => forceToolbarUpdate((tick) => tick + 1),
  });

  useEffect(() => {
    if (mode !== 'edit' || !post) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncs the fetched post into editable form state
    setFields({
      title: post.title,
      date: post.date,
      readTimeMinutes: post.readTimeMinutes,
      tag: post.tag,
      imageUrl: post.imageUrl ?? '',
    });
    setContentHtml(post.content ?? '');
    editor?.commands.setContent(post.content ?? '');
  }, [mode, post, editor]);

  function handleFieldChange(name, value) {
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = { ...fields, readTimeMinutes: Number(fields.readTimeMinutes), content: contentHtml };
    if (mode === 'create') {
      const created = await create(payload);
      navigate(`/admin/blog-posts/${created.id}/edit`);
    } else {
      await update(id, payload);
    }
  }

  if (mode === 'edit' && loadingPost) {
    return <p className="px-6 py-12 text-center font-mono text-sm text-faint">Loading…</p>;
  }

  const previewPost = { ...fields, readTimeMinutes: Number(fields.readTimeMinutes) || 0, content: contentHtml };

  return (
    <div>
      <h1 className="font-display mb-8 text-3xl font-semibold">
        {mode === 'create' ? 'New blog post' : 'Edit blog post'}
        <span className="text-accent">.</span>
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div role="tablist" aria-label="Blog post editor view" className="flex gap-2">
          <button
            type="button"
            role="tab"
            id="editor-tab-edit"
            aria-selected={activeTab === 'edit'}
            aria-controls="editor-panel-edit"
            onClick={() => setActiveTab('edit')}
            className={tabClassName(activeTab === 'edit')}
          >
            Edit
          </button>
          <button
            type="button"
            role="tab"
            id="editor-tab-preview"
            aria-selected={activeTab === 'preview'}
            aria-controls="editor-panel-preview"
            onClick={() => setActiveTab('preview')}
            className={tabClassName(activeTab === 'preview')}
          >
            Preview
          </button>
        </div>

        {activeTab === 'edit' && (
          <div
            id="editor-panel-edit"
            role="tabpanel"
            aria-labelledby="editor-tab-edit"
            className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]"
          >
            <div className="raised-card flex flex-col gap-5 p-6">
              {METADATA_FIELDS.map((field) => (
                <FieldInput key={field.name} field={field} value={fields[field.name]} onChange={handleFieldChange} />
              ))}
            </div>
            <div className="raised-card flex flex-col gap-1.5 p-6">
              <span className="font-mono text-[11px] tracking-[0.06em] text-faint uppercase">Content</span>
              <EditorToolbar editor={editor} />
              <EditorContent
                editor={editor}
                className="prose min-h-[480px] rounded-lg border-2 border-ink bg-paper px-3.5 py-2.5 text-sm [&_.ProseMirror]:outline-none"
              />
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <div id="editor-panel-preview" role="tabpanel" aria-labelledby="editor-tab-preview" className="raised-card overflow-auto p-6">
            <PostBody post={previewPost} />
          </div>
        )}

        {error && <p className="text-sm text-accent">{error.message}</p>}
        <div>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full border-2 border-ink bg-accent px-6 py-3 text-sm font-semibold text-paper shadow-[3px_3px_0_var(--color-ink)] transition-transform duration-150 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.04] active:scale-[0.96] disabled:opacity-50"
          >
            {submitting ? 'Saving…' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
