# OBSIDIAN — Deploy Guide

## Step 1 — Supabase Setup
1. Go to supabase.com → your project → SQL Editor
2. Paste and run the contents of `SETUP.sql`
3. After signing up on your app, run:
   ```sql
   UPDATE profiles SET role='pro', is_admin=true WHERE email='rameshwarnaik2005@gmail.com';
   ```

## Step 2 — Get your Supabase keys
- Go to Supabase → Settings → API
- Copy: Project URL + anon public key

## Step 3 — Deploy to Vercel (FREE FOREVER)
1. Go to github.com → New repo → Upload all these files
2. Go to vercel.com → Import that repo
3. Add environment variables:
   - `VITE_SUPABASE_URL` = your supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key
4. Click Deploy → Done ✓

## Admin Access
- Go to yourapp.vercel.app/admin
- Only visible if is_admin = true in your profile

## Payment Flow
- Users go to /upgrade → send $25 USDT TRC20 to your wallet
- They submit their TxID
- You see it in /admin → Payments tab
- Click "Approve" → they get Pro instantly
