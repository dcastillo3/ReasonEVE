import { useState } from "react";
import { useEffect } from "react";

function useEffectAfterFirstRender(callback, dependencies) {
    const [mounted, setMount] = useState(false);

    useEffect(() => {
        if(!mounted) setMount(true);
        else return callback();
    }, dependencies)
};

export default useEffectAfterFirstRender;