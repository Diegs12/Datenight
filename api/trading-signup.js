const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');
const { setCorsHeaders, handlePreflight } = require('./_cors');

module.exports = async (req, res) => {
  if (handlePreflight(req, res)) return;
  setCorsHeaders(req, res);

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, password, risk_profile, quiz_answers } = req.body || {};

  if (!email || !email.includes('@') || email.length > 254) {
    return res.status(400).json({ error: 'Valid email required' });
  }
  if (!password || password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  // Generate a cryptographically secure user ID
  const secureId = crypto.randomBytes(16).toString('hex');

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    return res.status(200).json({ success: true, user_id: secureId });
  }

  try {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

    // Sign up with Supabase Auth (handles password hashing)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    // Store trading profile
    const userId = authData.user?.id || secureId;
    const { error: profileError } = await supabase.from('trading_users').insert([{
      user_id: userId,
      email,
      risk_profile: risk_profile || null,
      quiz_answers: quiz_answers || null,
      capital: null,
      created_at: new Date().toISOString(),
    }]);

    if (profileError) {
      console.error('Profile insert failed');
    }

    return res.status(200).json({ success: true, user_id: userId });
  } catch (err) {
    console.error('Signup failed');
    return res.status(500).json({ error: 'Signup failed' });
  }
};
