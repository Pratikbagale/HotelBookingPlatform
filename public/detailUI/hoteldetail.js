document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const hotelId = params.get("id");

    console.log(`Hotel ID from URL: ${hotelId}`);

    const hotelDetails = document.getElementById("hotel-details");
    hotelDetails.innerHTML = "<p>Loading...</p>"; // Show loading indicator

    if (hotelId) {
        const timestamp = new Date().getTime(); // Cache-busting parameter
        const cacheBust = Math.random().toString(36).substring(2); // Optional additional parameter

        fetch(`hotels.json?t=${timestamp}&bust=${cacheBust}`, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        })
            .then(response => response.json())
            .then(hotels => {
                console.log('Loaded hotels:', hotels);

                const selectedHotel = hotels.find(hotel => hotel.id == hotelId);

                if (selectedHotel) {
                    hotelDetails.innerHTML = `
                    <img src="${selectedHotel.image}" alt="${selectedHotel.name}" class="hotel-image">
                    <h2>${selectedHotel.name}</h2>
                    <p><strong>Location:</strong> ${selectedHotel.location}</p>
                    <p><strong>Price:</strong> $${selectedHotel.price} per night</p>
                    <p><strong>Ratings:</strong> ${selectedHotel.ratings} stars</p>
                    <p><strong>Amenities:</strong> ${selectedHotel.amenities}</p>
                    <p><strong>Description:</strong> ${selectedHotel.description}</p>

                    <button id="confirmBooking">Confirm Booking</button>
                `;

                    // Add event listener to the "Confirm Booking" button
                    document.getElementById('confirmBooking').addEventListener('click', function () {
                        fetch('http://localhost:3000/api/details')
                            .then(response => response.json())
                            .then(data => {
                                localStorage.setItem('hotelId', hotelId);
                                localStorage.setItem('customerId', data.customerId);
                                window.location.href = `../bookingUI/booking.html?id=${hotelId}`; // Correct redirection path
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                alert('Failed to fetch booking details.');
                            });
                    });
                } else {
                    hotelDetails.innerHTML = "<p>Hotel not found!</p>";
                }
            })
            .catch(error => {
                console.error('Error fetching hotels:', error);
                hotelDetails.innerHTML = "<p>Error loading hotel details. Please try again later.</p>";
            });
    } else {
        hotelDetails.innerHTML = "<p>No hotel selected!</p>";
    }
});
