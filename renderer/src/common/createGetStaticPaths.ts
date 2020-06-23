// import { DBEntity, GraphQLPaths } from "@cromwell/core";
// import { getGraphQLClient } from '@cromwell/core-frontend';
//@ts-ignore
import { importPage } from '.cromwell/imports/imports.gen';

export const createGetStaticPaths = (pageName: string) => {
    const page: any = importPage(pageName);
    if (page.getStaticPaths) {
        return page.getStaticPaths;
    }
    return undefined;

}
/*
export const createGetStaticPaths = (dbEntity: DBEntity) => {
    return async function () {
        const getAllPath = GraphQLPaths[dbEntity].getMany;
        let slugs: any;
        let paths = [];
        try {
            slugs = await getGraphQLClient().request(`
                query get${dbEntity} {
                    ${getAllPath}(pagedParams: {pageNumber: 1, pageSize: 1000000000}) {
                        slug
                    }
                }
            `);
            if (slugs) {
                paths = slugs[getAllPath].map((entity: any) => {
                    return {
                        params: { slug: entity.slug }
                    }
                })
            }
        } catch (e) {
            console.error('createGetStaticPaths:error', e)
        }
        // console.log('getStaticPaths', paths)
        return {
            // paths,
            paths: [],
            fallback: true
        };
    }

}
*/