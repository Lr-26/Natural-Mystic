const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'c:/Users/DIEGO/Desktop/Proyecto-Aillu/backend/.env' });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function checkUsers() {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
        console.error('Error fetching users:', error);
    } else {
        console.log('Users in DB:', data ? data.length : 0);
        if (data) {
           data.forEach(u => console.log(`- ${u.email} (${u.name})`));
        }
    }
}

checkUsers();
