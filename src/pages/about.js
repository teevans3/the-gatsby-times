import React from 'react'

import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';

import Layout from '../components/Layout';
import ArticleHeader from '../components/article-header';
import SectionHeader from '../components/section-header';


const About = () => {
    const data = useStaticQuery(graphql`
        query {
            backgroundImage: allContentfulOtherBackgrounds(
                filter: {backgroundTitle: {eq: "Default Background"}}
              ) {
                edges {
                  node {
                    backgroundImage {
                      gatsbyImageData(width: 800)
                    }
                  }
                }
              }
            siteTitle: site {
              siteMetadata {
                  title
              } 
            }
            aboutInfo: allContentfulOtherInfo {
              edges {
                node {
                  description {
                    description
                  }
                }
              }
            }
            contactInfo: allContentfulContactInfo {
              edges {
                node {
                  title
                  value
                }
              }
            }
        }
    `)

    console.log(data.aboutInfo.edges[0].node);

    return (
        <Layout>
            {/* pseudo article header for background image*/}
            <ArticleHeader
                link={null}
                title={null}
                image={getImage(data.backgroundImage.edges[0].node.backgroundImage)}
                imageAlt="Default Background"
                author={null}
            />
            <SectionHeader title={`About ${data.siteTitle.siteMetadata.title}`} />
            <AboutContent>
                {data.aboutInfo.edges[0].node.description.description}
            </AboutContent>
            <SectionHeader title="Contact Us" id="contact"/>
            <ContactInfo>
                {data.contactInfo.edges.map((edge) => {
                  return (
                    <Contact>
                      <ContactTitle>{edge.node.title}</ContactTitle>
                      <ContactValue>{edge.node.value}</ContactValue>
                    </Contact>
                  )
                })}
            </ContactInfo>

        </Layout>
    )
}

export default About;

const AboutContent = styled.div`
  margin: 0 auto;
  font-size: 18px;
  font-family: "Lato", sans-serif;

  @media (max-width: 1250px) {
    padding: 0 2rem;
  }
`

const ContactInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: space-between;

  @media (max-width: 1250px) {
    padding: 0 2rem;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    align-content: center;
  }

`

const Contact = styled.div`
  display: flex;
  width: 30%;
  flex-direction: column;
  font-family: "Open Sans", sans-serif;
  box-sizing: border-box;

  @media (max-width: 800px) {
    padding: 1rem 0;
    width: 100%;
  }
`

const ContactTitle = styled.p`
  font-size: 2rem;
  margin: 0;
  color: #ff6200;
`

const ContactValue = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-style: italic;
`