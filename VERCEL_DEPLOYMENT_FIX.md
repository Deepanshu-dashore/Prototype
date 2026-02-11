# Vercel Deployment Errors - Complete Fix Guide

## Problems Encountered

### 1. 405 Method Not Allowed

The login API endpoint was returning a **405 Method Not Allowed** error when deployed to Vercel:

```
POST https://prototype-alpha-six.vercel.app/api/auth/login 405 (Method Not Allowed)
```

### 2. JSdom ESM Module Error

After initial deployment, encountered an ESM/CommonJS compatibility error:

```
Error: Failed to load external module jsdom-8711bdfeef42ef3f:
Error [ERR_REQUIRE_ESM]: require() of ES Module
/var/task/node_modules/.pnpm/@exodus+bytes@1.11.0/node_modules/@exodus/bytes/encoding-lite.js
from /var/task/node_modules/.pnpm/html-encoding-sniffer@6.0.0/node_modules/html-encoding-sniffer/lib/html-encoding-sniffer.js
not supported.
```

## Root Causes

### Issue 1: Missing Runtime Configuration

Vercel's serverless functions require explicit runtime configuration. Without it, the platform may not properly recognize the route handlers.

### Issue 2: Missing CORS Headers

When deployed to production, API routes need proper CORS (Cross-Origin Resource Sharing) headers to accept requests from different origins.

### Issue 3: Missing OPTIONS Handler

Modern browsers send a preflight OPTIONS request before POST requests. Without an OPTIONS handler, these requests fail, causing the 405 error.

### Issue 4: JSdom Import at Module Level

The `isomorphic-dompurify` package imports `jsdom`, which has ESM/CommonJS conflicts in Vercel's serverless environment. Importing it at the module level causes the entire API route to fail, even if the sanitization function isn't used in that route.

## Solutions Applied

### ✅ 1. Updated `app/api/auth/login/route.js`

Added runtime configuration and OPTIONS handler:

```javascript
// Configure runtime for Vercel
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Handle OPTIONS request for CORS
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
```

**What this does:**

- `runtime = 'nodejs'`: Tells Vercel to use Node.js runtime (required for MongoDB connections)
- `dynamic = 'force-dynamic'`: Ensures the route is always treated as a serverless function
- `OPTIONS` handler: Responds to browser preflight requests with proper CORS headers

### ✅ 2. Created `vercel.json`

Added global CORS configuration for all API routes:

```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Credentials", "value": "true" },
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
        }
      ]
    }
  ]
}
```

### ✅ 3. Fixed `app/lib/security/sanitizer.js`

Changed from eager import to lazy loading of DOMPurify:

**Before:**

```javascript
import DOMPurify from "isomorphic-dompurify";

export function sanitizeHTML(dirtyHTML) {
  // ... uses DOMPurify
}
```

**After:**

```javascript
// Lazy load DOMPurify only when needed to avoid jsdom issues on Vercel
let DOMPurify = null;

export async function sanitizeHTML(dirtyHTML) {
  if (!dirtyHTML || typeof dirtyHTML !== "string") {
    return "";
  }

  // Lazy load DOMPurify only when sanitizeHTML is actually called
  if (!DOMPurify) {
    const module = await import("isomorphic-dompurify");
    DOMPurify = module.default;
  }

  // ... rest of the function
}
```

**Why this works:**

- The login route only uses `sanitizeEmail()` and `sanitizeText()`, which don't need DOMPurify
- By lazy-loading, `jsdom` is never imported unless `sanitizeHTML()` is actually called
- This prevents the ESM/CommonJS conflict on routes that don't need HTML sanitization

### ✅ 4. Updated `next.config.mjs`

Added server component external packages configuration:

```javascript
const nextConfig = {
  // ... other config

  // Exclude problematic packages from server component bundling
  serverComponentsExternalPackages: ["isomorphic-dompurify", "jsdom"],
};
```

**What this does:**

- Tells Next.js to treat these packages as external dependencies
- Prevents bundling issues with ESM/CommonJS modules
- Allows the packages to be loaded dynamically when needed

## Environment Variables Checklist

Make sure these are set in your Vercel dashboard:

1. **MONGODB_URL** - Your MongoDB connection string
2. **JWT_SECRET** - Your JWT secret key
3. **JWT_EXPIRES_IN** - Token expiration time (e.g., "1d")
4. **ADMIN_EMAIL** - Admin email address
5. **GOOGLE_SHEET_URL** - Google Sheets API URL

### How to Add Environment Variables in Vercel:

1. Go to your project dashboard on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable from your `.env` file
4. Make sure to select the appropriate environments (Production, Preview, Development)

## Testing the Fix

### Local Testing

```bash
pnpm dev
# Test at http://localhost:3000/api/auth/login
```

### After Deployment

1. Commit and push your changes:

   ```bash
   git add .
   git commit -m "Fix 405 and jsdom ESM errors on Vercel"
   git push
   ```

2. Vercel will automatically redeploy

3. Test the endpoint:
   ```bash
   curl -X POST https://prototype-alpha-six.vercel.app/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"testpass"}'
   ```

## Additional Recommendations

### 1. Apply Same Fix to Other API Routes

If you encounter 405 errors on other routes, apply the same pattern:

- Add `runtime` and `dynamic` exports
- Add an `OPTIONS` handler

### 2. Security Consideration

Currently using `'Access-Control-Allow-Origin': '*'` which allows all origins. For production, consider restricting to your domain:

```javascript
'Access-Control-Allow-Origin': 'https://yourdomain.com'
```

### 3. Monitor Vercel Logs

Check the Vercel deployment logs for any runtime errors:

- Go to your Vercel dashboard
- Click on your deployment
- View the **Functions** tab for serverless function logs

## Common Issues After Deployment

### Issue: Still getting 405

**Solution:** Clear browser cache and try in incognito mode

### Issue: MongoDB connection timeout

**Solution:** Ensure MONGODB_URL is set in Vercel environment variables

### Issue: JWT errors

**Solution:** Verify JWT_SECRET is set in Vercel environment variables

### Issue: JSdom errors on other routes

**Solution:** Apply the same lazy-loading pattern to any file that imports `isomorphic-dompurify`

## Summary of Changes

| File                            | Change                                 | Purpose                        |
| ------------------------------- | -------------------------------------- | ------------------------------ |
| `app/api/auth/login/route.js`   | Added runtime config + OPTIONS handler | Fix 405 error                  |
| `vercel.json`                   | Added CORS headers                     | Global API route configuration |
| `app/lib/security/sanitizer.js` | Lazy load DOMPurify                    | Fix jsdom ESM error            |
| `next.config.mjs`               | Added external packages config         | Prevent bundling issues        |

## Next Steps

1. ✅ Code changes applied
2. ⏳ Commit and push to trigger Vercel deployment
3. ⏳ Verify environment variables in Vercel dashboard
4. ⏳ Test the deployed endpoint
5. ⏳ Apply same fix to other API routes if needed

---

**Status:** Ready to deploy! 🚀
