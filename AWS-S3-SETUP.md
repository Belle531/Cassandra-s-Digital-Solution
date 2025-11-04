# AWS S3 Bucket Configuration for Static Website Hosting

## 📋 Checklist: S3 Bucket Permissions Setup

### ✅ Step 1: Check Bucket Settings
1. **Go to AWS Console** → S3 → Your bucket (`my-s3-app-cassandra`)
2. **Navigate to**: Permissions tab
3. **Verify**: "Block all public access" is **DISABLED**
   - [ ] Block all public access: **OFF**
   - [ ] Block public access to buckets and objects granted through new access control lists (ACLs): **OFF**
   - [ ] Block public access to buckets and objects granted through any access control lists (ACLs): **OFF**
   - [ ] Block public access to buckets and objects granted through new public bucket or access point policies: **OFF**
   - [ ] Block public access to buckets and objects granted through any public bucket or access point policies: **OFF**

### ✅ Step 2: Bucket Policy Configuration
Add this bucket policy for your bucket `my-s3-app-cassandra`:

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

**How to add the bucket policy:**
1. Go to your bucket → **Permissions** tab
2. Scroll down to **Bucket policy**
3. Click **Edit**
4. Paste the policy above (with your bucket name)
5. Click **Save changes**

### ✅ Step 3: Static Website Hosting
1. Go to your bucket → **Properties** tab
2. Scroll down to **Static website hosting**
3. Click **Edit**
4. Select **Enable**
5. Set **Index document**: `index.html`
6. Set **Error document**: `index.html` (for React Router)
7. Click **Save changes**

### ✅ Step 4: Upload Your Built Files
Upload the contents of the `my-s3-app-cassandra` folder:
- `index.html`
- `assets/index-C8Df3_e9.css`
- `assets/index-Urs8n5-Z.js`

**Important**: Upload the **contents** of the folder, not the folder itself!

### ✅ Step 5: Test Your App
1. **Get your S3 URL**:
   - Go to Properties → Static website hosting
   - Copy the **Bucket website endpoint** URL
   - Format: `http://my-s3-app-cassandra.s3-website-us-east-1.amazonaws.com`

2. **Test in incognito/private browser**:
   - Open incognito/private window
   - Paste your S3 URL
   - Your React app should load without AWS credentials

### 🔧 Troubleshooting
- **403 Forbidden**: Check bucket policy and public access settings
- **Blank page**: Verify you uploaded `dist/` contents, not `src/` files
- **404 Not Found**: Check that `index.html` is in the root of your bucket
- **CSS/JS not loading**: Verify assets folder structure matches build output

### 📁 Expected Bucket Structure
```
my-s3-app-cassandra (bucket root)
├── index.html
└── assets/
    ├── index-C8Df3_e9.css
    └── index-Urs8n5-Z.js
```

### 🚀 Your Build Files Are Ready
Your project is configured to build directly into the `my-s3-app-cassandra` directory.
Run `npm run build` to generate fresh files for S3 upload.

---
## 📸 Deliverables Checklist
- [ ] Working public S3 bucket policy
- [ ] Live S3 URL that loads your React app
- [ ] Screenshot of app opened in incognito mode
- [ ] Bucket configured for static website hosting
- [ ] All build files uploaded to correct S3 structure