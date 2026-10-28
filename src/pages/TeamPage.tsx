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
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {teamMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
        <section aria-labelledby="work" className="mt-20 max-w-prose border-t border-line pt-8">
          <h2 id="work" className="text-2xl font-semibold tracking-tight">
            {team.workTitle}
          </h2>
          <p className="mt-3 text-muted">{team.workBody}</p>
        </section>
      </Container>
    </>
  )
}
