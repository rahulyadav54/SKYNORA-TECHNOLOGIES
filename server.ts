import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent: aistudio-build as required
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Multi-turn Gemini Chatbot with Search & Maps Grounding
app.post('/api/concierge/chat', async (req: Request, res: Response) => {
  try {
    const { messages, useSearch, useMaps, location, modelType } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Determine model according to prompt requirements:
    // - gemini-3.1-pro-preview for complex tasks
    // - gemini-3.5-flash for general tasks, search grounding, maps grounding
    // - gemini-3.1-flash-lite for fast tasks
    let model = 'gemini-3.5-flash';
    if (modelType === 'complex') {
      model = 'gemini-3.1-pro-preview';
    } else if (modelType === 'fast') {
      model = 'gemini-3.1-flash-lite';
    }

    // Prepare contents formatted for Gemini
    const contents = messages.map((m: { role: 'user' | 'model'; text: string }) => ({
      role: m.role,
      parts: [{ text: m.text }],
    }));

    const config: any = {
      systemInstruction:
        'You are the Skynora Platinum AI Travel Concierge. You assist travelers across India with booking recommendations, heritage stays, flight logistics, IRCTC train schedules (Vande Bharat, Tejas Express), luxury sleeper coaches, and curated regional experiences in Goa, Rajasthan, and beyond. Always be courteous, precise, and practical with prices in INR (₹) and timing details.',
    };

    // Note: googleMaps cannot be used together with googleSearch
    if (useMaps) {
      config.tools = [{ googleMaps: {} }];
      if (location && location.latitude && location.longitude) {
        config.toolConfig = {
          retrievalConfig: {
            latLng: {
              latitude: location.latitude,
              longitude: location.longitude,
            },
          },
        };
      }
    } else if (useSearch) {
      config.tools = [{ googleSearch: {} }];
    }

    const response = await ai.models.generateContent({
      model,
      contents,
      config,
    });

    const replyText = response.text || '';
    const groundingChunks =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return res.json({
      reply: replyText,
      groundingChunks,
      modelUsed: model,
    });
  } catch (error: any) {
    console.error('Gemini Concierge Chat error:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to generate concierge response',
    });
  }
});

// Single-shot Quick Travel Assistant
app.post('/api/concierge/quick-assist', async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: prompt,
      config: {
        systemInstruction:
          'You are Skynora Flash Travel Assistant. Provide concise, instant travel tips, packing checklists, and local transit advice under 100 words.',
      },
    });

    return res.json({ text: response.text });
  } catch (error: any) {
    console.error('Quick assist error:', error);
    return res.status(500).json({ error: error?.message || 'Quick assist failed' });
  }
});

// Full-stack integration with Vite middleware in development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: 3000 },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Skynora Server running on port ${port}`);
  });
}

startServer();
