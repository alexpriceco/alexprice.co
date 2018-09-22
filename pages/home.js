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
      working: false,
      tasks: [],
      date: ''
    }
  }

  componentDidMount () {
    const now = new Date()
    const isWorkDay = now.getDay() > 0 && now.getDay() < 6
    const isWorkHours = now.getHours() >= 8 && now.getHours() < 17

    this.fetchTasks()
    this.setState({
      date: this.getDate(),
      working: isWorkDay && isWorkHours
    })
  }

  getDate () {
    const today = new Date()
    const month = (() => {
      switch (today.getMonth()) {
        case 0: return 'January'
        case 1: return 'February'
        case 2: return 'March'
        case 3: return 'April'
        case 4: return 'May'
        case 5: return 'June'
        case 6: return 'July'
        case 7: return 'August'
        case 8: return 'September'
        case 9: return 'October'
        case 10: return 'November'
        case 11: return 'December'
        default: return ''
      }
    })()

    const day = (() => {
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

    const date = today.getDate()
    return `${day}, ${month} ${date}`
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
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios.get('https://beta.todoist.com/API/v8/tasks', {
          params: { 'filter': `due ${this.getDate()} | overdue` }
        }).then(response => {
          this.setState({
            tasks: response.data,
            loading: false
          }, resolve())
        }).catch(error => {
          this.setState(
            { loading: false, error },
            reject(new Error(error))
          )
        })
      }
    })
  }

  async updateTask (taskId, action) {
    const uri = `https://beta.todoist.com/API/v8/tasks/${taskId}/${action}`
    const currentStatus = this.state.tasks
      .filter((t) => t.id === taskId)[0]
      .completed

    if (action === 'reopen' && currentStatus === false) return

    const updatedTaskList = this.state.tasks.map((task) => {
      if (task.id === taskId) {
        const completed = (action === 'close')
        return { ...task, completed }
      } else return task
    })

    this.setState({ tasks: updatedTaskList })

    axios.post(uri).catch((error) => {
      const updatedTaskList = this.state.tasks.map((task) => {
        if (task.id === taskId) {
          const completed = (action !== 'close')
          return { ...task, completed }
        } else return task
      })

      this.setState({
        tasks: updatedTaskList,
        error
      })
    })
  }

  renderNoToken () {
    return (
      <section style={{ fontFamily: 'Inconsolata, monospace' }}>
        <input
          autoFocus
          ref={input => { this.input = input }}
          placeholder='Todoist API token'
          value={this.state.token}
          onKeyDown={(event) => {
            if (event.key === 'Enter') this.tryKey(event.target.value)
          }}
        />
        <a
          className='unstyled'
          href='https://todoist.com/prefs/integrations'
          style={{ marginLeft: '1em' }}
        >
          Todoist.com → settings → integrations
        </a>
      </section>
    )
  }

  renderTasks (tasks) {
    let filteredTasks = this.state.working
      ? tasks.filter((task) => task.project_id === 2180640125)
      : tasks.filter((task) => task.project_id !== 2180640125)

    if (filteredTasks.length === 0) {
      filteredTasks = this.state.working
        ? tasks.filter((task) => task.project_id !== 2180640125)
        : tasks.filter((task) => task.project_id === 2180640125)
    }

    if (filteredTasks.length > 5) filteredTasks.length = 5

    let formattedList = filteredTasks.map((task) => {
      const formattedTask = task.content
        .replace(/\[(.*?)\]\(.*?\)/gm, (str) => {
          const url = str.match(/\(.*?\)/)[0].replace(/\)|\(/g, '')
          const label = str.match(/\[(.*?)\]/)[0].replace(/\]|\[/g, '')
          return `<a href='${url}' title=${label}>${label}</a>`
        })

      const action = task.completed ? 'reopen' : 'close'

      return (
        <li
          key={task.id}
          className={task.completed ? 'completed' : ''}
          onClick={() => this.updateTask(task.id, action)}
        >
          <svg width='18' height='18' viewBox='0 0 18 18' fill='none'>
            <rect
              opacity='0.25'
              width='18'
              height='18'
              rx='2'
              fill='white'
            />
          </svg>

          <span
            dangerouslySetInnerHTML={{ __html: formattedTask }}
          />
        </li>
      )
    })

    if (filteredTasks.length < tasks.length) {
      const n = tasks.length - filteredTasks.length
      const nonwork = this.state.working ? ' (non-work)' : ''

      formattedList.push(
        <li key={'remaining-tasks'}>
          <svg width='18' height='18' viewBox='0 0 18 18' fill='none'>
            <path
              opacity='0.25'
              fillRule='evenodd'
              clipRule='evenodd'
              d='M8 8V1C8 0.447715 8.44772 0 9 0V0C9.55228 0 10 0.447715 10 1V8H17C17.5523 8 18 8.44772 18 9V9C18 9.55228 17.5523 10 17 10H10V17C10 17.5523 9.55228 18 9 18V18C8.44772 18 8 17.5523 8 17V10H1C0.447715 10 0 9.55228 0 9V9C0 8.44772 0.447715 8 1 8H8Z'
              fill='white'
            />
          </svg>

          <span className='last'>
            {`${n} more${nonwork} task${n > 1 ? 's' : ''}`}
          </span>
        </li>
      )
    }

    return <ul>{formattedList}</ul>
  }

  render () {
    return (
      <section
        style={{ backgroundColor: 'black' }}
        className={this.state.loading ? 'loading' : ''}
      >
        <Stylesheet sheet={sheet} />
        <Head title={this.state.date} />
        { this.state.noToken
          ? this.renderNoToken()
          : <section>
            <h1 dangerouslySetInnerHTML={{ __html:
              this.state.date.replace(' ', ' <br />')
            }} />
            {this.renderTasks(this.state.tasks)}
          </section>
        }
      </section>
    )
  }
}
