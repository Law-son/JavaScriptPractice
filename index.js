const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("JS Calculator");
console.log("*************");
console.log("Select an option");
console.log("1. Addition");
console.log("2. Subtraction");
console.log("3. Multiplication");
console.log("4. Division");
console.log("\n");

rl.question("Enter your option: ", (userOption) => {
    userOption = parseInt(userOption);

    const performCalculation = (a, b, operation) => {
        switch (operation) {
            case 'add':
                return a + b;
            case 'subtract':
                return a - b;
            case 'multiply':
                return a * b;
            case 'divide':
                return a / b;
        }
    };

    if ([1, 2, 3, 4].includes(userOption)) {
        rl.question("Enter first number: ", (num1) => {
            rl.question("Enter second number: ", (num2) => {
                const a = parseInt(num1);
                const b = parseInt(num2);

                let result;
                switch (userOption) {
                    case 1:
                        result = performCalculation(a, b, 'add');
                        console.log("Result: " + result);
                        break;
                    case 2:
                        result = performCalculation(a, b, 'subtract');
                        console.log("Result: " + result);
                        break;
                    case 3:
                        result = performCalculation(a, b, 'multiply');
                        console.log("Result: " + result);
                        break;
                    case 4:
                        result = performCalculation(a, b, 'divide');
                        console.log("Result: " + result);
                        break;
                }
                rl.close();
            });
        });
    } else {
        console.log("Invalid option");
        rl.close();
    }
});
