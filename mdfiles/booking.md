
## Confirm Booking
```
POST /bookings
```
## Request Headers
```
Content-Type : application/json
```
## Request Body
``` json
 {
  "hotelId": 1,
  "customerId": 1,
  "nights": 2,
  "people": 2,
  "checkin": "2024-08-15",
  "checkout": "2024-08-17",
  "payment": "Paid"
}
```
## Response

200 - success
Body
{
  "message": "Booking confirmed",
  "bookingId": 1
}

400 - Bad Request 
Body
{
  "error": "Please fill in all fields"
}

500 - Internal Server Error

