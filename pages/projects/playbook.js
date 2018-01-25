import React, { Component } from 'react'
import Router from 'next/router'

import mediumZoom from 'medium-zoom'

import Image from '../../components/general/image.js'
import ArticleLinks from '../../components/article/links.js'
import Article from '../../components/article/article.js'

export class Page extends Component {
  setRef (image) {
    console.debug(this.state, this.props)
    mediumZoom(image, {
      margin: 24,
      background: 'rgba(0, 0, 0, 0.25)'
    })
  }

  render () {
    return (
      <Article id={'playbook'}>
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
            <h1>Playbook</h1>
            <h2>A simpler D&D character sheet, built with great design, and a focused user experience.</h2>
            <div className='point'>
              <svg viewBox='0 0 20 8' role='img' height='8' width='20'>
                <path transform='translate(-1, -1)' d='M 20.6972 0L 3.30278 0C 2.31337 0 1.92484 1.28323 2.74808 1.83205L 11.4453 7.6302C 11.7812 7.85413 12.2188 7.85413 12.5547 7.6302L 21.2519 1.83205C 22.0752 1.28323 21.6866 0 20.6972 0Z' />
              </svg>
            </div>
          </div>

          <Image rel='' src='/static/projects/playbook/preview-min.jpg' />
        </header>
        <article className='project'>
          <p className='callout'>D&amp;D is a ton of fun. Roleplaying is a joy, and adventuring with friends is great. Doing math, and tracking numbers... not so much.</p>

          <p>Having played D&amp;D for several years now, I've had a ton of fun with the game. Some of my best college memories were made with the crew I ran with—lots of laughs, plenty of epic moments, and... math. This tool has taken on several forms of the time I've spent working on it, with the most recent build gearing up for a beta test.</p>

          <h2>Version one</h2>
          <p>The first iteration of Playbook came about as a result of my frustration with existing tools. I'm a forgetful person, and hate anything on paper. If I receive a document, I scan it, and dump it into Dropbox, or it's going to get lost. Throughout my time playing D&D, I'd tried tools I used at work (text editors and Figma), in addition to tools built by the community (like Fight Club). My work tools were a pain to keep updated, and lacked much of the automation necessary to be valuable, and I found D&D-specific tools to be clunky, and aesthetically disappointing.</p>

          <p>I built a custom, static site for my character at the time, a warlock, with all my spells, sorted by what made the most sense for a warlock, and inputs for things like inventory, health points, and abilities, all stored locally, so as to persist between sessions.</p>

          <p>The sheet worked great, but it required quite a bit of upkeep, and wasn't scalable to other character builds.</p>

          <div className='image-list'>
            <div>
              <Image
                setRef={this.setRef}
                src='/static/projects/playbook/1-min.png'
                alt='A shot of the first version of Playbook' />
              <Image
                setRef={this.setRef}
                src='/static/projects/playbook/2-min.png'
                alt='Another shot of the Playbook MVP' />
              <div className='spacer'>&nbsp;</div>
            </div>
            <span>Shots of the Garlic-based app</span>
          </div>

          <h2>Version Two</h2>
          <p>I'd just started a new full time position at Evaline, Inc., working on tools for electric vehicle drivers, and needed to get comfortable with React. React made perfect sense for Playbook—many parts of the project were similar (read: components), and it was difficult to control elements on the page with pure javascript and html.</p>

          <p>I got overzealous with the first build, and stagnated. With the first version, I'd focused <i>just on my character</i>, and hadn't given a second thought to other builds, and how different races, classes, and play styles might effect the way the app should be represented. Building for all the potential use cases was incredibly difficult, and ultimately, without a clear strategy for deployment, with work ramping up, and just little old me, I took a step back.</p>

          <p>I'd established a clear visual dictionary for the app though, with a royal red, and muted tan color scheme, paired with plenty of serifs and drop caps. I wanted to keep in line with the fantasy feeling of D&D, and designing this second iteration of Playbook gave me an opportunity to work on something so different from my normal groove.</p>

          <div className='image-list'>
            <div>
              <Image
                setRef={this.setRef}
                src='/static/projects/playbook/3-min.jpg'
                alt='Some icon work on v2' />
              <Image
                setRef={this.setRef}
                src='/static/projects/playbook/4-min.jpg'
                alt='An example of the improved visual style' />
              <Image
                setRef={this.setRef}
                src='/static/projects/playbook/5-min.jpg'
                alt='Visual style applied to data-heavy tables' />
              <div className='spacer'>&nbsp;</div>
            </div>
            <span>Shots of v2, with special focus on branding</span>
          </div>

          <h2>Version Two, again</h2>
          <p>Having taken a several-month hiatus on Playbook, I picked it back up again after leaving Evaline in December of 2017. I went back to pen, paper, and Figma, and thought about how a desktop web-app might best represent different portions of a character sheet.</p>

          <p>I did my research, and collected many different variations on the character sheet from the community. Some went more artistic, whereas some really geeked out on the PDF math they could do. I categorized different sections of the sheet, and grouped similar functions together.</p>

          <p>I also partnered with my friend Connor. I'd worked with him before at Evaline (and before that), and he was a part of my weekly D&D group. Having another person on the project gave me motivation to put time in.</p>

          <div className='image-list'>
            <div>
              <Image
                setRef={this.setRef}
                src='/static/projects/playbook/6-min.png'
                alt='Main menu of the new Playbook' />
              <Image
                setRef={this.setRef}
                src='/static/projects/playbook/8-min.png'
                alt='The Playbook landing page' />
              <div className='spacer'>&nbsp;</div>
            </div>
            <span>New Playbook and landing page</span>
          </div>

          <p>Right now, we're still working on building out support for all the basic classes and races. You can follow along on Dribbble, or sign up for the beta waitlist below. There's a ton of challenging design and engineering problems, and I'm looking forward to future posts about solving those.</p>

          <div className='button-row'>
            <a href='https://dribbble.com/alexpriceco/projects/538677-Playbook' title='Some shots from the work done on Playbook.' className='button'>
              <div>
                <svg role='img' height='16' width='16' viewBox='0 0 24 24' className='translate' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z' />
                </svg>
                <span>On Dribbble</span>
              </div>
            </a>

            <a href='https://alexprice.co/playbook' title='Join the beta waitlist' className='button'>
              <div>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' className='no-fill translate' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                  <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
                  <polyline points='15 3 21 3 21 9' />
                  <line x1='10' y1='14' x2='21' y2='3' />
                </svg>
                <span>Join the beta</span>
              </div>
            </a>
          </div>
        </article>
        <ArticleLinks linkIds={['evaline-inc', 'resume']} setLoading={(callback) => this.setState({ loading: true }, () => callback())} />
      </Article>
    )
  }
}

export default Page
