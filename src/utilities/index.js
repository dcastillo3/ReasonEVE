//Utilities file

//Partition array into array of arrays
export const partition = (array, size) => {
    //TODO: error handling for input type

    let partArr = [];
    //default size is 4
    let partSize = size || 4;

    for(let i = 0; i < array.length; i += partSize) {
        const currPart = array.slice(i, i + partSize);
        
        //Force each array to size
        while(currPart.length !== partSize) {
            currPart.push('coming soon');
        }

        partArr.push(currPart)
    }

    return partArr;
}

//Get filename from url
export const getFileName = url => {
    //TODO: Optimize or find better solution

    const lastDot = url.lastIndexOf('.') > -1 ? url.lastIndexOf('.') : url.length - 1;
    const lastSlash = url.lastIndexOf('/') > -1 ? url.lastIndexOf('/') : 0;
    
    return url.slice(lastSlash + 1, lastDot);
}