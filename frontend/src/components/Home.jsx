import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchLocation) params.append('location', searchLocation);
    if (checkIn) params.append('checkIn', checkIn);
    if (checkOut) params.append('checkOut', checkOut);
    if (guests) params.append('guests', guests);
    navigate(`/?${params.toString()}`);
  };

  return (
    <div className="bg-white">
      <div style={{
        background: 'linear-gradient(135deg, #1e5bb8 0%, #4a90e2 50%, #6ba3d8 100%)',
        minHeight: '350px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '60px 20px 140px',
        backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        borderRadius: '0 0 32px 32px'
      }}>
        <div className="container text-center position-relative" style={{ zIndex: 2 }}>
          <h1 className="fw-bold text-white mb-4" style={{
            textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            letterSpacing: '-0.02em'
          }}>
            Your Trip Starts Here
          </h1>
          <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
            <div className="d-flex align-items-center gap-2 text-white">
              <span style={{ fontSize: '1.2rem' }}>✅</span>
              <span style={{ fontSize: '0.95rem', fontWeight: '500', textShadow: '1px 1px 4px rgba(0,0,0,0.4)' }}>Secure payment</span>
            </div>
            <span className="text-white" style={{ fontSize: '1.5rem', opacity: 0.6 }}>|</span>
            <div className="d-flex align-items-center gap-2 text-white">
              <span style={{ fontSize: '1.2rem' }}>✅</span>
              <span style={{ fontSize: '0.95rem', fontWeight: '500', textShadow: '1px 1px 4px rgba(0,0,0,0.4)' }}>Support in approx. 30s</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '-90px', position: 'relative', zIndex: 10, paddingBottom: '40px' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-11 col-xl-10">
              <form onSubmit={handleSearch}>
                <div className="card shadow-lg border-0" style={{
                  borderRadius: '16px',
                  overflow: 'hidden'
                }}>
                  <div className="card-body p-3 p-md-4">
                    <div className="row g-3 align-items-end">
                      <div className="col-12 col-md-3">
                        <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: '13px' }}>Destination</label>
                        <input
                          type="text"
                          className="form-control border-0 bg-light"
                          placeholder="City, airport, region, landmark..."
                          value={searchLocation}
                          onChange={(e) => setSearchLocation(e.target.value)}
                          style={{
                            fontSize: '14px',
                            padding: '12px 16px',
                            borderRadius: '8px'
                          }}
                        />
                      </div>

                      <div className="col-6 col-md-2">
                        <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: '13px' }}>Check-in</label>
                        <input
                          type="date"
                          className="form-control border-0 bg-light"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          style={{
                            fontSize: '14px',
                            padding: '12px 16px',
                            borderRadius: '8px'
                          }}
                        />
                      </div>

                      <div className="col-6 col-md-2">
                        <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: '13px' }}>Check-out</label>
                        <input
                          type="date"
                          className="form-control border-0 bg-light"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          style={{
                            fontSize: '14px',
                            padding: '12px 16px',
                            borderRadius: '8px'
                          }}
                        />
                      </div>

                      <div className="col-12 col-md-3">
                        <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: '13px' }}>Rooms and Guests</label>
                        <select
                          className="form-select border-0 bg-light"
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          style={{
                            fontSize: '14px',
                            padding: '12px 16px',
                            borderRadius: '8px'
                          }}
                        >
                          <option value="1">1 room, 1 guest</option>
                          <option value="2">1 room, 2 guests</option>
                          <option value="3">1 room, 3 guests</option>
                          <option value="4">1 room, 4 guests</option>
                          <option value="5">2 rooms, 5+ guests</option>
                        </select>
                      </div>

                      <div className="col-12 col-md-2">
                        <button
                          type="submit"
                          className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                          style={{
                            backgroundColor: '#1e5bb8',
                            padding: '12px 24px',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '15px',
                            fontWeight: '600',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#164a99'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = '#1e5bb8'}
                        >
                          <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                          </svg>
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Company Introduction */}
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3" style={{ color: '#0c2569', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
            Pakistan's Smarter Way to Book
          </h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '700px', fontSize: '1.1rem', lineHeight: '1.8' }}>
            BookSmart is Pakistan's premier hotel and short-term rental booking platform — built to connect
            travellers with verified properties across Lahore, Karachi, Islamabad, and beyond. Whether you're
            planning a weekend escape to Murree or a business stay in Karachi, we've got you covered.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="row g-4 mb-5">
          {[
            { icon: '🏨', title: 'Verified Listings', desc: 'Every property is reviewed and approved by our team before going live, so you always know what you are getting.' },
            { icon: '🔒', title: 'Secure Payments', desc: 'Pay safely with Stripe card payments or JazzCash mobile wallet. Funds are held securely and released only after check-in.' },
            { icon: '📍', title: 'Interactive Maps', desc: 'Explore property locations with Google Maps integration built right into every listing page.' },
            { icon: '⚡', title: '30-Second Support', desc: 'Our support team responds in approximately 30 seconds — because great travel experiences start with great service.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="col-12 col-sm-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm text-center p-4" style={{ borderRadius: '16px', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{icon}</div>
                <h5 className="fw-bold mb-2" style={{ color: '#0c2569' }}>{title}</h5>
                <p className="text-muted mb-0" style={{ fontSize: '0.92rem', lineHeight: '1.6' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="row align-items-center g-5 py-4 mb-5">
          <div className="col-12 col-md-6">
            <h3 className="fw-bold mb-4" style={{ color: '#0c2569' }}>How It Works for Guests</h3>
            {[
              { step: '01', title: 'Search', desc: 'Enter your destination, travel dates, and number of guests.' },
              { step: '02', title: 'Choose', desc: 'Browse verified listings, read real reviews, and pick the perfect stay.' },
              { step: '03', title: 'Book & Pay', desc: 'Confirm your booking and pay securely online. Funds are held until check-in.' },
              { step: '04', title: 'Review', desc: 'After your stay, leave a review to help the next traveller choose wisely.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="d-flex align-items-start mb-3">
                <div className="flex-shrink-0 d-flex align-items-center justify-content-center fw-bold text-white me-3"
                  style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#1e5bb8', fontSize: '0.8rem' }}>
                  {step}
                </div>
                <div>
                  <p className="fw-semibold mb-0" style={{ color: '#0c2569' }}>{title}</p>
                  <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="col-12 col-md-6">
            <h3 className="fw-bold mb-4" style={{ color: '#0c2569' }}>How It Works for Hosts</h3>
            {[
              { step: '01', title: 'Register', desc: 'Sign up as a host and complete identity verification.' },
              { step: '02', title: 'List Your Property', desc: 'Add photos, set pricing, and define your availability.' },
              { step: '03', title: 'Get Approved', desc: 'Our team reviews and approves your listing within 24–48 hours.' },
              { step: '04', title: 'Start Earning', desc: 'Your listing goes live, guests book, and you receive payouts directly.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="d-flex align-items-start mb-3">
                <div className="flex-shrink-0 d-flex align-items-center justify-content-center fw-bold text-white me-3"
                  style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FF385C', fontSize: '0.8rem' }}>
                  {step}
                </div>
                <div>
                  <p className="fw-semibold mb-0" style={{ color: '#0c2569' }}>{title}</p>
                  <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center py-5 px-4 rounded-4" style={{ background: 'linear-gradient(135deg, #1e5bb8 0%, #4a90e2 100%)' }}>
          <h3 className="fw-bold text-white mb-3">Ready to explore Pakistan?</h3>
          <p className="text-white mb-4" style={{ opacity: 0.9 }}>
            Join thousands of travellers who trust BookSmart for seamless stays across Pakistan.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/browse-hotels" className="btn btn-light fw-semibold px-4 py-2" style={{ borderRadius: '22px', color: '#1e5bb8' }}>
              Browse Hotels
            </Link>
            <Link to="/about" className="btn btn-outline-light fw-semibold px-4 py-2" style={{ borderRadius: '22px' }}>
              Learn About Us
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
