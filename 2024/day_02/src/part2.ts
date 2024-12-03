const fs2             = require('fs');

const main = async () => {
    // get the numbers
    const list = await fs2.promises.readFile('./src/exemple.txt','utf8',function (err: Error,data: string) {
        // check if we can access properly the file
        if(err) console.error('error while opening file');
    });

    // we split every line of the file
    const splittedData = list.split('\r\n');

    console.log(splittedData);

    const safeReportCount = splittedData.reduce((total: number, line: string) => {
        const list = line.split(' ').map(Number);
        
        const isSafe = (arr: number[]): boolean => {
            let isIncreasing = true;
            let isDecreasing = true;
            
            for (let i = 1; i < arr.length; i++) {
                const diff = arr[i] - arr[i-1];
                if (diff > 0) isDecreasing = false;
                if (diff < 0) isIncreasing = false;
                if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false;
            }
            
            return isIncreasing || isDecreasing;
        };

        if (isSafe(list)) return total + 1;

        for (let i = 0; i < list.length; i++) {
            const modifiedList = [...list.slice(0, i), ...list.slice(i + 1)];
            if (isSafe(modifiedList)) return total + 1;
        }

        return total;
    }, 0);

    console.log(`safeReportCount : ${safeReportCount}`);
};

main();