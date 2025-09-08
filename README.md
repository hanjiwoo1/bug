# 해충 방역 문의 사이트

Next.js + React + TypeScript로 개발된 해충 방역 문의 사이트입니다.

## 기능

- 해충 방역 문의 폼 (성함, 이메일, 연락처, 주소, 해충 종류, 상세 내용)
- 데이터베이스 저장 (PostgreSQL + Prisma)
- SMS 알림 (Twilio)
- 반응형 디자인 (Tailwind CSS + shadcn/ui)
- 전문적인 UI/UX 디자인

## 기술 스택

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: PostgreSQL + Prisma ORM
- **SMS**: Twilio
- **Deployment**: Vercel

## 설치 및 실행

1. 의존성 설치
```bash
npm install
```

2. 환경변수 설정
```bash
cp env.example .env
```

`.env` 파일을 편집하여 다음 값들을 설정하세요:
- `DATABASE_URL`: PostgreSQL 데이터베이스 연결 URL
- `TWILIO_ACCOUNT_SID`: Twilio 계정 SID
- `TWILIO_AUTH_TOKEN`: Twilio 인증 토큰
- `TWILIO_PHONE_NUMBER`: Twilio 전화번호
- `SELLER_PHONE_NUMBER`: 문의 알림을 받을 판매자 전화번호

3. 데이터베이스 마이그레이션
```bash
npx prisma migrate dev
```

4. 개발 서버 실행
```bash
npm run dev
```

## 데이터베이스 설정

### 무료 PostgreSQL 옵션

1. **Supabase** (추천)
   - https://supabase.com
   - 무료 티어: 500MB 저장공간, 월 2GB 대역폭
   - PostgreSQL 호환

2. **PlanetScale**
   - https://planetscale.com
   - 무료 티어: 1GB 저장공간, 월 1억 읽기/쓰기
   - MySQL 호환 (스키마 수정 필요)

3. **Railway**
   - https://railway.app
   - 무료 티어: 월 $5 크레딧

### Supabase 설정 예시

1. Supabase 계정 생성 및 프로젝트 생성
2. Settings > Database에서 연결 정보 확인
3. `.env` 파일에 DATABASE_URL 설정:
```
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

## SMS 설정 (Twilio)

1. Twilio 계정 생성: https://www.twilio.com
2. Console에서 Account SID와 Auth Token 확인
3. Phone Numbers에서 전화번호 구매
4. `.env` 파일에 설정:
```
TWILIO_ACCOUNT_SID="your_account_sid"
TWILIO_AUTH_TOKEN="your_auth_token"
TWILIO_PHONE_NUMBER="+1234567890"
SELLER_PHONE_NUMBER="+821012345678"
```

## 배포 (Vercel)

1. GitHub에 코드 푸시
2. Vercel에 프로젝트 연결
3. 환경변수 설정
4. 데이터베이스 마이그레이션 실행

## 프로젝트 구조

```
src/
├── app/
│   ├── api/
│   │   └── inquiry/
│   │       └── route.ts      # 문의 API 엔드포인트
│   ├── globals.css           # 전역 스타일
│   ├── layout.tsx           # 루트 레이아웃
│   └── page.tsx             # 메인 페이지
├── components/
│   └── InquiryForm.tsx      # 문의 폼 컴포넌트
└── lib/
    └── prisma.ts            # Prisma 클라이언트 설정
```

## 라이선스

MIT License