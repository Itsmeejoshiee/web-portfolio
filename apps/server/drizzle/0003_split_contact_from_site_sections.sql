-- 'contact' now lives in its own table (see 0002) with the CTA fields it actually
-- uses; the old row is removed here so the enum below can drop that value.
DELETE FROM "site_sections" WHERE "section" = 'contact';--> statement-breakpoint
ALTER TABLE "site_sections" ALTER COLUMN "section" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."site_section_key";--> statement-breakpoint
CREATE TYPE "public"."site_section_key" AS ENUM('hero', 'toolbox', 'templates-preview', 'work-header', 'templates-header', 'blog-header', 'studio-mission');--> statement-breakpoint
ALTER TABLE "site_sections" ALTER COLUMN "section" SET DATA TYPE "public"."site_section_key" USING "section"::"public"."site_section_key";--> statement-breakpoint
ALTER TABLE "site_sections" DROP COLUMN "cta_label";--> statement-breakpoint
ALTER TABLE "site_sections" DROP COLUMN "cta_url";--> statement-breakpoint
UPDATE "site_sections" SET "body" = 'I build sites that feel as good as they work — from portfolios to full-stack products.' WHERE "section" = 'hero';--> statement-breakpoint
UPDATE "site_sections" SET "body" = 'The tools I actually reach for — picked to fit the project, not the other way around.' WHERE "section" = 'toolbox';--> statement-breakpoint
UPDATE "site_sections" SET "body" = 'Reusable systems and starter kits, pulled straight from real freelance work.' WHERE "section" = 'templates-preview';--> statement-breakpoint
UPDATE "site_sections" SET "body" = 'Every project I''ve shipped — client work and personal builds, newest first.' WHERE "section" = 'work-header';--> statement-breakpoint
UPDATE "site_sections" SET "body" = 'Templates and starter kits built from real freelance work, free and paid.' WHERE "section" = 'templates-header';--> statement-breakpoint
UPDATE "site_sections" SET "body" = 'Notes on building for the web, freelancing, and community.' WHERE "section" = 'blog-header';