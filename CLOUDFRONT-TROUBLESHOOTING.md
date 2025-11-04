# CloudFront Troubleshooting Checklist

## 🚨 **CloudFront Not Working - Troubleshooting**

### **Step 1: Verify Core Settings**
Go to your CloudFront distribution (`d3csfiydbi6yey.cloudfront.net`) and check:

#### **Origins Tab:**
- [ ] **Origin Domain**: `my-s3-app-cassandra.s3.us-east-1.amazonaws.com` (NOT the website endpoint)
- [ ] **Protocol**: HTTPS only
- [ ] **Origin Access Control**: Your OAC is selected

#### **Behaviors Tab (Default Behavior):**
- [ ] **Path Pattern**: `*` (default)
- [ ] **Origin**: Points to your S3 bucket
- [ ] **Viewer Protocol Policy**: "Redirect HTTP to HTTPS"
- [ ] **Allowed HTTP Methods**: At least GET, HEAD
- [ ] **Default Root Object**: `index.html`

#### **Error Pages Tab:**
- [ ] **403 Error**: Response `/index.html`, HTTP Code `200`
- [ ] **404 Error**: Response `/index.html`, HTTP Code `200`

---

## 🔧 **Common Issues & Fixes**

### **Issue 1: Wrong Origin Domain**
❌ **Wrong**: `my-s3-app-cassandra.s3-website-us-east-1.amazonaws.com`
✅ **Correct**: `my-s3-app-cassandra.s3.us-east-1.amazonaws.com`

### **Issue 2: Missing Default Root Object**
- Go to **Behaviors** → Edit default behavior
- Set **Default Root Object**: `index.html`

### **Issue 3: OAC Not Selected**
- Go to **Origins** → Edit origin
- Make sure your OAC is selected in **Origin Access Control**

### **Issue 4: Bucket Policy Issues**
Check if your S3 bucket policy is exactly:
```json
{
    "Version": "2008-10-17",
    "Id": "PolicyForCloudFrontPrivateContent",
    "Statement": [
        {
            "Sid": "AllowCloudFrontServicePrincipal",
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudfront.amazonaws.com"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::my-s3-app-cassandra/*",
            "Condition": {
                "StringEquals": {
                  "AWS:SourceArn": "arn:aws:cloudfront::959975881533:distribution/EIOJPD2Q83G37"
                }
            }
        }
    ]
}
```

---

## 🧪 **Testing Steps**

### **Test 1: Check What Error You're Getting**
Open browser developer tools (F12) and visit:
```
https://d3csfiydbi6yey.cloudfront.net
```

**Look for error messages:**
- **403 Forbidden**: OAC or bucket policy issue
- **404 Not Found**: Missing default root object
- **502 Bad Gateway**: Origin connection issue
- **Blank page**: Check browser console for errors

### **Test 2: Try Direct File Access**
Test if CloudFront can access your files directly:
```
https://d3csfiydbi6yey.cloudfront.net/index.html
```

### **Test 3: Check S3 Files Are There**
Verify your files exist in S3:
- Go to S3 → `my-s3-app-cassandra` bucket
- Confirm `index.html` exists in root
- Confirm `assets/` folder exists with CSS/JS files

---

## 🚀 **Quick Fix Attempts**

### **Fix 1: Set Default Root Object**
1. CloudFront → Your distribution
2. **Behaviors** tab → Edit default behavior
3. **Default Root Object**: `index.html`
4. Save changes

### **Fix 2: Create Invalidation**
1. CloudFront → **Invalidations** tab
2. **Create invalidation**
3. **Object paths**: `/*`
4. This clears cache and forces fresh content

### **Fix 3: Check Files in S3**
Make sure these files exist in your S3 bucket:
```
my-s3-app-cassandra/
├── index.html
└── assets/
    ├── index-DqQ6mauS.js
    └── index-B2ChBQec.css
```

---

## 📋 **What to Check Next**
Please check these items and let me know what you find:

1. **What error do you see** when visiting the CloudFront URL?
2. **Is the default root object set** to `index.html`?
3. **Are your files still in the S3 bucket**?
4. **What's the exact error message** in browser developer tools?

Based on your answers, I can provide specific fixes!