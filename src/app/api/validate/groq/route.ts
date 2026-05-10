import { NextRequest, NextResponse } from 'next/server';

/**
 * SECURE GROQ VALIDATOR
 * 
 * EDUCATIONAL NOTE:
 * We perform this validation on the BACKEND. 
 * If we called Groq directly from the browser, the student's API key would 
 * appear in the browser's "Network" tab for anyone to steal. 
 * By proxying through this route, the key stays on the server.
 */

export async function POST(req: NextRequest) {
  try {
    const { apiKey } = await req.json();

    if (!apiKey) {
      return NextResponse.json({ error: 'API Key is required' }, { status: 400 });
    }

    const startTime = Date.now();

    // We make a minimal request to validate the key. 
    // Using a very small max_tokens value to minimize cost/latency.
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [{ role: 'user', content: 'hi' }],
        max_tokens: 5,
      }),
    });

    const endTime = Date.now();
    const duration = endTime - startTime;

    if (response.status === 401) {
      return NextResponse.json({ 
        valid: false, 
        error: 'Invalid API Key (401 Unauthorized)',
        latency: duration 
      }, { status: 401 });
    }

    if (response.status === 429) {
      return NextResponse.json({ 
        valid: false, 
        error: 'Rate Limit Exceeded (429 Too Many Requests)',
        latency: duration 
      }, { status: 429 });
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json({ 
        valid: false, 
        error: errorData.error?.message || 'Validation failed',
        latency: duration 
      }, { status: response.status });
    }

    return NextResponse.json({
      valid: true,
      latency: duration,
      model: 'llama3-8b-8192'
    });

  } catch (error: any) {
    return NextResponse.json({ error: 'Server error during validation' }, { status: 500 });
  }
}
