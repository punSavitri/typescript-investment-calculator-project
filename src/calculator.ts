//define the shape of the input data the use will provide
type InvestmentData = {
    initialAmount:number;
    annualContribution:number;
    expectedReturn:number;
    duration:number;
}

//define the shape of each year's calculated results
type InvestmentResult = {
    year:string;
    totalAmount:number;
    totalContribution:number;
    totalInterestEarned:number;
}
//this function can return either an array of results OR an error message which is in string type
type CalculationResult = InvestmentResult[] | string;
function calculateInvestment(data: InvestmentData):CalculationResult {

    //extract values from the data object(object destructuring)
    const{initialAmount, annualContribution, expectedReturn, duration} = data;

    //check input values and return error message if it invalid
    if (initialAmount < 0) {
        return 'Initial amount must be at least zero.';
    }
    if (expectedReturn < 0) {
        return 'Expected return must be at least zero.'
    }
    if (duration <=0) {
        return 'No valid amount of years provided';
    }

    //created local variables to track totals over the time
    let total = initialAmount;            //total investment value
    let totalContribution = 0;            //total money added by user
    let totalInterestEarned = 0;            //total interest earned

    //create an empty array to store results for each year
    const annualResult: InvestmentResult[] = [];

    //loop through each year of the investment
    for (let i = 0; i < duration; i++) {
        
        //apply interest for the year
        total = total * (1 + expectedReturn);

        //calculate interest earned so far
        totalInterestEarned = total - totalContribution - initialAmount;

        //adding this year's contribution
        totalContribution = totalContribution + annualContribution;

        //add contribution to total amount
        total = total + annualContribution;

        //store the result for this year
        annualResult.push({
            year:`Year ${i+1}`,
            totalAmount:total,
            totalInterestEarned,
            totalContribution,
        });
    }
    //return all yearly results
    return annualResult;

}

//listen for the form submission event on the form with the id investment-form
document.getElementById("investment-form")!.addEventListener("submit", function(event) {
    //prevent the page from refreshing when the form is submitted
    event.preventDefault();

    //read the values from the input field and convert it to Number
    const initialAmount = Number((document.getElementById("initialamount") as HTMLInputElement).value);
    const annualContribution = Number((document.getElementById("annualcontribution") as HTMLInputElement).value);
    const expectedReturn = Number((document.getElementById("expectedReturn") as HTMLInputElement).value);
    const duration = Number((document.getElementById("duration") as HTMLInputElement).value);

    //created an object that matches the InvestmentData type
    const investmentData : InvestmentData = {
        initialAmount,
        annualContribution,
        expectedReturn,
        duration,
    };

    //call the calculateInvestment function and store the results
    const results = calculateInvestment(investmentData);

    //get the results div container from the index html file
    const resultsDiv = document.getElementById("results")!;

    //first clear any previouse results before displaying new ones
    resultsDiv.innerHTML = "";

    //checking if the calculationInvestment function returned an error, display it and return 
    if (typeof results === "string") {
        resultsDiv.innerHTML = `<p>${results}</p>`;
        return;
    }

    //Looping through each year's result and display it web page as in bootstrap card 
    results.forEach((year) => {

        //append a new card for each year showing total, contribution and interest earned 
        resultsDiv.innerHTML += `
        <div class="card mb-3 shadow-sm ">
        <div class="card-body">
        <h5 class="card-title">${year.year}</h5>
        <p class="card-text"><strong>Total:</strong> £${year.totalAmount.toFixed(0)}</p>
        <p class="card-text"><strong>Contribution:</strong> £${year.totalContribution.toFixed(0)}</p>
        <p class="card-text"><strong>Interest Earned:</strong> £${year.totalInterestEarned.toFixed(0)}</p>
        </div>
        </div>`;
    })

})