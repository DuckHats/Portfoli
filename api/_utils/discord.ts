const LIMITS = { fieldValue: 1024, description: 4096, title: 256 } as const

export interface DiscordField {
  name: string
  value: string
  inline?: boolean
}

export interface DiscordEmbed {
  title: string
  fields: DiscordField[]
  description?: string
}

export interface DiscordFile {
  buffer: Buffer
  filename: string
  mimetype: string
}

/** Neutralise Markdown so user input cannot restyle or fake parts of the embed. */
export const escapeMarkdown = (value: string) => value.replace(/([\\`*_~|>[\]()#-])/g, '\\$1')

export const truncate = (value: string, max: number) =>
  value.length > max ? `${value.slice(0, max - 1)}…` : value

export function buildPayload(embed: DiscordEmbed) {
  return {
    username: 'DuckHats Web',
    // never ping anyone, whatever the visitor typed
    allowed_mentions: { parse: [] as string[] },
    embeds: [
      {
        title: truncate(embed.title, LIMITS.title),
        color: 0x1e40af,
        description: embed.description
          ? truncate(escapeMarkdown(embed.description), LIMITS.description)
          : undefined,
        fields: embed.fields.map((f) => ({
          name: truncate(f.name, 256),
          value: truncate(escapeMarkdown(f.value) || '—', LIMITS.fieldValue),
          inline: f.inline ?? false,
        })),
        timestamp: new Date().toISOString(),
        footer: { text: 'duckhats.cat' },
      },
    ],
  }
}

export async function sendToDiscord(
  webhookUrl: string,
  embed: DiscordEmbed,
  file?: DiscordFile,
): Promise<void> {
  const payload = buildPayload(embed)
  const signal = AbortSignal.timeout(7000)

  let response: Response
  if (file) {
    const body = new FormData()
    body.append('payload_json', JSON.stringify(payload))
    body.append(
      'file',
      new Blob([new Uint8Array(file.buffer)], { type: file.mimetype }),
      file.filename,
    )
    response = await fetch(webhookUrl, { method: 'POST', body, signal })
  } else {
    response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal,
    })
  }
  if (!response.ok) throw new Error(`Discord responded with ${response.status}`)
}
