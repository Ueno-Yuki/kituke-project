import { useState } from "react";
import styles from "../../../styles/Contact/Contact.module.css";
import ToastContainer from "../../UI/Toast";
import { useToast } from "../../../hooks/useToast";

interface FormData {
  name: string;
  email: string;
  phone: string;
  content: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  content?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    content: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toast機能を追加
  const { toasts, success, error, removeToast } = useToast();

  // 必須項目が入力されているかチェック
  const isFormValid = () => {
    const hasName = formData.name.trim();
    const hasContent = formData.content.trim();
    const hasEmailOrPhone = formData.email.trim() || formData.phone.trim();
    
    return hasName && hasContent && hasEmailOrPhone;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 氏名の必須チェック
    if (!formData.name.trim()) {
      newErrors.name = "氏名は必須です";
    }

    // 内容の必須チェック
    if (!formData.content.trim()) {
      newErrors.content = "お問い合わせ内容は必須です";
    }

    // メールアドレスまたは電話番号のどちらかは必須（トースト通知で表示）
    const hasEmail = formData.email.trim();
    const hasPhone = formData.phone.trim();

    if (!hasEmail && !hasPhone) {
      // トースト通知で表示するため、ここでは何もしない
      return false;
    }

    // メールアドレスの形式チェック
    if (hasEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "正しいメールアドレスの形式で入力してください";
    }

    // 電話番号の形式チェック（ハイフンありなし両方対応）
    if (hasPhone && !/^[0-9-]+$/.test(formData.phone)) {
      newErrors.phone = "正しい電話番号の形式で入力してください";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // エラーメッセージをクリア
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // メールアドレスまたは電話番号が両方とも未入力の場合のトースト表示
      const hasEmail = formData.email.trim();
      const hasPhone = formData.phone.trim();
      if (!hasEmail && !hasPhone) {
        error("入力エラー", "メールアドレスまたは電話番号のどちらかは必須です", 5000);
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // デバッグ情報を追加
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      // レスポンステキストを取得してログ出力
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError);
        console.error('Response was not valid JSON:', responseText);
        // エラートーストを表示してreturnで処理を終了
        error(
          "送信失敗",
          `サーバーからの応答が不正です: ${responseText.substring(0, 100)}`,
          8000
        );
        return;
      }

      if (!response.ok) {
        const errorMessage = result?.error || `HTTP ${response.status}: メール送信に失敗しました`;
        console.error('API Error:', errorMessage);
        // エラートーストを表示してreturnで処理を終了
        error(
          "送信失敗",
          errorMessage,
          8000
        );
        return;
      }

      // 送信成功時の処理
      success(
        "送信完了",
        "お問い合わせを送信しました。近日中にご連絡いたします。",
        6000
      );
      
      // フォームをリセット
      setFormData({
        name: "",
        email: "",
        phone: "",
        content: ""
      });
      
      // エラーもクリア
      setErrors({});
      
    } catch (err) {
      console.error("送信エラー:", err);
      const errorMessage = err instanceof Error ? err.message : "送信に失敗しました。もう一度お試しください。";
      
      // エラートーストを表示
      error(
        "送信失敗",
        errorMessage,
        8000
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* トースト通知 */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
      
      <div className={styles.contactForm}>
      <div className={styles.formCard}>
        <h3 className={styles.formTitle}>お問い合わせフォーム</h3>
        <form onSubmit={handleSubmit} className={styles.form}>

          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>
              氏名 <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`${styles.formInput} ${errors.name ? styles.formInputError : ''}`}
              placeholder="お名前を入力してください"
            />
            {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.formInput} ${errors.email ? styles.formInputError : ''}`}
              placeholder="example@email.com"
            />
            {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.formLabel}>
              電話番号
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`${styles.formInput} ${errors.phone ? styles.formInputError : ''}`}
              placeholder="090-1234-5678"
            />
            {errors.phone && <span className={styles.fieldError}>{errors.phone}</span>}
          </div>
          <div className={styles.formNote}>
            <p>※メールアドレスまたは電話番号のどちらかは必須です</p>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="content" className={styles.formLabel}>
              お問い合わせ内容 <span className={styles.required}>*</span>
            </label>
            <textarea
              id="content"
              name="content"
              rows={6}
              value={formData.content}
              onChange={handleChange}
              className={`${styles.formTextarea} ${errors.content ? styles.formInputError : ''}`}
              placeholder="お問い合わせ内容をご記入ください"
            />
            {errors.content && <span className={styles.fieldError}>{errors.content}</span>}
          </div>


          <button
            type="submit"
            disabled={isSubmitting || !isFormValid()}
            className={`${styles.submitButton} ${(isSubmitting || !isFormValid()) ? styles.submitButtonDisabled : ''}`}
          >
            {isSubmitting ? "送信中..." : "送信する"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
}