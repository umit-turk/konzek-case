export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: 'Başarıyla giriş yaptınız!',
  LOGIN_ERROR: 'Giriş yapılırken bir hata oluştu.',
  REGISTER_SUCCESS: 'Başarıyla kayıt oldunuz!',
  REGISTER_ERROR: 'Kayıt olurken bir hata oluştu.',
  LOGOUT_SUCCESS: 'Başarıyla çıkış yaptınız!',
  VALIDATION: {
    EMAIL_REQUIRED: 'E-posta adresi gereklidir.',
    EMAIL_INVALID: 'Geçerli bir e-posta adresi giriniz.',
    PASSWORD_REQUIRED: 'Şifre gereklidir.',
    PASSWORD_MIN_LENGTH: 'Şifre en az 6 karakter olmalıdır.',
    NAME_REQUIRED: 'İsim gereklidir.',
    NAME_MIN_LENGTH: 'İsim en az 2 karakter olmalıdır.',
  }
} as const; 