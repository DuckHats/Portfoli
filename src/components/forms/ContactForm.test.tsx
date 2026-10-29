import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { messages } from '@/content/messages'
import { LanguageProvider } from '@/lib/i18n'
import { ContactForm } from './ContactForm'

const copy = messages.en.contact.form
const { validation } = messages.en

const renderForm = () =>
  render(
    <MemoryRouter>
      <LanguageProvider language="en">
        <ContactForm />
      </LanguageProvider>
    </MemoryRouter>,
  )

const heading = (name: string) => screen.findByRole('heading', { level: 2, name })

afterEach(() => vi.unstubAllGlobals())

describe('ContactForm (project brief)', () => {
  it('walks through every step, reviews the answers and sends them', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()
    renderForm()

    // Step 1: a click on a card moves on by itself.
    expect(screen.getByRole('heading', { level: 2, name: copy.steps.type.title })).toBeVisible()
    await user.click(
      screen.getByRole('radio', { name: new RegExp(copy.projectTypes.ecommerce.label) }),
    )
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: copy.steps.stage.title })).toHaveFocus(),
    )

    // Step 2: "already exists" asks for the current address.
    await user.click(screen.getByRole('radio', { name: new RegExp(copy.stages.existing.label) }))
    await user.type(screen.getByLabelText(copy.currentUrl), 'https://shop.example.com')
    await user.click(screen.getByRole('button', { name: copy.next }))

    // Step 3: the features on offer follow the project type.
    await heading(copy.steps.features.title)
    expect(screen.getByRole('checkbox', { name: copy.features.catalog })).toBeInTheDocument()
    expect(screen.queryByRole('checkbox', { name: copy.features.booking })).not.toBeInTheDocument()
    await user.click(screen.getByRole('checkbox', { name: copy.features.payments }))
    await user.type(screen.getByLabelText(copy.goal), 'Sell our wine online{Enter}')

    // Step 4: dropdowns.
    await heading(copy.steps.plan.title)
    await user.selectOptions(screen.getByLabelText(copy.timeline), copy.timelines.short)
    await user.selectOptions(screen.getByLabelText(copy.budget), copy.budgets.unknown)
    await user.click(screen.getByRole('button', { name: copy.next }))

    // Step 5: who you are.
    await heading(copy.steps.contact.title)
    await user.type(screen.getByLabelText(copy.name), 'Ada')
    await user.type(screen.getByLabelText(copy.email), 'ada@example.com')
    await user.click(screen.getByRole('button', { name: copy.next }))

    // Summary, then send.
    await heading(copy.steps.summary.title)
    expect(screen.getByText('Sell our wine online')).toBeInTheDocument()
    expect(screen.getByText(copy.features.payments)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: copy.submit }))

    await heading(copy.success)
    const body = fetchMock.mock.calls[0]![1].body as FormData
    expect(fetchMock.mock.calls[0]![0]).toBe('/api/submit-contact')
    expect(body.get('projectType')).toBe('ecommerce')
    expect(body.get('features')).toBe('["payments"]')
    expect(body.get('budget')).toBe('unknown')
    expect(body.get('website')).toBe('')
  })

  it('stops on a step until its required answers are given', async () => {
    const user = userEvent.setup()
    renderForm()
    await user.click(screen.getByRole('button', { name: copy.next }))
    expect(screen.getByRole('alert')).toHaveTextContent(validation.required)
    expect(screen.getByRole('heading', { name: copy.steps.type.title })).toBeInTheDocument()

    // "Something else" needs a name and does not move on by itself.
    await user.click(screen.getByRole('radio', { name: new RegExp(copy.projectTypes.other.label) }))
    await user.click(screen.getByRole('button', { name: copy.next }))
    expect(screen.getByRole('alert')).toHaveTextContent(validation.required)
    await user.type(screen.getByLabelText(copy.projectTypeOther), 'A scraper')
    await user.click(screen.getByRole('button', { name: copy.next }))
    await heading(copy.steps.stage.title)
  })

  it('edits an answer from the summary and returns to it', async () => {
    const user = userEvent.setup()
    renderForm()
    await user.click(
      screen.getByRole('radio', { name: new RegExp(copy.projectTypes.website.label) }),
    )
    await user.click(await screen.findByRole('radio', { name: new RegExp(copy.stages.idea.label) }))
    await user.click(screen.getByRole('button', { name: copy.next }))
    await user.type(await screen.findByLabelText(copy.goal), 'A new site{Enter}')
    await user.selectOptions(await screen.findByLabelText(copy.timeline), copy.timelines.flexible)
    await user.selectOptions(screen.getByLabelText(copy.budget), copy.budgets.small)
    await user.click(screen.getByRole('button', { name: copy.next }))
    await user.type(await screen.findByLabelText(copy.name), 'Ada')
    await user.type(screen.getByLabelText(copy.email), 'ada@example.com{Enter}')
    await heading(copy.steps.summary.title)

    await user.click(
      screen.getByRole('button', { name: `${copy.edit}: ${copy.steps.features.title}` }),
    )
    const goal = await screen.findByLabelText(copy.goal)
    await user.clear(goal)
    await user.type(goal, 'A faster site')
    await user.click(screen.getByRole('button', { name: copy.backToSummary }))
    await heading(copy.steps.summary.title)
    expect(screen.getByText('A faster site')).toBeInTheDocument()
  })
})
