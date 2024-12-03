const fs             = require('fs');

const main = async () => {
    // get the numbers
    const list = await fs.promises.readFile('./src/exemple.txt','utf8',function (err: Error,data: string) {
        // check if we can access properly the file
        if(err) console.error('error while opening file');
    });

    // we split every line of the file
    const splittedData = list.split('\r\n');

    console.log(splittedData);

    const safeReportCount = splittedData.reduce((total: number, line: string) => {
        const list = line.split(' ').map(Number);
        
        let isIncreasing = true;
        let isDecreasing = true;
        let isSafe = true;

        for (let i = 1; i < list.length; i++) {
            const diff = list[i] - list[i-1];
            
            if (diff > 0) isDecreasing = false;
            if (diff < 0) isIncreasing = false;
            
            if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
                isSafe = false;
                break;
            }
        }

        return total + ((isIncreasing || isDecreasing) && isSafe ? 1 : 0);
    }, 0);

    console.log(`safeReportCount : ${safeReportCount}`);
};

main();