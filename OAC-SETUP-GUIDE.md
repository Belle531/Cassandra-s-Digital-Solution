# Origin Access Control (OAC) Setup

## 🔐 **Step-by-Step OAC Configuration**

### **1. CloudFront Origin Settings**
- **Origin Domain**: `my-s3-app-cassandra.s3.us-east-1.amazonaws.com`
- **Origin Access**: **Origin access control settings (recommended)**
- **Origin Access Control**: Create new OAC

### **2. Create New OAC**
When creating the OAC, use these settings:
- **Name**: `my-s3-app-cassandra-OAC`
- **Description**: `OAC for Cassandra's Digital Solutions S3 bucket`
- **Signing behavior**: **Sign requests (recommended)**
- **Origin type**: **S3**

### **3. Required S3 Bucket Policy**
After creating the OAC, CloudFront will provide a bucket policy. It should look like this:

```json
{
  "Version": "2012-10-17",
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
          "AWS:SourceArn": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
        }
      }
    }
  ]
}
```

### **4. How to Apply the Bucket Policy**
1. **Copy the policy** that CloudFront shows you
2. Go to **S3 Console** → **my-s3-app-cassandra** bucket
3. Go to **Permissions** tab
4. Scroll to **Bucket policy**
5. **Replace the existing policy** with the new OAC policy
6. Click **Save changes**

### **5. Additional CloudFront Settings**

**Behavior Settings:**
- **Viewer protocol policy**: **Redirect HTTP to HTTPS**
- **Allowed HTTP methods**: **GET, HEAD** (minimum)
- **Default root object**: **index.html**

**Error Pages (Critical for React):**
Add these custom error responses:
- **HTTP Error Code**: 403 → **Response Page Path**: `/index.html` → **HTTP Response Code**: 200
- **HTTP Error Code**: 404 → **Response Page Path**: `/index.html` → **HTTP Response Code**: 200

### **6. Important Notes**

⚠️ **Replace Your Current Bucket Policy**: The OAC policy will replace your current public read policy. This is more secure as it only allows CloudFront access.

⚠️ **S3 Website URL Will Stop Working**: Once you apply the OAC policy, your direct S3 website URL (`s3-website-us-east-1.amazonaws.com`) will no longer work. You'll only be able to access your app through CloudFront.

✅ **Benefits of OAC**:
- More secure (bucket not publicly accessible)
- HTTPS support through CloudFront
- Better access control
- CloudFront caching and performance

### **7. Testing**
After setup and propagation (10-15 minutes):
- **CloudFront URL**: `https://d3csfiydbi6yey.cloudfront.net` ✅ Should work with HTTPS
- **S3 Website URL**: `http://my-s3-app-cassandra.s3-website-us-east-1.amazonaws.com` ❌ Will return 403

---

## 🎯 **Quick Checklist**
- [ ] Create OAC in CloudFront
- [ ] Copy the bucket policy from CloudFront
- [ ] Apply bucket policy to S3 bucket
- [ ] Set default root object to index.html
- [ ] Configure error pages for 403/404
- [ ] Set viewer protocol to redirect HTTP to HTTPS
- [ ] Wait for propagation
- [ ] Test CloudFront URL with HTTPS