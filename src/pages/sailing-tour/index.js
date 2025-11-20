import * as React from "react"
import "./sailing-tour.scss"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import SailingTour from "./components/sailing-tour"

const SailingTourPage = () => (
  <Layout>
    <Seo title="Mata Rock Resort | Sailing Tours" />
    <SailingTour />
  </Layout>
)

export default SailingTourPage