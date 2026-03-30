import { memo } from 'react'
import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { Skills } from '../components/Skills'
import { Projects } from '../components/Projects'
import { Services } from '../components/Services'
import { Contact } from '../components/Contact'
import { Navigation } from '../components/Navigation'
import { WebGLBackground } from '../components/WebGLBackground'

export const Home = memo(() => {
  return (
    <>
      {/* Premium WebGL gradient background */}
      <WebGLBackground />
      
      <Navigation />
      <main className="relative w-full z-10 pt-16">
        <section id="hero">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="services">
          <Services />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
    </>
  )
})
