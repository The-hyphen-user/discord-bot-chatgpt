
async function ChatGPTCall(prompt) {

    try {
        const { Configuration, OpenAIApi } = require("openai");
        const configuration = new Configuration({
            apiKey: '',
        });
        const openai = new OpenAIApi(configuration);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.9,
            max_tokens: 100,
            top_p: 0,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });
        return response.data.choices[0].text;

    } catch (error) {
        if (error.response) {
        } else {
        }
    }
}

module.exports = { ChatGPTCall };