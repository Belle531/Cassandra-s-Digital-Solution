# S3 Bucket Policy for my-s3-app-cassandra

## 🎯 Exact Bucket Policy for Your Bucket

Copy and paste this **exact** bucket policy into your AWS S3 Console:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-s3-app-cassandra/*"
    }
  ]
}
```

## 📂 Your Current File Structure (✅ Confirmed)

```
my-s3-app-cassandra (S3 bucket root)
├── index.html
└── assets/
    ├── index-C8Df3_e9.css
    └── index-Urs8n5-Z.js
```

## 🔧 AWS Console Steps to Complete

### 1. Apply Bucket Policy
1. Go to AWS S3 Console
2. Click on bucket: `my-s3-app-cassandra`
3. Go to **Permissions** tab
4. Scroll to **Bucket policy** section
5. Click **Edit**
6. Paste the JSON policy above
7. Click **Save changes**

### 2. Disable Public Access Block
1. In the same **Permissions** tab
2. Find **Block public access (bucket settings)**
3. Click **Edit**
4. **Uncheck all 4 boxes** (disable all blocks)
5. Type `confirm` when prompted
6. Click **Confirm**

### 3. Enable Static Website Hosting
1. Go to **Properties** tab
2. Scroll to **Static website hosting**
3. Click **Edit**
4. Select **Enable**
5. Index document: `index.html`
6. Error document: `index.html`
7. Click **Save changes**

## 🌐 Your Website URL
After completing the steps above, your website will be available at one of these URLs (check your AWS region):

- **us-east-1**: `http://my-s3-app-cassandra.s3-website-us-east-1.amazonaws.com`
- **us-west-1**: `http://my-s3-app-cassandra.s3-website-us-west-1.amazonaws.com`  
- **us-west-2**: `http://my-s3-app-cassandra.s3-website-us-west-2.amazonaws.com`
- **eu-west-1**: `http://my-s3-app-cassandra.s3-website-eu-west-1.amazonaws.com`

## ✅ Testing Checklist
- [ ] Bucket policy applied
- [ ] Public access blocks disabled
- [ ] Static website hosting enabled
- [ ] Website loads in incognito browser
- [ ] React todo app functions correctly
- [ ] CSS styles are applied
- [ ] JavaScript interactions work

## 📸 Deliverable: Screenshot
Take a screenshot of your React todo app running from the S3 URL in an incognito browser window to prove it works without AWS credentials.

## CloudFront Bucket Code Distribution

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
                    "AWS:SourceArn": "arn:aws:cloudfront::959975881533:distribution/E3I2LKGEJL9XB0"
                }
            }
        }
    ]
}