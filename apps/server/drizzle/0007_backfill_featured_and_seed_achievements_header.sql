-- Separate migration from 0006: Postgres forbids using a newly added enum value
-- ('achievements-header') in the same transaction that added it.
INSERT INTO "site_sections" ("section", "body") VALUES
  ('achievements-header', 'A few wins worth mentioning — hackathons, recognitions, the occasional trophy.')
ON CONFLICT ("section") DO NOTHING;
--> statement-breakpoint
-- Achievements previously had no featured flag, so the homepage showed every row.
-- Mark the existing rows featured (capped at 3) so the section isn't empty the
-- moment this ships.
UPDATE "achievements" SET "featured" = true WHERE "id" IN (
  SELECT "id" FROM "achievements" ORDER BY "id" LIMIT 3
);
