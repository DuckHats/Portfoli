import type { VercelRequest, VercelResponse } from "@vercel/node";
import formidable from "formidable";
import { IncomingMessage } from "http";

// Disable default body parser to handle multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const form = formidable({});

    const [fields] = await new Promise<[formidable.Fields, formidable.Files]>(
      (resolve, reject) => {
        form.parse(req as IncomingMessage, (err: any, fields: formidable.Fields, files: formidable.Files) => {
          if (err) return reject(err);
          resolve([fields, files]);
        });
      }
    );

    // Helper to get string value
    const getString = (val: string[] | string | undefined) => {
      if (Array.isArray(val)) return val[0];
      return val || "";
    };

    const name = getString(fields.name);
    const email = getString(fields.email);
    const message = getString(fields.message);

    // Discord Embed
    const embed = {
      title: "📬 New Contact Message",
      color: 0x000000, // Black color
      fields: [
        { name: "Name", value: name, inline: true },
        { name: "Email", value: email, inline: true },
      ],
      description: `**Message**\n${message}`,
      timestamp: new Date().toISOString(),
      footer: {
        text: "Duckhats Portfolio",
      },
    };

    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!discordWebhookUrl) {
      console.error("Missing DISCORD_WEBHOOK_URL");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const response = await fetch(discordWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "Duckhats Bot",
        embeds: [embed],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Discord API error:", text);
      return res
        .status(500)
        .json({ error: "Failed to send to Discord", details: text });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Form parsing or execution error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
