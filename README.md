# Social Media App

Modern ve kullanıcı dostu bir sosyal medya uygulaması. React Native ile geliştirilmiştir.

## Özellikler

### Post Bileşeni
- Kullanıcı profil fotoğrafı ve kullanıcı adı gösterimi
- Post görseli (aspectRatio: 1 ile kare format)
- Etkileşim butonları:
  - Beğeni butonu (toggle özelliği ile)
  - Yorum butonu
- Beğeni sayısı gösterimi
- Etiketlenen kişiler gösterimi ("ile birlikte" formatında)
- Post açıklaması
- Zaman damgası
- Modern ve temiz tasarım

### Yorum Sistemi
- Alt kısımdan açılan modal tasarımı
- Yorum listesi
- Her yorumda:
  - Kullanıcı adı
  - Yorum metni
  - Zaman bilgisi
- Yorum yazma alanı:
  - Çok satırlı metin girişi
  - 1000 karakter limiti
  - Gönderme butonu (boş yorumlar için devre dışı)
- Klavye açıldığında otomatik yükseklik ayarlama

### Navigasyon
- Modern bottom tab navigasyon
- Özel tasarlanmış ikonlar:
  - Ana Sayfa
  - Eşleşme
  - Arama
  - Topluluklar
  - Profil
- İkonlar için MaterialCommunityIcons kullanımı
- Seçili sekme için mavi vurgu rengi (#4A80F0)

## Teknik Detaylar

### Kullanılan Teknolojiler
- React Native
- TypeScript
- Expo
- React Navigation
- @expo/vector-icons

### Bileşen Yapısı
- `src/components/Post.tsx`: Ana post bileşeni
- `src/components/CommentModal.tsx`: Yorum modalı bileşeni
- `src/navigation/MainNavigator.tsx`: Ana navigasyon bileşeni
- `src/screens/HomeScreen.tsx`: Ana sayfa ekranı

### Stil ve Tasarım
- Modern ve minimal tasarım
- Tutarlı renk paleti
- Responsive tasarım
- Kullanıcı dostu arayüz
- Instagram benzeri kullanıcı deneyimi

## Planlanan Geliştirmeler
- Paylaşma butonu
- Kaydetme butonu
- Hikayeler özelliği
- Keşfet sayfası
- Direct mesajlaşma
- Hashtag'lere tıklanabilirlik
- Etiketlenen kişilere tıklanabilirlik
- Backend entegrasyonu
- Gerçek zamanlı bildirimler
- Profil düzenleme
- Post oluşturma
- Görsel yükleme ve düzenleme

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Uygulamayı başlat
npm start
```

## Geliştirme Notları

### Versiyon Geçmişi
- v0.1.0: Temel post bileşeni ve navigasyon
- v0.2.0: Yorum sistemi eklendi
- v0.3.0: Etiketleme sistemi eklendi

### Katkıda Bulunma
1. Bu depoyu fork edin
2. Yeni bir özellik dalı oluşturun (`git checkout -b yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik: X'`)
4. Dalınıza push yapın (`git push origin yeni-ozellik`)
5. Bir Pull Request oluşturun 