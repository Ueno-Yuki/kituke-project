import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  content: string;
}

interface ApiResponse {
  success?: boolean;
  error?: string;
  details?: any;
  data?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // POSTメソッドのみ許可
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, content }: ContactFormData = req.body;
    
    console.log('Received contact form data:', { name, email: !!email, phone: !!phone, content: !!content });

    // サーバーサイドバリデーション
    if (!name?.trim()) {
      return res.status(400).json({ error: '氏名は必須です' });
    }

    if (!content?.trim()) {
      return res.status(400).json({ error: 'お問い合わせ内容は必須です' });
    }

    // メールアドレスまたは電話番号のどちらかは必須
    const hasEmail = email?.trim();
    const hasPhone = phone?.trim();
    
    if (!hasEmail && !hasPhone) {
      return res.status(400).json({ 
        error: 'メールアドレスまたは電話番号のどちらかは必須です' 
      });
    }

    // メールアドレスの形式チェック
    if (hasEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ 
        error: '正しいメールアドレスの形式で入力してください' 
      });
    }

    // 電話番号の形式チェック（ハイフンありなし両方対応）
    if (hasPhone && !/^[0-9-]+$/.test(phone)) {
      return res.status(400).json({ 
        error: '正しい電話番号の形式で入力してください' 
      });
    }

    // 必要な環境変数の存在確認
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return res.status(500).json({ 
        error: 'メール送信の設定が正しくありません（API KEY）' 
      });
    }


    console.log('Environment variables check passed');

    // メール送信（テスト用：入力されたメールアドレスに送信）
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Resendのテスト用ドメイン
      to: [email], // 入力されたメールアドレスに送信
      subject: `【着付け師境】お問い合わせ: ${name}様より`,
      html: `
        <div style="font-family: 'Noto Sans JP', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #7a5c3e; border-bottom: 2px solid #7a5c3e; padding-bottom: 10px;">
            お問い合わせ
          </h2>
          
          <div style="background: #f9f7f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 15px 0;"><strong style="color: #7a5c3e;">氏名:</strong> ${name}</p>
            
            ${hasEmail ? `<p style="margin: 0 0 15px 0;"><strong style="color: #7a5c3e;">メールアドレス:</strong> ${email}</p>` : ''}
            
            ${hasPhone ? `<p style="margin: 0 0 15px 0;"><strong style="color: #7a5c3e;">電話番号:</strong> ${phone}</p>` : ''}
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #7a5c3e; margin-bottom: 10px;">お問い合わせ内容:</h3>
            <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #7a5c3e;">
              ${content.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
            <p>このメールは着付け師境のWebサイトのお問い合わせフォームから送信されました。</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return res.status(500).json({ 
        error: 'メール送信に失敗しました。しばらく時間をおいて再度お試しください。',
        details: error 
      });
    }

    console.log('Email sent successfully:', data);
    return res.status(200).json({ success: true, data });

  } catch (error) {
    console.error('Contact form error:', error);
    
    // エラーの詳細情報を含める
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error('Error details:', { message: errorMessage, stack: errorStack });
    
    return res.status(500).json({ 
      error: 'システムエラーが発生しました。しばらく時間をおいて再度お試しください。',
      details: errorMessage
    });
  }
}