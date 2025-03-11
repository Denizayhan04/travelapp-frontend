# Seyahat Sosyal Medya Uygulaması Backend Rehberi

## Genel Bakış
Bu uygulama, seyahat severlerin deneyimlerini paylaşabildiği, topluluklar oluşturabildikleri ve seyahat planları yapabilecekleri bir sosyal medya platformudur.

Supabase kullanılacak
## Veritabanı Yapısı

### Users Tablosu
- Kullanıcı temel bilgileri
- Profil ve kapak fotoğrafları
- Dil ve hobi bilgileri
- Puan sistemi
- Rozet sistemi

### Posts Tablosu
- Çoklu fotoğraf desteği
- Topluluk paylaşımları
- Kullanıcı etiketleme
- Beğeni ve yorum sistemi
- Konum bilgisi

### Comments Tablosu
- Hiyerarşik yorum yapısı
- Beğeni sistemi
- Medya desteği

### Communities Tablosu
- Topluluk bilgileri
- Üyelik sistemi
- Yönetici rolleri
- Seyahat planları

### TravelListings Tablosu
- Seyahat planı detayları
- Katılımcı sistemi
- Tarih ve konum bilgileri
- Bütçe planlaması

### UserRelations Tablosu
- Takip sistemi
- Engelleme sistemi
- Bildirim tercihleri

### Badges Tablosu
- Rozet tipleri
- Kazanma koşulları
- Seviye sistemi

### Messages Tablosu
- Birebir mesajlaşma
- Grup mesajlaşma
- Medya paylaşımı

## API Endpoints

### Kullanıcı İşlemleri
- Kayıt ve giriş
- Profil yönetimi
- Takip sistemi
- Rozet sistemi

### Post İşlemleri
- Post oluşturma/düzenleme/silme
- Çoklu fotoğraf yükleme
- Etiketleme sistemi
- Beğeni ve yorum

### Topluluk İşlemleri
- Topluluk oluşturma/yönetme
- Üyelik işlemleri
- Seyahat planı oluşturma
- İçerik moderasyonu

### Mesajlaşma İşlemleri
- Birebir mesajlaşma
- Grup oluşturma
- Medya paylaşımı
- Okundu bilgisi

### Bildirim Sistemi
- Anlık bildirimler
- E-posta bildirimleri
- Bildirim tercihleri

## Güvenlik

### Yetkilendirme
- JWT token sistemi
- Rol tabanlı yetkilendirme
- API rate limiting

### Veri Güvenliği
- Şifreleme
- Dosya doğrulama
- GDPR uyumluluğu

## Performans

### Önbellekleme
- Redis kullanımı
- CDN entegrasyonu
- Query optimizasyonu

### Ölçeklendirme
- Yatay ölçeklendirme
- Load balancing
- Microservice mimarisi

## Veri Tipleri

### User
```typescript
{
  id: string
  name: string
  username: string
  email: string
  profileImage: string
  coverImage: string
  bio: string
  followers_count: number
  following_count: number
  points: number
  badges: Badge[]
  hobbies: string[]
  languages: string[]
  created_at: string
  updated_at: string
}
```

### Post
```typescript
{
  id: string
  user_id: string
  content: string
  images: PostImage[]
  likes_count: number
  comments_count: number
  location?: Location
  tagged_users: User[]
  community_id?: string
  created_at: string
  updated_at: string
}
```

### Comment
```typescript
{
  id: string
  post_id: string
  user_id: string
  content: string
  parent_id?: string
  likes_count: number
  created_at: string
}
```

### Community
```typescript
{
  id: string
  name: string
  description: string
  image: string
  members_count: number
  travel_listings: TravelListing[]
  admins: User[]
  created_at: string
}
```

### TravelListing
```typescript
{
  id: string
  title: string
  description: string
  start_date: string
  end_date: string
  location: Location
  max_participants: number
  current_participants: number
  budget_range: string
  creator_id: string
  community_id?: string
  status: 'planning' | 'ongoing' | 'completed'
}
```

## Dosya Yapısı

### Backend
```
/src
  /controllers   # İş mantığı
  /models        # Veritabanı modelleri
  /routes        # API rotaları
  /middleware    # Ara yazılımlar
  /services      # Harici servisler
  /utils         # Yardımcı fonksiyonlar
  /config        # Yapılandırma
  /types         # Tip tanımlamaları
```


