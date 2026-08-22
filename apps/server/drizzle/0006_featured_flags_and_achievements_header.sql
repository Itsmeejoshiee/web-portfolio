ALTER TYPE "public"."site_section_key" ADD VALUE 'achievements-header' BEFORE 'studio-mission';--> statement-breakpoint
ALTER TABLE "achievements" ADD COLUMN "featured" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_posts" DROP COLUMN "featured";