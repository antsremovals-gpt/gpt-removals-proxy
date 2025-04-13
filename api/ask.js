export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt missing" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 400
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response.";
    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch from OpenAI." });
  }
}
