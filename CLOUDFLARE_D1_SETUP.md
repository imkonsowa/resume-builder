# Cloudflare D1 Database Setup

This project now uses Cloudflare D1 as the backend database instead of PocketBase.

## Database Schema

The database consists of three main tables:

1. **users** - Stores user accounts
   - id (primary key)
   - email (unique)
   - name
   - created_at
   - updated_at

2. **resumes** - Stores resume data
   - id (primary key)
   - user_id (foreign key to users)
   - name
   - is_active
   - template
   - data (JSON)
   - settings (JSON)
   - created_at
   - updated_at

3. **share_tokens** - Stores public share links
   - id (primary key)
   - resume_id (foreign key to resumes)
   - token (unique)
   - expires_at
   - view_count
   - created_at

## Local Development Setup

1. **Initialize the local database:**
   ```bash
   ./scripts/init-db.sh
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

## Production Deployment

1. **Deploy database migrations to production:**
   ```bash
   ./scripts/deploy-db.sh
   ```

2. **Deploy the application:**
   ```bash
   npx wrangler deploy
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email (simplified auth for now)
- `POST /api/auth/logout` - Logout current session
- `GET /api/auth/session` - Get current session

### Resumes
- `GET /api/resumes` - List all user resumes
- `POST /api/resumes` - Create new resume
- `GET /api/resumes/:id` - Get specific resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume
- `POST /api/resumes/:id/duplicate` - Duplicate resume
- `POST /api/resumes/:id/activate` - Set as active resume
- `POST /api/resumes/:id/share` - Create share link

### Sharing
- `GET /api/share/:token` - Get resume by share token

## Migration from PocketBase

The app maintains backward compatibility with the existing local storage structure. When users sync their resumes:

1. The local resume gets a `serverId` field that links to the D1 record
2. Future syncs will update the existing D1 record
3. Deleting locally will also delete from D1 if logged in

## Authentication

Full-featured authentication system with:
- **Registration**: Users create accounts with email, password, and name
- **Login**: Email and password authentication with bcrypt password hashing
- **JWT Sessions**: Secure token-based authentication with httpOnly cookies
- **Password Validation**: Minimum 8 characters required
- **User Verification**: Database tracks verified status (email verification endpoints ready)
- **Password Reset**: Endpoints created for forgot password flow (requires email service integration)

## Environment Variables

The D1 database is configured in `wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "resume-builder-db"
database_id = "18a06c90-6adb-4400-bbf5-85313c47df0a"
```

## Troubleshooting

### Database not found
If you get a "Database not configured" error, ensure:
1. The D1 database is created: `npx wrangler d1 create resume-builder-db`
2. The database ID in `wrangler.toml` matches the created database
3. Migrations have been run: `./scripts/init-db.sh`

### Authentication issues
- Sessions are stored in cookies, clear cookies to reset auth state
- Check browser developer tools for cookie settings

### Sync failures
- Check that you're logged in
- Verify the resume has been modified since last sync
- Check browser console for detailed error messages