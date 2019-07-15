import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import { sample, get, map, compact } from "lodash"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

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
          <>
            <h1>
              TRUMP {Verb_Object} OF {Racial_Noun}
            </h1>
            <button onClick={this.generate}>Generate</button>
          </>
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
