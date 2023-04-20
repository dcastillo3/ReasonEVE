import { useState } from "react";
import { apis, initialStates } from "../../utils/consts";
import axios from "axios";

function useTracks() {
    const [tracks, setTracks] = useState(initialStates.tracks);

    const fetchTracks = async () => {
        try {
            let res = await axios.get(apis.tracks);

            if (!res?.data?.success) {
                const { err = {} } = res.data;

                console.error(err);
            } else if (res?.data?.success) {
                const { data = {} } = res.data;

                setTracks(data);
            };
        } catch (err) {
            const errorMessage = err?.reponse ? err.response : err;

            console.error(errorMessage);
        };
    };

    return {
        tracks,
        fetchTracks
    };
};

export default useTracks;