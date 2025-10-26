# Cloud Deployment Guide

This guide will help you deploy THE-HUB to the cloud for live preview as you develop.

## Recommended Platform: Render.com

Render is recommended for this project because it supports:
- Python FastAPI backend with persistent storage
- Static site hosting for React frontend
- Automatic deployments from GitHub
- Free tier available
- Easy environment variable management

## Quick Deployment Steps

### 1. Prerequisites
- GitHub account (you already have this repository)
- Render account (sign up at https://render.com - it's free)

### 2. Deploy to Render

#### Option A: Using render.yaml (Recommended)

1. **Push your code to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Add deployment configuration"
   git push
   ```

2. **Connect to Render**
   - Go to https://render.com and sign in
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Select this repository (THE-HUB)
   - Render will automatically detect the `render.yaml` file

3. **Configure Environment Variables**
   In the Render dashboard, add these environment variables for your API service:
   - `CORS_ORIGINS`: Set to your frontend URL (Render will provide this)
   - Any other secrets or API keys you need

4. **Deploy!**
   - Click "Apply" and Render will deploy both services
   - You'll get two URLs:
     - Frontend: `https://the-hub-frontend.onrender.com`
     - API: `https://the-hub-api.onrender.com`

#### Option B: Manual Setup

If the Blueprint doesn't work, you can set up services manually:

**Backend Service:**
1. New Web Service
2. Connect repository: `RBarbieri13/THE-HUB`
3. Name: `the-hub-api`
4. Runtime: `Python 3`
5. Build Command: `cd backend && pip install -r requirements.txt`
6. Start Command: `cd backend && uvicorn server:app --host 0.0.0.0 --port $PORT`
7. Plan: `Free`

**Frontend Service:**
1. New Static Site
2. Connect repository: `RBarbieri13/THE-HUB`
3. Name: `the-hub-frontend`
4. Build Command: `cd frontend && yarn install && yarn build`
5. Publish Directory: `frontend/build`
6. Environment Variable: `REACT_APP_API_URL` = your backend URL

### 3. Update Frontend API URL

After deployment, update your frontend to point to the deployed API:

Create or update `frontend/.env.production`:
```
REACT_APP_API_URL=https://the-hub-api.onrender.com
```

### 4. Continuous Deployment

Once set up, every push to your GitHub repository will automatically trigger a new deployment!

## Alternative: Vercel Deployment

If you prefer Vercel (better for serverless):

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts and your site will be live!

Note: Vercel uses serverless functions, so your database will reset on each deployment. Render is better for persistent data.

## Environment Variables

Required environment variables:
- `CORS_ORIGINS`: Comma-separated list of allowed origins (or `*` for all)
- `PORT`: Auto-set by most platforms

Optional:
- Any API keys or secrets your app needs

## Checking Your Deployment

Once deployed, test these endpoints:
- Frontend: `https://your-frontend-url.com`
- API Health: `https://your-api-url.com/api/health`
- API Root: `https://your-api-url.com/api/`

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Ensure all dependencies are in `requirements.txt` and `package.json`

### API Not Responding
- Check that the `PORT` environment variable is set
- Verify the start command is correct
- Check API logs in Render dashboard

### CORS Errors
- Update `CORS_ORIGINS` environment variable to include your frontend URL
- Or set to `*` for development (not recommended for production)

### Database Issues
- On Render, ensure you have a persistent disk mounted
- Check that the database file path is writable

## Cost

Both services on Render's free tier:
- Backend: Free (spins down after 15 min of inactivity)
- Frontend: Free (always on)

For production, consider upgrading to paid plans for:
- Always-on backend
- Faster builds
- More resources

## Support

- Render Docs: https://render.com/docs
- Render Community: https://community.render.com
- Vercel Docs: https://vercel.com/docs

---

Happy deploying! Your app will be live and auto-deploy on every push! 🚀
