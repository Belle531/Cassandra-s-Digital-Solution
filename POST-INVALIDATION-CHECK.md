# Post-Invalidation Troubleshooting

## ✅ **Invalidation Created Successfully**
- **ID**: I5KVW1DSJ8U9C4RTI6HFU1P8JJ
- **Pattern**: `/*` (clears all cache)
- **Status**: Check if "Completed"

---

## 🧪 **Test After Invalidation Completes**

### **Wait for "Completed" Status**
1. CloudFront → Invalidations tab
2. Wait until status shows "Completed"
3. Then test your URLs

### **Test URLs:**
```
# Main app
https://d3csfiydbi6yey.cloudfront.net

# Direct file access
https://d3csfiydbi6yey.cloudfront.net/index.html

# Asset test
https://d3csfiydbi6yey.cloudfront.net/assets/index-DqQ6mauS.js
```

---

## 🔧 **If Still Not Working After Invalidation**

### **Double-Check Critical Settings:**

#### **1. Default Root Object (Most Common Issue)**
- CloudFront → Behaviors tab
- Edit default behavior
- **Default Root Object**: `index.html` ← Must be set!

#### **2. Origin Domain**
- CloudFront → Origins tab
- **Origin Domain**: `my-s3-app-cassandra.s3.us-east-1.amazonaws.com`
- **NOT**: `my-s3-app-cassandra.s3-website-us-east-1.amazonaws.com`

#### **3. Viewer Protocol Policy**
- CloudFront → Behaviors tab
- **Viewer Protocol Policy**: "Redirect HTTP to HTTPS"

#### **4. Origin Access Control**
- CloudFront → Origins tab
- **Origin Access Control**: Your OAC should be selected

---

## 🚨 **Common Issues After Invalidation**

### **Issue 1: Missing Default Root Object**
**Symptom**: CloudFront URL returns 403/404
**Fix**: Set default root object to `index.html`

### **Issue 2: Files Not in S3**
**Symptom**: 404 Not Found errors
**Fix**: Re-upload your build files to S3

### **Issue 3: Wrong Origin Type**
**Symptom**: Various errors
**Fix**: Use S3 bucket origin, not website endpoint

### **Issue 4: Bucket Policy Issues**
**Symptom**: 403 Forbidden errors
**Fix**: Verify OAC bucket policy is correct

---

## 📋 **Next Steps**

1. **Wait** for invalidation to complete
2. **Test** your CloudFront URL
3. **If still not working**, check these:
   - [ ] Default root object set to `index.html`
   - [ ] Files exist in S3 bucket
   - [ ] Origin domain is correct
   - [ ] OAC is properly configured

4. **Tell me exactly what error/behavior you see**

---

## 🎯 **Most Likely Fix**

Based on common issues, try this:
1. CloudFront → Your distribution
2. **Behaviors** tab → Edit default behavior  
3. **Default Root Object**: Set to `index.html`
4. Save changes
5. Wait 5-10 minutes
6. Test again

**The default root object is the #1 missed setting!** 🎯