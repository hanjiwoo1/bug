import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// 후기 조회 (GET)
export async function GET() {
  try {
    const { data: reviews, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`후기 조회 실패: ${error.message}`);
    }

    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    console.error('후기 조회 오류:', error);
    return NextResponse.json(
      { error: '후기 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 후기 작성 (POST)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, rating, content, serviceType } = body;

    // 데이터 검증
    if (!name || !rating || !content) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: '평점은 1-5 사이여야 합니다.' },
        { status: 400 }
      );
    }

    // 데이터베이스에 후기 저장
    const { data: review, error } = await supabase
      .from('reviews')
      .insert({
        name,
        rating,
        content,
        service_type: serviceType || '',
      })
      .select()
      .single();

    if (error) {
      throw new Error(`후기 저장 실패: ${error.message}`);
    }

    return NextResponse.json(
      { 
        message: '후기가 성공적으로 등록되었습니다.',
        review 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('후기 등록 오류:', error);
    return NextResponse.json(
      { 
        error: '후기 등록 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
