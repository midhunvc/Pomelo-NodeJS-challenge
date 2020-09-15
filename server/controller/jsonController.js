'use-strict';

// this is scalable function which will convert the input JSON format to the output JSON format depends on the levels
exports.convert = async (json) => {
    try {
        const allData=[];
        //loop over all levels of data .....
        for(i=Object.values(json).length-1;i>=0;i--){
            // loop over datas in each level
            for(j=0;j<Object.values(json)[i].length;j++){
                allData.push(Object.values(json)[i][j])
            }
        }
        //loop over all data
        for(k=0;k<allData.length;k++){
            for(l=0;l<allData.length;l++){
                if(allData[k].parent_id==allData[l].id){
                    allData[l].children.push(allData[k]);
                }
            }
        }
        // final data will the level0 data 
        return (allData[allData.length-1]);
    } catch (error) {
        throw new Error(error);
    }
};
