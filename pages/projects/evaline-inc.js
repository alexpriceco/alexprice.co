import React, { Component } from 'react'

import Image from '../../components/general/image.js'
import DocumentHead from '../../components/general/head.js'
import Stylesheet from '../../components/general/stylesheet.js'
import sheet from '../../components/article.scss'

import ArticleLinks from '../../components/article-links/links.js'
import Contact from '../../components/contact/contact.js'
import Footer from '../../components/footer/footer.js'
import Loader from '../../components/loader/loader.js'

import ReactGA from 'react-ga'

export class Page extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: true,
      loaded: true,
      error: ''
    }
  }

  componentDidMount () {
    setTimeout(() => this.setState({ loading: false }, () => {
      setTimeout(() => this.setState({ loaded: true }), 1000)
      ReactGA.initialize('UA-63630411-1')
      ReactGA.pageview(window.location.pathname + window.location.search)
    }), 300)
  }

  render () {
    const { loading, loaded } = this.state
    const loadingClass = loading ? 'loading' : (loaded ? 'loaded' : '')
    return (
      <main className={loadingClass + ' evaline-inc'}>
        <DocumentHead />
        <Loader status={loadingClass} />
        <header>
          <div>
            <h1>Evaline, Inc.</h1>
            <h2>Led product design for three products, then used React and GraphQL to build them.</h2>
            <div className='point'>
              <svg viewBox='0 0 20 8' role='img' height='8' width='20'>
                <path transform='translate(-1, -1)' d='M 20.6972 0L 3.30278 0C 2.31337 0 1.92484 1.28323 2.74808 1.83205L 11.4453 7.6302C 11.7812 7.85413 12.2188 7.85413 12.5547 7.6302L 21.2519 1.83205C 22.0752 1.28323 21.6866 0 20.6972 0Z' />
              </svg>
            </div>
          </div>

          <Image rel='' src='../static/projects/evaline-inc/preview-min.jpg' />
        </header>
        <article className='project'>
          <p>Over 9 months, I led product design and front-end development on a team of 5, on three projects. I hired our first engineering role, and branded the company.</p>

          <div className='image-list'>
            <div>
              <Image
                src='../static/projects/evaline-inc/1-min.jpg'
                alt='Some of my work from Evaline (1)' />
              <Image
                src='../static/projects/evaline-inc/2-min.jpg'
                alt='Some of my work from Evaline (2)' />
            </div>
            <span>Working shots!</span>
          </div>

          <h2>Contracting</h2>
          <p>My last day at VChain, Inc. was in May of 2016, around the end of my first year at UC Santa Cruz. I was working out of a coworking space in Santa Cruz called NextSpace, while working with Formula Slug, an electric racing team at UCSC.</p>

          <p>The location, timing of my departure, and involvement with an electric vehicle program made me a perfect contractor for two South African guys with an awesome idea. The CEO, an ex-Tesla employee, and serial entrepreneur, had a hunch around workplace electric vehicle charging that we would spend the next year testing. The belief was that, with smart management software, and timely notifications, we could improve charging efficiency by moving folks in and out of chargers as was necessary (and convenient), rather than the existing system, which was to just sit at the charger for a full workday.</p>

          <p>Throughout 2016, we built a product landing page, created investor decks, and iterated on prototypes to fine-tune our feature offering. In hindsight, we probably should have spent far less time fine-tuning, and more time finding potential customers, getting letters of intent (LoI), and testing our assumptions with real users.</p>

          <p>Regardless, in December of 2017, the company raised an F&F round, providing enough runway for me to join full-time. January 1st of 2017 marked my first day as Lead Designer at Evaline, Inc.</p>

          <h2>Funding, Full-time</h2>
          <p>Being the only technical team-member, I immediately set out to learn some technologies to help us get product built. My work at VChain had given me enough of a background in software development to have some ideas about how a good application behaved, but we used PHP, a language I wasn't willing to work with again.</p>

          <p>For the next couple of weeks, I split my time between learning React full-time, and continuing to build UI prototypes, and fine-tune our UI and branding. The platform I used to learn would turn into the second version of Playbook, my D&D app sideproject.</p>

          <p>Towards the end of January, we partnered with a local Santa Cruz agency to provide development assistance. For the next month and a half, we worked with them to build out an MVP, collecting each week to plan out the next, then moving tickets in JIRA, and submitting code. We gave the agency a lot of leeway in determining tech stack, and we ended up with a bleeding-edge, but dodgy product, with SSR (thanks @Next.js), and GraphQL (Scaphold) out of the gate.</p>

          <p>Three major challenges were created through that partnership:</p>
          <ol>
            <li>Hiring talent became <i>very</i> difficult, due to the relative immaturity of GraphQL and some other technical choices.</li>
            <li>Tech debt. We knew we'd have this as a result of pushing hard to get as much built, but it cost us later.</li>
            <li>Scaphold would become a major issue, with awful downtime (days), and very little responsiveness from support.</li>
          </ol>

          <div className='image-list'>
            <div>
              <Image
                src='../static/projects/evaline-inc/3-min.jpg'
                alt='Some of my work from Evaline (3)' />
              <Image
                src='../static/projects/evaline-inc/4-min.jpg'
                alt='Some of my work from Evaline (4)' />
            </div>
            <span>More working shots!</span>
          </div>

          <p>More chapters coming soon!</p>

          <p>
            ### Hiring a backend developer<br />
            ### What we shipped<br />
            ### Pivoting<br />
            ### Departure
          </p>

          <div className='button-row'>
            <a href='https://dribbble.com/alexpriceco/projects/535866-Evaline' title='Some shots from the work I did at Evaline.' className='button'>
              <div>
                <svg role='img' height='16' width='16' viewBox='0 0 24 24' className='translate' xmlns='http://www.w3.org/2000/svg'>
                  <path fill='#ffffff' d='M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z' />
                </svg>
                <span>On Dribbble</span>
              </div>
            </a>

            <a href='http://evaline.io' title='Evaline website' className='button'>
              <div>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' className='translate no-fill' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                  <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
                  <polyline points='15 3 21 3 21 9' />
                  <line x1='10' y1='14' x2='21' y2='3' />
                </svg>
                <span>Evaline website</span>
              </div>
            </a>
          </div>
        </article>
        <ArticleLinks linkIds={['vexvolt', 'resume']} setLoading={(callback) => this.setState({ loading: true }, () => callback())} />
        <Contact />
        <Footer />
        <Stylesheet sheet={sheet} />
      </main>
    )
  }
}

export default Page
