const { DallETools } = require('../utils')
const { OpenAPI } = DallETools;

const DallE = {
    generateImage: async (prompt) => {
        const response = await OpenAPI.createImage({
            model: "image-alpha-001",
            prompt: prompt,
            num_images: 1,
            size: "512x512",
            response_format: "url",
        });
        return response.data.data[0].url;
    },
}
module.exports = DallE;