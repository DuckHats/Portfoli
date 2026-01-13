import type { VercelRequest, VercelResponse } from "@vercel/node";
import formidable from "formidable";
import { IncomingMessage } from "http";
import fs from "fs";

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

    const [fields, files] = await new Promise<
      [formidable.Fields, formidable.Files]
    >((resolve, reject) => {
      form.parse(req as IncomingMessage, (err, fields, files) => {
        if (err) return reject(err);
        resolve([fields, files]);
      });
    });

    // Helper to get string value
    const getString = (val: string[] | string | undefined) => {
      if (Array.isArray(val)) return val[0];
      return val || "";
    };

    const name = getString(fields.name);
    const email = getString(fields.email);
    const role = getString(fields.role);
    const customRole = getString(fields.customRole);
    const message = getString(fields.message);
    const linksRaw = getString(fields.links);

    let links: string[] = [];
    try {
      links = JSON.parse(linksRaw);
    } catch {
      links = [linksRaw];
    }

    const cvFile = Array.isArray(files.cv) ? files.cv[0] : files.cv;

    // Discord Embed
    const embed = {
      title: "🚀 New Join Us Application",
      color: 0x000000, // Black color
      fields: [
        { name: "Name", value: name, inline: true },
        { name: "Email", value: email, inline: true },
        {
          name: "Role",
          value: role === "other" ? `${role} (${customRole})` : role,
          inline: true,
        },
      ],
      description: `**Message**\n${message}`,
      timestamp: new Date().toISOString(),
      footer: {
        text: "Duckhats Portfolio",
      },
    };

    if (links.length > 0 && links.some((l) => l.trim())) {
      const linksText = links
        .map((l) => l.trim())
        .filter(Boolean)
        .map((l) => `- ${l}`)
        .join("\n");
      if (linksText) {
        embed.fields.push({
          name: "Portfolio / Links",
          value: linksText,
          inline: false,
        });
      }
    }

    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!discordWebhookUrl) {
      console.error("Missing DISCORD_WEBHOOK_URL");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const formData = new FormData();
    formData.append(
      "payload_json",
      JSON.stringify({
        username: "Duckhats Bot",
        embeds: [embed],
      })
    );

    if (cvFile) {
      const fileContent = fs.readFileSync(cvFile.filepath);
      const blob = new Blob([fileContent], {
        type: cvFile.mimetype || "application/pdf",
      });
      formData.append("file", blob, cvFile.originalFilename || "cv.pdf");
    }

    const discordResponse = await fetch(discordWebhookUrl, {
      method: "POST",
      body: formData,
    });

    if (!discordResponse.ok) {
      const text = await discordResponse.text();
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
