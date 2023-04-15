import { useState } from "react";
import { apis, initialStates } from "../utils/consts";
import axios from "axios";

function usePlaylist() {
    const [playlist, setPlaylist] = useState(initialStates.playlist);

    const fetchPlaylist = async () => {
        try {
            let res = await axios.get(apis.playlist);

            if (!res?.data?.success) {
                const { err = {} } = res.data;

                console.error(err);
            } else if (res?.data?.success) {
                const { data = [] } = res.data;

                setPlaylist(data);
            };
        } catch (err) {
            console.error(err.response);
        };
    };

    return {
        playlist,
        fetchPlaylist
    };
};

export default usePlaylist;