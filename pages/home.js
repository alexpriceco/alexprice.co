import React, { Component } from 'react'
import Head from '../components/general/head.js'
import Stylesheet from '../components/general/stylesheet.js'
import sheet from '../components/simple.scss'
import axios from 'axios'

export default class Home extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      noToken: false,
      loading: true,
      today: new Date(),
      aTask: {},
      tasks: [],
      date: '',
      due: 0,
      od: 0
    }
  }

  componentDidMount () {
    this.setState({ date: this.getDate() })
    this.fetchTasks()
  }

  getDate () {
    const today = new Date()
    const month = (() => {
      switch (today.getMonth()) {
        case 0: return 'Jan'
        case 1: return 'Feb'
        case 2: return 'Mar'
        case 3: return 'Apr'
        case 4: return 'May'
        case 5: return 'Jun'
        case 6: return 'Jul'
        case 7: return 'Aug'
        case 8: return 'Sep'
        case 9: return 'Oct'
        case 10: return 'Nov'
        case 11: return 'Dec'
        default: return ''
      }
    })()

    const date = today.getDate()
    return `${month} ${date}`
  }

  getDay () {
    const today = new Date()
    return (() => {
      switch (today.getDay()) {
        case 0: return 'Sunday'
        case 1: return 'Monday'
        case 2: return 'Tuesday'
        case 3: return 'Wednesday'
        case 4: return 'Thursday'
        case 5: return 'Friday'
        case 6: return 'Saturday'
        default: return ''
      }
    })()
  }

  tryKey (token) {
    this.fetchTasks(token).then((res) => {
      /* global localStorage */
      localStorage.setItem('todoistToken', token)
      this.input.blur()
      this.setState({
        noToken: false,
        token
      })
    }).catch((err) => {
      console.error(err)
    })
  }

  async fetchTasks (provided) {
    const uri = 'https://beta.todoist.com/API/v8/tasks'
    const token = provided || await localStorage.getItem('todoistToken')

    return new Promise((resolve, reject) => {
      if (!token) {
        this.setState({
          loading: false,
          noToken: true
        }, () => {
          if (this.input) this.input.focus()
          else console.debug('this.input undef', this.input)
        })
      } else {
        axios.get(uri, {
          params: {
            'token': token,
            'filter': `due ${this.getDate()} | overdue`
          }
        })
        .then(response => {
          let dueToday = 0
          let overdue = 0

          for (let task of response.data) {
            if (task.due.string === this.state.date) dueToday++
            else overdue++
          }

          const random = Math.floor(Math.random() * response.data.length)

          this.setState({
            aTask: response.data[random],
            tasks: response.data,
            dueToday: dueToday,
            overdue: overdue,
            loading: false
          }, resolve())
        })
        .catch(error => {
          this.setState({ loading: false, error }, reject(new Error(error)))
        })
      }
    })
  }

  getTaskSummary () {
    const { overdue, dueToday, aTask } = this.state
    let suggestion = ''
    let span = <span>It looks like you're done for the day! 🎉 {suggestion}</span>

    if (overdue) {
      suggestion = <a href={aTask.url} rel='Launch Todoist'>"{String(aTask.content).replace(/__|\*|\#|(?:\[([^\]]*)\]\([^)]*\))/gm, '$1')}"?</a> // eslint-disable-line
      if (dueToday) span = <span>You have {dueToday === 1 ? 'one ' : dueToday} task{dueToday === 1 ? '' : 's'} due today, and {overdue} overdue. Why don't you start with {suggestion}</span>
      else span = <span>There's nothing on the docket today, but there are {overdue} overdue. Why don't you start with {suggestion}</span>
    } else if (dueToday) {
      suggestion = <a href={aTask.url} rel='Launch Todoist'>"{String(aTask.content).replace(/__|\*|\#|(?:\[([^\]]*)\]\([^)]*\))/gm, '$1')}"?</a> // eslint-disable-line
      span = <span>You have {dueToday === 1 ? 'one ' : dueToday} task{dueToday === 1 ? '' : 's'} due today. Why don't you start with {suggestion}</span>
    }

    return span
  }

  render () {
    return (
      <section className={this.state.loading ? 'loading' : ''}>
        <Stylesheet sheet={sheet} />
        <Head title='Home!' />
        { this.state.noToken
         ? <section style={{ fontFamily: 'Inconsolata, monospace' }}>
           <input
             autoFocus
             ref={input => { this.input = input }}
             placeholder='Todoist API token'
             value={this.state.token}
             onKeyDown={(event) => {
               if (event.key === 'Enter') this.tryKey(event.target.value)
             }}
           />
           <span style={{ opacity: 0.5, paddingLeft: '1em' }}>
            Todoist.com > settings > integrations
          </span>
         </section>
        : <section>
          <h1>Good day, Alexander.</h1>
          <p>
            It's {this.getDay()} {this.getDate()}. <span>{this.getTaskSummary()}</span>
          </p>
        </section>}
      </section>
    )
  }
}
