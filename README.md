# HotelBookingPlatform
Database Structure :
    The database for the HotelBooking project, named HotelBooking, consists of the following tables:
    Customer: Stores customer information such as their first name, last name, email, phone number, and password.
    bookings: Contains records of all hotel bookings made by customers, including the booking details like check-in/check-out times, number of nights, number of people, and         payment status.
    hotels: Holds details of the hotels available for booking, including hotel name,image, location, amenities, and other relevant information.

List of APIs :
    The HotelBooking project provides the following APIs for interacting with the system:
    Register API (/api/register):
    Allows new customers to create an account by providing their details like first name, last name, email, phone number, and password.
    Login API (/api/login):
    Authenticates existing customers by verifying their email and password, and grants them access to the booking system.
    Booking API (/api/bookings):
    Enables customers to book a hotel by providing booking details such as hotel ID, customer ID, number of nights, number of people, check-in and check-out times, and payment 
    status.
    
List of Pages :
    The HotelBooking project includes the following pages:
    Register Page (register.html):
    Allows new customers to create an account by filling out their details.
    Login Page (login.html):
    Enables existing customers to log in by entering their email and password.
    HotelUI Page (hotelUI.html):
    Displays a list of hotels available for booking, with an option to view details and proceed with booking.
    DetailUI Page (hoteldetail.html):
    Shows detailed information about a selected hotel, including amenities and room options. It also includes a button to confirm the booking.
    BookingUI Page (booking.html):
    Allows customers to finalize their booking by entering additional details such as check-in/check-out dates and the number of guests. It also confirms the booking and    
    displays the booking status.

 Getting Started :
       To run the HotelBooking project on your local machine, follow these steps:

 Clone the Repository :
    git clone https://github.com/yourusername/HotelBooking.git 
    cd HotelBooking

 Install Dependencies :
    Install the required Node.js packages using npm:
    npm install

 Set Up the Database :
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=HotelBooking

 Start the Server :
    npm start

 Access :
    Register Page: http://localhost:3000/register
    Login Page: http://localhost:3000/login
    Hotel UI Page: http://localhost:3000/hotelUI
    Hotel Detail UI Page: http://localhost:3000/detailUI
    Booking UI Page: http://localhost:3000/book

  THANK YOU!



   
