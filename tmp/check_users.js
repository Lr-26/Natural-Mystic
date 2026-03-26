const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: './backend/.env' });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function checkUsers() {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
        console.error('Error fetching users:', error);
    } else {
        console.log('Users in DB:', data.length);
        data.forEach(u => console.log(`- ${u.email} (${u.name}) - Role: ${u.role}`));
    }
}

checkUsers();
