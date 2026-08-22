import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// vitest.config's `test` block doesn't set `globals: true`, so Testing Library's
// auto-cleanup (which only registers itself against a *global* afterEach) never
// fires — without this, DOM from one test leaks into the next within the same file.
afterEach(cleanup);
