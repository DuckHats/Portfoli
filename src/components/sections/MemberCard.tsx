import type { TeamMember } from '@/content/team'
import { useLocalize, useMessages } from '@/lib/i18n'
import { ExternalLink } from '../ui/AppLink'

export function MemberCard({ member }: { member: TeamMember }) {
  const localize = useLocalize()
  const { team } = useMessages()
  return (
    <article className="group">
      {/* Arch crop and a shared treatment make photos taken in different places feel like one set. */}
      <div className="aspect-[4/5] overflow-hidden rounded-t-full bg-tint">
        <img
          src={member.photo}
          alt={member.name}
          width={640}
          height={640}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover grayscale mix-blend-multiply transition duration-500 group-hover:grayscale-0 group-hover:mix-blend-normal dark:mix-blend-normal dark:brightness-90"
        />
      </div>
      <h3 className="mt-5 text-xl">{member.name}</h3>
      <p className="text-muted">{localize(member.role)}</p>
      {member.links.length > 0 && (
        <ul className="mt-2 flex gap-4 text-sm">
          {member.links.map((link) => (
            <li key={link.url}>
              <ExternalLink
                href={link.url}
                aria-label={`${team.profile} ${member.name}: ${link.label}`}
                className="link-underline pb-0.5 text-accent"
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
