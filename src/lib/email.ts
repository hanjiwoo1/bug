import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// 문의 접수 이메일 발송
export async function sendInquiryEmail(data: {
  name: string;
  email: string;
  phone: string;
  address: string;
  pestType: string;
  message: string;
}) {
  const { name, email, phone, address, pestType, message } = data;

  try {
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev', // Resend 기본 도메인 사용
      to: [process.env.EMAIL_TO || 'kof2998@naver.com'],
      subject: `[해충방역] 새로운 문의가 접수되었습니다 - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
            🐛 해충방역 문의 접수
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">문의자 정보</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 120px;">성함:</td>
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">연락처:</td>
                <td style="padding: 8px 0;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">이메일:</td>
                <td style="padding: 8px 0;">${email || '미제공'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">주소:</td>
                <td style="padding: 8px 0;">${address}</td>
              </tr>
            </table>
          </div>

          <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">문의 내용</h3>
            <p style="margin: 8px 0;"><strong>해충 종류:</strong> ${pestType || '미지정'}</p>
            <p style="margin: 8px 0;"><strong>상세 내용:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #4CAF50;">
              ${message || '상세 내용 없음'}
            </div>
          </div>

          <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <p style="margin: 0; color: #856404;">
              <strong>📞 연락처:</strong> ${phone}<br>
              <strong>📧 이메일:</strong> ${email || '미제공'}<br>
              <strong>📍 주소:</strong> ${address}
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666;">
            <p>이 문의는 해충방역 문의 시스템을 통해 자동으로 접수되었습니다.</p>
            <p style="font-size: 12px;">접수 시간: ${new Date().toLocaleString('ko-KR')}</p>
          </div>
        </div>
      `,
    });

    console.log('이메일 발송 성공:', result.data?.id);
    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('이메일 발송 실패:', error);
    throw new Error(`이메일 발송 실패: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}