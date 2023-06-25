const addTrackForm = {
    title: 'Add Your Next Track',
    buttonName: 'Add Track',
    fieldsPerRow: 2,
    inputs: [
        {
            id: 'productName',
            labelName: 'Title',
            inputType: 'text',
            defaultValue: '',
            additionalProps: {},
            validations: {},
            fullRow: false
        },
        {
            id: 'productType',
            labelName: 'Product Type',
            inputType: 'hidden',
            defaultValue: 'track',
            additionalProps: {},
            validations: {},
            fullRow: false
        },
        {
            id: 'artistName',
            labelName: 'Artist Name',
            inputType: 'text',
            defaultValue: 'ReasonEVE',
            additionalProps: {},
            validations: {},
            fullRow: false
        },
        {
            id: 'additionalArtistNames',
            labelName: 'Additional Artist Name',
            inputType: 'text',
            defaultValue: '',
            additionalProps: {},
            validations: {},
            fullRow: false
        },
        {
            id: 'description',
            labelName: 'Description',
            inputType: 'textarea',
            defaultValue: '',
            additionalProps: {},
            validations: {},
            fullRow: true
        },
        {
            id: 'preview',
            labelName: 'Preview',
            inputType: 'upload',
            defaultValue: [],
            additionalProps: {},
            validations: {
                fileTypes: ['audio/mpeg'],
                maxFiles: 1
            },
            fullRow: false
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
            },
            fullRow: false
        },
        {
            id: 'mp3',
            labelName: 'MP3',
            inputType: 'upload',
            defaultValue: [],
            additionalProps: {},
            validations: {
                fileTypes: ['audio/mpeg'],
                maxFiles: 1
            },
            fullRow: false
        },
        {
            id: 'lease',
            labelName: 'Lease',
            inputType: 'upload',
            defaultValue: [],
            additionalProps: {},
            validations: {
                fileTypes: ['audio/wav'],
                maxFiles: 1
            },
            fullRow: false
        },
        {
            id: 'mp3Price',
            labelName: 'MP3 Price',
            inputType: 'text',
            defaultValue: '5.00',
            additionalProps: {},
            validations: {},
            fullRow: false
        },
        {
            id: 'leasePrice',
            labelName: 'Lease Price',
            inputType: 'text',
            defaultValue: '20.00',
            additionalProps: {},
            validations: {},
            fullRow: false
        },
        {
            id: 'exclusive',
            labelName: 'Exclusive',
            inputType: 'upload',
            defaultValue: [],
            additionalProps: {},
            validations: {
                fileTypes: ['application/zip'],
                maxFiles: 1
            },
            fullRow: true
        },
        {
            id: 'exclusivePrice',
            labelName: 'Exclusive Price',
            inputType: 'text',
            defaultValue: '300.00',
            additionalProps: {},
            validations: {},
            fullRow: true
        }
    ]
};

export {
    addTrackForm
};