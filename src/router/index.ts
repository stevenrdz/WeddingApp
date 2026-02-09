import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("../pages/Home.vue");
const Terms = () => import("../pages/Terms.vue");
const Privacy = () => import("../pages/Privacy.vue");
const Wedding = () => import("../pages/Wedding.vue");
const NotFound = () => import("../pages/NotFound.vue");
const AdminLayout = () => import("../pages/admin/AdminLayout.vue");
const AdminLogin = () => import("../pages/admin/Login.vue");
const AdminGenerate = () => import("../pages/admin/Generate.vue");
const AdminDrafts = () => import("../pages/admin/Drafts.vue");
const AdminSites = () => import("../pages/admin/Sites.vue");
const DraftPreview = () => import("../pages/admin/DraftPreview.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/terminos", name: "terms", component: Terms },
    { path: "/privacidad", name: "privacy", component: Privacy },
    { path: "/w", redirect: "/w/demo" },
    { path: "/w/:slug", name: "wedding", component: Wedding },
    { path: "/admin/login", name: "admin-login", component: AdminLogin },
    { path: "/preview/:draftId", name: "preview", component: DraftPreview, meta: { requiresPreviewKey: true } },
    {
      path: "/admin",
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        { path: "", redirect: "/admin/generate" },
        { path: "generate", name: "admin-generate", component: AdminGenerate },
        { path: "drafts", name: "admin-drafts", component: AdminDrafts },
        { path: "sites", name: "admin-sites", component: AdminSites }
      ]
    },
    { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

router.beforeEach((to) => {
  if (!to.meta?.requiresAuth) return true;
  const isAuthed = localStorage.getItem("weddingapp_admin") === "1";
  if (isAuthed) return true;
  return { name: "admin-login", query: { next: to.fullPath } };
});

router.beforeEach((to) => {
  if (!to.meta?.requiresPreviewKey) return true;
  const isAuthed = localStorage.getItem("weddingapp_admin") === "1";
  if (isAuthed) return true;
  const key = typeof to.query.key === "string" ? to.query.key : "";
  const expected = String(import.meta.env.VITE_ADMIN_PREVIEW_KEY || "");
  if (key && expected && key === expected) return true;
  return { name: "admin-login", query: { next: to.fullPath } };
});

export default router;
