/* eslint-disable */

function ActionCard({ icon, title, description, ctaLabel, ctaTone = 'secondary', onClick }) {
  return (
    <div className="action-card" onClick={onClick} role="button" tabIndex={0}>
      <div className="action-card__icon">{icon}</div>
      <h3 className="action-card__title">{title}</h3>
      <p className="action-card__desc">{description}</p>
      {ctaLabel ? (
        <span className={`action-card__cta cta-${ctaTone}`}>{ctaLabel}</span>
      ) : null}
    </div>
  );
}

function ListingCard({ kind = 'request', title, owner, ownerInitial, time, tags = [], description, onClick }) {
  const tone = kind === 'request' ? 'secondary' : 'warning';
  const icon = kind === 'request' ? '📝' : '💡';
  return (
    <div className="listing-card" onClick={onClick} role="button" tabIndex={0}>
      <div className="listing-card__head">
        <span className={`chip chip-${tone}`}>{icon} {kind === 'request' ? 'Request' : 'Offer'}</span>
        <span className="listing-card__time">{time}</span>
      </div>
      <h3 className="listing-card__title">{title}</h3>
      <p className="listing-card__desc">{description}</p>
      <div className="listing-card__foot">
        <span className="avatar"><span>{ownerInitial}</span></span>
        <span className="listing-card__owner">{owner}</span>
        <span className="listing-card__tags">
          {tags.map(t => <span key={t} className="chip chip-surface">{t}</span>)}
        </span>
      </div>
    </div>
  );
}

const cardStyles = `
.action-card {
  background: #fff; border: 1px solid rgb(var(--border-1));
  border-radius: 12px; padding: 24px; box-shadow: var(--shadow-md);
  text-align: center; cursor: pointer;
  transition: box-shadow 150ms, border-color 150ms, transform 150ms;
}
.action-card:hover { box-shadow: var(--shadow-lg); border-color: rgb(var(--color-primary-300)); }
.action-card:hover .action-card__icon { transform: scale(1.1); }
.action-card__icon { font-size: 40px; margin-bottom: 10px; transition: transform 150ms; }
.action-card__title { margin: 0 0 8px; font: 600 18px/24px var(--font-base); color: rgb(var(--fg-1)); }
.action-card__desc { margin: 0 0 14px; font: 400 14px/22px var(--font-base); color: rgb(var(--fg-2)); }
.action-card__cta { display: inline-block; border-radius: 9999px; padding: 8px 18px; font: 600 13px/20px var(--font-base); }
.cta-secondary { background: rgb(var(--color-secondary-500)); color: #111;}
.cta-warning   { background: rgb(var(--color-warning-500)); color: #111;}
.cta-tertiary  { background: rgb(var(--color-tertiary-500)); color: #111;}
.cta-primary   { background: rgb(var(--color-primary-500)); color: #fff;}

.listing-card {
  background: #fff; border: 1px solid rgb(var(--border-1));
  border-radius: 12px; padding: 18px; box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: box-shadow 150ms, border-color 150ms, transform 100ms;
  display: flex; flex-direction: column; gap: 10px;
}
.listing-card:hover { box-shadow: var(--shadow-md); border-color: rgb(var(--color-primary-300)); }
.listing-card__head { display: flex; align-items: center; justify-content: space-between; }
.listing-card__time { font: 400 12px/16px var(--font-base); color: rgb(var(--fg-3)); }
.listing-card__title { margin: 0; font: 600 18px/24px var(--font-base); color: rgb(var(--fg-1)); }
.listing-card__desc  { margin: 0; font: 400 14px/22px var(--font-base); color: rgb(var(--fg-2)); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;}
.listing-card__foot  { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.listing-card__owner { font: 500 13px/18px var(--font-base); color: rgb(var(--fg-2)); }
.listing-card__tags  { display: flex; gap: 6px; margin-left: auto; flex-wrap: wrap;}

.avatar {
  width: 28px; height: 28px; border-radius: 9999px;
  background: rgb(var(--color-primary-200));
  color: rgb(var(--color-primary-800));
  display: inline-grid; place-items: center;
  font: 700 12px/1 var(--font-base);
}

/* gradient banner used on home and CTAs */
.banner {
  border-radius: 16px; padding: 32px;
  color: #fff; box-shadow: var(--shadow-lg);
  background: linear-gradient(90deg, rgb(var(--color-primary-500)) 0%, rgb(var(--color-secondary-500)) 100%);
}
.banner h2 { margin: 0 0 8px; font: 700 28px/34px var(--font-base);}
.banner p  { margin: 0 0 16px; font: 400 16px/24px var(--font-base); opacity: .92;}

.cta-row {
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
}
.cta-tile {
  border-radius: 12px; padding: 22px;
  color: #fff; box-shadow: var(--shadow-md);
  display: flex; align-items: center; gap: 16px;
  cursor: pointer;
  transition: box-shadow 150ms, transform 150ms;
}
.cta-tile:hover { box-shadow: var(--shadow-xl); }
.cta-tile:hover .cta-tile__icon { transform: scale(1.1); }
.cta-tile__icon { font-size: 40px; transition: transform 150ms; }
.cta-tile h3 { margin: 0 0 4px; font: 700 22px/28px var(--font-base);}
.cta-tile p  { margin: 0; opacity: .9; font: 400 14px/20px var(--font-base);}
.cta-tile--requests { background: linear-gradient(90deg, rgb(var(--color-secondary-500)), rgb(var(--color-secondary-600))); color: #1a1a1a;}
.cta-tile--offers   { background: linear-gradient(90deg, rgb(var(--color-warning-500)),   rgb(var(--color-warning-600)));}
`;

Object.assign(window, { ActionCard, ListingCard, cardStyles });
