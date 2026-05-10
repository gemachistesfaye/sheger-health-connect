const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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

// @desc    Chat with Gemini Health Assistant
// @route   POST /api/ai/chat
// @access  Private (Patients & Users)
const chatWithAssistant = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return res.status(500).json({ 
        success: false, 
        message: 'Gemini API key is not configured. Please contact the administrator.' 
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Format history for Gemini API
    const formattedHistory = history ? history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    })) : [];

    // Prepend system prompt to the first user message if there is no history
    let finalMessage = message;
    if (formattedHistory.length === 0) {
      finalMessage = `System Context: ${SYSTEM_PROMPT}\n\nUser Message: ${message}`;
    }

    const chat = model.startChat({
      history: formattedHistory,
    });

    const result = await chat.sendMessage(finalMessage);
    const responseText = result.response.text();

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
