import { Component } from 'react'
import Router from 'next/router'
import Card from '../../components/card/card.js'

export class ArticleLinks extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: true,
      src: '',
      cards: [
        {
          title: '🚙 Evaline, Inc.',
          id: 'evaline-inc',
          summary: `Led product design for three products, then used React and GraphQL to build them.`,
          linkText: 'Read about it'
        },
        {
          title: '⚡️ VEXvolt',
          id: 'vexvolt',
          summary: `A patented hardware product for VEX robotics competitors, 3d printed on a Form 2.`,
          linkText: 'Check it out'
        },
        {
          title: '⚔️ Playbook',
          id: 'playbook',
          summary: `A simpler D&D character sheet, built with great design, and a focused user experience.`,
          linkText: 'Discover Playbook'
        },
        {
          title: '📄 Resume',
          id: 'resume',
          summary: `Get a brief overview of some skills I've employed, and projects I’ve worked on.`,
          linkText: 'View resume'
        }
      ]
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
      path = `static/projects/resume/Alexander Price, Product Designer.pdf`
      window.location.href += path
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
