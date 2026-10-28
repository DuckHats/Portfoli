import type { TeamMember } from '@/content/team'
import { useLocalize, useMessages } from '@/lib/i18n'
import { ExternalLink } from '../ui/AppLink'

export function MemberCard({ member }: { member: TeamMember }) {
  const localize = useLocalize()
  const { team } = useMessages()
  return (
    <article className="group">
      {/* One crop and one greyscale treatment make photos taken in different places feel like a set. */}
      <div className="aspect-square overflow-hidden border-2 border-ink bg-tint shadow-hard">
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
