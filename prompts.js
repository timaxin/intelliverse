export const imageWithNoTaskPrompt = (userInformation, language) => `
Detect the foods in the image. 
- Provide detailed nutritional estimations. The response should include detected foods, calorie breakdown, macronutrients, micronutrients, digestion efficiency, BMI-based analysis, and dietary recommendations.
  All nutritional values (calories, macronutrients, micronutrients) must be scaled according to the total detected food quantity (weight/size).
  For example, if 1.2 kg of Kiwi is detected, the response should calculate calories, protein, and micronutrients for the entire 1.2 kg, not per unit, such as 100g.
- The response must include a "titles" section containing localized section headers. Use the exact keys from the example JSON below for "titles".
- The response must translate food names (inside "foods"), macronutrient and micronutrient names (inside "macronutrients", "micronutrients", "digestedMacronutrients", "digestedMicronutrients"), and section titles (inside "titles") into ${language} language.
  
User Information:
    - Gender: "${userInformation.gender}"
    - Age: "${userInformation.age}"
    - Height: "${userInformation.height}"
    - Weight: "${userInformation.weight}"
    - Physical Activity Level: "${userInformation.physicalActivityLevel}"

Strictly format the response as a JSON object with the following structure:
- "calories": 0,
- "proteins": 0,
- "fats": 0,
- "carbs": 0,
- "titles" (Map<String, String>) - A map of localized section headers (must match the keys in the example JSON).
- "foods" (List<Map<String, Any>>) - A list of detected foods, where each food item includes:
   - "food" (String) - The translated name of the detected food.
   - "calories" (String) - The estimated calorie count.
   - "digestedCalories" (String) - The actual calories digested for this food, considering digestion efficiency and fiber content.
   - "macronutrients" (Map<String, Map<String, String>>) - The macronutrient content ("carbohydrates", "protein", and "fat", **translated into French language**) for each food, including its original and digested amounts.
      - "amount" (String) - The total macronutrient amount in this food (e.g., "92 mg").
      - "digestedAmount" (String) - The estimated absorbed amount from this food (e.g., "80 mg").
   - "micronutrients" (Map<String, Map<String, String>>) - The micronutrient content (**translated into French language**) for each food, including its original and digested amounts.
      - "amount" (String) - The total micronutrient amount in this food (e.g., "92 mg").
      - "digestedAmount" (String) - The estimated absorbed amount from this food (e.g., "80 mg").
- "bmi" (String) - The Body Mass Index (BMI), calculated as weight (kg) / height (m)^2.
- "bmiClassification" (String) - The BMI category (e.g., "Underweight", "Normal weight", "Overweight", "Obese").
- "digestedCalories" (String) - The total actual calories digested, considering digestion efficiency, fiber content, and food interactions.
- "digestedMacronutrients" (Map<String, Map<String, String>>) - The total absorbed macronutrients from all detected foods.
   - "amount" (String) - The total macronutrient amount from all foods combined (e.g., "92 mg").
   - "digestedAmount" (String) - The total estimated absorbed amount from all foods combined (e.g., "80 mg").
   - "dailyPercentage" (String) - The percentage of the recommended daily intake from all digested foods combined (e.g., "102%").
- "digestedMicronutrients" (Map<String, Map<String, String>>) - The total absorbed micronutrients from all detected foods.
   - "amount" (String) - The total micronutrient amount from all foods combined (e.g., "92 mg").
   - "digestedAmount" (String) - The total estimated absorbed amount from all foods combined (e.g., "80 mg").
   - "dailyPercentage" (String) - The percentage of the recommended daily intake from all digested foods combined (e.g., "102%").
- "adjustedCalories" (String) - The estimated daily caloric intake required based on the user's information. This represents the number of calories the user should consume per day to maintain their current weight.
- "healthTips" (List<String>) - Tips for improvement based on the user's information.
- "explanation" (String) - Brief explanation of the calories and nutritional estimations.
`;

export default {
    imageWithNoTaskPrompt,
};