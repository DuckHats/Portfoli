import type { TeamMember } from '@/content/team'
import { useLocalize, useMessages } from '@/lib/i18n'
import { ExternalLink } from '../ui/AppLink'

export function MemberCard({ member }: { member: TeamMember }) {
  const localize = useLocalize()
  const { team } = useMessages()
  return (
    <article className="group">
      {/* One crop and one greyscale treatment make photos taken in different places feel like a set. */}
      <div className="aspect-square overflow-hidden border border-ink bg-tint">
        <img
          src={member.photo}
          alt={member.name}
          width={640}
          height={640}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0 dark:brightness-90"
        />
      </div>
      <h3 className="mt-6 text-2xl">{member.name}</h3>
      <p className="text-muted">{localize(member.role)}</p>
      {member.links.length > 0 && (
        <ul className="mt-2 flex gap-4 text-sm">
          {member.links.map((link) => (
            <li key={link.url}>
              <ExternalLink
                href={link.url}
                aria-label={`${team.profile} ${member.name}: ${link.label}`}
                className="link-underline pb-0.5 text-accent-text"
              >
                {link.label}
              </ExternalLink>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

/** Compact line for the home page: small greyscale portrait, name and role on one row. */
export function MemberRow({ member }: { member: TeamMember }) {
  const localize = useLocalize()
  const { team } = useMessages()
  return (
    <div className="row-shift group grid grid-cols-[4.5rem_1fr] items-center gap-5 py-5 sm:grid-cols-[5rem_1fr_1fr_auto] sm:gap-8">
      <img
        src={member.photo}
        alt={member.name}
        width={160}
        height={160}
        loading="lazy"
        decoding="async"
        className="h-[4.5rem] w-[4.5rem] border border-ink object-cover grayscale transition duration-500 group-hover:grayscale-0 sm:h-20 sm:w-20 dark:brightness-90"
      />
      <h3 className="text-3xl sm:text-4xl">{member.name}</h3>
      <p className="col-start-2 text-muted sm:col-start-auto">{localize(member.role)}</p>
      {member.links.length > 0 && (
        <ul className="col-start-2 flex gap-4 text-sm sm:col-start-auto">
          {member.links.map((link) => (
            <li key={link.url}>
              <ExternalLink
                href={link.url}
                aria-label={`${team.profile} ${member.name}: ${link.label}`}
                className="link-underline pb-0.5 text-accent-text"
              >
                {link.label}
              </ExternalLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
