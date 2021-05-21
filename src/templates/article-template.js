import React from 'react'

import { graphql, Link } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import { BLOCKS } from '@contentful/rich-text-types';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import styled from 'styled-components';

import Layout from '../components/layout';
import ArticleHeader from '../components/article-header';

// references need to exist in contentful rich text before we try to query for it!
// (references field won't show up in graphql until so)
export const query = graphql`
    query($slug: String!) {
        contentfulArticle(slug: {eq: $slug}) {
            title
            titleImage {
                gatsbyImageData(width: 600)
                title
                description
            }
            section
            publishDate(formatString: "MMMM Do, YYYY")
            author
            slug
            content {
                raw
                references {
                ... on ContentfulAsset {
                    contentful_id
                    __typename
                    fixed(width: 600) {
                      width
                      height
                      src
                      srcSet
                    }
                    title
                    description
                  }
                }
            }
        }
    }
`

const ArticleTemplate = (props) => {

    const options = {
        renderNode: {
            // for each image and video (our embedded assets) we run this function...
            [BLOCKS.EMBEDDED_ASSET]: node => {
                // assuming we are only going to have images
                return (
                    <ImageContainer>
                        <img src={node.data.target.fixed.src} alt={node.data.target.title} title={node.data.target.title} />
                    </ImageContainer>
                )
            }
        }
    }


    return (
        <Layout>
            <ArticleHeader 
                link={`/${props.data.contentfulArticle.section}/${props.data.contentfulArticle.slug}`}
                title={props.data.contentfulArticle.title}
                image={getImage(props.data.contentfulArticle.titleImage)}
                imageAlt={props.data.contentfulArticle.titleImage.title}
                author={props.data.contentfulArticle.author}
                section={props.data.contentfulArticle.section}
                articlePage
            />
            <Article>
                <ArticleInfo>
                    <ArticleDate>{props.data.contentfulArticle.publishDate}</ArticleDate>
                    <ArticleSection to={`/${props.data.contentfulArticle.section}`}>{props.data.contentfulArticle.section.toUpperCase()}</ArticleSection>
                </ArticleInfo>
                <ArticleContent>
                    {renderRichText(props.data.contentfulArticle.content, options)}
                </ArticleContent>
            </Article>
        </Layout>
    )
}

export default ArticleTemplate;

const ArticleContent = styled.div`
    width: 800px;
    margin: 4rem auto;
    font-family: 'Lato', sans-serif;
    font-size: 18px;
    padding-top: 2rem;
    text-wrap: wrap;
    text-align: justify;
    
    @media (max-width: 840px) {
        padding: 2rem 2rem 0 2rem;
    }

`

const Article = styled.div`
    margin-top: calc(100vh - 436px);
    display: flex;
`

const ArticleInfo = styled.div`
    background-color: #ff6200;
    height: 3.6rem;
    display: flex;
    position: absolute;
    width: 100%;
    left: 0;
    margin-top: 1rem;
    padding: 0 2rem;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: baseline;
`

const ArticleDate = styled.p`
    font-style: italic;
    color: white;
    font-family: 'Open Sans', sans-serif;
    font-size: 1rem;
`

const ArticleSection = styled(Link)`
    color: white;
    font-family: 'Open Sans', sans-serif;
    font-size: 1rem;
    text-decoration: none;
    font-weight: 600;

`

const ImageContainer = styled.div`
    text-align: center;
    box-sizing: border-box;
    padding: 2rem 0;
`