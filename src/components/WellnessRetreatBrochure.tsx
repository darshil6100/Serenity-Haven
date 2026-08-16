import './wellness-retreat-brochure.css';

type WellnessRetreatBrochureProps = {
  onBack: () => void;
};

const WellnessRetreatBrochure = ({ onBack }: WellnessRetreatBrochureProps) => {
  return (
    <>
<div className="hero">
  <img className="bg" src="/package_details/images/about-banner-1.jpg" alt="Resort by the pool at dusk" />
  <div className="hero-top">
    <button type="button" className="brochure-back" onClick={onBack}>
      <span aria-hidden="true">←</span>
      Back to Packages
    </button>
    <div className="seats-badge">Limited seats · Book now</div>
  </div>
  <div className="hero-content">
    <div className="eyebrow">12–13 September 2026 · 2 Days / 1 Night</div>
    <h1 className="hero-title">A 2-Day<br /><em>Wellness</em> Retreat</h1>
    <p className="hero-sub">Step away from the routine. Reset your body, calm your mind, and reconnect with you — through yoga, pranayama, meditation, nourishing food and quiet time in nature.</p>
    <div className="hero-meta">
      <div className="meta-pill"><div className="k">Check-in</div><div className="v">11:00 AM, Day 1</div></div>
      <div className="meta-pill"><div className="k">Check-out</div><div className="v">10:00 AM, Day 2</div></div>
      <div className="meta-pill ">
        <div className="k">Early bird/until 1st sept</div>
        <div className="v price-line"><span className="old-price">₹11,999</span><span>₹9,999 / person</span></div>
      </div>
      <div className="meta-pill"><div className="k">Facilitator</div><div className="v">Dr. Aakanksha Koshtim, BNYS</div></div>
    </div>
  </div>
</div>

<section className="intro">
  <div className="wrap">
    <div className="eyebrow" style={{ justifyContent: 'center' }}>Why this retreat</div>
    <p className="quote">"A complete reset <span>for your body, mind and lifestyle.</span> Learn. Heal. Grow — together."</p>
    <p className="body">Tucked away amidst trees and open lawns, this retreat is built around one idea: that two unhurried days of movement, stillness and real food can reset months of routine. Every session is guided by Dr. Aakanksha Koshti (BNYS), Diet & Lifestyle Counsellor and Wellness Mentor — so what you learn here is something you can actually carry home.</p>

    <div className="pillars">
      <div className="pillar"><div className="n">Yoga</div></div>
      <div className="pillar"><div className="n">Pranayama</div></div>
      <div className="pillar"><div className="n">Meditation</div></div>
      <div className="pillar"><div className="n">Nutrition</div></div>
      <div className="pillar"><div className="n">Nature Walks</div></div>
      <div className="pillar"><div className="n">Lifestyle</div></div>
    </div>
  </div>
</section>

<section id="practice">
  <div className="wrap">
    <div className="sec-head">
      <div className="eyebrow">The Practice, In Pictures</div>
      <h2>What Each Session<br />Actually Looks Like</h2>
    </div>
    <div className="practice-grid">
      <div className="practice-card">
        <img src="/package_details/images/yoga.jpg" alt="Yoga session" />
        <div className="info">
          <div className="num">01</div>
          <div className="name">Yoga</div>
          <div className="tag">Guided asana practice, twice a day</div>
        </div>
      </div>
      <div className="practice-card">
        <img src="/package_details/images/meditation.jpg" alt="Meditation session" />
        <div className="info">
          <div className="num">02</div>
          <div className="name">Meditation</div>
          <div className="tag">Sunset stillness & sunrise reflection</div>
        </div>
      </div>
      <div className="practice-card">
        <img src="/package_details/images/nature-walk.jpg" alt="Nature walk through the grounds" />
        <div className="info">
          <div className="num">03</div>
          <div className="name">Nature Walk</div>
          <div className="tag">A slow, guided walk through the grounds</div>
        </div>
      </div>
      <div className="practice-card">
        <img src="/package_details/images/consultation.png" alt="Lifestyle consultation with Dr. Aakanksha" />
        <div className="info">
          <div className="num">04</div>
          <div className="name">Lifestyle Consultation</div>
          <div className="tag">1:1 diet & lifestyle session with Dr. Aakanksha</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="facilitator">
  <div className="wrap facilitator">
    <div className="fac-photo">
      <img src="/package_details/images/facilator.jpeg" alt="Dr. Aakanksha Koshti" />
      <div className="tag">BNYS · Wellness Mentor</div>
    </div>
    <div className="fac-copy">
      <div className="eyebrow">Your Facilitator</div>
      <h3>Dr. Aakanksha Koshti</h3>
      <div className="fac-role">Diet & Lifestyle Counsellor · Wellness Mentor</div>
      <p>Dr. Aakanksha brings a BNYS foundation and years of one-on-one counselling into every session of this retreat — from how you breathe on the mat to what lands on your plate at dinner. Her approach is simple and sustainable: small, honest shifts in daily habits, not a two-day performance of wellness.</p>
      <p>Across the retreat, she leads the daily yoga and pranayama practice, a guided meditation, and a personal diet & lifestyle counselling session designed to give every guest a few practical tools to take back into ordinary life.</p>
      <div className="fac-creds">
        <div><div className="k">Focus</div><div className="v">Diet & Lifestyle</div></div>
        <div><div className="k">Practice</div><div className="v">Naturopathy & Yoga</div></div>
        <div><div className="k">Sessions</div><div className="v">Daily, guided</div></div>
      </div>
    </div>
  </div>
</section>

<section className="alt-bg" id="itinerary">
  <div className="wrap">
    <div className="sec-head">
      <div className="eyebrow">The Trail Ahead</div>
      <h2>Your Two Days,<br />Hour by Hour</h2>
    </div>

    <div className="itin-days">
      
      <div className="day-col">
        <h3>Day One — Arrive & Unwind</h3>
        <span className="day-date">Saturday, 12th September</span>
        <div className="trail">
          <div className="trail-item"><div className="time">11:00 AM</div><div className="what">Check-in & Welcome Drink</div><div className="desc">Settle into your room and meet fellow guests over a chilled herbal welcome drink.</div></div>
          <div className="trail-item"><div className="time">12:00 PM</div><div className="what">Orientation Circle</div><div className="desc">An introductory session with Dr. Aakanksha — the "why" behind the next two days.</div></div>
          <div className="trail-item"><div className="time">1:00 PM</div><div className="what">Sattvic Lunch</div><div className="desc">A wholesome, plant-forward welcome meal.</div></div>
          <div className="trail-item"><div className="time">2:30 PM</div><div className="what">Leisure Time</div><div className="desc">Pool, carrom, billiards, table tennis or simply a nap — your call.</div></div>
          <div className="trail-item"><div className="time">4:00 PM</div><div className="what">Guided Nature Walk</div><div className="desc">A slow walk through the grounds, led by our in-house guide.</div></div>
          <div className="trail-item"><div className="time">5:00 PM</div><div className="what">Pranayama & Breathwork</div><div className="desc">Evening breathing practice as the light softens.</div></div>
          <div className="trail-item"><div className="time">6:00 PM</div><div className="what">Tea & Group Fun Activity</div><div className="desc">Herbal tea followed by a light-hearted team activity — laughter guaranteed.</div></div>
          <div className="trail-item"><div className="time">7:00 PM</div><div className="what">Sunset Meditation</div><div className="desc">A guided stillness practice to close the day's movement.</div></div>
          <div className="trail-item"><div className="time">8:00 PM</div><div className="what">Dinner & Bonfire</div><div className="desc">Nourishing dinner followed by conversation around the fire.</div></div>
          <div className="trail-item"><div className="time">9:30 PM</div><div className="what">Free Time</div><div className="desc">Cards, carrom or an early night — the choice is yours.</div></div>
        </div>
      </div>

      <div className="day-col">
        <h3>Day Two — Practice & Depart</h3>
        <span className="day-date">Sunday, 13th September</span>
        <div className="trail">
          <div className="trail-item"><div className="time">5:30 AM</div><div className="what">Sunrise Yoga</div><div className="desc">A full guided asana practice to greet the morning.</div></div>
          <div className="trail-item"><div className="time">6:30 AM</div><div className="what">Herbal Tea</div><div className="desc">Warm, light refreshment before the next session.</div></div>
          <div className="trail-item"><div className="time">7:00 AM</div><div className="what">Guided Meditation</div><div className="desc">A quiet reflection circle to sit with everything so far.</div></div>
          <div className="trail-item"><div className="time">8:00 AM</div><div className="what">1:1 Diet & Lifestyle Session</div><div className="desc">Personal counselling with Dr. Aakanksha — habits you can keep.</div></div>
          <div className="trail-item"><div className="time">8:45 AM</div><div className="what">Farewell Breakfast</div><div className="desc">A hearty, nourishing send-off meal.</div></div>
          <div className="trail-item"><div className="time">9:30 AM</div><div className="what">Wellness Kit & Closing Circle</div><div className="desc">Take-home wellness kit, group photo and closing thoughts.</div></div>
          <div className="trail-item"><div className="time">10:00 AM</div><div className="what">Check-out</div><div className="desc">Depart refreshed — and hopefully, a little transformed.</div></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="stay">
  <div className="wrap">
    <div className="sec-head">
      <div className="eyebrow">Where You'll Stay</div>
      <h2>Rooms Amidst the Trees</h2>
    </div>
    <div className="room-grid">
      <div className="room-card">
        <div className="img-wrap"><img src="/package_details/images/best-resort-near-gandhinagar-10.jpg" alt="Super Delux Room" /></div>
        <div className="body"><h4>Super Delux Room</h4><p>Warm, contemporary rooms with a private sit-out — comfortable and quiet after a full day of sessions.</p></div>
      </div>
      <div className="room-card">
        <div className="img-wrap"><img src="/package_details/images/valley-view-villa2.jpg" alt="Valley View Villa" /></div>
        <div className="body"><h4>Valley View Villa</h4><p>Spacious villa rooms with wide windows that open straight onto green views.</p></div>
      </div>
      <div className="room-card">
        <div className="img-wrap"><img src="/package_details/images/valley-view-villa2.jpg" alt="Valley View Delux Villa" /></div>
        <div className="body"><h4>Valley View Delux Villa</h4><p>A little more room to stretch out, with a seating nook for morning journaling.</p></div>
      </div>
      <div className="room-card">
        <div className="img-wrap"><img src="/package_details/images/Riverside-Bhunga-Huts.jpg" alt="Riverside Bhunga Huts" /></div>
        <div className="body"><h4>Riverside Bhunga Huts</h4><p>Rustic, round mud-hut-style rooms for guests who want their stay to feel like an escape.</p></div>
      </div>
    </div>
  </div>
</section>

<section className="alt-bg" id="food">
  <div className="wrap nourish">
    <div>
      <img src="/package_details/images/best-resort-near-gandhinagar-16.jpg" alt="Guests relaxing at the resort" style={{ borderRadius: '6px 60px 6px 60px' }} />
    </div>
    <div>
      <div className="eyebrow">Nourishment</div>
      <h2>Food That Works<br />With You, Not Against</h2>
      <p style={{ color: 'rgba(246,241,226,0.75)', maxWidth: '460px' }}>Every meal on this retreat is planned around the day's practice — light and easy to digest before a session, warm and wholesome after one. All meals are included, curated with Dr. Aakanksha's diet philosophy.</p>
      <ul className="nourish-list">
        <li><span className="time" style={{color: 'var(--amber)'}}>Day 1, 1:00 PM</span><p style={{ color: 'rgba(246,241,226,0.75)', maxWidth: '460px' }}> Sattvic welcome lunch</p></li>
        <li><span className="time" style={{color: 'var(--amber)'}}>Day 1, 6:00 PM</span><p style={{ color: 'rgba(246,241,226,0.75)', maxWidth: '460px' }}> Herbal evening tea & snacks</p></li>
        <li><span className="time" style={{color: 'var(--amber)'}}>Day 1, 8:00 PM</span> <p style={{ color: 'rgba(246,241,226,0.75)', maxWidth: '460px' }}>Wholesome dinner by the bonfire</p></li>
        <li><span className="time" style={{color: 'var(--amber)'}}>Day 2, 6:30 AM</span> <p style={{ color: 'rgba(246,241,226,0.75)', maxWidth: '460px' }}>Warm herbal tea</p></li>
        <li><span className="time" style={{color: 'var(--amber)'}}>Day 2, 8:45 AM</span> <p style={{ color: 'rgba(246,241,226,0.75)', maxWidth: '460px' }}>Farewell breakfast</p></li>
      </ul>
      <div className="nourish-badge">🌿 All meals included · No hidden costs</div>
    </div>
  </div>
</section>

<section id="activities">
  <div className="wrap">
    <div className="sec-head">
      <div className="eyebrow">Beyond The Mat</div>
      <h2>Play, Move & Connect</h2>
    </div>
    <div className="gallery">
      <div className="g-item"><img src="/package_details/images/rope-climbing.jpg" alt="High rope course" /><div className="cap">High Rope Course</div></div>
      <div className="g-item"><img src="/package_details/images/camel-cart-ridding.jpg" alt="Camel cart ride" /><div className="cap">Camel Cart Ride</div></div>
      <div className="g-item"><img src="/package_details/images/cycling-1.jpg" alt="Cycling on the grounds" /><div className="cap">Leisure Cycling</div></div>
      <div className="g-item"><img src="/package_details/images/corporate-fun.jpg" alt="Group activity" /><div className="cap">Group Fun Activities</div></div>
      <div className="g-item"><img src="/package_details/images/best-resort-near-gandhinagar-17.jpg" alt="Table tennis" /><div className="cap">Table Tennis</div></div>
      <div className="g-item"><img src="/package_details/images/carrom-board1.jpg" alt="Carrom board" /><div className="cap">Carrom</div></div>
      <div className="g-item"><img src="/package_details/images/card-room2.jpg" alt="Card room" /><div className="cap">Card Room</div></div>
    </div>
  </div>
</section>

<section className="alt-bg" id="pricing">
  <div className="wrap">
    <div className="sec-head">
      <div className="eyebrow">Join Us</div>
      <h2>All-Inclusive Package</h2>
    </div>

    <div className="pricing">
      <div className="price-card">
        <span className="ribbon">Book before 31 Aug</span>
        <div className="price-format-card">
          <div className="price-format-label">Early Bird/Until 1st Sept</div>
          <div className="price-format-value price-line"><span className="old-price">₹11,999</span><span>₹9,999 / person</span></div>
        </div>
        <div className="per">2 Days / 1 Night</div>
      </div>
      <div className="price-card featured">
        <div className="label">Regular Price</div>
        <div className="amt">₹11,999</div>
        <div className="per">per person · 2 Days / 1 Night</div>
      </div>
    </div>

    <div className="incl-grid">
      <div className="incl"><div className="ico">🛏</div><div><div className="t">Stay</div><div className="d">1 night in your chosen room type</div></div></div>
      <div className="incl"><div className="ico">🍽</div><div><div className="t">All Meals</div><div className="d">Lunch, tea, dinner, tea & breakfast</div></div></div>
      <div className="incl"><div className="ico">🧘</div><div><div className="t">All Sessions</div><div className="d">Yoga, pranayama, meditation & counselling</div></div></div>
      <div className="incl"><div className="ico">🎯</div><div><div className="t">Activities</div><div className="d">Rope course, carrom, TT, cycling & more</div></div></div>
      <div className="incl"><div className="ico">🌳</div><div><div className="t">Nature Walk</div><div className="d">Guided walk through the grounds</div></div></div>
      <div className="incl"><div className="ico">🎁</div><div><div className="t">Wellness Kit</div><div className="d">A surprise take-home gift for every guest</div></div></div>
    </div>
  </div>
</section>

<section id="practical">
  <div className="wrap">
    <div className="sec-head">
      <div className="eyebrow">Good To Know</div>
      <h2>Practical Details</h2>
    </div>
    <div className="practical">
      <div>
        <div className="lbl">Check-in</div>
        <div className="big">11:00 AM</div>
        <div className="sub">Saturday, 12th September 2026. Rooms ready and welcome drink served on arrival.</div>
      </div>
      <div>
        <div className="lbl">Check-out</div>
        <div className="big">10:00 AM</div>
        <div className="sub">Sunday, 13th September 2026, right after breakfast and the closing circle.</div>
      </div>
      <div>
        <div className="lbl">What to bring</div>
        <div className="big" style={{ fontSize: '22px' }}>Pack Light</div>
        <div className="sub">Comfortable yoga wear, walking shoes, a water bottle, and a light shawl for the evenings.</div>
      </div>
    </div>
  </div>
</section>

<section className="alt-bg" id="terms">
  <div className="wrap">
    <div className="sec-head">
      <div className="eyebrow">Please Read</div>
      <h2>Terms & Conditions</h2>
    </div>

    <div className="terms-grid">
      <div className="term-card">
        <div className="term-num">01</div>
        <h4>Booking Confirmation</h4>
        <p>Seats are limited and bookings are confirmed only after full payment or an approved advance payment is received.</p>
      </div>
      <div className="term-card">
        <div className="term-num">02</div>
        <h4>Package Inclusions</h4>
        <p>The package includes stay, listed meals, wellness sessions, selected resort activities and the wellness kit. Personal expenses and travel are not included.</p>
      </div>
      <div className="term-card">
        <div className="term-num">03</div>
        <h4>Schedule Changes</h4>
        <p>The itinerary may be adjusted due to weather, operational requirements, facilitator availability or guest safety considerations.</p>
      </div>
      <div className="term-card">
        <div className="term-num">04</div>
        <h4>Cancellation & Refunds</h4>
        <p>Cancellation, refund or date-change requests will be handled as per the retreat/resort policy shared at the time of booking.</p>
      </div>
      <div className="term-card">
        <div className="term-num">05</div>
        <h4>Health Responsibility</h4>
        <p>Guests should inform the team in advance about any medical condition, injury, pregnancy, food allergy or special dietary requirement.</p>
      </div>
      <div className="term-card">
        <div className="term-num">06</div>
        <h4>Resort Guidelines</h4>
        <p>Guests are expected to follow resort rules, maintain the retreat environment and participate in activities at their own comfort level.</p>
      </div>
    </div>
  </div>
</section>

<footer>
  
</footer>
    </>
  );
};

export default WellnessRetreatBrochure;
