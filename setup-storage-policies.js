import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client - make sure to use the service role key
const supabaseUrl = 'https://romouirjhrpetvvaitgb.supabase.co';
// Use the anon key from the client.ts file
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvbW91aXJqaHJwZXR2dmFpdGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMjA0NTQsImV4cCI6MjA2NDg5NjQ1NH0.CiYbINr12LkuVeR_yYRhsCKe-WL2SN0PGe5kHFoO4vU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupStoragePolicies() {
  console.log('🚀 Setting up storage policies for release-assets bucket...');
  
  try {
    // 1. Create the bucket if it doesn't exist
    console.log('📁 Creating bucket...');
    const { error: bucketError } = await supabase.storage.createBucket('release-assets', {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'audio/mpeg'],
      fileSizeLimit: 50 * 1024 * 1024 // 50MB
    });
    
    if (bucketError && !bucketError.message.includes('already exists')) {
      console.error('❌ Error creating bucket:', bucketError);
    } else {
      console.log('✅ Bucket created or already exists');
    }

    // 2. Set the bucket to public
    console.log('🔓 Setting bucket to public...');
    const { error: updateBucketError } = await supabase.storage.updateBucket('release-assets', {
      public: true,
    });
    
    if (updateBucketError) {
      console.error('❌ Error updating bucket:', updateBucketError);
    } else {
      console.log('✅ Bucket set to public');
    }

    // Test an upload to see if it works
    console.log('🧪 Testing upload to the bucket...');
    
    // Create a small test file (1x1 transparent pixel)
    const base64Image = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
    const testImage = Uint8Array.from(atob(base64Image), c => c.charCodeAt(0));
    
    // Try to upload
    const testFileName = `test-${Date.now()}.png`;
    const { error: uploadError, data: uploadData } = await supabase.storage
      .from('release-assets')
      .upload(testFileName, testImage, {
        contentType: 'image/png'
      });
    
    if (uploadError) {
      console.error('❌ Test upload failed:', uploadError);
      console.log('⚠️ This means the bucket policies are not set correctly.');
      console.log('⚠️ You may need to manually update the policies in the Supabase dashboard.');
      
      // Log detailed instructions
      console.log('\n🔧 Manual fix instructions:');
      console.log('1. Go to your Supabase dashboard: https://app.supabase.com/project/romouirjhrpetvvaitgb/storage/buckets');
      console.log('2. Click on the "release-assets" bucket');
      console.log('3. Go to the "Policies" tab');
      console.log('4. Add these policies:');
      console.log('   - SELECT (public): Enable public read access');
      console.log('   - INSERT (authenticated): Allow authenticated users to upload');
      console.log('   - UPDATE (authenticated): Allow authenticated users to update their own objects');
      console.log('   - DELETE (authenticated): Allow authenticated users to delete their own objects');
    } else {
      console.log('✅ Test upload successful:', uploadData);
      
      // Clean up test file
      const { error: deleteError } = await supabase.storage
        .from('release-assets')
        .remove([testFileName]);
        
      if (deleteError) {
        console.warn('⚠️ Warning: Could not delete test file:', deleteError);
      } else {
        console.log('🧹 Test file cleaned up successfully');
      }
      
      console.log('🎉 Storage policies are working correctly!');
    }
    
  } catch (error) {
    console.error('💥 Setup failed:', error);
  }
}

// Run the setup
setupStoragePolicies(); 