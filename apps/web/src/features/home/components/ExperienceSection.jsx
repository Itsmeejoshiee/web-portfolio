import { useExperience } from '../../../shared/hooks/useExperience';

const FALLBACK_PROFESSIONAL = [
  {
    id: 'role-current',
    title: 'Frontend Developer',
    organization: 'Freelance',
    startDate: 'Jan 2024',
    endDate: null,
    location: 'Manila, Philippines',
    summary: 'Design and build web apps and portfolio sites for small studios and solo founders.',
  },
  {
    id: 'role-previous',
    title: 'Junior Web Developer',
    organization: 'Acme Studio',
    startDate: 'Jun 2022',
    endDate: 'Dec 2023',
    location: 'Manila, Philippines',
    summary: 'Built and maintained client marketing sites and internal tools.',
  },
  {
    id: 'role-earlier',
    title: 'Web Development Intern',
    organization: 'Acme Studio',
    startDate: 'Jan 2022',
    endDate: 'May 2022',
    location: 'Manila, Philippines',
    summary: 'Assisted with front-end fixes and QA across client projects.',
  },
];

const FALLBACK_COMMUNITY = [
  {
    id: 'community-one',
    title: 'Community Organizer',
    organization: 'Dev Community PH',
    startDate: 'Mar 2023',
    endDate: null,
    summary: 'Help run monthly meetups and workshops for early-career developers.',
  },
  {
    id: 'community-two',
    title: 'Volunteer Mentor',
    organization: 'Code for Good',
    startDate: 'Aug 2022',
    endDate: 'Feb 2023',
    summary: 'Paired bootcamp graduates with portfolio projects and job prep.',
  },
];

function formatPeriod(entry) {
  return `${entry.startDate} — ${entry.endDate ?? 'present'}`;
}

function ExperienceEntry({ item, dotColor }) {
  return (
    <div className="relative pl-[34px]">
      <span
        className="absolute top-1 left-[-9px] h-4 w-4 rounded-full border-[3px] border-paper outline-2 outline-ink"
        style={{ background: dotColor }}
      />
      <h4 className="font-display text-[19px] font-semibold">
        {item.title} · {item.organization}
      </h4>
      <div className="mt-1 flex flex-wrap items-baseline gap-3">
        <span className="font-mono text-[11px] tracking-[0.06em] text-faint">{formatPeriod(item)}</span>
        {item.location && <span className="font-mono text-[11px] tracking-[0.06em] text-faint">{item.location}</span>}
      </div>
      <p className="mt-1.5 max-w-[480px] text-sm text-muted">{item.summary}</p>
    </div>
  );
}

export function ExperienceSection() {
  const entries = useExperience();

  const liveProfessional = entries?.filter((entry) => entry.track === 'professional');
  const liveCommunity = entries?.filter((entry) => entry.track === 'community');
  const professional = liveProfessional?.length ? liveProfessional : FALLBACK_PROFESSIONAL;
  const community = liveCommunity?.length ? liveCommunity : FALLBACK_COMMUNITY;

  return (
    <section id="experience" className="mx-auto max-w-[1160px] border-t border-border px-6 py-24">
      <p className="mb-4 font-mono text-[11px] tracking-[0.14em] text-faint uppercase">04 · experience</p>
      <h2 className="mb-12 font-display text-[clamp(34px,4vw,44px)] font-semibold tracking-[-0.01em]">
        Experience<span className="text-accent">.</span>
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] items-start gap-[72px]">
        <div>
          <div className="mb-7 flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--color-accent)' }} />
            <h3 className="font-display text-[22px] font-semibold">Professional</h3>
          </div>
          <div className="ml-[7px] flex flex-col gap-10 border-l-2 border-border py-1">
            {professional.map((item) => (
              <ExperienceEntry key={item.id} item={item} dotColor="var(--color-accent)" />
            ))}
          </div>
        </div>
        <div>
          <div className="mb-7 flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--color-green)' }} />
            <h3 className="font-display text-[22px] font-semibold">Community &amp; mentorship</h3>
          </div>
          <div className="ml-[7px] flex flex-col gap-10 border-l-2 border-border py-1">
            {community.map((item) => (
              <ExperienceEntry key={item.id} item={item} dotColor="var(--color-green)" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
