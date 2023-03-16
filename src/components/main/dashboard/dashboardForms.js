const addTrackForm = {
    name: 'Add Track',
    buttonName: 'Add Track',
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
            id: 'trackName',
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
        }
    ]
};

export {
    addTrackForm
};