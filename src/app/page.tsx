"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Shield, Bug, Home, Building2, Phone, Mail, MapPin, Star, CheckCircle } from "lucide-react"

export default function PestControlInquiry() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pestType: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          pestType: "",
          message: "",
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <Shield className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">전문 해충방역 서비스</h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              안전하고 효과적인 해충방역으로 깨끗한 환경을 만들어드립니다
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              무료 상담 신청하기
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">전문 방역 서비스</h2>
            <p className="text-muted-foreground">다양한 해충 문제를 전문적으로 해결합니다</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto p-3 bg-accent/10 rounded-full w-fit mb-4">
                  <Bug className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-lg">바퀴벌레 방역</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">완전 박멸을 위한 체계적인 바퀴벌레 방역 서비스</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto p-3 bg-accent/10 rounded-full w-fit mb-4">
                  <Home className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-lg">개미 방역</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">서식지 차단을 통한 근본적인 개미 방역</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto p-3 bg-accent/10 rounded-full w-fit mb-4">
                  <Building2 className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-lg">쥐 방역</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">안전하고 효과적인 쥐 포획 및 방역 서비스</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto p-3 bg-accent/10 rounded-full w-fit mb-4">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-lg">종합 방역</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">모든 해충을 대상으로 하는 종합 방역 관리</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">왜 저희를 선택해야 할까요?</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">친환경 약제 사용</h3>
                  <p className="text-sm text-muted-foreground">인체에 무해한 친환경 약제로 안전한 방역을 실시합니다</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">전문 기술진</h3>
                  <p className="text-sm text-muted-foreground">10년 이상 경력의 전문 방역 기술진이 직접 시공합니다</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">사후 관리</h3>
                  <p className="text-sm text-muted-foreground">방역 후 정기적인 점검과 사후 관리 서비스를 제공합니다</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">합리적 가격</h3>
                  <p className="text-sm text-muted-foreground">
                    품질 대비 합리적인 가격으로 최고의 서비스를 제공합니다
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">고객 후기</h2>
            <p className="text-muted-foreground">만족한 고객들의 생생한 후기를 확인해보세요</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardTitle className="text-lg">김○○님</CardTitle>
                <CardDescription>아파트 거주</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  "바퀴벌레 때문에 고생했는데 한 번의 방역으로 완전히 해결되었습니다. 친환경 약제라 안심이 되네요."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardTitle className="text-lg">박○○님</CardTitle>
                <CardDescription>식당 운영</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  "식당 운영하면서 방역이 가장 중요한데, 정기적으로 관리해주셔서 항상 깨끗한 환경을 유지하고 있습니다."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardTitle className="text-lg">이○○님</CardTitle>
                <CardDescription>사무실 관리</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  "사무실 개미 문제로 연락드렸는데, 빠른 대응과 완벽한 해결로 직원들이 모두 만족하고 있습니다."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="inquiry-form" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">무료 상담 신청</h2>
              <p className="text-muted-foreground">
                해충 문제로 고민이시라면 언제든 연락주세요. 전문가가 직접 상담해드립니다.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>문의 정보를 입력해주세요</CardTitle>
                <CardDescription>정확한 상담을 위해 자세한 정보를 입력해주시면 감사하겠습니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">성함 *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="홍길동"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">연락처 *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="010-1234-5678"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">이메일</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">주소 *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="서울시 강남구 ○○동"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pestType">해충 종류</Label>
                    <Input
                      id="pestType"
                      name="pestType"
                      value={formData.pestType}
                      onChange={handleInputChange}
                      placeholder="바퀴벌레, 개미, 쥐 등"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">상세 내용</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="해충 발견 위치, 발견 빈도, 기타 문의사항 등을 자세히 적어주세요."
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '문의 접수 중...' : '무료 상담 신청하기'}
                  </Button>
                </form>

                {submitStatus === 'success' && (
                  <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                    문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">전화 상담</h3>
                <p className="text-sm text-muted-foreground mb-2">평일 09:00 - 18:00</p>
                <Badge variant="outline" className="text-primary border-primary">
                  1588-0000
                </Badge>
              </div>

              <div className="flex flex-col items-center">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">이메일 문의</h3>
                <p className="text-sm text-muted-foreground mb-2">24시간 접수 가능</p>
                <Badge variant="outline" className="text-primary border-primary">
                  info@pestcontrol.co.kr
                </Badge>
              </div>

              <div className="flex flex-col items-center">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">서비스 지역</h3>
                <p className="text-sm text-muted-foreground mb-2">수도권 전 지역</p>
                <Badge variant="outline" className="text-primary border-primary">
                  출장 방역 가능
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2024 전문 해충방역 서비스. All rights reserved.</p>
            <p className="mt-2">안전하고 효과적인 방역으로 깨끗한 환경을 만들어드립니다.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
