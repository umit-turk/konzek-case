export const MESSAGES = {
  ERROR: {
    GENERAL: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
    NETWORK: 'Bağlantı hatası. İnternet bağlantınızı kontrol edin.',
    UNAUTHORIZED: 'Bu işlemi gerçekleştirmek için giriş yapmalısınız.',
    NOT_FOUND: 'Aradığınız sayfa bulunamadı.',
    VALIDATION: 'Lütfen tüm alanları doğru şekilde doldurun.',
  },
  SUCCESS: {
    GENERAL: 'İşlem başarıyla tamamlandı.',
    SAVE: 'Değişiklikler kaydedildi.',
    DELETE: 'Başarıyla silindi.',
    UPDATE: 'Başarıyla güncellendi.',
  },
  INFO: {
    LOADING: 'Yükleniyor...',
    EMPTY: 'Henüz hiç veri yok.',
    NO_RESULTS: 'Sonuç bulunamadı.',
  },
  WARNING: {
    UNSAVED_CHANGES: 'Kaydedilmemiş değişiklikler var.',
    DELETE_CONFIRMATION: 'Bu işlem geri alınamaz. Devam etmek istediğinize emin misiniz?',
  },
} as const; 