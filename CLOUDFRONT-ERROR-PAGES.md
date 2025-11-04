# CloudFront Error Pages Setup

## 📍 **Where to Find Error Pages in CloudFront**

### **Navigation Path:**
1. **AWS Console** → **CloudFront**
2. **Click your distribution** (`d3csfiydbi6yey.cloudfront.net`)
3. **Click "Error pages" tab**

### **Tab Layout:**
```
┌─────────┬─────────┬───────────┬─────────────┬──────────────┬──────┐
│ General │ Origins │ Behaviors │ Error pages │ Invalidations │ Tags │
└─────────┴─────────┴───────────┴─────────────┴──────────────┴──────┘
                                      ↑
                                 Click here
```

---

## ➕ **Adding Custom Error Responses**

### **Step 1: Create First Error Response**
Click **"Create custom error response"** button

**Settings for 403 Error:**
- **HTTP Error Code**: `403`
- **Error Caching Minimum TTL (seconds)**: `300`
- **Customize Error Response**: ☑️ **Yes**
- **Response Page Path**: `/index.html`
- **HTTP Response Code**: `200`

**Click "Create custom error response"**

### **Step 2: Create Second Error Response**
Click **"Create custom error response"** again

**Settings for 404 Error:**
- **HTTP Error Code**: `404`
- **Error Caching Minimum TTL (seconds)**: `300`
- **Customize Error Response**: ☑️ **Yes**
- **Response Page Path**: `/index.html`
- **HTTP Response Code**: `200`

**Click "Create custom error response"**

---

## 🎯 **Why These Error Pages Are Important**

### **For React Single Page Applications:**
- **403/404 errors** happen when users navigate directly to routes like `/about`, `/contact`
- **Without error pages**: Users see ugly error messages
- **With error pages**: Users see your React app, which handles routing

### **What This Does:**
1. User visits `https://d3csfiydbi6yey.cloudfront.net/some-route`
2. CloudFront doesn't find `/some-route` file → Returns 404
3. Custom error page serves `/index.html` instead
4. React app loads and handles the route properly

---

## ✅ **After Setup:**
You should see two custom error responses in the Error pages tab:
- **403 Forbidden** → `/index.html` (200)
- **404 Not Found** → `/index.html` (200)

---

## ⏰ **Important:**
- Changes take **10-15 minutes** to propagate
- Don't forget to wait before testing
- Your React app routing will work properly after this setup