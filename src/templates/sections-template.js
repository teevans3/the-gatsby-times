import React from 'react'

import { graphql } from 'gatsby';
import { getImage } from "gatsby-plugin-image";

import Layout from '../components/layout';
import ArticlesContainer from '../components/articles-container';
import ArticleCard from '../components/article-card';
import ArticleHeader from '../components/article-header';
import SectionHeader from '../components/section-header';

// currently have all sections on contentful in lowercase so we can query it via slug..
export const query = graphql`
    query ($section: String) {
        sectionArticles: allContentfulArticle (
            sort: {fields: publishDate, order: DESC},
            filter: {section: {eq: $section}}
            ) {
                edges {
                    node {
                        title
                        section
                        publishDate(formatString:"MMMM Do, YYYY")
                        author
                        slug
                        titleImage {
                            gatsbyImageData(width: 800)
                            title
                        }
                    }
                }
            }
        defaultBackground: allContentfulSection(
            filter: {sectionTitle: {eq: $section}}
            ) {
                edges {
                    node {
                        defaultBackground {
                            gatsbyImageData(width: 800)
                        }
                    }
                }
            }
    }
`

const SectionsTemplate = (props) => {
    console.log(props.data.defaultBackground);
    return (
        <Layout>
            {/* first article (newest) will be the header */}
            {/* eventually find a better way to query a "top story" article... any ideas? */}
            {props.data.sectionArticles.edges.length > 0 ? 
            <ArticleHeader 
                link={`/${props.data.sectionArticles.edges[0].node.section}/${props.data.sectionArticles.edges[0].node.slug}`}
                title={props.data.sectionArticles.edges[0].node.title}
                image={getImage(props.data.sectionArticles.edges[0].node.titleImage)}
                imageAlt={props.data.sectionArticles.edges[0].node.titleImage.title}
                author={props.data.sectionArticles.edges[0].node.author}
            /> : 
            <ArticleHeader
                link={null}
                title={null}
                image={getImage(props.data.defaultBackground.edges[0].node.defaultBackground)}
                imageAlt="Default Background"
                author={null}
            />
            }
            
            <SectionHeader title={props.pageContext.section[0].toUpperCase() + props.pageContext.section.substring(1)} />
            <ArticlesContainer>
                {props.data.sectionArticles.edges.map((edge, index) => {
                    if (index !== 0) {
                        return (
                            <ArticleCard
                                key={`${edge.node.title}-${index}-${edge.node.section}`}
                                link={`/${edge.node.section}/${edge.node.slug}`}
                                title={edge.node.title}
                                image={getImage(edge.node.titleImage)}
                                imageAlt={edge.node.titleImage.title}
                                author={edge.node.author}
                                section={edge.node.section}
                                big
                            />
                        )
                    }
                })}
            </ArticlesContainer>
        </Layout>
    )
}

export default SectionsTemplate;

