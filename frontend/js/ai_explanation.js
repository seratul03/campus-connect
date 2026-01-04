// ai_explanation.js
// Fetches AI explanation for the company and updates the AI explanation box

export async function fetchAIExplanation(companyName) {
  if (!companyName) return;
  try {
    const res = await fetch(`http://127.0.0.1:5000/api/ai-explanation?company=${encodeURIComponent(companyName)}`);
    if (res.ok) {
      const data = await res.json();
      const aiBox = document.getElementById('ai_explanation');
      if (aiBox) {
        aiBox.textContent = data.summary || 'No AI explanation available.';
      }
    }
  } catch (err) {
    const aiBox = document.getElementById('ai_explanation');
    if (aiBox) {
      aiBox.textContent = 'Failed to load AI explanation.';
    }
    console.error('Failed to fetch AI explanation', err);
  }
}
