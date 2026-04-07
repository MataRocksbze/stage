import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import "./blog.scss"

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allGraphCmsBlog(sort: { date: DESC }) {
        nodes {
          id
          title
          slug
          date
          category
          excerpt
          readTime
          image {
            url
          }
          content {
            html
          }
        }
      }
    }
  `)

  const blogPosts = data.allGraphCmsBlog.nodes.map(node => ({
    ...node,
    date: node.date ? new Date(node.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }) : "",
    image: node.image?.url,
    content: (node.content?.html || (typeof node.content === "string" ? node.content : ""))
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&"),
  }))

  const [activePost, setActivePost] = useState(blogPosts[0])
  const contentRef = useRef(null)

  useEffect(() => {
    if (blogPosts.length > 0 && !activePost) {
      setActivePost(blogPosts[0])
    }
  }, [blogPosts, activePost])

  if (blogPosts.length === 0) {
    return (
      <Layout>
        <Seo title="Blog" />
        <div className="blog-page" style={{ padding: "100px 20px", textAlign: "center" }}>
          <h2 style={{ color: "#fff" }}>No posts found.</h2>
          <p style={{ color: "rgba(255,255,255,0.6)" }}>Check back soon!</p>
        </div>
      </Layout>
    )
  }

  const handlePostClick = post => {
    setActivePost(post)
    if (typeof window !== "undefined" && window.innerWidth <= 900 && contentRef.current) {
      setTimeout(() => {
        contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    }
  }

  return (
    <Layout>
      <Seo
        title="Mata Rocks Resort | Blog – Stories from Belize"
        description="Discover travel tips, adventure guides, food stories, and insider knowledge about Ambergris Caye and Belize from the team at Mata Rocks Resort."
      />
      <div className="blog-page">
        <div className="blog-hero">
          <div className="blog-hero__overlay" />
          <div className="blog-hero__content">
            <span className="blog-hero__eyebrow">The Mata Rocks Journal</span>
            <h1 className="blog-hero__title">Stories from Belize</h1>
            <p className="blog-hero__subtitle">
              Travel guides, adventure stories, and insider knowledge from the heart of the Caribbean
            </p>
          </div>
        </div>

        <div className="blog-layout">
          <aside className="blog-sidebar">
            <div className="blog-sidebar__inner">
              <h2 className="blog-sidebar__heading">All Articles</h2>
              <ul className="blog-sidebar__list">
                {blogPosts.map(post => (
                  <li
                    key={post.id}
                    className={`blog-sidebar__item ${activePost.id === post.id ? "blog-sidebar__item--active" : ""}`}
                    onClick={() => handlePostClick(post)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === "Enter" && handlePostClick(post)}
                    aria-label={`Read ${post.title}`}
                  >
                    <span className="blog-sidebar__category">{post.category}</span>
                    <span className="blog-sidebar__item-title">{post.title}</span>
                    <span className="blog-sidebar__item-date">{post.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <main className="blog-content" id="blog-main-content" ref={contentRef}>
            <article className="blog-article" key={activePost.id}>
              <div className="blog-article__image-wrap">
                <img
                  src={activePost.image}
                  alt={activePost.title}
                  className="blog-article__image"
                />
                <div className="blog-article__image-overlay" />
              </div>

              <div className="blog-article__body">
                <div className="blog-article__meta">
                  <span className="blog-article__category">{activePost.category}</span>
                  <span className="blog-article__sep">·</span>
                  <span className="blog-article__date">{activePost.date}</span>
                  <span className="blog-article__sep">·</span>
                  <span className="blog-article__read-time">{activePost.readTime}</span>
                </div>

                <h2 className="blog-article__title">{activePost.title}</h2>
                <p className="blog-article__excerpt">{activePost.excerpt}</p>

                <div
                  className="blog-article__content"
                  dangerouslySetInnerHTML={{ __html: activePost.content }}
                />

                <div className="blog-article__footer">
                  <div className="blog-article__divider" />
                  <p className="blog-article__cta-text">
                    Ready to experience Belize for yourself?
                  </p>
                  <a
                    href="https://us2.cloudbeds.com/en/reservation/Ii3x4t?currency=usd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blog-article__cta-btn"
                    id="blog-book-now-btn"
                  >
                    Book Your Stay at Mata Rocks
                  </a>
                </div>
              </div>
            </article>
          </main>
        </div>
      </div>
    </Layout>
  )
}

export default BlogPage
