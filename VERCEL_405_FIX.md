# 405 Method Not Allowed - Vercel Deployment Fix

## Problem

The login API endpoint was returning a **405 Method Not Allowed** error when deployed to Vercel at:

```
POST https://prototype-alpha-six.vercel.app/api/auth/login
```

## Root Causes

### 1. Missing Runtime Configuration

Vercel's serverless functions require explicit runtime configuration. Without it, the platform may not properly recognize the route handlers.

### 2. Missing CORS Headers

When deployed to production, API routes need proper CORS (Cross-Origin Resource Sharing) headers to accept requests from different origins.

### 3. Missing OPTIONS Handler

Modern browsers send a preflight OPTIONS request before POST requests. Without an OPTIONS handler, these requests fail, causing the 405 error.

## Solutions Applied

### ✅ 1. Updated `app/api/auth/login/route.js`

Added the following configurations:

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
        { "key": "Access-Control-Allow-Headers", "value": "..." }
      ]
    }
  ]
}
```

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
   git commit -m "Fix 405 error on login API route"
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

## Next Steps

1. ✅ Code changes applied
2. ⏳ Commit and push to trigger Vercel deployment
3. ⏳ Verify environment variables in Vercel dashboard
4. ⏳ Test the deployed endpoint
5. ⏳ Apply same fix to other API routes if needed

---

**Status:** Ready to deploy! 🚀
