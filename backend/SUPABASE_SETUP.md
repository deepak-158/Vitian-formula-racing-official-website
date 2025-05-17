# Supabase Setup for Racing Club

## Introduction
This project has been migrated from MongoDB to Supabase for data storage. This document provides instructions on how to set up Supabase for this project.

## Steps to Set Up Supabase

1. **Create a Supabase Account**
   - Go to https://supabase.com/ and sign up for a free account
   - Create a new project

2. **Create Required Tables**
   - Navigate to the "Table Editor" in the Supabase dashboard
   - Create the following tables:

### Users Table
```sql
create table users (
  id uuid not null default uuid_generate_v4() primary key,
  name text not null,
  email text not null unique,
  password text not null,
  is_admin boolean not null default false,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);
```

### Members Table
```sql
create table members (
  id uuid not null default uuid_generate_v4() primary key,
  name text not null,
  role text not null,
  bio text,
  image_url text,
  social_links jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);
```

### Projects Table
```sql
create table projects (
  id uuid not null default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  status text not null,
  start_date date,
  end_date date,
  image_url text,
  members jsonb default '[]'::jsonb,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);
```

3. **Configure Environment Variables**
   - Create a `.env` file in the backend directory with the following content:
   ```
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # JWT Secret
   JWT_SECRET=a_strong_jwt_secret_key_here

   # Supabase Configuration
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key

   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:3000
   ```
   - Replace `your_supabase_url` and `your_supabase_anon_key` with values from your Supabase project settings

4. **Row Level Security**
   - For production, set up Row Level Security (RLS) policies to secure your data

## Additional Information
- The default admin user (admin@racingclub.edu / racing123) will be created automatically on first server start
- All data operations now use the Supabase client instead of MongoDB/Mongoose
- The authentication system still uses JWT for API authentication 