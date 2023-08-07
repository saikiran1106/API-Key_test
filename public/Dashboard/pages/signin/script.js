async function fetchData(mobileNumber) {
            try {
                const response = await fetch("http://localhost:3000/monthly-consumption", {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ mobile: mobileNumber }),
                });

                const data = await response.json();
                console.log(data);
                return data;
            } catch (error) {
                console.error(error);
            }
        }

        // Function to process data and build the chart
        function buildChart(data) {
            const userName = data.Name;
            const monthlyData = data.monthly_consumption; // Accessing the monthly_consumption data
            const weeklyData = monthlyData[0].week_wise_consumption; // Accessing week_wise_consumption within the first month
            const month = monthlyData[0].month;
            console.log(weeklyData); // Checking the data in the console

            // Extracting labels and energy values for each week
            const weeks = weeklyData.map((week) => "Week " + week.week);
            const energyConsumedValues = weeklyData.map((week) => week.Energy_Consumed);
            const energyStorageValues = weeklyData.map((week) => week.Energy_Storage);
            const energyGeneratedValues = weeklyData.map((week) => week.Energy_Generated);

            // Displaying the user's name
            document.getElementById("name").innerHTML = userName;

           
            // Building the chart
            const ctx = document.getElementById("energyChart").getContext("2d");
            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: weeks,
                    datasets: [
                        {
                            label: "Energy Consumed (Kw)",
                            data: energyConsumedValues,
                            backgroundColor: "rgba(255, 99, 132, 0.2)",
                            borderColor: "rgba(255, 99, 132, 1)",
                            borderWidth: 1,
                        },
                        {
                            label: "Energy Storage (Kw)",
                            data: energyStorageValues,
                            backgroundColor: "rgba(54, 162, 235, 0.2)",
                            borderColor: "rgba(54, 162, 235, 1)",
                            borderWidth: 1,
                        },
                        {
                            label: "Energy Generated (Kw)",
                            data: energyGeneratedValues,
                            backgroundColor: "rgba(255, 255, 0, 0.2)",
                            borderColor: "rgba(255, 255, 0, 1)",
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            stacked: false,
                        },
                        y: {
                            stacked: false,
                        },
                    },
                },
            });
        }

        // Function to generate graph based on the input mobile number
        function generateGraph() {
            const mobileNumber = document.getElementById("mobile").value;
            console.log(mobileNumber);
          
         
            
            // Fetch data from the API and build the chart
            fetchData(mobileNumber).then((data) => {buildChart(data); window.location.href = "index.html";});
        }

     /*   document.addEventListener("DOMContentLoaded", () => {
            generateGraph();
           
        }) */
        