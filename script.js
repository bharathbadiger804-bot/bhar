let chart;

function calculate() {
    let area = parseFloat(document.getElementById("area").value) || 0;
    let people = parseFloat(document.getElementById("people").value) || 0;
    let appliances = parseFloat(document.getElementById("appliances").value) || 0;
    let hours = parseFloat(document.getElementById("hours").value) || 0;

    // Energy calculations
    let areaEnergy = area * 0.5;
    let peopleEnergy = people * 1.2;
    let applianceEnergy = appliances * 2 * hours;

    let totalEnergy = areaEnergy + peopleEnergy + applianceEnergy;

    let cost = totalEnergy * 8; // ₹ per unit
    let co2 = totalEnergy * 0.82;

    let efficiency = "";
    let suggestion = "";

    if (totalEnergy < 100) {
        efficiency = "High Efficiency ✅";
        suggestion = "Great! Maintain current usage.";
    } else if (totalEnergy < 200) {
        efficiency = "Moderate Efficiency ⚠️";
        suggestion = "Use energy-efficient appliances.";
    } else {
        efficiency = "Low Efficiency ❌";
        suggestion = "Reduce usage, install solar panels, switch to LEDs.";
    }

    let score = Math.max(0, 100 - totalEnergy);

  let dailyEnergy = totalEnergy;
let monthlyEnergy = dailyEnergy * 30;
let yearlyEnergy = dailyEnergy * 365;

let dailyCost = dailyEnergy * 8;
let monthlyCost = monthlyEnergy * 8;
let yearlyCost = yearlyEnergy * 8;

document.getElementById("results").innerHTML = `
    <b>Daily Energy:</b> ${dailyEnergy.toFixed(2)} kWh <br>
    <b>Monthly Energy:</b> ${monthlyEnergy.toFixed(2)} kWh <br>
    <b>Yearly Energy:</b> ${yearlyEnergy.toFixed(2)} kWh <br><br>

    <b>Daily Cost:</b> ₹${dailyCost.toFixed(2)} <br>
    <b>Monthly Cost:</b> ₹${monthlyCost.toFixed(2)} <br>
    <b>Yearly Cost:</b> ₹${yearlyCost.toFixed(2)} <br><br>

    <b>CO₂ Emissions (Daily):</b> ${(dailyEnergy * 0.82).toFixed(2)} kg <br>
    <b>Efficiency:</b> ${efficiency} <br>
    <b>Green Score:</b> ${score}/100 🌱 <br>
    <b>Suggestion:</b> ${suggestion}
`;

    // Chart
    if (chart) chart.destroy();

    chart = new Chart(document.getElementById("chart"), {
        type: 'bar',
        data: {
            labels: ["Area", "People", "Appliances"],
            datasets: [{
                label: "Energy Consumption",
                data: [areaEnergy, peopleEnergy, applianceEnergy]
            }]
        }
    });
}
