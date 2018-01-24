import React, { Component } from 'react'
import Router from 'next/router'

import mediumZoom from 'medium-zoom'

import Image from '../../components/general/image.js'
import ArticleLinks from '../../components/article-links/links.js'
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
      <Article id={'vexvolt'}>
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
            <h1>VEXvolt</h1>
            <h2>A patented hardware product for VEX robotics competitors, 3d printed on a Form 2.</h2>
            <div className='point'>
              <svg viewBox='0 0 20 8' role='img' height='8' width='20'>
                <path transform='translate(-1, -1)' d='M 20.6972 0L 3.30278 0C 2.31337 0 1.92484 1.28323 2.74808 1.83205L 11.4453 7.6302C 11.7812 7.85413 12.2188 7.85413 12.5547 7.6302L 21.2519 1.83205C 22.0752 1.28323 21.6866 0 20.6972 0Z' />
              </svg>
            </div>
          </div>

          <Image rel='' src='../static/projects/vexvolt/preview-min.jpg' />
        </header>
        <article className='project'>
          <h2>Discovering a Problem</h2>
          <p>I was a bit of a nerd in high school. I graduated as VP of the science club, and president of the robotics team, having completed three years of VEX, FRC, and NAO robotics. As a VEX robotics competitor, I ran into a specific problem that many teams shared—dealing with batteries was a pain in the ass. A team replaces a battery (or two, if you need the power), before every round, and uses the VEX-specific batteries off the field as well. As a result, you end up with a <em>ton</em> of batteries lying around, and determining the charge state of each battery isn't trivial.</p>

          <p>Most teams use a multimeter, which runs around $50, and is difficult to use—there's extra settings you don't need, and the leads aren't designed to work well with VEX batteries. It's a cumbersome, ineffective, expensive tool for the job.</p>

          <div className='image-list'>
            <div>
              <Image
                setRef={this.setRef}
                src='../static/projects/vexvolt/1-min.jpg'
                alt='One of the engineering program rooms' />
              <Image
                setRef={this.setRef}
                src='../static/projects/vexvolt/2-min.jpg'
                alt='A render of revision three' />
            </div>
            <span>From left: high school, electronics, render.</span>
          </div>

          <h2>Stumbling into a solution</h2>
          <p>My senior year, I took an experimental course at my high school called "entrepreneurship." The school's engineering program had some incredible resources: 3d printers, laser cutters, cnc machines, and great mentors. The course had us come up with ideas, and build businesses around them, with regular visits to local startups and tech companies sprinkled in.</p>

          <p>The class gave me time and a focused atmosphere, and my robotics experience gave me the tools and technical ability to make it happen. I sketched a handheld solution, and went through several revisions in Solidworks. Having access to the program's 3d printer gave me the ability to very quickly test assumptions I'd made in the design process in real-world situations.</p>

          <p>After designing a proper housing, I ordered the "guts" of the voltmeter off Alibaba and Molex, and assembled individual units myself. From there, I created a simple landing page for the product, and let leads roll in. I made some sales, and implemented customer feedback as I collected it. There's a polarizing film on each of the displays, to increase visibility of the reading—this was added based on feedback I received of difficulty taking readings in high-light situations.</p>

          <p>It was around this time I pursued a patent on the product, and began work with an Austin attorney to draft the necessary papers and technical drawings to file an application. The patent process is still ongoing, and you can check it out on <a href='https://patents.google.com/patent/US20170288357A1/en' title='View the patent'>Google Patents</a>.</p>

          <div className='image-list'>
            <div>
              <Image
                setRef={this.setRef}
                src='../static/projects/vexvolt/3-min.png'
                alt='Another technical drawing' />
              <Image
                setRef={this.setRef}
                src='../static/projects/vexvolt/4-min.png'
                alt='Technical drawing, à la top view' />
            </div>
            <span>Shots from the patent application.</span>
          </div>

          <p>After I graduated, I moved to Santa Cruz, CA, and lost access to the 3d printer, which cut my production. I had some leftover units, which I sold out of, but failed to find a cost-effective way to continue production. With school kicking off, time was a limited resource.</p>

          <h2>Restarting...</h2>
          <p>My last day at Evaline, Inc. was December 1st, which marked the end of my hiatus on the VEXvolt. Still without regular access to an affordable way to print the housings, I purchased a <a href='https://formlabs.com/3d-printers/form-2/' title='The Form 2'>Formlabs Form 2</a>, a resin-based SLA printer. This gave me not only a viable method of manufacturing, but a much higher level of print quality and build strength.</p>

          <p>Unfortunately, the mechanism I'd previously used to mate the two sections of the housing no longer worked with the new printer. The printer at my HS's robotics program had a lower resolution, and printed "lines" of material, whereas the Form 2 extracted the part from a pool of resin, hardening layer by layer as the part is produced. The benefit of the old method was that static friction was enough to hold the pieces together.</p>

          <p>This prompted a redesign of the assembly, with improvements to assembly time and resilience rolled in.</p>

          <div className='image-list'>
            <div>
              <Image
                setRef={this.setRef}
                src='../static/projects/vexvolt/5-min.jpg'
                alt='My printer!' />
              <Image
                setRef={this.setRef}
                src='../static/projects/vexvolt/6-min.jpg'
                alt='Part of a housing, with support material' />
              <Image
                setRef={this.setRef}
                src='../static/projects/vexvolt/7-min.jpg'
                alt='Several prints on a table' />
            </div>
            <span>From left: high school, electronics, render.</span>
          </div>

          <p>That's where I'm at right now. You can follow the project on Twitter. I'm running a limited beta of the new assembly to collect some feedback, so if you're in Austin, <a href='mailto:alex@alexprice.co' title='Email me!'>shoot me an email</a>. I'm launching a Kickstarter in February. Till then!</p>

          <div className='button-row'>
            <a href='https://twitter.com/vexvolt' title='Follow the project on Twitter' className='button'>
              <div>
                <svg role='img' height='16' width='16' className='translate' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z' />
                </svg>
                <span>VEXvolt Twitter</span>
              </div>
            </a>
          </div>
        </article>
        <ArticleLinks linkIds={['playbook', 'resume']} setLoading={(callback) => this.setState({ loading: true }, () => callback())} />
      </Article>
    )
  }
}

export default Page
