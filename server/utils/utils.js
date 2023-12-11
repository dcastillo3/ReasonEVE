const formatResponseData = (data, err) => {
    let responseData = {};

    //TO-DO: Populate err to send to front end
    if(err) {
        responseData = {
            err: err.message,
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

const serviceLog = (serviceName, data) => {
    console.log(`[${serviceName}] ${data}`);
};

const getFormattedDate = () => new Date().toISOString();

const getUniqueId = () => Date.now() + Math.floor(Math.random() * 1000);

module.exports = {
    formatResponseData,
    getFormattedDate,
    getUniqueId,
    serviceLog
};