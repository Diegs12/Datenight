const { createClient } = require('@supabase/supabase-js');
const { setCorsHeaders, handlePreflight } = require('./_cors');

module.exports = async (req, res) => {
  if (handlePreflight(req, res)) return;
  setCorsHeaders(req, res);

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, partner_name, quiz_answers, personality_type } = req.body || {};

  if (!email || !email.includes('@') || email.length > 254) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
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
    console.error('Lead capture failed');
    return res.status(500).json({ error: 'Failed to save lead' });
  }
};
