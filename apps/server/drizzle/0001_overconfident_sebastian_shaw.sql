-- toolbox_groups/site_sections move from free-text to a fixed enum of known rows.
-- Prior rows (if any) predate that invariant and can't be assumed to already match
-- the enum's values or be duplicate-free, so both tables are cleared before casting;
-- the INSERTs below repopulate them with the canonical seed content.
DELETE FROM "toolbox_groups";--> statement-breakpoint
DELETE FROM "site_sections";--> statement-breakpoint
CREATE TYPE "public"."toolbox_category" AS ENUM('languages', 'frameworks', 'tools');--> statement-breakpoint
CREATE TYPE "public"."site_section_key" AS ENUM('hero', 'contact', 'toolbox', 'templates-preview', 'work-header', 'templates-header', 'blog-header', 'studio-mission');--> statement-breakpoint
ALTER TABLE "toolbox_groups" ALTER COLUMN "category" SET DATA TYPE "public"."toolbox_category" USING "category"::"public"."toolbox_category";--> statement-breakpoint
ALTER TABLE "site_sections" ALTER COLUMN "section" SET DATA TYPE "public"."site_section_key" USING "section"::"public"."site_section_key";--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "content" text;--> statement-breakpoint
ALTER TABLE "toolbox_groups" ADD CONSTRAINT "toolbox_groups_category_unique" UNIQUE("category");--> statement-breakpoint
INSERT INTO "toolbox_groups" ("category", "items") VALUES
  ('languages', ARRAY['python', 'typescript', 'javascript', 'sql']),
  ('frameworks', ARRAY['react', 'next.js', 'node.js', 'tailwind', 'three.js', 'notion api']),
  ('tools', ARRAY['git / github', 'vercel', 'figma', 'notion'])
ON CONFLICT ("category") DO NOTHING;--> statement-breakpoint
INSERT INTO "site_sections" ("section", "body", "cta_label", "cta_url") VALUES
  ('hero', 'One short line of hero copy — who Josh helps and how his sites feel. ~90 characters.', NULL, NULL),
  ('contact', 'One warm closing line placeholder — invite the project conversation.', 'hello@[domain]', 'mailto:hello@example.com'),
  ('toolbox', 'One line placeholder — tools picked per project, not the other way around.', NULL, NULL),
  ('templates-preview', 'Intro line placeholder — systems from real freelance work.', NULL, NULL),
  ('work-header', 'Intro line placeholder — every project, client and personal, newest first.', NULL, NULL),
  ('templates-header', 'Intro line placeholder — systems built from real freelance work, free and paid.', NULL, NULL),
  ('blog-header', 'Intro line placeholder — notes on building for the web, freelancing, and community.', NULL, NULL),
  ('studio-mission', 'One-line studio mission placeholder — what Haraya makes and why.', NULL, NULL)
ON CONFLICT ("section") DO NOTHING;