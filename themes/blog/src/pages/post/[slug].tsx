import { TCromwellPage, TGetStaticProps, TPost } from '@cromwell/core';
import { CContainer, getGraphQLClient, getGraphQLErrorInfo, Link, LoadBox } from '@cromwell/core-frontend';
import { useRouter } from 'next/router';
import React from 'react';

import Layout from '../../components/layout/Layout';
import { PostInfo } from '../../components/postCard/PostCard';
import postStyles from '../../components/postCard/PostCard.module.scss';
import { getHead } from '../../helpers/getHead';
import commonStyles from '../../styles/common.module.scss';
import styles from '../../styles/pages/BlogPost.module.scss';

interface BlogPostProps {
    post?: TPost | undefined;
    notFound?: boolean;
}
const BlogPostPage: TCromwellPage<BlogPostProps> = (props) => {
    const { post } = props;
    const router = useRouter?.();

    return (
        <Layout>
            {getHead({
                documentContext: props.documentContext,
                image: post?.mainImage,
                data: post,
            })}
            <CContainer className={styles.BlogPost} id="post_01">
                <CContainer className={commonStyles.content} id="post_02">
                    {post?.mainImage && (
                        <img className={styles.mainImage} src={post.mainImage} />
                    )}
                </CContainer>
                <CContainer className={styles.postContent} id="post_03">
                    {(!post && router && router.isFallback) && (
                        <LoadBox />
                    )}
                    {(!post && !(router && router.isFallback)) && (
                        <div className={styles.notFound}>
                            <h3>Post not found</h3>
                        </div>
                    )}
                    {post?.title && (
                        <h1 className={styles.postTitle}>{post?.title}</h1>
                    )}
                    {post?.tags && (
                        <div className={postStyles.tagsBlock}>
                            {post?.tags?.map(tag => {
                                return (
                                    <Link href={`/tag/${tag.slug}`} key={tag.id}>
                                        <a className={postStyles.tag}>{tag?.name}</a>
                                    </Link>
                                )
                            })}
                        </div>
                    )}
                    {post && (
                        <div className={styles.postInfo}>
                            <PostInfo data={post} />
                        </div>
                    )}
                    {post?.content && (
                        <div id="text-editor" dangerouslySetInnerHTML={{
                            __html: post?.content
                        }}></div>
                    )}
                </CContainer>
            </CContainer>
        </Layout>
    );
}

export default BlogPostPage;


export const getStaticProps: TGetStaticProps = async (context): Promise<BlogPostProps> => {
    const slug = context?.params?.slug ?? null;
    const client = getGraphQLClient();
    let post: TPost | undefined = undefined;


    if (slug && typeof slug === 'string') {
        try {
            post = await client?.getPostBySlug(slug);
        } catch (e) {
            console.error('BlogPostPage::getStaticProps', getGraphQLErrorInfo(e))
        }
    } else {
        console.error('BlogPostPage::getStaticProps: !pid')
    }

    if (!post) {
        return {
            notFound: true,
        }
    }

    return {
        post,
    }

}

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
}