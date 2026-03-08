const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, password, risk_profile, quiz_answers } = req.body || {};

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }
  if (!password || password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    // Supabase not configured — return success with mock user ID
    console.log('Trading signup (Supabase not configured):', email);
    return res.status(200).json({ success: true, user_id: 'demo_' + Date.now() });
  }

  try {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

    // Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    // Store trading profile
    const userId = authData.user?.id || 'unknown';
    const { error: profileError } = await supabase.from('trading_users').insert([{
      user_id: userId,
      email,
      risk_profile: risk_profile || null,
      quiz_answers: quiz_answers || null,
      capital: null,
      created_at: new Date().toISOString(),
    }]);

    if (profileError) {
      console.error('Profile insert error:', profileError.message);
      // Don't fail the signup if profile insert fails — auth succeeded
    }

    return res.status(200).json({ success: true, user_id: userId });
  } catch (err) {
    console.error('Signup error:', err.message);
    return res.status(500).json({ error: err.message || 'Signup failed' });
  }
};
