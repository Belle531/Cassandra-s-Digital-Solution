#!/bin/bash
# S3 Upload Verification Script

echo "=== S3 Upload Files Verification ==="
echo "Checking build files in my-s3-app-cassandra directory..."
echo ""

cd "my-s3-app-cassandra" || exit 1

echo "📁 Files to upload to S3:"
echo "Root level:"
ls -la *.html 2>/dev/null || echo "❌ No HTML files found!"

echo ""
echo "Assets directory:"
ls -la assets/ 2>/dev/null || echo "❌ No assets directory found!"

echo ""
echo "📊 File sizes:"
find . -type f -exec ls -lh {} \; | awk '{print $5 "\t" $9}'

echo ""
echo "✅ These files should be uploaded to your S3 bucket root."
echo "🚀 Your bucket URL should be: http://my-s3-app-cassandra.s3-website-[region].amazonaws.com"