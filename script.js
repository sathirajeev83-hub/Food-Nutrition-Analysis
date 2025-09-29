// Check if user is logged in (protect index.html)
if (window.location.pathname.includes("home.html")) {
  const user = localStorage.getItem("loggedInUser");
  if (!user) {
    window.location.href = "login.html"; // redirect if not logged in
  } else {
    // Display welcome message
    const container = document.querySelector('.container');
    const welcome = document.createElement('p');
    welcome.textContent = `Logged in as: ${user}`;
    welcome.style.fontWeight = 'bold';
    welcome.style.color = '#185a9d';
    container.insertBefore(welcome, container.firstChild);
  }
}

// Logout function
function logoutUser() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

// Function to fetch nutrition data
async function getNutrition() {
  const food = document.getElementById("foodInput").value;
  const resultDiv = document.getElementById("result");

  if (!food) {
    alert("Please enter a food item");
    return;
  }

  const appId = "0f187d82";   // Replace with your Nutritionix App ID
  const appKey = "907fdfc49726dbd7576c1888776ef381"; // Replace with your Nutritionix API Key

  try {
    const response = await fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-app-id": appId,
        "x-app-key": appKey
      },
      body: JSON.stringify({ query: food })
    });

    const data = await response.json();
    console.log(data); // For debugging

    if (data.foods) {
      const foodItem = data.foods[0];
      resultDiv.innerHTML = `
        <div class="card">
          <h3>${foodItem.food_name}</h3>
          <p><strong>Serving Size:</strong> ${foodItem.serving_qty} ${foodItem.serving_unit}</p>
          <p><strong>Calories:</strong> ${foodItem.nf_calories}</p>
          <p><strong>Protein:</strong> ${foodItem.nf_protein} g</p>
          <p><strong>Carbs:</strong> ${foodItem.nf_total_carbohydrate} g</p>
          <p><strong>Fat:</strong> ${foodItem.nf_total_fat} g</p>
          <p><strong>Sugar:</strong> ${foodItem.nf_sugars} g</p>
          <p><strong>Fiber:</strong> ${foodItem.nf_dietary_fiber} g</p>
          <p><strong>Cholesterol:</strong> ${foodItem.nf_cholesterol} mg</p>
          <p><strong>Sodium:</strong> ${foodItem.nf_sodium} mg</p>
        </div>
      `;
    } else {
      resultDiv.innerHTML = "<p>No nutrition data found.</p>";
    }
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = "<p>❌ Error fetching data.</p>";
  }
}