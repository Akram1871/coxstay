# Deployment Guide - CoxStay

## Quick Start - Local Development

### 1. Prerequisites
- Node.js 18+ ([Download](https://nodejs.org))
- npm or yarn
- Git

### 2. Clone & Install

```bash
cd webCox
npm install
```

### 3. Setup Database

```bash
# Generate Prisma client
npx prisma generate

# Create and setup SQLite database
npx prisma db push

# Seed with sample data
npm run seed
```

### 4. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Deployment to Vercel (Recommended)

Vercel is the optimal platform for Next.js applications.

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure build settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 3. Set Environment Variables

In Vercel dashboard, go to **Settings** → **Environment Variables** and add:

```
DATABASE_URL = postgresql://user:password@host/database
JWT_SECRET = your-secure-secret-key-min-32-chars
NEXTAUTH_SECRET = your-secure-secret-key-min-32-chars
NODE_ENV = production
NEXT_PUBLIC_APP_URL = https://your-domain.com
```

### 4. Deploy

Click "Deploy" and wait for the deployment to complete.

---

## Using PostgreSQL (Production)

SQLite is great for development. For production, use PostgreSQL.

### 1. Create PostgreSQL Database

Use services like:
- [Vercel Postgres](https://vercel.com/postgres)
- [Neon](https://neon.tech)
- [ElephantSQL](https://www.elephantsql.com)
- Self-hosted PostgreSQL

### 2. Update DATABASE_URL

```
DATABASE_URL = postgresql://user:password@host:5432/database_name
```

### 3. Deploy Schema

```bash
npx prisma db push
npm run seed  # Optional: seed with sample data
```

---

## Alternative Deployments

### Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and deploy:

```bash
docker build -t coxstay .
docker run -p 3000:3000 -e DATABASE_URL="..." coxstay
```

### Netlify Deployment

1. Push to GitHub
2. Connect GitHub repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Add environment variables
6. Deploy

**Note**: Netlify recommends using serverless functions. Consider Vercel for better Next.js support.

---

## Performance Optimization

### 1. Enable Caching

Add to `next.config.js`:

```javascript
const nextConfig = {
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },
}
```

### 2. Image Optimization

All images are already optimized using Next.js `Image` component.

### 3. Database Optimization

```bash
# Create indexes
npx prisma db execute --stdin < optimize.sql
```

---

## Monitoring & Logging

### Vercel Analytics

Automatically enabled on Vercel. View in dashboard.

### Custom Monitoring

Use services like:
- [Sentry](https://sentry.io) - Error tracking
- [LogRocket](https://logrocket.com) - User session replay
- [DataDog](https://www.datadoghq.com) - Application monitoring

---

## Maintenance

### Regular Backups

```bash
# Backup PostgreSQL database
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql
```

### Update Dependencies

```bash
npm update
npm audit fix
```

### Monitor Error Logs

```bash
# View Vercel logs
vercel logs
```

---

## Troubleshooting

### Build Fails

```bash
# Clear build cache
rm -rf .next
npm run build
```

### Database Connection Issues

```bash
# Test connection
npx prisma db execute --stdin
```

### Memory Issues

Set Node memory limit:

```bash
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

---

## Support & Resources

- **Documentation**: [Next.js Docs](https://nextjs.org/docs)
- **Prisma**: [Prisma Docs](https://www.prisma.io/docs)
- **Deployment**: [Vercel Docs](https://vercel.com/docs)
- **Issues**: Check GitHub Issues

---

**Last Updated**: May 2026  
**Version**: 1.0.0
