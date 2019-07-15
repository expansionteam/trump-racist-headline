import React, { Component } from "react"
import { graphql } from "gatsby"
import { sample, get, map, compact } from "lodash"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "../components/generator.css"
import bg from "../images/bg.png"
import button from "../images/button.png"
import presents from "../images/presents.png"
import tear from "../images/tear.png"
import trump_title from "../images/trump_title.png"

class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.generate = this.generate.bind(this)
    this.state = { Racial_Noun: "", Verb_Object: "", options: [] }
  }
  componentDidMount() {
    const edges = get(this, "props.data.allAirtable.edges")
    const nouns = compact(map(edges, e => get(e, "node.data.Racial_Noun")))
    const verbs = compact(map(edges, e => get(e, "node.data.Verb_Object")))
    const self = this
    this.setState({ options: { nouns, verbs } }, self.generate)
  }
  generate() {
    const {
      options: { nouns, verbs },
    } = this.state
    this.setState({
      Racial_Noun: sample(nouns),
      Verb_Object: sample(verbs),
    })
  }
  render() {
    const { Racial_Noun, Verb_Object } = this.state
    return (
      <Layout>
        <SEO title="Trump Racist Euphemism Headline Generator" />
        {Racial_Noun && (
          <div
            className="standard-page"
            style={{ backgroundImage: `url(${bg})` }}
          >
            <div className="content-holder">
              <img
                src={presents}
                className="daily-logo"
                alt="Daily Show Logo"
              />
              <div className="trump-holder">
                <img
                  src={trump_title}
                  className="trump-title"
                  alt="Trump Generator"
                />
                <div
                  className="trump-tear"
                  style={{ backgroundImage: `url(${tear})` }}
                >
                  <h1 className="trump-text">
                    TRUMP {Verb_Object} OF {Racial_Noun}
                  </h1>
                </div>
              </div>
              <img
                src={button}
                onClick={this.generate}
                className="generate-button"
                alt=""
              />
            </div>
          </div>
        )}
      </Layout>
    )
  }
}

export const query = graphql`
  query Airtable {
    allAirtable(filter: { table: { eq: "Combinations" } }) {
      edges {
        node {
          data {
            Racial_Noun
            Verb_Object
          }
        }
      }
    }
  }
`

export default IndexPage
