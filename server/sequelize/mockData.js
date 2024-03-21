// Save track data to database mock data
const tracksMockData = [
    {
        productName: "Another Evening",
        productType: "track",
        artistName: "ReasonEVE",
        additionalArtistNames: "Anderson .Paak, Goldlink",
        description: "Embark on a musical voyage that captures the essence of a tranquil suburban golden hour sunset through captivating melodies. This enchanting composition invites you to relive the wonder and curiosity of adolescence. Experience the nostalgic allure of a quiet neighborhood bathed in the warm hues of a setting sun, and let the harmonies transport you to a place of serene reflection.",
        preview: "https://cdn.jsdelivr.net/gh/dcastillo3/ReasonEVE/server/db/tracks/Another%20Evening/Another%20Evening.mp3",
        coverArt: "https://cdn.jsdelivr.net/gh/dcastillo3/ReasonEVE/server/db/tracks/Another%20Evening/Another%20Evening.jpg",
        s3Keys: {
            mp3: "tracks/Another Evening/mp3/Another Evening.mp3",
            lease: "tracks/Another Evening/lease/Another Evening.wav",
            exclusive: "tracks/Another Evening/exclusive/Another Evening.zip"
        },
        productPricing: [
            {
                id: "price_1NKeACDfmT9zYk9OCGRtFH35",
                purchaseType: "mp3",
                price: "5.00"
            },
            {
                id: "price_1NKeADDfmT9zYk9OhQKxipGD",
                purchaseType: "lease",
                price: "20.00"
            },
            {
                id: "price_1NKeADDfmT9zYk9OdaSLl6tD",
                purchaseType: "exclusive",
                price: "300.00"
            }
        ],
        active: true
    },
    {
        productName: "Abstract Thoughts",
        productType: "track",
        artistName: "ReasonEVE",
        additionalArtistNames: "Phony Ppl, MXXWLL",
        description: "Experience an enchanting composition that captures abstract thoughts and emotions. Created on a rainy New York City night, inviting introspection with its haunting melodies and captivating atmosphere. Explore the interplay of melancholy and hope.",
        preview: "https://cdn.jsdelivr.net/gh/dcastillo3/ReasonEVE/server/db/tracks/Abstract%20Thoughts/Abstract%20Thoughts.mp3",
        coverArt: "https://cdn.jsdelivr.net/gh/dcastillo3/ReasonEVE/server/db/tracks/Abstract%20Thoughts/Abstract%20Thoughts.jpg",
        s3Keys: {
            mp3: "tracks/Abstract Thoughts/mp3/Abstract Thoughts.mp3",
            lease: "tracks/Abstract Thoughts/lease/Abstract Thoughts.wav",
            exclusive: "tracks/Abstract Thoughts/exclusive/Abstract Thoughts.zip"
        },
        productPricing: [
            {
                id: "price_1NMiPvDfmT9zYk9OD2eaoNtT",
                purchaseType: "mp3",
                price: "5.00"
            },
            {
                id: "price_1NMiPwDfmT9zYk9OwKWAIRuO",
                purchaseType: "lease",
                price: "20.00"
            },
            {
                id: "price_1NMiPwDfmT9zYk9ON3Mx5Cnz",
                purchaseType: "exclusive",
                price: "300.00"
            }
        ],
        active: true
    },
    {
        productName: "Coastal Sunset",
        productType: "track",
        artistName: "ReasonEVE",
        additionalArtistNames: "Kendrick Lamar, Robert Glasper",
        description: "Indulge in a musical voyage that captures the essence of a serene evening in Los Angeles. With a red sky and beachside ambiance this enchanting composition transports you to a dreamy coastal retreat. Experience the calming melodies that evoke relaxation and inner peace, embracing the unique charm of an LA sunset.",
        preview: "https://cdn.jsdelivr.net/gh/dcastillo3/ReasonEVE/server/db/tracks/Coastal%20Sunset/Coastal%20Sunset.mp3",
        coverArt: "https://cdn.jsdelivr.net/gh/dcastillo3/ReasonEVE/server/db/tracks/Coastal%20Sunset/Coastal%20Sunset.jpg",
        s3Keys: {
            mp3: "tracks/Coastal Sunset/mp3/Coastal Sunset.mp3",
            lease: "tracks/Coastal Sunset/lease/Coastal Sunset.wav",
            exclusive: "tracks/Coastal Sunset/exclusive/Coastal Sunset.zip"
        },
        productPricing: [
            {
                id: "price_1NMiZ8DfmT9zYk9Ov1xiETdd",
                purchaseType: "mp3",
                price: "5.00"
            },
            {
                id: "price_1NMiZ8DfmT9zYk9O9ynRtLJ4",
                purchaseType: "lease",
                price: "20.00"
            },
            {
                id: "price_1NMiZ8DfmT9zYk9OJp8exyvV",
                purchaseType: "exclusive",
                price: "300.00"
            }
        ],
        active: true
    },
    {
        productName: "Metro Pulse",
        productType: "track",
        artistName: "ReasonEVE",
        additionalArtistNames: "Lupe Fiasco, Kanye West",
        description: "Immerse yourself in a seductive musical journey that transports you to a cyberpunk-inspired future city of the 80s. This captivating song captures the essence of a sultry evening amidst neon lights and compact streets. Experience the electrifying atmosphere and immerse yourself in the seductive allure of a futuristic metropolis illuminated by vibrant hues.",
        preview: "https://cdn.jsdelivr.net/gh/dcastillo3/ReasonEVE/server/db/tracks/Metro%20Pulse/Metro%20Pulse.mp3",
        coverArt: "https://cdn.jsdelivr.net/gh/dcastillo3/ReasonEVE/server/db/tracks/Metro%20Pulse/Metro%20Pulse.jpg",
        s3Keys: {
            mp3: "tracks/Metro Pulse/mp3/Metro Pulse.mp3",
            lease: "tracks/Metro Pulse/lease/Metro Pulse.wav",
            exclusive: "tracks/Metro Pulse/exclusive/Metro Pulse.zip"
        },
        productPricing: [
            {
                id: "price_1NMq0hDfmT9zYk9OJbof9SaS",
                purchaseType: "mp3",
                price: "5.00"
            },
            {
                id: "price_1NMq0hDfmT9zYk9OtfLD9Wun",
                purchaseType: "lease",
                price: "20.00"
            },
            {
                id: "price_1NMq0hDfmT9zYk9ObO1L7bRx",
                purchaseType: "exclusive",
                price: "300.00"
            }
        ],
        active: true
    },
    {
        productName: "Southern Isolation",
        productType: "track",
        artistName: "ReasonEVE",
        additionalArtistNames: "Pharrell, Common, Nas",
        description: "Experience a powerful musical narrative that explores the resilience and joy found amidst challenging circumstances. This evocative composition delves into the depths of growing up in poverty and the ghetto, yet unearths nostalgic moments of happiness. With vivid recollections of Mexican culture and the scorching desert climate, this song transports you to a world where ordinary trips to the grocery store become vibrant and cherished memories.",
        preview: "https://cdn.jsdelivr.net/gh/dcastillo3/ReasonEVE/server/db/tracks/Southern%20Isolation/Southern%20Isolation.mp3",
        coverArt: "https://cdn.jsdelivr.net/gh/dcastillo3/ReasonEVE/server/db/tracks/Southern%20Isolation/Southern%20Isolation.jpg",
        s3Keys: {
            mp3: "tracks/Southern Isolation/mp3/Southern Isolation.mp3",
            lease: "tracks/Southern Isolation/lease/Southern Isolation.wav",
            exclusive: "tracks/Southern Isolation/exclusive/Southern Isolation.zip"
        },
        productPricing: [
            {
                id: "price_1NKeynDfmT9zYk9OT1UhKzoP",
                purchaseType: "mp3",
                price: "5.00"
            },
            {
                id: "price_1NKeynDfmT9zYk9OFWqJy6bZ",
                purchaseType: "lease",
                price: "20.00"
            },
            {
                id: "price_1NKeyoDfmT9zYk9OMlEqIR7h",
                purchaseType: "exclusive",
                price: "300.00"
            }
        ],
        active: true
    }
];

module.exports = {
    tracksMockData
};