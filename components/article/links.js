import { Component } from 'react'
import Router from 'next/router'
import Card from '../../components/card/card.js'

export class ArticleLinks extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: true,
      src: '',
      cards: [{
        id: 'evaline-inc',
        title: 'Evaline, Inc.',
        linkText: 'Read about it',
        summary: `Led product design for three products, then used React and GraphQL to build them.`
      }, {
        id: 'playbook',
        title: 'Playbook',
        linkText: 'Discover Playbook',
        summary: `A simpler D&D character sheet, built with great design, and a focused user experience.`
      }, {
        id: 'vexvolt',
        title: 'VEXvolt',
        linkText: 'Check it out',
        summary: `A patented hardware product for VEX robotics competitors, 3d printed on a Form 2.`
      }, {
        id: 'resume',
        title: 'Resume',
        linkText: 'View resume',
        summary: `Get a brief overview of some skills I've employed, and projects I’ve worked on.`
      }]
    }

    this.navigateTo = this.navigateTo.bind(this)
  }

  componentDidMount () {
    for (let id of this.props.linkIds) {
      let path = `/projects/${id}`
      if (id !== 'resume') Router.prefetch(path)
    }
  }

  navigateTo (id) {
    let path = `/projects/${id}`
    if (id === 'resume') {
      path = `/static/projects/resume/Alex Price, Product Designer.pdf`
      window.location.origin += path
    } else {
      this.props.setLoading(() => {
        setTimeout(() => Router.push(path), 100)
        setTimeout(() => window.scrollTo(0, 0), 300)
      })
    }
  }

  render () {
    const cards = this.state.cards.filter((card) => {
      if (this.props.linkIds.indexOf(card.id) !== -1) {
        return card
      }
    })

    return (
      <section className='more-projects'>
        { cards.map((card, i) => {
          return <Card link {...card} key={i}
            navigateTo={this.navigateTo} />
        }) }
      </section>
    )
  }
}

export default ArticleLinks
