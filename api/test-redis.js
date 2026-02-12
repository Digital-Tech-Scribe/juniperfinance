const { createClient } = require('redis');

module.exports = async (req, res) => {
  const url = process.env.REDIS_URL;
  if (!url) {
    return res.status(500).json({ error: 'REDIS_URL not set' });
  }

  const client = createClient({
    url,
    socket: {
      connectTimeout: 5000,
      reconnectStrategy: false
    }
  });

  client.on('error', (err) => console.error('[Redis Diagnostic] Client Error:', err));

  try {
    console.log('[Redis Diagnostic] Connecting to:', url.replace(/:[^:]*@/, ':***@')); // Hide password
    
    // Race: connect vs 5s timeout
    await Promise.race([
      client.connect(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout (5s)')), 5000))
    ]);

    console.log('[Redis Diagnostic] Connected! Testing SET/GET...');
    
    const key = 'diagnostic_test_' + Date.now();
    await client.set(key, 'ok', { EX: 60 });
    const val = await client.get(key);
    
    await client.disconnect();
    
    return res.json({ 
      status: 'success', 
      message: 'Redis connection working', 
      testValue: val,
      url: url.replace(/:[^:]*@/, ':***@') 
    });

  } catch (error) {
    console.error('[Redis Diagnostic] FAILED:', error);
    if (client.isOpen) await client.disconnect();
    
    return res.status(500).json({ 
      status: 'error', 
      message: error.message, 
      stack: error.stack 
    });
  }
};
