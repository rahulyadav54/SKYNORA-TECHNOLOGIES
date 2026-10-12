# Deploying Skynora Travel Platform to Vercel

Follow these simple steps to push and deploy your fully functional Skynora Travel & Booking Web App to Vercel:

## Method 1: Using Vercel CLI (Recommended)

1. Install the Vercel CLI globally (if you haven't already):
   ```bash
   npm i -g vercel
   ```

2. Run the deploy command from your terminal:
   ```bash
   vercel
   ```

3. Follow the interactive prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your personal or team account.
   - Link to existing project? **N**
   - What's your project's name? `skynora-travel-platform`
   - In which directory is your code located? `./`

4. Vercel will automatically detect Vite (`npm run build`) and deploy your application.

## Method 2: Via GitHub & Vercel Dashboard

1. Push your repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import your GitHub repository.
4. Vercel automatically detects the framework presets (`Vite`).
5. Click **Deploy**.

## Environment Variables on Vercel
If you use the Gemini AI Concierge API, make sure to add your environment variable in your Vercel Project Settings → Environment Variables:
- `GEMINI_API_KEY`: Your Gemini API key from Google AI Studio.
