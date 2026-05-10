const { OpenAI } = require('openai');

const SYSTEM_PROMPT = `
You are the Sheger Health Connect AI Assistant, a helpful and empathetic virtual health advisor for a clinic based in Addis Ababa, Ethiopia.

Your Capabilities:
1. Provide symptom guidance and triage.
2. Recommend whether the patient needs an appointment and suggest the appropriate department (General Consultation, Laboratory, Maternal & Child Care, Emergency).
3. Answer Clinic FAQs (Working hours: Mon-Sat 8AM-8PM, Sun 9AM-5PM, Location: Addis Ababa, Phone: +251 976 601 074).
4. Provide general health education.

Language Support: You must respond in the language the user speaks to you (English, Amharic, or Afaan Oromo).

CRITICAL RULES:
1. NEVER provide an actual medical diagnosis. Always clarify that you are an AI assistant, not a doctor.
2. Always include a short medical disclaimer at the end of health-related advice (e.g., "Disclaimer: This information is for educational purposes and is not a substitute for professional medical advice. Please consult a doctor for a proper diagnosis.").
3. In case of severe symptoms (chest pain, severe bleeding, difficulty breathing), immediately advise them to visit Emergency Care or call an ambulance.
`;

// @desc    Chat with OpenAI Health Assistant
// @route   POST /api/ai/chat
// @access  Private (Patients & Users)
const chatWithAssistant = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      return res.status(500).json({ 
        success: false, 
        message: 'OpenAI API key is not configured. Please contact the administrator.' 
      });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Format history for OpenAI API
    // Ensure history follows { role: 'user'|'assistant', content: string }
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT }
    ];

    if (history && Array.isArray(history)) {
      history.forEach(msg => {
        if (msg.role && msg.content) {
          // Map 'model' to 'assistant' if it was coming from an old Gemini history
          const mappedRole = msg.role === 'model' ? 'assistant' : msg.role;
          messages.push({ role: mappedRole, content: msg.content });
        }
      });
    }

    // Add current user message
    messages.push({ role: 'user', content: message });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // or gpt-4, gpt-3.5-turbo
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const responseText = completion.choices[0].message.content;

    res.json({
      success: true,
      data: {
        role: 'assistant',
        content: responseText
      }
    });

  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ success: false, message: 'Error processing AI response. Please try again later.' });
  }
};

module.exports = {
  chatWithAssistant
};
