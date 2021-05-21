import React from "react"

import { graphql } from 'gatsby';
import { getImage } from "gatsby-plugin-image";

import Layout from '../components/layout';
import ArticlesContainer from '../components/articles-container';
import ArticleCard from '../components/article-card';
import ArticleHeader from '../components/article-header';
import SectionHeader from '../components/section-header';

// For now, topStory is the first (latest) breakingNews story (need to find a better way to create a top story)
export const query = graphql`
  query {
    topStory: allContentfulArticle (
      sort: {fields: publishDate, order: DESC},
      filter: {breakingNews: {eq: true}},
      limit: 1
      ) {
        edges {
          node {
            title
            section
            author
            slug
            titleImage {
              gatsbyImageData(width: 800)
              title
            }
          }
        }
      }
    breakingNews: allContentfulArticle (
      sort: {fields: publishDate, order: DESC},
      filter: {breakingNews: {eq: true}},
      limit: 3,
      skip: 1
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
    mostRecent: allContentfulArticle (
      sort: {fields: publishDate, order: DESC},
      limit: 3
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
  }
`


const Index = (props) => {
  return (
    <Layout>
        {/* make this topStory component the "header" (behind transparent header) */}
        <ArticleHeader 
            link={`/${props.data.topStory.edges[0].node.section}/${props.data.topStory.edges[0].node.slug}`}
            title={props.data.topStory.edges[0].node.title}
            image={getImage(props.data.topStory.edges[0].node.titleImage)}
            imageAlt={props.data.topStory.edges[0].node.titleImage.title}
            author={props.data.topStory.edges[0].node.author}
        />
        <SectionHeader title="Breaking News" />
        <ArticlesContainer homePage>
            {props.data.breakingNews.edges.map((edge, index) => {
              return (
                <ArticleCard
                  key={`${edge.node.title}-${index}-${edge.node.section}`}
                  link={`/${edge.node.section}/${edge.node.slug}`}
                  title={edge.node.title}
                  image={getImage(edge.node.titleImage)}
                  imageAlt={edge.node.titleImage.title}
                  author={edge.node.author}
                  section={edge.node.section}
                  big={index === 0 ? true : false}
                />
              )
            })}
          </ArticlesContainer>
        <SectionHeader title="Most Recent" />
        <ArticlesContainer homePage>
              {props.data.mostRecent.edges.map((edge, index) => {
                return (
                  <ArticleCard
                    key={`${edge.node.title}-${index}-${edge.node.section}`}
                    link={`/${edge.node.section}/${edge.node.slug}`}
                    title={edge.node.title}
                    image={getImage(edge.node.titleImage)}
                    imageAlt={edge.node.titleImage.title}
                    author={edge.node.author}
                    section={edge.node.section}
                    big={index === 0 ? true : false}
                  />
                )
              })}
          </ArticlesContainer>
    </Layout>
  )
}

export default Index;
