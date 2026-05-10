import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

/**
 * EDUCATIONAL BACKEND ROUTE: Sending Email via Gmail API
 * 
 * This route demonstrates how to use a Refresh Token to authenticate 
 * and send an email without user interaction.
 */

export async function POST(req: NextRequest) {
  try {
    const { to, subject, message, clientId, clientSecret, refreshToken } = await req.json();

    // 1. Fallback to environment variables if UI fields are empty
    // In a real app, you would ALWAYS use environment variables.
    const CLIENT_ID = clientId || process.env.GOOGLE_CLIENT_ID;
    const CLIENT_SECRET = clientSecret || process.env.GOOGLE_CLIENT_SECRET;
    const REFRESH_TOKEN = refreshToken || process.env.GOOGLE_REFRESH_TOKEN;

    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
      return NextResponse.json(
        { error: 'Missing OAuth2 credentials (Client ID, Secret, or Refresh Token)' },
        { status: 400 }
      );
    }

    // 2. Initialize the Google OAuth2 Client
    // This client manages the token exchange logic for us.
    const oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      'https://developers.google.com/oauthplayground' // Redirect URI (unused here, but required by constructor)
    );

    // 3. Set the Refresh Token
    // We tell the client which account we are acting on behalf of.
    oauth2Client.setCredentials({
      refresh_token: REFRESH_TOKEN,
    });

    // 4. Generate a temporary Access Token
    // The library handles the HTTP request to Google's token endpoint.
    // An Access Token is like a temporary "Security Badge" that expires quickly.
    const { token: accessToken } = await oauth2Client.getAccessToken();

    if (!accessToken) {
      throw new Error('Failed to generate Access Token from Refresh Token');
    }

    // 5. Configure Nodemailer with OAuth2
    // Nodemailer supports Google's XOAUTH2 mechanism.
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'your-email@gmail.com', // Note: Gmail usually ignores this and uses the account linked to the Refresh Token
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    } as any);

    // 6. Define the email options
    const mailOptions = {
      from: `OAuth2 Sandbox <${CLIENT_ID}>`, // The 'from' is often overridden by Gmail
      to: to,
      subject: subject,
      text: message,
      html: `
        <div style="font-family: sans-serif; color: #333; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #3b82f6;">Automated Message</h2>
          <p>${message}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #999;">
            This email was sent via the <strong>Google OAuth2 Sandbox</strong> using a long-lived Refresh Token.
          </p>
        </div>
      `,
    };

    // 7. Send the email!
    const result = await transport.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      messageId: result.messageId,
      educationalNote: 'The email was sent successfully by exchanging the Refresh Token for a temporary Access Token.'
    });

  } catch (error: any) {
    console.error('Email API Error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Internal Server Error',
        details: 'Check if your Refresh Token is valid and has the https://mail.google.com/ scope.'
      },
      { status: 500 }
    );
  }
}
