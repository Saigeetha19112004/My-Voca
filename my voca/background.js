chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "rephrase",
    title: "Rephrase Professionally",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "rephrase") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: fetchRephrasedText,
      args: [info.selectionText]
    });
  }
});

async function fetchRephrasedText(text) {
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
  alert("Rephrased: " + data.choices[0].text.trim());
}