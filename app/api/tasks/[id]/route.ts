import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    const source = request.nextUrl.searchParams.get('source');

    if (!token) {
      return NextResponse.json(
        { error: 'Token không hợp lệ' },
        { status: 401 }
      );
    }

    if (!source || (source !== 'bumx' && source !== 'golike')) {
      return NextResponse.json(
        { error: 'Source không hợp lệ' },
        { status: 400 }
      );
    }

    const apiUrl = source === 'bumx' 
      ? `https://api.bumx.com/tasks/${params.id}`
      : `https://api.golike.net/tasks/${params.id}`;

    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Không tìm thấy nhiệm vụ' },
          { status: 404 }
        );
      }
      throw new Error('Không thể lấy chi tiết nhiệm vụ');
    }

    const data = await response.json();

    const taskDetails = {
      id: data.id?.toString() || params.id,
      platform: data.platform || '',
      type: data.type || '',
      title: data.title || '',
      source: source as 'bumx' | 'golike',
      description: data.description || '',
      url: data.url || '',
      instructions: data.instructions || '',
      targetId: data.targetId || '',
    };

    return NextResponse.json(taskDetails);
  } catch (error) {
    console.error('Task details API error:', error);
    return NextResponse.json(
      { error: 'Lỗi máy chủ. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
