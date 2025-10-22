# Etufillari Technical Assignment

A lease management API built with Azure Functions and TypeScript.

## Prerequisites

- Node.js (v14 or higher)
- Azure Functions Core Tools
- npm or yarn

## Getting Started

### Installation

Install the project dependencies:

```bash
npm install
```

### Running the Application

Build and start the Azure Functions runtime:

```bash
npm run build && func start
```

Or use the convenient start script:

```bash
npm run start
```

The API will be available at `http://localhost:7071`

## Testing

Run the test suites using the following commands:

### Unit Tests
```bash
npm run test:unit
```

### Integration Tests
```bash
npm run test:integration
```

### All Tests
```bash
npm run test
```

## API Endpoints

### Create Lease
Creates a new lease agreement.

**Endpoint:** `POST /api/leases`

**Request Body:**
```json
{
  "companyId": "string",
  "itemId": "string",
  "price": 0,
  "termMonths": 0,
  "nominalRatePct": 0,
  "startDate": "2024-01-01T00:00:00.000Z",
  "upfrontFee": 0,
  "monthlyFee": 0
}
```

**Example:**
```bash
curl -X POST http://localhost:7071/api/leases \
  -H "Content-Type: application/json" \
  -H "x-api-key: local-dev-key" \
  -d '{
    "companyId": "company123",
    "itemId": "item456",
    "price": 10000,
    "termMonths": 24,
    "nominalRatePct": 5.5,
    "startDate": "2024-01-01T00:00:00.000Z",
    "upfrontFee": 500,
    "monthlyFee": 50
  }'
```

### Get Lease
Retrieves a specific lease by ID.

**Endpoint:** `GET /api/leases/{id}`

**Example:**
```bash
curl http://localhost:7071/api/leases/lease123 \
  -H "x-api-key: local-dev-key"
```

### Create Payment
Records a payment for a lease.

**Endpoint:** `POST /api/payments`

**Request Body:**
```json
{
  "id": "string",
  "leaseId": "string",
  "paidAt": "2024-01-01T00:00:00.000Z",
  "amount": 0
}
```

**Example:**
```bash
curl -X POST http://localhost:7071/api/payments \
  -H "Content-Type: application/json" \
  -H "x-api-key: local-dev-key" \
  -d '{
    "id": "payment123",
    "leaseId": "lease123",
    "paidAt": "2024-01-15T00:00:00.000Z",
    "amount": 500
  }'
```

### Get Quote
Calculates a lease quote based on provided parameters.

**Endpoint:** `GET /api/quote`

**Query Parameters:**
- `companyId` - Company identifier
- `itemId` - Item identifier
- `price` - Item price
- `termMonths` - Lease term in months
- `nominalRatePct` - Annual interest rate percentage
- `startDate` - Lease start date (ISO format)
- `upfrontFee` - Upfront fee amount
- `monthlyFee` - Monthly fee amount

**Example:**
```bash
curl "http://localhost:7071/api/quote?companyId=company123&itemId=item456&price=10000&termMonths=24&nominalRatePct=5.5&startDate=2024-01-01&upfrontFee=500&monthlyFee=50" \
  -H "x-api-key: local-dev-key"
```

### Health Check
Returns the API health status.

**Endpoint:** `GET /api/health`

**Example:**
```bash
curl http://localhost:7071/api/health
```

## Authentication

All endpoints (except `/api/health`) require an API key to be included in the request headers:

```
x-api-key: local-dev-key
```