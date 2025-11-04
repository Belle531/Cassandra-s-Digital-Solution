#!/bin/bash
# S3 Bucket Test Script for my-s3-app-cassandra

echo "🔍 Testing S3 Bucket: my-s3-app-cassandra"
echo "=========================================="
echo ""

# Common S3 website endpoint formats
REGIONS=("us-east-1" "us-west-1" "us-west-2" "eu-west-1" "ap-southeast-1")

echo "🌐 Possible S3 website URLs for your bucket:"
echo ""

for region in "${REGIONS[@]}"; do
    if [ "$region" = "us-east-1" ]; then
        # us-east-1 has a different format
        echo "Region: $region"
        echo "URL: http://my-s3-app-cassandra.s3-website-us-east-1.amazonaws.com"
        echo "Alt: http://my-s3-app-cassandra.s3-website.us-east-1.amazonaws.com"
    else
        echo "Region: $region" 
        echo "URL: http://my-s3-app-cassandra.s3-website-$region.amazonaws.com"
    fi
    echo ""
done

echo "📋 Quick Test Checklist:"
echo "========================"
echo "1. ✅ Bucket name: my-s3-app-cassandra"
echo "2. ✅ Files uploaded:"
echo "   - index.html (in bucket root)"
echo "   - assets/index-C8Df3_e9.css"
echo "   - assets/index-Urs8n5-Z.js"
echo ""
echo "3. 🔧 Still need to verify:"
echo "   - [ ] Block public access: DISABLED"
echo "   - [ ] Bucket policy: APPLIED (see AWS-S3-SETUP.md)"
echo "   - [ ] Static website hosting: ENABLED"
echo ""
echo "4. 🧪 Test your app:"
echo "   - Open incognito/private browser"
echo "   - Visit your S3 website URL"
echo "   - Your React todo app should load"
echo ""
echo "🚨 If you get 403 Forbidden:"
echo "   - Check bucket policy is correctly applied"
echo "   - Verify public access settings"
echo ""
echo "🚨 If you get blank page:"
echo "   - Check files are in correct locations"
echo "   - Verify assets folder structure"