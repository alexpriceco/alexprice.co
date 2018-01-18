import React, { Component } from 'react'
import Image from '../components/general/image.js'
import DocumentHead from '../components/general/head.js'
import Stylesheet from '../components/general/stylesheet.js'
import sheet from '../components/article.scss'

import Contact from '../components/contact/contact.js'
import Footer from '../components/footer/footer.js'

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
    this.setState({ loading: false }, () => {
      setTimeout(() => this.setState({ loaded: true }), 1000)
    })
  }

  render () {
    const { loading, loaded } = this.state
    return (
      <main class={loading ? 'loading' : (loaded ? 'loaded' : '') + ' vexvolt'}>
        <DocumentHead />
        <header>
          <h1>TITLE</h1>
        </header>
        <article className='project'>
          <h2>Discovering a Problem</h2>
          <p>I was a bit of a nerd in high school. I graduated as VP of the science club, and president of the robotics team, having completed three years of VEX, FRC, and NAO robotics. As a VEX robotics competitor, I ran into a specific problem that many teams shared—dealing with batteries was a pain in the ass. A team replaces a battery (or two, if you need the power), before every round, and uses the VEX-specific batteries off the field as well. As a result, you end up with a <em>ton</em> of batteries lying around, and determining the charge state of each battery isn't trivial.</p>

          <p>Most teams use a multimeter, which runs around $50, and is difficult to use—there's extra settings you don't need, and the leads aren't designed to work well with VEX batteries. It's a cumbersome, ineffective, expensive tool for the job.</p>

          <div className='image-list'>
            <div>
              <Image
                src='static/projects/vexvolt/1-min.jpg'
                alt='One of the engineering program rooms' />
              <Image
                src='static/projects/vexvolt/2-min.jpg'
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
                src='static/projects/vexvolt/3-min.png'
                alt='Another technical drawing' />
              <Image
                src='static/projects/vexvolt/4-min.png'
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
                src='static/projects/vexvolt/5-min.jpg'
                alt='My printer!' />
              <Image
                src='static/projects/vexvolt/6-min.jpg'
                alt='Part of a housing, with support material' />
              <Image
                src='static/projects/vexvolt/7-min.jpg'
                alt='Several prints on a table' />
            </div>
            <span>From left: high school, electronics, render.</span>
          </div>

          <p>That's where I'm at right now. You can follow the project on Twitter. I'm running a limited beta of the new assembly to collect some feedback, so if you're in Austin, <a href='mailto:alex@alexprice.co' title='Email me!'>shoot me an email</a>. I'm launching a Kickstarter in February. Till then!</p>

          <a href='https://twitter.com/vexvolt' title='Follow the project on Twitter' className='button'>
            <div>
              <svg role='img' height='16' width='16' className='translate' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path d='M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z' />
              </svg>
              <span>VEXvolt Twitter</span>
            </div>
          </a>

          <hr />
        </article>
        <Contact />
        <Footer />
        <Stylesheet sheet={sheet} />
      </main>
    )
  }
}

export default Page
