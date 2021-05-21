const path = require('path');


module.exports.createPages = async ({ graphql, actions }) => {

    const { createPage } = actions;

    const sectionsTemplate = path.resolve('./src/templates/sections-template.js');
    const articleTemplate = path.resolve('./src/templates/article-template.js');

    const res = await graphql(`
        query {
            sectionPages: allContentfulSection {
                edges {
                  node {
                    sectionTitle
                  }
                }
            }
            articlePages: allContentfulArticle {
                edges {
                    node {
                        section
                        slug
                    }
                }
            }
        }
    `)

    // Create pages for each article section (politics, art, etc.)
    res.data.sectionPages.edges.forEach((edge) => {
        createPage({
            component: sectionsTemplate,
            path: `/${edge.node.sectionTitle}`,
            context: {
                section: edge.node.sectionTitle
            }
        })
    });
    // Create pages for each article
    res.data.articlePages.edges.forEach((edge) => {
        createPage({
            component: articleTemplate,
            path: `/${edge.node.section}/${edge.node.slug}`,
            context: {
                slug: edge.node.slug
            }
        })
    })

}
