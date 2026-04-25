export async function discoverModel(apiKey: string) {
  const cleanKey = apiKey.trim();
  const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${cleanKey}`;
  let modelToUse = "gemini-1.5-flash";

  try {
    const listResponse = await fetch(listUrl);
    const listData = await listResponse.json();
    if (listResponse.ok && listData.models) {
      const models = listData.models.map((m: any) => m.name.replace("models/", ""));
      if (models.includes("gemini-1.5-flash")) modelToUse = "gemini-1.5-flash";
      else if (models.includes("gemini-1.5-flash-8b")) modelToUse = "gemini-1.5-flash-8b";
      else if (models.includes("gemini-1.5-pro")) modelToUse = "gemini-1.5-pro";
      else if (models.length > 0) modelToUse = models[0];
    }
  } catch (e) {
    console.error("Discovery failed:", e);
  }
  return modelToUse;
}

export async function analyzeResume(resumeText: string, apiKey: string) {
  const cleanKey = apiKey.trim();
  const model = await discoverModel(apiKey);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${cleanKey}`;

  const prompt = `
    Analyze the following resume text and extract information to build a professional portfolio.
    Identify the user's primary roles, technical domains, and extract all significant projects.
    
    Return a valid JSON object:
    {
      "profile": { 
        "full_name": "extracted name", 
        "bio": "2-3 sentence bio", 
        "professions": ["Role 1", "Role 2"], 
        "suggested_username": "unique username" 
      },
      "social": { "twitter": "", "github": "", "linkedin": "", "email": "" },
      "specialized": { 
        "tagline": "punchy tagline", 
        "expertise_areas": ["Domain 1", "Domain 2"] 
      },
      "projects": [
        {
          "title": "Project Title",
          "description": "2-sentence technical description",
          "tech_stack": ["Tech 1", "Tech 2"],
          "github_url": "",
          "live_url": ""
        }
      ],
      "sections": { "show_domains": true, "show_projects": true, "show_consulting": true, "show_custom": true },
      "custom_sections": [{ "title": "Heading", "content": "Summary" }]
    }

    Resume Text:
    ${resumeText}
  `;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.1, response_mime_type: "application/json" }
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || response.statusText);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  const startIdx = text.indexOf('{');
  const endIdx = text.lastIndexOf('}');
  return JSON.parse(text.substring(startIdx, endIdx + 1));
}

export async function chatWithAI(message: string, currentData: any, apiKey: string) {
  const cleanKey = apiKey.trim();
  const model = await discoverModel(apiKey);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${cleanKey}`;

  const prompt = `
    SYSTEM PRE-PROMPT:
    You are an expert Portfolio Assistant. 
    You have access to their current portfolio data (including projects) and can propose updates.
    
    Current Portfolio State: ${JSON.stringify(currentData)}
    
    USER MESSAGE: "${message}"
    
    INSTRUCTIONS:
    1. Be helpful, professional, and concise.
    2. If the user wants to add/edit projects, update the "projects" array.
    3. Return a JSON object:
       {
         "answer": "Message to user",
         "updated_data": { ... entire state ... }
       }
  `;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, response_mime_type: "application/json" }
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || response.statusText);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  const startIdx = text.indexOf('{');
  const endIdx = text.lastIndexOf('}');
  return JSON.parse(text.substring(startIdx, endIdx + 1));
}
