const demoHotels = [
  {
    _id: 'demo-hotel-1',
    id: 'demo-hotel-1',
    name: 'The Grand Lahore',
    description: 'A comfortable central hotel with modern rooms and friendly service.',
    location: { city: 'Lahore', country: 'Pakistan', address: 'Mall Road, Lahore', coordinates: { lat: 31.5204, lng: 74.3587 } },
    pricing: { basePrice: 12500, cleaningFee: 500, serviceFee: 300 },
    priceRange: { min: 12500 },
    rating: 4.7,
    totalReviews: 24,
    capacity: { guests: 4 },
    amenities: ['WiFi', 'Air conditioning', 'Parking', 'Breakfast'],
    images: [],
    isApproved: true,
    isSuspended: false
  },
  {
    _id: 'demo-hotel-2',
    id: 'demo-hotel-2',
    name: 'Margalla View Suites',
    description: 'A peaceful stay with a beautiful view of the Margalla Hills.',
    location: { city: 'Islamabad', country: 'Pakistan', address: 'F-6, Islamabad', coordinates: { lat: 33.7294, lng: 73.0931 } },
    pricing: { basePrice: 15500, cleaningFee: 600, serviceFee: 350 },
    priceRange: { min: 15500 },
    rating: 4.8,
    totalReviews: 31,
    capacity: { guests: 5 },
    amenities: ['WiFi', 'Mountain view', 'Room service', 'Parking'],
    images: [],
    isApproved: true,
    isSuspended: false
  },
  {
    _id: 'demo-hotel-3',
    id: 'demo-hotel-3',
    name: 'Clifton Bay Retreat',
    description: 'A bright and relaxing property close to Karachi beaches.',
    location: { city: 'Karachi', country: 'Pakistan', address: 'Clifton Block 5, Karachi', coordinates: { lat: 24.8138, lng: 67.0305 } },
    pricing: { basePrice: 9800, cleaningFee: 400, serviceFee: 250 },
    priceRange: { min: 9800 },
    rating: 4.4,
    totalReviews: 18,
    capacity: { guests: 3 },
    amenities: ['WiFi', 'Swimming pool', 'Air conditioning'],
    images: [],
    isApproved: true,
    isSuspended: false
  }
];

const readJson = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
};

const writeJson = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const getMockHotels = () => readJson('booksmart_hotels', demoHotels);

export const getMockUser = () => readJson('booksmart_user', null);

export const getMockFavorites = () => readJson('booksmart_favorites', []);

export const saveMockFavorites = (favorites) => writeJson('booksmart_favorites', favorites);

export const getMockBookings = () => readJson('booksmart_bookings', []);

export const saveMockBookings = (bookings) => writeJson('booksmart_bookings', bookings);

const findHotel = (id) => getMockHotels().find((hotel) => String(hotel.id || hotel._id) === String(id)) || getMockHotels()[0];

export const mockRequest = async (method, rawUrl, body = {}) => {
  const url = rawUrl.replace(/^https?:\/\/[^/]+/, '').replace(/^\/api/, '') || '/';
  const normalizedMethod = method.toUpperCase();
  const currentUser = getMockUser();

  if (normalizedMethod === 'POST' && url === '/auth/login') {
    const user = { id: 'demo-user', name: body.email?.split('@')[0] || 'Demo User', email: body.email, role: 'customer' };
    return { success: true, token: 'demo-token', user };
  }

  if (normalizedMethod === 'POST' && url === '/auth/signup') {
    const user = { id: 'demo-user', name: body.name || 'Demo User', email: body.email, role: body.role || 'customer' };
    return { success: true, token: 'demo-token', user };
  }

  if (normalizedMethod === 'GET' && url === '/auth/verify-token') {
    return currentUser ? { success: true, valid: true, user: currentUser } : { success: false, valid: false };
  }

  if (normalizedMethod === 'GET' && url === '/auth/profile') {
    return { success: true, user: currentUser || { name: 'Demo User', email: 'demo@example.com', role: 'customer' } };
  }

  if (normalizedMethod === 'PUT' && url === '/auth/profile') {
    const user = { ...(currentUser || {}), ...body };
    localStorage.setItem('booksmart_user', JSON.stringify(user));
    return { success: true, user };
  }

  if (normalizedMethod === 'GET' && url === '/hotels') {
    return { success: true, hotels: getMockHotels() };
  }

  const hotelMatch = url.match(/^\/hotels\/([^/]+)$/);
  if (normalizedMethod === 'GET' && hotelMatch) return { success: true, hotel: findHotel(hotelMatch[1]) };

  if (normalizedMethod === 'GET' && url === '/hotels/owner/my-hotels') {
    return { success: true, hotels: getMockHotels() };
  }

  if (normalizedMethod === 'GET' && url === '/users/favorites') {
    return { success: true, favorites: getMockFavorites().map(findHotel).filter(Boolean) };
  }

  const favoriteMatch = url.match(/^\/users\/favorites\/([^/]+)$/);
  if (favoriteMatch && (normalizedMethod === 'DELETE' || normalizedMethod === 'POST')) {
    const id = favoriteMatch[1];
    const favorites = getMockFavorites().filter((favorite) => String(favorite) !== String(id));
    if (normalizedMethod === 'POST') favorites.push(id);
    saveMockFavorites(favorites);
    return { success: true, favorites: favorites.map(findHotel).filter(Boolean) };
  }

  if (normalizedMethod === 'POST' && url === '/users/favorites') {
    const favorites = [...new Set([...getMockFavorites(), body.hotelId])];
    saveMockFavorites(favorites);
    return { success: true, favorites: favorites.map(findHotel).filter(Boolean) };
  }

  if (normalizedMethod === 'GET' && url === '/reviews/hotel/' + url.split('/').pop()) {
    return { success: true, reviews: [] };
  }

  if (normalizedMethod === 'GET' && url === '/bookings/my-bookings') {
    return { success: true, bookings: getMockBookings() };
  }

  if (normalizedMethod === 'POST' && url === '/bookings') {
    const hotel = findHotel(body.hotelId);
    const booking = {
      id: `demo-booking-${Date.now()}`,
      _id: `demo-booking-${Date.now()}`,
      hotel,
      hotelId: hotel,
      status: 'confirmed',
      ...body
    };
    saveMockBookings([...getMockBookings(), booking]);
    return { success: true, booking };
  }

  if (normalizedMethod === 'GET' && url.startsWith('/bookings/')) {
    const id = url.split('/')[2];
    return { success: true, booking: getMockBookings().find((booking) => booking.id === id) || getMockBookings()[0] };
  }

  if (normalizedMethod === 'PUT' && url.includes('/bookings/') && url.endsWith('/cancel')) {
    const id = url.split('/')[2];
    const bookings = getMockBookings().map((booking) => booking.id === id ? { ...booking, status: 'cancelled' } : booking);
    saveMockBookings(bookings);
    return { success: true, booking: bookings.find((booking) => booking.id === id) };
  }

  if (normalizedMethod === 'GET' && url.startsWith('/earnings/dashboard')) {
    return { success: true, earnings: { totalEarnings: 0, periodEarnings: 0 } };
  }

  if (normalizedMethod === 'GET' && url.startsWith('/coupons/validate')) {
    return { success: true, coupon: { code: body.code || 'DEMO10', discountPercentage: 10 } };
  }

  if (normalizedMethod === 'GET' && url.startsWith('/admin/')) {
    return { success: true, hotels: getMockHotels(), users: [], bookings: [], refunds: [], reviews: [], stats: {} };
  }

  return { success: true, data: {} };
};
