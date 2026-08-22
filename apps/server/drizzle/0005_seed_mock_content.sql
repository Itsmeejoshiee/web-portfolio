-- Mock content for the CRUD resources that previously only had hardcoded frontend
-- data (projects, templates, achievements) or no seed at all (blog_posts). All fake,
-- meant to be replaced with real content via the admin CMS.
INSERT INTO "templates" ("title", "description", "price", "url", "featured") VALUES
  ('Portfolio CMS Starter', 'The exact Notion + Next.js system powering this site, ready to duplicate.', 'free', 'https://notion.so/templates/portfolio-cms-starter', true),
  ('Freelance Invoice Tracker', 'Track proposals, invoices, and payments for freelance clients in one board.', '₱ 499', 'https://notion.so/templates/freelance-invoice-tracker', true),
  ('Content Calendar Kit', 'Plan and schedule blog or social content with a drag-and-drop calendar.', '₱ 349', 'https://notion.so/templates/content-calendar-kit', true),
  ('Personal CRM', 'Keep track of contacts, follow-ups, and intros without a bloated CRM.', 'free', 'https://notion.so/templates/personal-crm', false),
  ('Habit & Goals Tracker', 'A lightweight system for tracking habits and quarterly goals.', '₱ 199', 'https://notion.so/templates/habit-goals-tracker', false),
  ('Reading List', 'Save articles and books to read later, tagged and rated.', 'free', 'https://notion.so/templates/reading-list', false);
--> statement-breakpoint
INSERT INTO "projects" ("title", "excerpt", "tags", "featured") VALUES
  ('Haraya Studio Site', 'A bespoke studio site and CMS for a two-person creative agency.', ARRAY['next.js', 'cms'], true),
  ('Boutique Shopfront', 'A fast, mobile-first storefront for a small clothing boutique.', ARRAY['react', 'e-commerce'], true),
  ('Interactive Thesis Showcase', 'A 3D interactive showcase built for a university capstone project.', ARRAY['webgl', 'school'], true),
  ('Local Newsroom Publication', 'A lightweight publishing system for a community newsroom.', ARRAY['publication', 'cms'], false),
  ('Neighborhood Bakery Site', 'A one-page ordering site for a neighborhood bakery.', ARRAY['small business'], false),
  ('Youth Mentorship Org Site', 'A donation and volunteer sign-up site for a youth mentorship nonprofit.', ARRAY['org', 'nonprofit'], false);
--> statement-breakpoint
INSERT INTO "achievements" ("title", "event", "description", "category") VALUES
  ('Best Beginner Hack', 'CodeFest Manila · 2023', 'Won for a budgeting app built in 24 hours with two teammates.', 'hackathon'),
  ('Top 10 Finalist', 'DevCon Hackathon · 2024', 'Placed top 10 out of 80 teams building for local NGOs.', 'hackathon'),
  ('Dean''s Lister', 'University of the Philippines · 2023', 'Recognized for academic performance in the College of Engineering.', 'university');
--> statement-breakpoint
INSERT INTO "blog_posts" ("title", "date", "read_time_minutes", "tag", "content", "featured") VALUES
  ('Why I rebuilt this site on Notion and a real backend', '2026-01-15', 6, 'notion', 'A walkthrough of moving from static placeholder content to a small NestJS + Postgres backend the Notion-style admin actually edits.', true),
  ('Freelancing lessons from my first year', '2026-02-20', 8, 'freelancing', 'What I wish I knew before taking on my first few freelance clients, from scoping to invoicing.', false),
  ('Small habits that made my code reviews better', '2026-03-10', 5, 'process', 'A few small changes to how I read and leave feedback on pull requests that made a real difference.', false);
