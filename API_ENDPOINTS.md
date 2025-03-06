# API Endpoints Documentation

## Kullanıcı İşlemleri (Authentication)

### POST /api/auth/register
Yeni kullanıcı kaydı
```json
Request:
{
  "username": "string",
  "email": "string",
  "password": "string",
  "name": "string",
  "birthDate": "date",
  "gender": "string"
}

Response:
{
  "token": "string",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "name": "string",
    "profileImage": "string",
    "age": "number",
    "gender": "string"
  }
}
```

### POST /api/auth/login
Kullanıcı girişi
```json
Request:
{
  "email": "string",
  "password": "string"
}

Response:
{
  "token": "string",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "name": "string",
    "profileImage": "string"
  }
}
```

## Profil İşlemleri

### GET /api/users/{userId}
Kullanıcı profil bilgilerini getir
```json
Response:
{
  "id": "string",
  "username": "string",
  "name": "string",
  "profileImage": "string",
  "bio": "string",
  "age": "number",
  "gender": "string",
  "location": "string",
  "interests": ["string"],
  "travelCount": "number",
  "followers": "number",
  "following": "number"
}
```

### PUT /api/users/{userId}
Profil bilgilerini güncelle
```json
Request:
{
  "name": "string",
  "bio": "string",
  "location": "string",
  "interests": ["string"],
  "profileImage": "file"
}
```

## Post İşlemleri

### GET /api/posts
Post listesini getir (Ana sayfa için)
```json
Query Parameters:
- page: number
- limit: number

Response:
{
  "posts": [{
    "id": "string",
    "user": {
      "id": "string",
      "username": "string",
      "name": "string",
      "profileImage": "string"
    },
    "image": "string",
    "caption": "string",
    "likes": "number",
    "comments": "number",
    "isLiked": "boolean",
    "taggedUsers": [{
      "id": "string",
      "username": "string"
    }],
    "createdAt": "date"
  }],
  "hasMore": "boolean",
  "nextPage": "number"
}
```

### POST /api/posts
Yeni post oluştur
```json
Request:
{
  "image": "file",
  "caption": "string",
  "taggedUsers": ["userId"]
}
```

### POST /api/posts/{postId}/like
Post beğen/beğeniyi kaldır
```json
Response:
{
  "liked": "boolean",
  "likesCount": "number"
}
```

## Yorum İşlemleri

### GET /api/posts/{postId}/comments
Post yorumlarını getir
```json
Query Parameters:
- page: number
- limit: number

Response:
{
  "comments": [{
    "id": "string",
    "user": {
      "id": "string",
      "username": "string",
      "profileImage": "string"
    },
    "text": "string",
    "createdAt": "date"
  }],
  "hasMore": "boolean",
  "nextPage": "number"
}
```

### POST /api/posts/{postId}/comments
Yorum ekle
```json
Request:
{
  "text": "string"
}

Response:
{
  "id": "string",
  "text": "string",
  "createdAt": "date"
}
```

## Seyahat İlanları (Match)

### GET /api/travels
Seyahat ilanlarını listele
```json
Query Parameters:
- page: number
- limit: number
- location: string (optional)
- startDate: date (optional)
- endDate: date (optional)

Response:
{
  "travels": [{
    "id": "string",
    "location": "string",
    "dateRange": {
      "start": "date",
      "end": "date"
    },
    "user": {
      "id": "string",
      "name": "string",
      "age": "number",
      "gender": "string",
      "profileImage": "string"
    },
    "description": "string",
    "createdAt": "date"
  }],
  "hasMore": "boolean",
  "nextPage": "number"
}
```

### POST /api/travels
Yeni seyahat ilanı oluştur
```json
Request:
{
  "location": "string",
  "dateRange": {
    "start": "date",
    "end": "date"
  },
  "description": "string"
}
```

## Arama İşlemleri

### GET /api/search
Genel arama
```json
Query Parameters:
- q: string
- type: string (users/travels/all)
- page: number
- limit: number

Response:
{
  "users": [{
    "id": "string",
    "username": "string",
    "name": "string",
    "profileImage": "string"
  }],
  "travels": [{
    "id": "string",
    "location": "string",
    "dateRange": {
      "start": "date",
      "end": "date"
    },
    "user": {
      "name": "string",
      "profileImage": "string"
    }
  }]
}
```

### GET /api/search/recent
Son aramaları getir
```json
Response:
{
  "searches": [{
    "id": "string",
    "query": "string",
    "type": "string",
    "timestamp": "date"
  }]
}
```

### DELETE /api/search/recent
Son aramaları temizle
```json
Response:
{
  "success": "boolean"
}
```

## Mesajlaşma

### GET /api/messages/conversations
Mesaj listesini getir
```json
Response:
{
  "conversations": [{
    "id": "string",
    "user": {
      "id": "string",
      "name": "string",
      "profileImage": "string"
    },
    "lastMessage": {
      "text": "string",
      "createdAt": "date"
    },
    "unreadCount": "number"
  }]
}
```

### GET /api/messages/conversations/{conversationId}
Mesaj detaylarını getir
```json
Query Parameters:
- page: number
- limit: number

Response:
{
  "messages": [{
    "id": "string",
    "sender": {
      "id": "string",
      "name": "string"
    },
    "text": "string",
    "createdAt": "date"
  }],
  "hasMore": "boolean",
  "nextPage": "number"
}
```

### POST /api/messages/conversations/{conversationId}
Mesaj gönder
```json
Request:
{
  "text": "string"
}

Response:
{
  "id": "string",
  "text": "string",
  "createdAt": "date"
}
```

## Bildirimler

### GET /api/notifications
Bildirimleri getir
```json
Query Parameters:
- page: number
- limit: number

Response:
{
  "notifications": [{
    "id": "string",
    "type": "string", // like, comment, follow, message
    "user": {
      "id": "string",
      "name": "string",
      "profileImage": "string"
    },
    "post": {
      "id": "string",
      "image": "string"
    },
    "read": "boolean",
    "createdAt": "date"
  }],
  "hasMore": "boolean",
  "nextPage": "number"
}
```

### PUT /api/notifications/{notificationId}/read
Bildirimi okundu olarak işaretle
```json
Response:
{
  "success": "boolean"
}
```

## Genel Notlar

1. Tüm istekler için Authentication header gerekli (login ve register hariç):
```
Authorization: Bearer <token>
```

2. Hata yanıtları:
```json
{
  "error": {
    "code": "string",
    "message": "string"
  }
}
```

3. Dosya yüklemeleri için multipart/form-data kullanılacak

4. Pagination için:
- Varsayılan limit: 20
- Maksimum limit: 50

5. Tarih formatı: ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ) 