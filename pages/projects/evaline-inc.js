import React, { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'

import mediumZoom from 'medium-zoom'

import Image from '../../components/general/image.js'
import ArticleLinks from '../../components/article/links.js'
import Article from '../../components/article/article.js'

export const ArrowIcon = () => (
  <svg width='16' height='11' viewBox='0 0 19 13'>
    <path fill='white' d='M 0.410156 6.38535C 0.410156 6.38535 1.5 7.11192 2.5 7.11192L 14.5 7.11184L 12.2374 9.24223C 12.127 9.35258 12.0497 9.48539 12.0055 9.63969L 11.5331 11.2725C 11.4447 11.5708 11.4337 11.753 11.5 11.8194L 11.7901 12.1094C 11.9557 12.2749 12.1353 12.2613 12.3286 12.0679L 18.2845 6.11202L 12.3286 0.15613C 12.1353 -0.0372296 11.9557 -0.0509015 11.7901 0.114626L 11.5 0.404665C 11.4337 0.471071 11.4447 0.6532 11.5331 0.95154L 12.0055 2.58435C 12.0497 2.73865 12.127 2.87146 12.2374 2.98181L 14.5 5.11192L 0.410156 5.11187C 0.136719 5.11187 0 5.22905 0 5.46343L 0 6.02207C 0 6.11582 0.136719 6.23692 0.410156 6.38535Z' />
  </svg>
)

export class Page extends Component {
  setRef (image) {
    mediumZoom(image, {
      margin: 24,
      background: 'rgba(0, 0, 0, 0.25)'
    })
  }

  render () {
    return (
      <Article id={'evaline-inc'}>
        <header>
          <div className='back-to-home' onClick={() => {
            this.setState({ loading: true }, () => {
              setTimeout(() => Router.push('/'), 200)
            })
          }}>
            <svg width='16' height='10.66664' viewBox='0 0 12 8' >
              <path fill='white' d='M 0.268426 4.17888C 0.268426 4.17888 0.981672 4.65438 1.63612 4.65438L 9.4895 4.65433L 8.00877 6.04856C 7.93647 6.12078 7.88591 6.2077 7.85699 6.30868L 7.54782 7.37727C 7.48998 7.57251 7.48279 7.69171 7.52617 7.73517L 7.71598 7.92498C 7.82439 8.03331 7.94191 8.02436 8.06845 7.89782L 11.9663 4L 8.06845 0.102179C 7.94191 -0.0243648 7.82439 -0.0333124 7.71598 0.0750167L 7.52617 0.264832C 7.48279 0.308292 7.48998 0.427486 7.54782 0.622733L 7.85699 1.69132C 7.88591 1.7923 7.93648 1.87922 8.00877 1.95144L 9.4895 3.34548L 0.268426 3.34545C 0.0894753 3.34545 0 3.42214 0 3.57553L 0 3.94113C 0 4.00249 0.0894753 4.08174 0.268426 4.17888Z' />
            </svg>
            Back to home
          </div>
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
          <p className='callout'>Over 9 months, I led product design and front-end development on a team of 5, on three projects. I hired our first engineering role, and branded the company.</p>

          <div className='image-list'>
            <div>
              <Image
                setRef={this.setRef}
                src='../static/projects/evaline-inc/1-min.jpg'
                alt='Evaline Scheduler, our first platform.' />
              <Image
                setRef={this.setRef}
                src='../static/projects/evaline-inc/preview-min.jpg'
                alt='Engage, our solution for public charger discovery.' />
              <div className='spacer'>&nbsp;</div>
            </div>
            <span>Left &rarr; right: B2B platform, native B2C app</span>
          </div>

          <h2>Contracting</h2>
          <p>My last day at VChain, Inc. was in May of 2016, around the end of my first year at UC Santa Cruz. I was working out of a coworking space in Santa Cruz called NextSpace, while working with Formula Slug, an electric racing team at UCSC.</p>

          <p>The location, timing of my departure, and involvement with an electric vehicle program made me a perfect contractor for two South African guys with an awesome idea. The CEO, an ex-Tesla employee, and serial entrepreneur, had a hunch around workplace electric vehicle charging that we would spend the next year testing. The belief was that, with smart management software, and timely notifications, we could improve charging efficiency by moving folks in and out of chargers as was necessary (and convenient), rather than the existing system, which was to just sit at the charger for a full workday.</p>

          <p>Throughout 2016, we built a product landing page, created investor decks, and iterated on prototypes to fine-tune our feature offering. In hindsight, we probably should have spent far less time fine-tuning, and more time finding potential customers, getting letters of intent (LoI), and testing our assumptions with real users.</p>

          <div className='image-list'>
            <div>
              <Image
                setRef={this.setRef}
                src='../static/projects/evaline-inc/early-1-min.jpg'
                alt='Some of my work from Evaline (3)' />
              <Image
                setRef={this.setRef}
                src='../static/projects/evaline-inc/early-2-min.jpg'
                alt='Some of my work from Evaline (4)' />
              <div className='spacer'>&nbsp;</div>
            </div>
            <span>Early product shots</span>
          </div>

          <p>Regardless, in December of 2017, the company raised an F&F round, providing enough runway for me to join full-time. January 1st of 2017 marked my first day as Lead Designer at Evaline, Inc.</p>

          <h2>Funding, Full-time</h2>
          <p>Being the only technical team-member, I immediately set out to learn some technologies to help us get product built. My work at VChain had given me enough of a background in software development to have some ideas about how a good application behaved, but we used PHP, a language I wasn't willing to work with again.</p>

          <p>For the next couple of weeks, I split my time between learning React full-time, and continuing to build UI prototypes, and fine-tune our UI and branding. The platform I used to learn would turn into the second version of <Link href='projects/playbook'><a target='blank'>Playbook, my D&D app side-project</a></Link>.</p>

          <div className='image-list'>
            <div>
              <Image
                setRef={this.setRef}
                src='../static/projects/evaline-inc/bot-iterations-min.jpg'
                alt='A few selected iterations of the character.' />
              <Image
                setRef={this.setRef}
                src='../static/projects/evaline-inc/bot-states-min.jpg'
                alt='Selected character in different reaction states.' />
              <div className='spacer'>&nbsp;</div>
            </div>
            <span>The Evaline bot, built to represent the product.</span>
          </div>

          <p>Towards the end of January, we partnered with a local Santa Cruz agency to provide development assistance. For the next month and a half, we worked with them to build out an MVP, collecting each week to plan out the next, then moving tickets in JIRA, and submitting code. The agency determined majority of our tech stack, which resulted in a tech stack that was all fairly new technologies at the time (<Link href='https://github.com/zeit/next.js'><a target='blank'>React with SSR</a></Link> and <Link href='http://graphql.org'><a target='blank'>GraphQL</a></Link>).</p>

          <p>The nature of our tech stack presented us with a couple important challenges:</p>
          <ol>
            <li><b>Hiring</b> talent was more difficult, due to the relative immaturity of GraphQL and other technologies.</li>
            <li><b>Scaphold</b> would become a major issue, with some pretty serious downtime issues, thanks to a lack of an SLA.</li>
          </ol>

          <div className='image-list'>
            <div>
              <Image
                setRef={this.setRef}
                src='../static/projects/evaline-inc/3-min.jpg'
                alt='Some of my work from Evaline (3)' />
              <Image
                setRef={this.setRef}
                src='../static/projects/evaline-inc/4-min.jpg'
                alt='Some of my work from Evaline (4)' />
              <div className='spacer'>&nbsp;</div>
            </div>
            <span>Working shots, more to come.</span>
          </div>

          <p>More chapters coming soon!</p>

          <p>
            <ArrowIcon /> <span>Hiring</span><br />
            <ArrowIcon /> <span>Running a beta</span><br />
            <ArrowIcon /> <span>User research</span><br />
            <ArrowIcon /> <span>Departure</span>
          </p>

          <div className='button-row'>
            <a href='https://dribbble.com/alexpriceco/projects/535866-Evaline' title='Some shots from the work I did at Evaline.' className='button'>
              <div>
                <svg role='img' height='18' width='18' viewBox='0 0 24 24' className='translate' xmlns='http://www.w3.org/2000/svg'>
                  <path fill='#ffffff' d='M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z' />
                </svg>
                <span>On Dribbble</span>
              </div>
            </a>

            <a href='http://evaline.io' title='Evaline website' className='button'>
              <div>
                <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' className='translate no-fill' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
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
      </Article>
    )
  }
}

export default Page
