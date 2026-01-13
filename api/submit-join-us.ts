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
    const linksRaw = getString(fields.links); // Expecting JSON string for links array

    let links: string[] = [];
    try {
      links = JSON.parse(linksRaw);
    } catch {
      links = [linksRaw];
    }

    const cvFile = Array.isArray(files.cv) ? files.cv[0] : files.cv;

    // Construct Slack Blocks
    const blocks = [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "🚀 New Join Us Application",
          emoji: true,
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Name:*\n${name}`,
          },
          {
            type: "mrkdwn",
            text: `*Email:*\n${email}`,
          },
          {
            type: "mrkdwn",
            text: `*Role:*\n${
              role === "other" ? `${role} (${customRole})` : role
            }`,
          },
        ],
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Message:*\n${message}`,
        },
      },
    ];

    if (links.length > 0 && links.some((l) => l.trim())) {
      const linksText = links
        .map((l) => l.trim())
        .filter(Boolean)
        .map((l) => `- <${l}|${l}>`)
        .join("\n");
      if (linksText) {
        blocks.push({
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Portfolio / Links:*\n${linksText}`,
          },
        });
      }
    }

    // File info section
    if (cvFile) {
      blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*CV Attached:*\nFilename: ${cvFile.originalFilename}\nSize: ${(
            cvFile.size / 1024
          ).toFixed(
            2
          )} KB\n\n_Note: File content cannot be uploaded via standard Slack Webhooks._`,
        },
      });
    }

    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!slackWebhookUrl) {
      console.error("Missing SLACK_WEBHOOK_URL");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const slackResponse = await fetch(slackWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blocks }),
    });

    if (!slackResponse.ok) {
      const text = await slackResponse.text();
      console.error("Slack API error:", text);
      return res
        .status(500)
        .json({ error: "Failed to send to Slack", details: text });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Form parsing error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
