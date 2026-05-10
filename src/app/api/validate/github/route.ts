import { NextRequest, NextResponse } from 'next/server';

/**
 * SECURE GITHUB SCOPE CHECKER
 * 
 * EDUCATIONAL NOTE:
 * GitHub tokens (PATs) have "Scopes" (permissions). 
 * When we call the /user endpoint, GitHub returns the 'x-oauth-scopes' header.
 * This tells us EXACTLY what this token is allowed to do (e.g., repo access, workflow, etc.)
 */

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: 'GitHub Token is required' }, { status: 400 });
    }

    const response = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'OAuth2-Sandbox-Educational', // GitHub requires a User-Agent header
      },
    });

    if (response.status === 401) {
      return NextResponse.json({ valid: false, error: 'Invalid Token' }, { status: 401 });
    }

    if (!response.ok) {
      return NextResponse.json({ valid: false, error: 'Failed to fetch user data' }, { status: response.status });
    }

    const userData = await response.json();
    
    // THE CRUCIAL PART: Extracting scopes from the header
    const scopesHeader = response.headers.get('x-oauth-scopes');
    const scopes = scopesHeader ? scopesHeader.split(',').map(s => s.trim()) : [];

    return NextResponse.json({
      valid: true,
      username: userData.login,
      avatar: userData.avatar_url,
      scopes: scopes,
      bio: userData.bio
    });

  } catch (error: any) {
    return NextResponse.json({ error: 'Server error during GitHub validation' }, { status: 500 });
  }
}
