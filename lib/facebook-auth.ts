export function initiateFacebookLogin() {
  const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
  const redirectUri = `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/api/auth/facebook/callback`;
  const scope = 'public_profile,email';

  const facebookAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code`;

  if (typeof window !== 'undefined') {
    window.location.href = facebookAuthUrl;
  }
}
