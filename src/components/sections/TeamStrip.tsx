import { useState } from 'react'
import { teamMembers } from '@/content/team'
import type { TeamMember } from '@/content/team'
import { useLocalize, useMessages } from '@/lib/i18n'
import { ExternalLink } from '../ui/AppLink'

/**
 * The team as one strip of tall portraits: the one under the pointer (or focus) widens and turns
 * to colour while the rest give way. Below the large breakpoint it is a simple list.
 */
export function TeamStrip({ heading: Heading = 'h3' }: { heading?: 'h2' | 'h3' }) {
  const [active, setActive] = useState(0)
  return (
    <>
      <ul className="hidden h-[34rem] gap-3 lg:flex">
        {teamMembers.map((member, index) => {
          const open = active === index
          return (
            // Width eases in CSS; nothing inside is scaled, so photos and names never stretch.
            <li
              key={member.id}
              onPointerEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              style={{ flexGrow: open ? 3 : 1, flexBasis: 0 }}
              className="relative min-w-0 overflow-hidden rounded-2xl bg-tint transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            >
              <img
                src={member.photo}
                alt={member.name}
                width={640}
                height={640}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover transition-[filter] duration-500 ${
                  open ? '' : 'grayscale'
                }`}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-24 text-white xl:p-6 xl:pt-24">
                <MemberName member={member} open={open} Heading={Heading} />
                <MemberMeta member={member} light hidden={!open} />
              </div>
            </li>
          )
        })}
      </ul>

      <ul className="border-t border-ink/20 lg:hidden">
        {teamMembers.map((member) => (
          <li
            key={member.id}
            className="grid grid-cols-[4.5rem_1fr] items-center gap-5 border-b border-ink/20 py-5"
          >
            <img
              src={member.photo}
              alt={member.name}
              width={160}
              height={160}
              loading="lazy"
              decoding="async"
              className="h-[4.5rem] w-[4.5rem] rounded-full object-cover grayscale"
            />
            <div>
              <Heading className="text-xl [hyphens:none] [overflow-wrap:normal]">
                {member.name}
              </Heading>
              <MemberMeta member={member} />
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

/**
 * First name over surname, never hyphenated. A closed portrait is too narrow for the surname, so it
 * shows the first name only (narrowed) and keeps the full name for screen readers.
 */
function MemberName({
  member,
  open,
  Heading,
}: {
  member: TeamMember
  open: boolean
  Heading: 'h2' | 'h3'
}) {
  const [first, ...rest] = member.name.split(' ')
  return (
    <Heading
      className={`whitespace-nowrap text-xl transition-[font-stretch] duration-500 [hyphens:none] xl:text-2xl ${
        open ? '' : '[font-stretch:75%]'
      }`}
    >
      <span className="block">{first}</span>
      <span className={open ? 'block' : 'sr-only'}> {rest.join(' ')}</span>
    </Heading>
  )
}

function MemberMeta({
  member,
  light = false,
  hidden = false,
}: {
  member: TeamMember
  light?: boolean
  hidden?: boolean
}) {
  const localize = useLocalize()
  const { team } = useMessages()
  return (
    // Collapsed portraits keep their role and links reachable; they are only visually hidden.
    <div className={hidden ? 'sr-only' : ''}>
      <p className={light ? 'mt-1 text-white/80' : 'mt-1 text-muted'}>{localize(member.role)}</p>
      {member.links.length > 0 && (
        <ul className="mt-2 flex gap-4 text-sm">
          {member.links.map((link) => (
            <li key={link.url}>
              <ExternalLink
                href={link.url}
                aria-label={`${team.profile} ${member.name}: ${link.label}`}
                className={`link-underline inline-flex min-h-6 items-center font-semibold ${light ? 'text-white' : 'text-accent-text'}`}
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
