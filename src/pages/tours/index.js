import * as React from "react"
import "./tours.scss"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

import Tours from "./components/tour"


const TourListings = () => (
  <Layout>
    <Seo title="Mata Rock Resort | Sailing Tour" />
    <Tours />
  </Layout>
)

export default TourListings;
