# CloudFront 403 Error - Troubleshooting Guide

## 🚨 Current Issue
**CloudFront URL**: `d1jfmo2m6e6dxl.cloudfront.net`  
**Error**: 403 Forbidden - Failed to load resource

## ✅ **Quick Fix: Use Direct S3 URL**
Instead of CloudFront, use your direct S3 website URL:

```
http://my-s3-app-cassandra.s3-website-us-east-1.amazonaws.com
```

This should work immediately since your S3 bucket is properly configured.

---

## 🔧 **If You Want to Fix CloudFront:**

### **Step 1: Check CloudFront Origin Settings**
1. Go to AWS Console → CloudFront → Your distribution
2. Go to **Origins** tab
3. **Origin Domain** should be:
   ```
   my-s3-app-cassandra.s3-website-us-east-1.amazonaws.com
   ```
   **NOT**: `my-s3-app-cassandra.s3.amazonaws.com`

### **Step 2: Check Origin Access Control (OAC)**

- If using OAC, you need additional S3 bucket policy
- **Easier**: Use S3 website endpoint as origin (no OAC needed)

### **Step 3: Check Behavior Settings**
- **Viewer Protocol Policy**: Redirect HTTP to HTTPS or Allow all
- **Allowed HTTP Methods**: GET, HEAD (minimum)
- **Cache Policy**: Managed-CachingOptimized

### **Step 4: Check Error Pages**
- Set up custom error pages for 403/404 to redirect to index.html

---

## 🎯 **Recommended Actions:**

### **Immediate Solution:**
Use direct S3 URL: `http://my-s3-app-cassandra.s3-website-us-east-1.amazonaws.com`

### **Long-term Solution:**
1. Update CloudFront origin to use S3 website endpoint
2. Wait 10-15 minutes for propagation
3. Test CloudFront URL again

---

## 📝 **Common CloudFront Issues:**
- ❌ **Wrong Origin**: Using S3 bucket URL instead of website URL
- ❌ **OAC Misconfiguration**: Complex permissions setup
- ❌ **Cache Issues**: Old 403 responses cached
- ❌ **Behavior Rules**: Incorrect HTTP method settings

## ✅ **Working Configuration:**
- **Origin**: `my-s3-app-cassandra.s3-website-us-east-1.amazonaws.com`
- **Protocol**: HTTP only (S3 website endpoints don't support HTTPS)
- **No OAC**: When using website endpoint
- **Default Root**: index.html