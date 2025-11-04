# HTTPS CloudFront Configuration for S3

## 🔐 **HTTPS Solution: Use S3 Bucket as Origin**

Since S3 website endpoints only support HTTP, use this configuration for HTTPS:

### **CloudFront Origin Settings:**
```
Origin Domain: my-s3-app-cassandra.s3.us-east-1.amazonaws.com
Protocol: HTTPS Only
Origin Access Control: Create new OAC
```

### **Required S3 Bucket Policy Update:**
Add this policy to your S3 bucket (replaces the current one):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-s3-app-cassandra/*"
    },
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-s3-app-cassandra/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
        }
      }
    }
  ]
}
```

### **CloudFront Behavior Settings:**
- **Viewer Protocol Policy**: Redirect HTTP to HTTPS
- **Allowed HTTP Methods**: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
- **Default Root Object**: index.html

### **CloudFront Error Pages (Important for React Router):**
Add custom error pages:
- **403 Forbidden** → Response: /index.html, HTTP Code: 200
- **404 Not Found** → Response: /index.html, HTTP Code: 200

---

## 🎯 **Step-by-Step Configuration:**

### **Step 1: Update CloudFront Origin**
1. AWS Console → CloudFront → Your distribution
2. Origins tab → Edit origin
3. **Origin Domain**: `my-s3-app-cassandra.s3.us-east-1.amazonaws.com`
4. **Protocol**: HTTPS only
5. **Origin Access Control**: Create new OAC

### **Step 2: Update S3 Bucket Policy**
1. S3 Console → Your bucket → Permissions
2. Replace bucket policy with the JSON above
3. Replace `YOUR_ACCOUNT_ID` and `YOUR_DISTRIBUTION_ID` with actual values

### **Step 3: Configure Error Pages**
1. CloudFront → Error pages tab
2. Create custom error response for 403 and 404
3. Both should return `/index.html` with 200 status

### **Step 4: Update Behaviors**
1. CloudFront → Behaviors tab
2. Edit default behavior
3. Set viewer protocol policy to "Redirect HTTP to HTTPS"

---

## ⚡ **Alternative: Keep Both URLs**

You can also keep both options:

- **HTTP**: `http://my-s3-app-cassandra.s3-website-us-east-1.amazonaws.com`
- **HTTPS**: `https://d3csfiydbi6yey.cloudfront.net` (after proper configuration)

---

## 🚨 **Important Notes:**

1. **OAC Configuration**: When using S3 bucket as origin (not website endpoint), you need Origin Access Control
2. **Error Pages**: Essential for React single-page applications
3. **Propagation Time**: Changes take 10-15 minutes to propagate
4. **Account ID**: Find in AWS Console top-right, or use AWS CLI: `aws sts get-caller-identity`