const addTrackForm = {
    title: 'Add Your Next Track',
    buttonName: 'Add Track',
    fieldsPerRow: 2,
    inputs: [
        {
            id: 'track',
            labelName: 'Track',
            inputType: 'upload',
            defaultValue: [],
            additionalProps: {},
            validations: {
                fileTypes: ['audio/mpeg', 'audio/wav'],
                maxFiles: 1
            }
        },
        {
            id: 'coverArt',
            labelName: 'Cover Art',
            inputType: 'upload',
            defaultValue: [],
            additionalProps: {},
            validations: {
                fileTypes: ['image/png', 'image/jpeg'],
                maxFiles: 1
            }
        },
        {
            id: 'productName',
            labelName: 'Track Name',
            inputType: 'text',
            defaultValue: '',
            additionalProps: {},
            validations: {}
        },
        {
            id: 'artistName',
            labelName: 'Artist Name',
            inputType: 'text',
            defaultValue: 'ReasonEVE',
            additionalProps: {},
            validations: {}
        },
        {
            id: 'additionalArtistNames',
            labelName: 'Additional Artist Name',
            inputType: 'text',
            defaultValue: '',
            additionalProps: {},
            validations: {}
        },
        {
            id: 'description',
            labelName: 'Description',
            inputType: 'textarea',
            defaultValue: '',
            additionalProps: {},
            validations: {}
        },
        {
            id: 'mp3Price',
            labelName: 'MP3 Price',
            inputType: 'text',
            defaultValue: '5.00',
            additionalProps: {},
            validations: {}
        },
        {
            id: 'leasePrice',
            labelName: 'Lease Price',
            inputType: 'text',
            defaultValue: '20.00',
            additionalProps: {},
            validations: {}
        },
        {
            id: 'exclusivePrice',
            labelName: 'Exclusive Price',
            inputType: 'text',
            defaultValue: '300.00',
            additionalProps: {},
            validations: {}
        },
        {
            id: 'productType',
            labelName: 'Product Type',
            inputType: 'hidden',
            defaultValue: 'track',
            additionalProps: {},
            validations: {}
        }
    ]
};

export {
    addTrackForm
};