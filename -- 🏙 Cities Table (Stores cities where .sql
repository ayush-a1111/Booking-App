-- 🏙 Cities Table (Stores cities where events happen)
CREATE TABLE cities (
    city_id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    country VARCHAR(100) NOT NULL
);

-- 🏟 Venues Table (Each venue belongs to a specific city)
CREATE TABLE venues (
    venue_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    venue_type VARCHAR(50) CHECK (venue_type IN ('Cinema', 'Stadium', 'Concert Hall', 'Theater')),
    city_id INT REFERENCES cities(city_id) ON DELETE CASCADE,
    capacity INT NOT NULL,
    address TEXT NOT NULL
);

-- 🎭 Entertainment Events Table (Movies, concerts, sports, etc.)
CREATE TABLE entertainment_events (
    event_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) CHECK (type IN ('Movie', 'Concert', 'Comedy Show', 'Sports', 'Theater Play')),
    genre VARCHAR(100),
    languages TEXT[], -- 🔥 Updated: Supports multiple languages
    duration INT, -- Duration in minutes
    description TEXT,
    release_date DATE, -- Used for movies
    is_active BOOLEAN DEFAULT TRUE, -- ✅ Marks if event is ongoing or removed
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
);

-- 📍 Event_Cities Table (Maps an event to multiple cities)
CREATE TABLE event_cities (
    event_id INT REFERENCES entertainment_events(event_id) ON DELETE CASCADE,
    city_id INT REFERENCES cities(city_id) ON DELETE CASCADE,
    PRIMARY KEY (event_id, city_id)
);

-- 🎭 Auditoriums Table (New: Multiple audis per venue)
CREATE TABLE auditoriums ( -- 🔥 NEW TABLE
    auditorium_id SERIAL PRIMARY KEY,
    venue_id INT REFERENCES venues(venue_id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL, -- e.g., "Audi 1", "IMAX Screen"
    capacity INT NOT NULL
);

-- 🏟 Event_Venues Table (Maps an event to multiple venues in multiple cities, now includes auditorium_id)
CREATE TABLE event_venues (
    event_id INT,
    city_id INT,
    venue_id INT REFERENCES venues(venue_id) ON DELETE CASCADE,
    auditorium_id INT REFERENCES auditoriums(auditorium_id) ON DELETE CASCADE, -- 🔥 Updated: Added auditorium_id
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    ticket_sales_started BOOLEAN DEFAULT FALSE,
    ticket_selling_strategy ENUM('standard', 'queue', 'lottery', 'invite_only') DEFAULT 'standard',
    language VARCHAR(50), -- 🔥 Updated: Allows different languages per event venue
    PRIMARY KEY (event_id, city_id, venue_id, auditorium_id, start_time) -- 🔥 Updated: Added auditorium_id to PK
);

-- 🎫 Tickets Table (Now references auditorium_id)
CREATE TABLE tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_venue_id INT REFERENCES event_venues(event_id) ON DELETE CASCADE,
    city_id INT REFERENCES cities(city_id) ON DELETE CASCADE,
    venue_id INT REFERENCES venues(venue_id) ON DELETE CASCADE, -- 🔥 Updated: Explicit venue_id for clarity
    auditorium_id INT REFERENCES auditoriums(auditorium_id) ON DELETE CASCADE, -- 🔥 Updated: Each ticket is tied to an auditorium
    price DECIMAL(10,2) NOT NULL,
    total_seats INT NOT NULL,
    available_seats INT NOT NULL CHECK (available_seats >= 0),
    show_time TIMESTAMP NOT NULL,
    show_date DATE,
    status VARCHAR(20) CHECK (status IN ('Upcoming', 'Ongoing', 'Cancelled', 'Completed')) DEFAULT 'Upcoming',
    is_active BOOLEAN DEFAULT TRUE, -- ✅ Allows filtering out removed shows
    created_at TIMESTAMP DEFAULT NOW()
);

-- 👤 Users Table (Stores user details)
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL
);

-- 📖 Bookings Table (Tracks event bookings by users)
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
    city_id INT REFERENCES cities(city_id) ON DELETE CASCADE,
    seats_booked INT NOT NULL CHECK (seats_booked > 0),
    total_amount DECIMAL(10,2) NOT NULL,
    booking_status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);

-- 💳 Payments Table (Handles event payments)
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    city_id INT REFERENCES cities(city_id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    payment_status ENUM('pending', 'success', 'failed') DEFAULT 'pending',
    payment_method ENUM('credit_card', 'debit_card', 'upi', 'wallet', 'net_banking'),
    transaction_id VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 🪑 Venue Seating Layouts Table (Defines seat layouts per auditorium)
CREATE TABLE venue_seating_layouts ( -- 🔥 Updated: Now references auditorium instead of venue
    layout_id SERIAL PRIMARY KEY,
    auditorium_id INT REFERENCES auditoriums(auditorium_id) ON DELETE CASCADE, -- 🔥 Updated: Each layout belongs to an auditorium
    layout_name VARCHAR(100),  -- (e.g., "Standard", "VIP", "IMAX", "Concert Setup")
    total_rows INT,
    seats_per_row INT
);

-- 🎟 Seats Table (Defines individual seats in an auditorium layout)
CREATE TABLE seats (
    seat_id SERIAL PRIMARY KEY,
    layout_id INT REFERENCES venue_seating_layouts(layout_id) ON DELETE CASCADE,
    row_number INT,
    seat_number INT,
    seat_type VARCHAR(50) CHECK (seat_type IN ('Regular', 'Premium', 'VIP', 'Balcony')),
    is_available BOOLEAN DEFAULT TRUE
);

-- 🏷 Show Seats Table (Tracks booked seats for each show)
CREATE TABLE show_seats (
    show_seat_id SERIAL PRIMARY KEY,
    event_id INT REFERENCES entertainment_events(event_id) ON DELETE CASCADE, -- 🔥 Updated: References event_id instead of showtimes
    seat_id INT REFERENCES seats(seat_id) ON DELETE CASCADE,
    price DECIMAL(10,2), -- Price can vary per show
    status VARCHAR(20) CHECK (status IN ('Available', 'Reserved', 'Booked')) DEFAULT 'Available'
);
