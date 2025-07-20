document.getElementById("rephraseBtn").addEventListener("click", async () => {
  const text = document.getElementById("inputText").value;
  const prompt = `Rephrase the following sentence to sound more professional:\n\n"${text}"`;
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt,
      max_tokens: 100,
      temperature: 0.7
    })
  });
  const data = await response.json();
  document.getElementById("output").innerText = data.choices[0].text.trim();
});
