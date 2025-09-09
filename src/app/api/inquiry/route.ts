import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendInquiryEmail } from '@/lib/email';
import twilio from 'twilio';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, address, pestType, message } = body;

    // 데이터 검증
    if (!name || !phone || !address) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 데이터베이스에 문의 1저장 (RLS 우회)
    const { data: inquiry, error } = await supabase
      .from('inquiry')
      .insert({
        name,
        email: email || '',
        phone,
        address,
        pest_type: pestType || '',
        message: message || '',
      })
      .select()
      .single();

    if (error) {
      throw new Error(`데이터베이스 저장 실패: ${error.message}`);
    }

    // 이메일 알림 발송
    try {
      await sendInquiryEmail({
        name,
        email: email || '',
        phone,
        address,
        pestType: pestType || '',
        message: message || '',
      });
      console.log('이메일 발송 성공');
    } catch (emailError) {
      console.error('이메일 발송 실패:', emailError);
      // 이메일 실패해도 문의는 저장되므로 계속 진행
    }

    // SMS 알림 발송
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      try {
        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        const smsMessage = `새로운 해충 방역 문의가 접수되었습니다.
성함: ${name}
연락처: ${phone}
주소: ${address}
해충 종류: ${pestType || '미지정'}
상세 내용: ${message || '없음'}`;

        await client.messages.create({
          body: smsMessage,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: process.env.SELLER_PHONE_NUMBER || '+821012345678',
        });
        console.log('SMS 발송 성공');
      } catch (smsError) {
        console.error('SMS 발송 실패:', smsError);
        // SMS 실패해도 문의는 저장되므로 계속 진행
      }
    } else {
      console.log('SMS 발송 건너뜀 (Twilio 설정 없음)');
    }

    return NextResponse.json(
      { 
        message: '문의가 성공적으로 접수되었습니다.',
        inquiryId: inquiry.id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('문의 접수 오류:', error);
    console.error('오류 상세:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    });
    return NextResponse.json(
      { 
        error: '문의 접수 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
