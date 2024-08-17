
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://zktfgzydebrmkcthhvzo.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprdGZnenlkZWJybWtjdGhodnpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI3Mzk3NDUsImV4cCI6MjAzODMxNTc0NX0.wshb2kyNIGkc9NCLVhBZ8XY2G5bteVfqTKBER6FJLjc"
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase
