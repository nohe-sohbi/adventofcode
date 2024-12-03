const compareNumbers = (a: number, b: number) => a - b;
const fs             = require('fs');

const main = async () => {
    // get the numbers
    const list = await fs.promises.readFile('exemple.txt','utf8',function (err: Error,data: string) {
        // check if we can access properly the file
        if(err) console.error('error while opening file');
    });

    // we split every line of the file
    const splittedData = list.split('\r\n');

    // for every line take first number to list 1 and second to list 2
    const [listOne, listTwo] = splittedData.reduce((accumulator: Number[][], currentValue: string) => {
        const [firstChunk, secondChunk] = currentValue.split('   ');
        accumulator[0].push(Number(firstChunk));
        accumulator[1].push(Number(secondChunk));

        return accumulator;
    }, [[],[]]);

    // sort the first List :
    const sortedListOne = listOne.sort(compareNumbers);
    // sort the second List :
    const sortedListTwo = listTwo.sort(compareNumbers);

    let totalDistance = 0;
    let totalIteration = 0;
    // get the total distance between the two lists :
    for(let i=0; i <= sortedListOne.length - 1; i++) {
        totalDistance += Math.abs(sortedListOne[i] - sortedListTwo[i]);
        console.log(Math.abs(sortedListOne[i] - sortedListTwo[i]));
        totalIteration++;
    }

    console.log(`The total distance between the two lists is : ${totalDistance}, the total rows is : ${totalIteration}`);
};

main();
