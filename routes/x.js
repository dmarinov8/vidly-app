

// POST /api/returns { customerId, movieId }

// Return 401 if client is not logged in
// Return 400 if customerId is not provided
// Return 400 if movieId is not provided
// Return 404 if rental is not found
// Return 400 if rental already processed
// Return 200 if request is valid
// Update rental.dateReturned with today's date
// Recalculate rentalFee
// Update quantity in stock
// Return rental to client