import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { error: 'Mã xác thực không hợp lệ' },
      { status: 400 }
    );
  }

  try {
    const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    const appSecret = process.env.FACEBOOK_APP_SECRET;
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/auth/facebook/callback`;

    // Exchange code for access token
    const tokenResponse = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${appId}&redirect_uri=${redirectUri}&client_secret=${appSecret}&code=${code}`
    );

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      throw new Error('Không thể lấy access token');
    }

    // Get user info
    const userResponse = await fetch(
      `https://graph.facebook.com/me?fields=id,name,picture&access_token=${tokenData.access_token}`
    );

    const userData = await userResponse.json();

    const user = {
      id: userData.id,
      name: userData.name,
      avatar: userData.picture?.data?.url || '',
    };

    // Redirect to frontend with token and user data
    const redirectUrl = new URL('/', request.url);
    redirectUrl.searchParams.set('token', tokenData.access_token);
    redirectUrl.searchParams.set('user', JSON.stringify(user));

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Facebook OAuth error:', error);
    return NextResponse.json(
      { error: 'Đăng nhập thất bại. Vui lòng thử lại.' },
      { status: 500 }
    );
  }
}
