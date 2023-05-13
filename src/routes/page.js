import { useEffect } from 'react';
import { buildDocumentTitle } from './routesUtils';

function Page({children, title}) {
    useEffect(() => {
        const documentTitle = buildDocumentTitle(title);

        document.title = documentTitle;
    }, [title]);

    return children;
};

export default Page;