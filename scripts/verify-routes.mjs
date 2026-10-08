const routes = [
  "http://localhost:3000/",
  "http://localhost:3000/features",
  "http://localhost:3000/why-playxim",
  "http://localhost:3000/creator",
  "http://localhost:3000/pricing",
  "http://localhost:3000/download",
  "http://localhost:3000/auth/sign-in",
  "http://localhost:3000/auth/sign-up",
  "http://localhost:3000/dashboard",
  "http://localhost:3000/dashboard/upload",
  "http://localhost:3000/dashboard/content",
  "http://localhost:3000/dashboard/folders",
  "http://localhost:3000/dashboard/playlists",
  "http://localhost:3000/dashboard/analytics",
  "http://localhost:3000/dashboard/earnings",
  "http://localhost:3000/dashboard/branding",
  "http://localhost:3000/watch/sample-video-1",
  "http://localhost:3000/c/wizzling",
  "http://localhost:3000/admin",
  "http://localhost:3000/admin/users",
  "http://localhost:3000/admin/content",
  "http://localhost:3000/admin/uploads",
  "http://localhost:3000/admin/storage",
  "http://localhost:3000/admin/earnings",
  "http://localhost:3000/admin/settings",
  "http://localhost:3000/api/content",
  "http://localhost:3000/api/folders",
  "http://localhost:3000/api/earnings/summary",
  "http://localhost:3000/api/analytics/overview"
];

async function checkRoutes() {
  console.log(`Checking ${routes.length} platform endpoints...`);
  let passed = 0;

  for (const url of routes) {
    try {
      const res = await fetch(url);
      if (res.status >= 200 && res.status < 400) {
        console.log(`[PASS] ${res.status} ${url}`);
        passed++;
      } else {
        console.log(`[FAIL] ${res.status} ${url}`);
      }
    } catch (e) {
      console.log(`[ERR]  ${url} (${e.message})`);
    }
  }

  console.log(`\nResult: ${passed}/${routes.length} routes responded successfully!`);
}

checkRoutes();
