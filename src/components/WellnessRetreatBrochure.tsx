import { useEffect, useState } from 'react';
import './wellness-retreat-brochure.css';

type SectionMap = Record<string, Record<string, unknown>>;

type WellnessRetreatBrochureProps = {
  packageId: string;
  onBack: () => void;
};

function asString(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

function asList<T extends Record<string, unknown>>(value: unknown) {
  return Array.isArray(value) ? value as T[] : [];
}

function asStringList(value: unknown) {
  return Array.isArray(value) ? value.map(String) : [];
}

async function fetchPackageDetails(packageId: string) {
  const response = await fetch(`/api/packages/${packageId}/details`);
  if (!response.ok) throw new Error('Failed to load package details');

  const data = await response.json() as { sections?: SectionMap };
  return data.sections ?? {};
}

const WellnessRetreatBrochure = ({ packageId, onBack }: WellnessRetreatBrochureProps) => {
  const [sections, setSections] = useState<SectionMap>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetchPackageDetails(packageId)
      .then(data => {
        if (isMounted) setSections(data);
      })
      .catch(error => {
        console.error('Package detail API error:', error);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [packageId]);

  const hero = sections.hero ?? {};
  const intro = sections.intro ?? {};
  const practice = sections.practice ?? {};
  const facilitator = sections.facilitator ?? {};
  const itinerary = sections.itinerary ?? {};
  const rooms = sections.rooms ?? {};
  const food = sections.food ?? {};
  const activities = sections.activities ?? {};
  const pricing = sections.pricing ?? {};
  const practical = sections.practical ?? {};
  const terms = sections.terms ?? {};

  return (
    <>
      <div className="hero">
        <img className="bg" src={asString(hero.image, '/package_details/images/about-banner-1.jpg')} alt="Retreat" />
        <div className="hero-top">
          <button type="button" className="brochure-back" onClick={onBack}>
            <span aria-hidden="true">←</span>
            Back to Packages
          </button>
          <div className="seats-badge">{asString(hero.badge, isLoading ? 'Loading details' : 'Limited seats · Book now')}</div>
        </div>
        <div className="hero-content">
          <div className="eyebrow">{asString(hero.eyebrow, 'Package Details')}</div>
          <h1 className="hero-title">
            {asString(hero.title, 'Wellness')}<br />
            <em>{asString(hero.emphasis, 'Retreat')}</em> {asString(hero.suffix)}
          </h1>
          <p className="hero-sub">{asString(hero.subtitle, 'Loading the retreat details for this package.')}</p>
          <div className="hero-meta">
            {asList<{ label?: string; value?: string; oldValue?: string }>(hero.meta).map((item, index) => (
              <div className="meta-pill" key={`${item.label}-${index}`}>
                <div className="k">{item.label}</div>
                {item.oldValue ? (
                  <div className="v price-line"><span className="old-price">{item.oldValue}</span><span>{item.value}</span></div>
                ) : (
                  <div className="v">{item.value}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="intro">
        <div className="wrap">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>{asString(intro.eyebrow, 'Why this retreat')}</div>
          <p className="quote">"{asString(intro.quote, 'A complete reset for your body, mind and lifestyle.')}"</p>
          <p className="body">{asString(intro.body)}</p>
          <div className="pillars">
            {asStringList(intro.pillars).map(item => (
              <div className="pillar" key={item}><div className="n">{item}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section id="practice">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">{asString(practice.eyebrow, 'The Practice')}</div>
            <h2>{asString(practice.heading, 'What Each Session Looks Like')}</h2>
          </div>
          <div className="practice-grid">
            {asList<{ image?: string; title?: string; tag?: string }>(practice.items).map((item, index) => (
              <div className="practice-card" key={`${item.title}-${index}`}>
                <img src={item.image} alt={item.title} />
                <div className="info">
                  <div className="num">{String(index + 1).padStart(2, '0')}</div>
                  <div className="name">{item.title}</div>
                  <div className="tag">{item.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="facilitator">
        <div className="wrap facilitator">
          <div className="fac-photo">
            <img src={asString(facilitator.image, '/package_details/images/facilator.jpeg')} alt={asString(facilitator.name, 'Facilitator')} />
            <div className="tag">{asString(facilitator.tag)}</div>
          </div>
          <div className="fac-copy">
            <div className="eyebrow">{asString(facilitator.eyebrow, 'Your Facilitator')}</div>
            <h3>{asString(facilitator.name)}</h3>
            <div className="fac-role">{asString(facilitator.role)}</div>
            {asStringList(facilitator.paragraphs).map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            <div className="fac-creds">
              {asList<{ label?: string; value?: string }>(facilitator.creds).map(item => (
                <div key={item.label}><div className="k">{item.label}</div><div className="v">{item.value}</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="alt-bg" id="itinerary">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">{asString(itinerary.eyebrow, 'The Trail Ahead')}</div>
            <h2>{asString(itinerary.heading, 'Your Days, Hour by Hour')}</h2>
          </div>
          <div className="itin-days">
            {asList<{ title?: string; date?: string; items?: Array<{ time?: string; title?: string; description?: string }> }>(itinerary.days).map(day => (
              <div className="day-col" key={day.title}>
                <h3>{day.title}</h3>
                <span className="day-date">{day.date}</span>
                <div className="trail">
                  {(day.items ?? []).map(item => (
                    <div className="trail-item" key={`${day.title}-${item.time}-${item.title}`}>
                      <div className="time">{item.time}</div>
                      <div className="what">{item.title}</div>
                      <div className="desc">{item.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stay">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">{asString(rooms.eyebrow, "Where You'll Stay")}</div>
            <h2>{asString(rooms.heading, 'Rooms')}</h2>
          </div>
          <div className="room-grid">
            {asList<{ image?: string; title?: string; description?: string }>(rooms.items).map(item => (
              <div className="room-card" key={item.title}>
                <div className="img-wrap"><img src={item.image} alt={item.title} /></div>
                <div className="body"><h4>{item.title}</h4><p>{item.description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="alt-bg" id="food">
        <div className="wrap nourish">
          <div><img src={asString(food.image)} alt="Guests relaxing at the resort" style={{ borderRadius: '6px 60px 6px 60px' }} /></div>
          <div>
            <div className="eyebrow">{asString(food.eyebrow, 'Nourishment')}</div>
            <h2>{asString(food.heading, 'Food That Works With You')}</h2>
            <p style={{ color: 'rgba(246,241,226,0.75)', maxWidth: '460px' }}>{asString(food.body)}</p>
            <ul className="nourish-list">
              {asList<{ time?: string; title?: string }>(food.items).map(item => (
                <li key={`${item.time}-${item.title}`}><span className="time" style={{ color: 'var(--amber)' }}>{item.time}</span><p style={{ color: 'rgba(246,241,226,0.75)', maxWidth: '460px' }}>{item.title}</p></li>
              ))}
            </ul>
            <div className="nourish-badge">{asString(food.badge)}</div>
          </div>
        </div>
      </section>

      <section id="activities">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">{asString(activities.eyebrow, 'Beyond The Mat')}</div>
            <h2>{asString(activities.heading, 'Play, Move & Connect')}</h2>
          </div>
          <div className="gallery">
            {asList<{ image?: string; title?: string }>(activities.items).map(item => (
              <div className="g-item" key={item.title}><img src={item.image} alt={item.title} /><div className="cap">{item.title}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="alt-bg" id="pricing">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">{asString(pricing.eyebrow, 'Join Us')}</div>
            <h2>{asString(pricing.heading, 'All-Inclusive Package')}</h2>
          </div>
          <div className="pricing">
            <div className="price-card">
              <span className="ribbon">{asString(pricing.ribbon)}</span>
              <div className="price-format-card">
                <div className="price-format-label">{asString(pricing.earlyBirdLabel)}</div>
                <div className="price-format-value price-line"><span className="old-price">{asString(pricing.regularPrice)}</span><span>{asString(pricing.earlyBirdPrice)}</span></div>
              </div>
              <div className="per">{asString(pricing.duration)}</div>
            </div>
            <div className="price-card featured">
              <div className="label">Regular Price</div>
              <div className="amt">{asString(pricing.regularPrice)}</div>
              <div className="per">per person · {asString(pricing.duration)}</div>
            </div>
          </div>
          <div className="incl-grid">
            {asList<{ icon?: string; title?: string; description?: string }>(pricing.inclusions).map(item => (
              <div className="incl" key={item.title}><div className="ico">{item.icon}</div><div><div className="t">{item.title}</div><div className="d">{item.description}</div></div></div>
            ))}
          </div>
        </div>
      </section>

      <section id="practical">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">{asString(practical.eyebrow, 'Good To Know')}</div>
            <h2>{asString(practical.heading, 'Practical Details')}</h2>
          </div>
          <div className="practical">
            {asList<{ label?: string; value?: string; description?: string }>(practical.items).map(item => (
              <div key={item.label}>
                <div className="lbl">{item.label}</div>
                <div className="big" style={item.value && item.value.length > 12 ? { fontSize: '22px' } : undefined}>{item.value}</div>
                <div className="sub">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="alt-bg" id="terms">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">{asString(terms.eyebrow, 'Please Read')}</div>
            <h2>{asString(terms.heading, 'Terms & Conditions')}</h2>
          </div>
          <div className="terms-grid">
            {asList<{ title?: string; description?: string }>(terms.items).map((item, index) => (
              <div className="term-card" key={item.title}>
                <div className="term-num">{String(index + 1).padStart(2, '0')}</div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WellnessRetreatBrochure;
