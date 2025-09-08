import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

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

    // 데이터베이스에 문의 저장
    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email: email || '',
        phone,
        address,
        pestType: pestType || '',
        message: message || '',
      },
    });

    // SMS 알림 발송
    try {
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
    } catch (smsError) {
      console.error('SMS 발송 실패:', smsError);
      // SMS 실패해도 문의는 저장되므로 계속 진행
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
    return NextResponse.json(
      { error: '문의 접수 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
