import https from 'https';

const WWW_URL = 'https://www.workslate.ai/';
const APEX_URL = 'https://workslate.ai/';

function checkRedirect(url) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { method: 'HEAD' }, (res) => {
      resolve({
        statusCode: res.statusCode,
        headers: res.headers,
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function main() {
  try {
    console.log(`Checking redirect from ${WWW_URL} to ${APEX_URL}...`);
    
    const response = await checkRedirect(WWW_URL);
    
    if (response.statusCode >= 300 && response.statusCode < 400) {
      const location = response.headers.location;
      
      if (location === APEX_URL || location === APEX_URL.slice(0, -1)) {
        console.log('✅ Redirect is correctly configured');
        console.log(`   ${WWW_URL} → ${location}`);
        process.exit(0);
      } else {
        console.error(`❌ Redirect points to wrong location: ${location}`);
        console.error(`   Expected: ${APEX_URL}`);
        process.exit(1);
      }
    } else {
      console.error(`❌ No redirect found (status: ${response.statusCode})`);
      console.error('   Configure www to apex redirect at your hosting provider');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Failed to check redirect:', error.message);
    console.error('   This is an external deployment prerequisite');
    console.error('   Configure www to apex redirect at your hosting provider');
    process.exit(1);
  }
}

main();
