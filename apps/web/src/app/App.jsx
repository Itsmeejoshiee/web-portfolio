import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppLayout } from './AppLayout';

// Route-level code splitting: only HomePage pulls in the three.js sticker
// scene, so Work/Templates/Blog shouldn't have to load that chunk at all.
const HomePage = lazy(() => import('../features/home/HomePage').then((m) => ({ default: m.HomePage })));
const WorkPage = lazy(() => import('../features/work/WorkPage').then((m) => ({ default: m.WorkPage })));
const TemplatesPage = lazy(() =>
  import('../features/templates/TemplatesPage').then((m) => ({ default: m.TemplatesPage })),
);
const BlogPage = lazy(() => import('../features/blog/BlogPage').then((m) => ({ default: m.BlogPage })));
const BlogPostPage = lazy(() => import('../features/blog/BlogPostPage').then((m) => ({ default: m.BlogPostPage })));
const AchievementsPage = lazy(() =>
  import('../features/home/AchievementsPage').then((m) => ({ default: m.AchievementsPage })),
);
const AdminApp = lazy(() => import('../features/admin/AdminApp').then((m) => ({ default: m.AdminApp })));

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={null}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/work"
            element={
              <Suspense fallback={null}>
                <WorkPage />
              </Suspense>
            }
          />
          <Route
            path="/templates"
            element={
              <Suspense fallback={null}>
                <TemplatesPage />
              </Suspense>
            }
          />
          <Route
            path="/blog"
            element={
              <Suspense fallback={null}>
                <BlogPage />
              </Suspense>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <Suspense fallback={null}>
                <BlogPostPage />
              </Suspense>
            }
          />
          <Route
            path="/achievements"
            element={
              <Suspense fallback={null}>
                <AchievementsPage />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={null}>
              <AdminApp />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
