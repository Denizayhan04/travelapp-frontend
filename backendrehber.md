# Backend Rehberi

## Veritabanı Şemaları

### Users Tablosu
```sql
users
- id: UUID (Primary Key)
- username: STRING (UNIQUE)
- email: STRING (UNIQUE)
- password_hash: STRING
- name: STRING
- bio: TEXT
- profile_image: STRING (URL)
- cover_image: STRING (URL)
- points: INTEGER
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### Badges Tablosu
```sql
badges
- id: UUID (Primary Key)
- name: STRING
- description: TEXT
- image: STRING (URL)
- required_points: INTEGER
- category: ENUM ('engagement', 'community', 'achievement')
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### User Badges Tablosu
```sql
user_badges
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key -> users.id)
- badge_id: UUID (Foreign Key -> badges.id)
- earned_at: TIMESTAMP
- created_at: TIMESTAMP
```

### Badge Requirements Tablosu
```sql
badge_requirements
- id: UUID (Primary Key)
- badge_id: UUID (Foreign Key -> badges.id)
- requirement_type: ENUM ('post_count', 'follower_count', 'community_count', 'like_count', 'comment_count', 'points')
- required_value: INTEGER
- created_at: TIMESTAMP
```

### Posts Tablosu
```sql
posts
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key -> users.id)
- content: TEXT
- community_id: UUID (Foreign Key -> communities.id, NULL olabilir)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### Post Images Tablosu
```sql
post_images
- id: UUID (Primary Key)
- post_id: UUID (Foreign Key -> posts.id)
- image_url: STRING
- order: INTEGER
- created_at: TIMESTAMP
```

### Tagged Users Tablosu
```sql
post_tagged_users
- id: UUID (Primary Key)
- post_id: UUID (Foreign Key -> posts.id)
- user_id: UUID (Foreign Key -> users.id)
- created_at: TIMESTAMP
```

### Communities Tablosu
```sql
communities
- id: UUID (Primary Key)
- name: STRING
- description: TEXT
- image: STRING (URL)
- created_by: UUID (Foreign Key -> users.id)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### Community Members Tablosu
```sql
community_members
- id: UUID (Primary Key)
- community_id: UUID (Foreign Key -> communities.id)
- user_id: UUID (Foreign Key -> users.id)
- role: ENUM ('admin', 'moderator', 'member')
- created_at: TIMESTAMP
```

### Likes Tablosu
```sql
likes
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key -> users.id)
- post_id: UUID (Foreign Key -> posts.id)
- created_at: TIMESTAMP
```

### Comments Tablosu
```sql
comments
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key -> users.id)
- post_id: UUID (Foreign Key -> posts.id)
- content: TEXT
- parent_id: UUID (Foreign Key -> comments.id, NULL olabilir)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### Followers Tablosu
```sql
followers
- id: UUID (Primary Key)
- follower_id: UUID (Foreign Key -> users.id)
- following_id: UUID (Foreign Key -> users.id)
- created_at: TIMESTAMP
```

## API Endpoints

### Authentication
```
POST /api/auth/register
- Request: { username, email, password, name }
- Response: { token, user }

POST /api/auth/login
- Request: { email, password }
- Response: { token, user }

POST /api/auth/logout
- Request: { token }
- Response: { success }

GET /api/auth/me
- Headers: { Authorization: Bearer token }
- Response: { user }
```

### Users
```
GET /api/users/:id
- Response: { user }

PUT /api/users/:id
- Request: { name, bio, profile_image, cover_image }
- Response: { user }

GET /api/users/:id/posts
- Query: { page, limit }
- Response: { posts, total }

GET /api/users/:id/followers
- Query: { page, limit }
- Response: { followers, total }

GET /api/users/:id/following
- Query: { page, limit }
- Response: { following, total }

POST /api/users/:id/follow
- Response: { success }

DELETE /api/users/:id/follow
- Response: { success }

GET /api/users/search
- Query: { q, page, limit }
- Response: { users, total }
```

### Posts
```
GET /api/posts
- Query: { page, limit }
- Response: { posts, total }

POST /api/posts
- Request: { content, images, tagged_users, community_id? }
- Response: { post }

GET /api/posts/:id
- Response: { post }

PUT /api/posts/:id
- Request: { content }
- Response: { post }

DELETE /api/posts/:id
- Response: { success }

POST /api/posts/:id/like
- Response: { success }

DELETE /api/posts/:id/like
- Response: { success }

GET /api/posts/:id/comments
- Query: { page, limit }
- Response: { comments, total }
```

### Comments
```
POST /api/posts/:id/comments
- Request: { content, parent_id? }
- Response: { comment }

PUT /api/comments/:id
- Request: { content }
- Response: { comment }

DELETE /api/comments/:id
- Response: { success }
```

### Communities
```
GET /api/communities
- Query: { page, limit }
- Response: { communities, total }

POST /api/communities
- Request: { name, description, image }
- Response: { community }

GET /api/communities/:id
- Response: { community }

PUT /api/communities/:id
- Request: { name, description, image }
- Response: { community }

DELETE /api/communities/:id
- Response: { success }

GET /api/communities/:id/posts
- Query: { page, limit }
- Response: { posts, total }

POST /api/communities/:id/join
- Response: { success }

DELETE /api/communities/:id/leave
- Response: { success }

GET /api/communities/:id/members
- Query: { page, limit }
- Response: { members, total }

PUT /api/communities/:id/members/:userId
- Request: { role }
- Response: { success }

GET /api/communities/search
- Query: { q, page, limit }
- Response: { communities, total }
```

### Badges
```
GET /api/badges
- Query: { category?, page, limit }
- Response: { badges, total }

GET /api/badges/:id
- Response: { badge }

GET /api/users/:id/badges
- Query: { page, limit }
- Response: { badges, total, user_points }

POST /api/badges/:id/award
- Request: { user_id }
- Response: { success }
- Note: Admin only endpoint

GET /api/badges/progress/:userId
- Response: {
    badges_progress: [{
      badge_id: string,
      name: string,
      current_progress: number,
      required_progress: number,
      percentage: number
    }]
  }
```

## Gerekli Servisler

1. **Authentication Service**
   - JWT token yönetimi
   - Password hashing
   - Session yönetimi

2. **User Service**
   - Profil yönetimi
   - Takipçi/Takip edilen yönetimi
   - Puan sistemi

3. **Post Service**
   - Post CRUD işlemleri
   - Image upload ve yönetimi
   - Etiketleme sistemi

4. **Community Service**
   - Topluluk yönetimi
   - Üyelik yönetimi
   - Rol yönetimi

5. **Interaction Service**
   - Like sistemi
   - Yorum sistemi
   - Bildirim sistemi

6. **Search Service**
   - Kullanıcı arama
   - Post arama
   - Topluluk arama

7. **File Upload Service**
   - Image upload
   - Image optimization
   - CDN entegrasyonu

8. **Badge Service**
   - Rozet kriterleri yönetimi
   - Rozet kazanma kontrolü
   - Otomatik rozet dağıtımı
   - Rozet progress takibi

## Rozet Sistemi Detayları

### Rozet Kategorileri
1. **Engagement Rozetleri**
   - İlk Post Rozeti
   - 10/50/100 Post Rozeti
   - Popüler Post Rozeti (100+ beğeni)
   - Aktif Yorumcu Rozeti
   - Top Contributor Rozeti

2. **Community Rozetleri**
   - Topluluk Kurucusu
   - Topluluk Moderatörü
   - Aktif Topluluk Üyesi
   - Topluluk İnfluencer'ı
   - Çoklu Topluluk Üyesi

3. **Achievement Rozetleri**
   - Early Adopter
   - Verified User
   - Premium Üye
   - Platform Expert
   - Yılın Üyesi

### Rozet Kazanma Mekanizması
1. **Otomatik Kazanım**
   - Sistem belirli aralıklarla kullanıcıların rozet kriterlerini kontrol eder
   - Kriterleri sağlayan kullanıcılara otomatik olarak rozet verilir
   - Kullanıcıya bildirim gönderilir

2. **Manuel Kazanım**
   - Admin tarafından özel durumlarda verilebilir
   - Özel etkinlikler veya kampanyalar için kullanılabilir

3. **Progress Takibi**
   - Kullanıcılar rozet kazanma ilerlemelerini görebilir
   - Her rozet için gereksinimler ve mevcut ilerleme görüntülenir

### Puan Sistemi Entegrasyonu
1. **Puan Kazanma**
   - Post paylaşma: +10 puan
   - Beğeni alma: +2 puan
   - Yorum alma: +3 puan
   - Topluluk kurma: +50 puan
   - Rozet kazanma: +20 puan

2. **Puan Seviyeleri**
   - Başlangıç: 0-100 puan
   - Bronze: 101-500 puan
   - Silver: 501-1000 puan
   - Gold: 1001-5000 puan
   - Platinum: 5000+ puan

3. **Puan Bazlı Rozetler**
   - Her seviye için özel rozetler
   - Puan bazlı özel ayrıcalıklar
   - Seviyelere özel görsel elementler

## Güvenlik Önlemleri

1. **Authentication**
   - JWT token kullanımı
   - Rate limiting
   - Password hashing (bcrypt)

2. **Authorization**
   - Role-based access control
   - Resource-based authorization
   - API key validation

3. **Data Validation**
   - Input sanitization
   - Request validation
   - File type validation

4. **Error Handling**
   - Standardized error responses
   - Logging
   - Monitoring

## Performans Optimizasyonları

1. **Caching**
   - Redis cache for frequently accessed data
   - Query caching
   - CDN for static assets

2. **Database**
   - Indexing
   - Query optimization
   - Connection pooling

3. **API**
   - Pagination
   - Data compression
   - Response filtering

## Deployment Gereksinimleri

1. **Infrastructure**
   - Node.js runtime
   - PostgreSQL database
   - Redis cache
   - S3-compatible storage
   - CDN service

2. **Environment Variables**
   - Database credentials
   - JWT secret
   - AWS credentials
   - API keys
   - Environment specific configs

3. **Monitoring**
   - Error tracking
   - Performance monitoring
   - Usage analytics
   - Health checks 