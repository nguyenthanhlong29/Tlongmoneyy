import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Token không hợp lệ' },
        { status: 401 }
      );
    }

    const response = await fetch('https://api.bumx.com/tasks', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Không thể lấy dữ liệu từ BumX API');
    }

    const data = await response.json();

    // Parse and validate response
    const tasks = Array.isArray(data) ? data : [];
    const parsedTasks = tasks.map((task: any) => ({
      id: task.id?.toString() || '',
      platform: task.platform || '',
      type: task.type || '',
      title: task.title || '',
      source: 'bumx' as const,
    }));

    return NextResponse.json(parsedTasks);
  } catch (error) {
    console.error('BumX API error:', error);
    return NextResponse.json(
      { error: 'Không thể kết nối đến máy chủ BumX' },
      { status: 500 }
    );
  }
}
