CREATE TABLE "contact" (
	"id" serial PRIMARY KEY NOT NULL,
	"body" text,
	"cta_label" text,
	"cta_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
INSERT INTO "contact" ("body", "cta_label", "cta_url") VALUES
  ('Got a project in mind? I''d love to hear about it.', 'joshgorospe03@gmail.com', 'mailto:joshgorospe03@gmail.com');
