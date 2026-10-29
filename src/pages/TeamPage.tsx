import { MemberCard } from '@/components/sections/MemberCard'
import { SEO } from '@/components/SEO'
import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { teamMembers } from '@/content/team'
import { useMessages } from '@/lib/i18n'

export function TeamPage() {
  const { seo, team } = useMessages()
  return (
    <>
      <SEO title={seo.team.title} description={seo.team.description} />
      <PageHeader title={team.title} intro={team.intro} />
      <Container className="py-16 sm:py-24">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {teamMembers.map((member, index) => (
            <div key={member.id} className={index % 2 === 1 ? 'md:mt-10' : ''}>
              <MemberCard member={member} />
            </div>
          ))}
        </div>
        <section
          aria-labelledby="work"
          className="mt-24 max-w-prose border border-ink bg-tint p-6 sm:p-8"
        >
          <h2 id="work" className="text-3xl sm:text-4xl">
            {team.workTitle}
          </h2>
          <p className="mt-4 text-lg text-ink/85">{team.workBody}</p>
        </section>
      </Container>
    </>
  )
}
