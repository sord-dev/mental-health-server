/**
 * A small function to parse the json which we're taking in from chatGPT
 * 
 * Example usage:
 * 
 * const = input DF:{"food_name": "apple", "nutritional_value": {"calories": 95, "vegetarian": True, "vegan": True}, "avr_price": 0.5};
 * 
 * const parsedFood = parseGPT(input);
 * 
 * console.log(parsedFood.name) // apple
 * 
 * @param input{ string } - Data Format from ChatGPT
 * @returns { object | array } - valid javascript 
 */
const parseGPT = (input) => {
    if(typeof input !== 'string') throw TypeError('Only string input is allowed into this command.')
    let cleansed = input.replace(/DF:/g, '').toLowerCase()
    
    try {
        return JSON.parse(cleansed);
    } catch (error) {
        return {}; // fallback on incorrect json
    }
}

module.exports = parseGPT;