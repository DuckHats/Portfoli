import { TeamStrip } from '@/components/sections/TeamStrip'
import { SEO } from '@/components/SEO'
import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { useMessages } from '@/lib/i18n'

export function TeamPage() {
  const { seo, team } = useMessages()
  return (
    <>
      <SEO title={seo.team.title} description={seo.team.description} />
      <PageHeader title={team.title} intro={team.intro} />
      <div data-act="paper">
        <Container className="py-20 sm:py-28">
          <TeamStrip heading="h2" />
        </Container>
      </div>
      <section data-act="red" aria-labelledby="work" className="bg-canvas text-ink">
        <Container className="grid gap-8 py-20 sm:py-28 lg:grid-cols-12">
          <h2 id="work" className="text-4xl sm:text-6xl lg:col-span-7">
            {team.workTitle}
          </h2>
          <p className="text-lg sm:text-xl lg:col-span-5 lg:self-end">{team.workBody}</p>
        </Container>
      </section>
    </>
  )
}
