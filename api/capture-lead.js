const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, partner_name, quiz_answers, personality_type } = req.body || {};

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    // Supabase not configured yet — still return success so the app works
    console.log('Lead captured (Supabase not configured):', email);
    return res.status(200).json({ success: true });
  }

  try {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    const { error } = await supabase.from('leads').insert([{
      email,
      partner_name: partner_name || null,
      quiz_answers: quiz_answers || null,
      personality_type: personality_type || null,
      created_at: new Date().toISOString(),
    }]);
    if (error) throw error;
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Supabase error:', err.message);
    return res.status(500).json({ error: 'Failed to save lead' });
  }
};
