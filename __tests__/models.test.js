const DallE = require("../models/DallE");
const GPT = require("../models/ChatGPT");
describe("DallE", () => {
    it("should generate an image", async () => {
        const prompt = "test";
        const url = await DallE.generateImage(prompt);
        expect(url).toContain("https://");
    }, 15000);
});

describe("ChatGPT - Moderation", () => {
    let response;
    it("should generate a moderation prompt response", async () => {
        const prompt =
            "This image signifies death to me. I can not see a future where I can live happily.";
        response = await GPT.generateModerationPromptResponse(prompt);
        expect(typeof response).toBe("object");
    }, 15000);
    it("should have a rating between 0 and 1", () => {
        expect(response.rating).toBeGreaterThanOrEqual(0);
        expect(response.rating).toBeLessThanOrEqual(1);
    });

    it("should have at least one sentiment", () => {
        expect(response.sentiments.length).toBeGreaterThan(0);
    });

    it("should have an AI starter message", () => {
        expect(response.ai_starter).toBeTruthy();
    });

    it("should have a Dall-E motivational message", () => {
        expect(response.dall_e_motivational).toBeTruthy();
    });

    it("Given negative response should have a maxium score of 0.2", () => {
        expect(response.rating).toBeLessThanOrEqual(0.2);
    });
});
describe("ChatGPT - DallE Game", () => {
    let response;
    it("should generate a moderation prompt response", async () => {
        const prompt =
            "This image signifies death to me. I can not see a future where I can live happily.";
        response = await GPT.generateGamePromptResponse(prompt);
        expect(typeof response).toBe("object");
    }, 15000);

    it("should have a rating between 0 and 1", () => {
        expect(response.rating).toBeGreaterThanOrEqual(0);
        expect(response.rating).toBeLessThanOrEqual(1);
    });

    it("should have at least one sentiment", () => {
        expect(response.sentiments.length).toBeGreaterThan(0);
    });

    it("should have a Dall-E motivational message", () => {
        expect(response.dall_e_motivational).toBeTruthy();
    });
    it("should have a Dall-E ink prompt", () => {
        expect(response.dall_e_ink).toBeTruthy();
    });
    it("Given Negative response should have a maxium score of 0.2", () => {
        expect(response.rating).toBeLessThanOrEqual(0.2);
    });
});
