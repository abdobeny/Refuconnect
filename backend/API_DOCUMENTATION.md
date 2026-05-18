# RefuConnect API Documentation

**Base URL:** `http://127.0.0.1:8000/api`

**Authentication:** Bearer token (Laravel Sanctum)

**Admin panel:** Filament at `http://127.0.0.1:8000/admin` (not exposed via API)

---

## Authentication

### Login
```http
POST /login
Content-Type: application/json
```

```json
{
  "email": "admin@refuconnect.com",
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "token": "1|...",
  "user": {
    "id": 1,
    "name": "Administrator",
    "email": "admin@refuconnect.com",
    "role": "admin"
  }
}
```

Registered users receive `"role": "user"` in JSON (stored as `utilisateur` in the database).

### Register
```http
POST /register
```

```json
{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

### Current user / Logout
```http
GET /user
Authorization: Bearer {token}

POST /logout
Authorization: Bearer {token}
```

---

## Animals (public read)

### List
```http
GET /animals?species=dog&breed=Labrador&sex=male&search=max&per_page=15
```

Returns paginated animals with `status = available`.

### Show
```http
GET /animals/{id}
```

Returns animals with status `available` or `in_care` only.

---

## Adoptions (authenticated)

### My adoptions
```http
GET /my-adoptions
Authorization: Bearer {token}
```

### Create request
```http
POST /adoptions
Authorization: Bearer {token}
```

```json
{
  "animal_id": 1,
  "motivation": "I have experience with dogs and a large garden."
}
```

Rules:
- Animal must be `available`
- Only one `pending` request per user/animal pair

---

## Donations (authenticated)

No payment processing — pledges only.

```http
POST /donations
Authorization: Bearer {token}
```

**Financial:**
```json
{
  "type": "financial",
  "amount": 100,
  "message": "Thank you!"
}
```

**Food / material:**
```json
{
  "type": "food",
  "item_description": "5kg dry food",
  "message": "I can drop it off Saturday"
}
```

---

## Grooming (authenticated)

```http
POST /grooming
Authorization: Bearer {token}
```

```json
{
  "pet_name": "Max",
  "pet_type": "dog",
  "reservation_date": "2026-06-01 14:00:00",
  "service_type": "full_grooming",
  "notes": "Please be gentle"
}
```

**Service types:** `bath`, `haircut`, `full_grooming`, `nail_trim`, `other`

New reservations are created with `status: pending`.

---

## Coupling requests (authenticated)

Owner dossier (matches the public couplage form).

```http
GET /my-coupling-requests
POST /coupling-requests
GET /coupling-requests/{id}
Authorization: Bearer {token}
```

```json
{
  "contact_phone": "0612345678",
  "pet_species": "dog",
  "pet_breed": "Berger Allemand",
  "pet_sex": "male",
  "pet_age": "2 ans",
  "vaccinated": "yes",
  "health_status": "good",
  "preferred_breed": "Berger Allemand",
  "message": "Looking for a calm partner"
}
```

**pet_species:** `dog`, `cat`  
**pet_sex:** `male`, `female`  
**vaccinated:** `yes`, `no`, `unknown`

---

## CORS

Configure `FRONTEND_URL` in `.env` (default dev: `http://localhost:5173`).

---

**Last updated:** 2026-05-18
