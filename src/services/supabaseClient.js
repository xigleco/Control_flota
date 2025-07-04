import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://srikdlqlwoseahonhlcy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyaWtkbHFsd29zZWFob25obGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzNzcyNTAsImV4cCI6MjA2Njk1MzI1MH0.dNJgeekEELkwQSd6PHaNs6oG74CeMuYWKaGP7HvQ18I'

export const supabase = createClient(supabaseUrl, supabaseKey)