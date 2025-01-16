import React, { useState } from "react";
import "./FitnessTracker.css";

function FitnessTrackerApp() {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    activityLevel: "sedentary",
    language: "en",
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { weight, height, activityLevel, language } = formData;

    if (!weight || !height || !activityLevel) {
      setError("Please enter valid weight, height, and activity level.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://fitness-tracker-backend-92oq.onrender.com/api/fitness", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ weight, height, activityLevel, language }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("There was an error getting the AI recommendation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>AI Powered Fitness Tracker</h1>
      <form id="Fitness-form" onSubmit={handleSubmit}>
        <label htmlFor="weight">Weight (in Kg)</label>
        <input
          type="number"
          id="weight"
          value={formData.weight}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="height">Height (in cm)</label>
        <input
          type="number"
          id="height"
          value={formData.height}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="activityLevel">Activity Level</label>
        <select id="activityLevel" value={formData.activityLevel} onChange={handleInputChange}>
          <option value="sedentary">Sedentary</option>
          <option value="lightlyActive">Lightly Active</option>
          <option value="moderateActive">Moderately Active</option>
          <option value="veryActive">Very Active</option>
        </select>

        <label htmlFor="language">Choose Language</label>
        <select id="language" value={formData.language} onChange={handleInputChange}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>

        <button type="submit" disabled={loading}>
          Get AI Recommendation
        </button>
      </form>

      {loading && (
        <div id="loading">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      {results && (
        <div id="results">
          <h2>AI Recommendations</h2>
          <p><strong>Calorie Intake:</strong> {results.calorieIntake || "N/A"} kcal</p>
          <p><strong>Suggested Activities:</strong> {results.suggestedActivities || "N/A"}</p>
          <p><strong>Additional Tips:</strong> {results.tips || "No tips available."}</p>
        </div>
      )}
    </div>
  );
}

export default FitnessTrackerApp;
