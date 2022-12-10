const formatResponseData = (data, err) => {
    let responseData = {};

    //TO-DO: Populate err to send to front end
    if(err) {
        responseData = {
            err,
            success: false
        };
    } else {
        responseData = {
            data,
            success: true
        };
    };

    return responseData;
};

const getFormattedDate = () => new Date().toISOString();

module.exports = {
    formatResponseData,
    getFormattedDate
};