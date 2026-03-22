# 🏗️ Alpha Service Protocol | Database Schema

To support the "Weightless Hospitality" platform, the following schema is designed for **Prisma (PostgreSQL/MongoDB)** or direct **Mongoose** implementation.

## Booking Request Model

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| `id` | String (UUID/ObjectID) | Unique identifier for the protocol request | Yes |
| `clientName` | String | Full name of the client | Yes |
| `email` | String | Contact email (validated) | Yes |
| `serviceType` | Enum | [PROTOCOL, CATERING, WEDDING_SUPPORT, COFFEE_CEREMONY, PLANNING] | Yes |
| `eventDate` | DateTime | Specific date for the elite engagement | Yes |
| `location` | String | Pinned location (e.g., Kabuga, Kigali Marriott, etc.) | Yes |
| `message` | Text | Specific protocol details and client notes | No |
| `status` | Enum | [PENDING, CONFIRMED, COMPLETED, ARCHIVED] | Default: PENDING |
| `priority` | Boolean | VIP status for high-profile Kigali delegations | Default: false |
| `createdAt` | DateTime | Timestamp of initial request | Yes |
| `updatedAt` | DateTime | Timestamp of last status change | Yes |

---

## 🛠️ Prisma Schema Snippet

```prisma
model Booking {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  clientName  String
  email       String
  serviceType Service
  eventDate   DateTime
  location    String
  message     String?
  status      Status   @default(PENDING)
  priority    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum Service {
  PROTOCOL
  CATERING
  WEDDING_SUPPORT
  COFFEE_CEREMONY
  PLANNING
}

enum Status {
  PENDING
  CONFIRMED
  COMPLETED
  ARCHIVED
}
```

## 🖼️ Media Asset Model (Gallery CRUD)

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | String | Unique asset ID |
| `url` | String | Cloudinary/Firebase CDN URL |
| `section` | String | Target (Hero, Services, Gallery) |
| `label` | String | Visual title for alt text/captions |
| `active` | Boolean | If visible on the live landing page |
