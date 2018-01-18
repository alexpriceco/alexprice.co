import React, { Component } from 'react'
import Head from '../components/general/head.js'
import Stylesheet from '../components/general/stylesheet.js'
import sheet from '../components/simple.scss'
import { TODOIST_TOKEN } from '../config/tokens.js'
import axios from 'axios'

export default class Home extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
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
    this.fetchTasks(TODOIST_TOKEN)
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

  async fetchTasks (token) {
    const uri = 'https://beta.todoist.com/API/v8/tasks'

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
      }, console.debug(this.state.firstTask))
    })
    .catch(error => {
      console.error(error)
      this.setState({ loading: false, error })
    })
  }

  getTaskSummary () {
    const { overdue, dueToday, aTask } = this.state
    let suggestion = ''
    let span = <span>It looks like you're done for the day! 🎉 {suggestion}</span>

    if (overdue) {
      suggestion = <a href={`https://todoist.com`} rel='Launch Todoist'>"{String(aTask.content).replace(/__|\*|\#|(?:\[([^\]]*)\]\([^)]*\))/gm, '$1')}"?</a>
      if (dueToday) span = <span>You have {dueToday} tasks due today, and {overdue} overdue. Why don't you start with {suggestion}</span>
      else span = <span>There's nothing on the docket today, but there are {overdue} overdue. Why don't you start with {suggestion}</span>
    } else if (dueToday) {
      suggestion = <a href={`https://todoist.com`} rel='Launch Todoist'>"{String(aTask.content).replace(/__|\*|\#|(?:\[([^\]]*)\]\([^)]*\))/gm, '$1')}"?</a>
      span = <span>You have {dueToday} tasks due today. Why don't you start with {suggestion}</span>
    }

    return span
  }

  render () {
    return (
      <section className={this.state.loading ? 'loading' : ''}>
        <Stylesheet sheet={sheet} />
        <Head title='Home!' />
        <section>
          <h1>Good day, Alexander.</h1>
          <p>
            It's {this.getDay()} {this.getDate()}. <span>{this.getTaskSummary()}</span>
          </p>
        </section>
      </section>
    )
  }
}
