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
            // Only the width eases (CSS); the photo zooms inside its own frame, so nothing stretches.
            <li
              key={member.id}
              onPointerEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              style={{ flexGrow: open ? 3 : 1, flexBasis: 0 }}
              className="relative min-w-0 overflow-hidden rounded-2xl bg-tint transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            >
              <MemberPhoto member={member} color={open} className="absolute inset-0" />
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
            <MemberPhoto
              member={member}
              color={false}
              small
              className="relative h-[4.5rem] w-[4.5rem] rounded-full"
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
 * A portrait framed on the face (`photoFocus`) and, until it is the active one, set in the brand's
 * duotone: grey, contrasted and tinted red, so personal photos of every kind read as one set.
 * The active portrait turns back to colour.
 */
function MemberPhoto({
  member,
  color,
  small = false,
  className,
}: {
  member: TeamMember
  color: boolean
  small?: boolean
  className: string
}) {
  const { x = 50, y = 50, zoom = 1 } = member.photoFocus ?? {}
  const size = small ? 160 : 640
  return (
    <div className={`overflow-hidden bg-ink ${className}`}>
      <img
        src={member.photo}
        alt={member.name}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        style={{
          objectPosition: `${x}% ${y}%`,
          transformOrigin: `${x}% ${y}%`,
          transform: `scale(${color ? zoom * 1.04 : zoom})`,
        }}
        className={`h-full w-full object-cover transition-[filter,transform] duration-700 ease-out motion-reduce:transition-none ${
          color ? '' : 'contrast-125 brightness-90 grayscale'
        }`}
      />
      {/* The duotone: red in the shadows and mid-tones, lifted blacks. */}
      <span
        aria-hidden
        className={`absolute inset-0 bg-accent mix-blend-multiply transition-opacity duration-700 motion-reduce:transition-none ${
          color ? 'opacity-0' : 'opacity-60'
        }`}
      />
      <span
        aria-hidden
        className={`absolute inset-0 bg-[rgb(40_12_16)] mix-blend-screen transition-opacity duration-700 motion-reduce:transition-none ${
          color ? 'opacity-0' : 'opacity-70'
        }`}
      />
    </div>
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
                className={`link-underline pb-0.5 font-semibold ${light ? 'text-white' : 'text-accent-text'}`}
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
