import { Link } from 'react-router-dom';
import './HomePage.css';

const features = [
    {
        icon: '🏨',
        bg: '#eef3ff',
        title: 'Verified Listings',
        desc: 'Every property is manually reviewed and approved by our team before it goes live — no surprises, no fake listings.',
    },
    {
        icon: '🔒',
        bg: '#fff0f3',
        title: 'Secure Payments',
        desc: 'Pay with Stripe (card) or JazzCash (mobile wallet). Funds are held securely and released only after check-in.',
    },
    {
        icon: '📍',
        bg: '#efffed',
        title: 'Interactive Maps',
        desc: 'Google Maps is built into every listing page so you can see exactly where a property is before you commit.',
    },
    {
        icon: '⚡',
        bg: '#fffbea',
        title: '30-Second Support',
        desc: 'Our team has an average first-response time of ~30 seconds — great travel starts with great service.',
    },
];

const guestSteps = [
    { step: '01', title: 'Search', desc: 'Enter your destination, travel dates, and number of guests.', color: '#1e5bb8' },
    { step: '02', title: 'Choose', desc: 'Browse verified listings, read real reviews, and pick the perfect stay.', color: '#1e5bb8' },
    { step: '03', title: 'Book & Pay', desc: 'Confirm your booking and pay securely online. Funds are held until check-in.', color: '#1e5bb8' },
    { step: '04', title: 'Review', desc: 'After your stay, share your experience to help the next traveller.', color: '#1e5bb8' },
];

const hostSteps = [
    { step: '01', title: 'Register', desc: 'Sign up as a host and complete identity verification.', color: '#FF385C' },
    { step: '02', title: 'List Your Property', desc: 'Add photos, set your pricing, and define availability.', color: '#FF385C' },
    { step: '03', title: 'Get Approved', desc: 'Our team reviews and approves your listing within 24–48 hours.', color: '#FF385C' },
    { step: '04', title: 'Start Earning', desc: 'Your listing goes live, guests book, and payouts land in your account.', color: '#FF385C' },
];

const HomePage = () => {
    return (
        <div className="bg-white">

            {/* ── HERO ── */}
            <section className="hp-hero">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-12 col-lg-10 hp-hero-content text-center">
                            <div className="hp-badge">
                                <span>🇵🇰</span> Pakistan's Premier Booking Platform
                            </div>
                            <h1 className="fw-bold text-white mb-3">
                                Your Perfect Stay,<br />Anywhere in Pakistan
                            </h1>
                            <p className="text-white mb-4">
                                BookSmart connects travellers with verified hotels and short-term rentals across
                                Lahore, Karachi, Islamabad, Murree, and beyond. Safe payments. Real reviews.
                                Instant bookings.
                            </p>
                            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                                <Link to="/browse-hotels" className="hp-btn-primary">
                                    Browse Hotels →
                                </Link>
                                <Link to="/about" className="hp-btn-outline">
                                    Learn About Us
                                </Link>
                            </div>

                            {/* Trust bar */}
                            <div className="hp-trust-bar mt-4">
                                <div className="hp-trust-item"><span>✅</span> Verified listings</div>
                                <div className="hp-trust-item"><span>🔒</span> Secure payments</div>
                                <div className="hp-trust-item"><span>⚡</span> ~30s support response</div>
                                <div className="hp-trust-item"><span>🇵🇰</span> Built for Pakistan</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── INTRO ── */}
            <section className="py-5 px-3" style={{ background: '#f8f9ff' }}>
                <div className="container text-center" style={{ maxWidth: '760px' }}>
                    <span className="hp-section-label">What is BookSmart?</span>
                    <h2 className="fw-bold mt-2 mb-3" style={{ color: '#0c2569', fontSize: 'clamp(1.7rem, 4vw, 2.4rem)' }}>
                        Pakistan's Smarter Way to Book
                    </h2>
                    <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: '1.85' }}>
                        We built BookSmart because travellers in Pakistan deserved better — no more unreliable
                        listings, hidden fees, or platforms that don't understand the local market. Today, we're
                        the most trusted hotel and short-stay booking platform in the country, with every
                        property hand-verified by our team before it ever appears on site.
                    </p>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section className="py-5 px-3">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="hp-section-label">Why Choose Us</span>
                        <h2 className="fw-bold mt-2" style={{ color: '#0c2569', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)' }}>
                            Everything You Need in One Place
                        </h2>
                    </div>
                    <div className="row g-4">
                        {features.map(({ icon, bg, title, desc }) => (
                            <div key={title} className="col-12 col-sm-6 col-lg-3">
                                <div className="hp-feature-card">
                                    <div className="hp-feature-icon" style={{ background: bg }}>
                                        {icon}
                                    </div>
                                    <h5 className="fw-bold mb-2" style={{ color: '#0c2569' }}>{title}</h5>
                                    <p className="text-muted mb-0" style={{ fontSize: '0.9rem', lineHeight: '1.65' }}>{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── STATS ── */}
            <section className="hp-stats">
                <div className="container">
                    <div className="row g-3 text-center">
                        {[
                            { num: '100+', label: 'Verified Listings' },
                            { num: '4', label: 'Co-Founders' },
                            { num: '~30s', label: 'Avg. Support Response' },
                            { num: '1', label: 'Mission: Trusted Travel' },
                        ].map(({ num, label }) => (
                            <div key={label} className="col-6 col-md-3">
                                <div className="hp-stat-num">{num}</div>
                                <div className="hp-stat-label mt-1">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ── */}
            <section className="py-5 px-3">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="hp-section-label">How It Works</span>
                        <h2 className="fw-bold mt-2" style={{ color: '#0c2569', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)' }}>
                            Simple from Start to Finish
                        </h2>
                    </div>
                    <div className="row g-5">
                        {/* Guests */}
                        <div className="col-12 col-md-6">
                            <div className="p-4 rounded-4 h-100" style={{ background: '#eef3ff' }}>
                                <h4 className="fw-bold mb-4" style={{ color: '#1e5bb8' }}>For Guests</h4>
                                {guestSteps.map(({ step, title, desc, color }) => (
                                    <div key={step} className="hp-step">
                                        <div className="hp-step-num" style={{ background: color }}>{step}</div>
                                        <div>
                                            <p className="fw-bold mb-0" style={{ color: '#0c2569', fontSize: '0.95rem' }}>{title}</p>
                                            <p className="text-muted mb-0" style={{ fontSize: '0.87rem' }}>{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hosts */}
                        <div className="col-12 col-md-6">
                            <div className="p-4 rounded-4 h-100" style={{ background: '#fff0f3' }}>
                                <h4 className="fw-bold mb-4" style={{ color: '#FF385C' }}>For Hosts</h4>
                                {hostSteps.map(({ step, title, desc, color }) => (
                                    <div key={step} className="hp-step">
                                        <div className="hp-step-num" style={{ background: color }}>{step}</div>
                                        <div>
                                            <p className="fw-bold mb-0" style={{ color: '#0c2569', fontSize: '0.95rem' }}>{title}</p>
                                            <p className="text-muted mb-0" style={{ fontSize: '0.87rem' }}>{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="hp-cta">
                <div className="container" style={{ maxWidth: '640px' }}>
                    <span className="hp-section-label">Ready to Start?</span>
                    <h2 className="fw-bold mt-2 mb-3" style={{ color: '#0c2569', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)' }}>
                        Discover Your Next Stay in Pakistan
                    </h2>
                    <p className="text-muted mb-4" style={{ fontSize: '1rem', lineHeight: '1.75' }}>
                        Join thousands of travellers who trust BookSmart for seamless, verified, and affordable
                        stays across Pakistan.
                    </p>
                    <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                        <Link
                            to="/browse-hotels"
                            className="btn fw-bold px-5 py-3"
                            style={{ background: '#1e5bb8', color: '#fff', borderRadius: '50px', fontSize: '1rem', border: 'none' }}
                        >
                            Browse Hotels
                        </Link>
                        <Link
                            to="/about"
                            className="btn fw-bold px-5 py-3"
                            style={{ background: 'transparent', color: '#1e5bb8', border: '2px solid #1e5bb8', borderRadius: '50px', fontSize: '1rem' }}
                        >
                            Our Story
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HomePage;
