import type { TeamMember } from '@/content/team'
import { useLocalize, useMessages } from '@/lib/i18n'
import { ExternalLink } from '../ui/AppLink'

export function MemberCard({ member }: { member: TeamMember }) {
  const localize = useLocalize()
  const { team } = useMessages()
  return (
    <article>
      <div className="aspect-square overflow-hidden rounded-lg border border-line bg-surface">
        <img
          src={member.photo}
          alt={member.name}
          width={640}
          height={640}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <h3 className="mt-4 font-semibold tracking-tight">{member.name}</h3>
      <p className="text-sm text-muted">{localize(member.role)}</p>
      {member.links.length > 0 && (
        <ul className="mt-2 flex gap-3 text-sm">
          {member.links.map((link) => (
            <li key={link.url}>
              <ExternalLink
                href={link.url}
                aria-label={`${team.profile} ${member.name}: ${link.label}`}
                className="text-ink underline underline-offset-2 hover:text-accent"
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
