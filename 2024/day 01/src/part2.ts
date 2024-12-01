const fs2 = require('fs');

const partTwo = async () => {
    // get the numbers
    const list = await fs2.promises.readFile('input.txt','utf8',function (err: Error,data: string) {
        // check if we can access properly the file
        if(err) console.error('error while opening file');
    });

    // we split every line of the file
    const splittedData = list.split('\r\n');

    // for every line take first number to list 1 and second to list 2
    const [listOne, listTwo] = splittedData.reduce((accumulator: number[][], currentValue: string) => {
        const [firstChunk, secondChunk] = currentValue.split('   ');
        accumulator[0].push(Number(firstChunk));
        accumulator[1].push(Number(secondChunk));

        return accumulator;
    }, [[],[]]);

    // for every number in list 1, check if it is in list 2
    const totalSimilarityScore = listOne.reduce((acc: number,numberOfListOne: number) => {
        const numberOfSimilarity = listTwo.filter((numberOfListTwo: number) => numberOfListOne === numberOfListTwo).length;
        return acc + (numberOfListOne * numberOfSimilarity);
    }, 0);

  console.log(`totalSimilarityScore : ${totalSimilarityScore}`);
};

partTwo();