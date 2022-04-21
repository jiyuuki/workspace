import { uuid } from '@/helpers/utils.js'

export default {
  name: 'defaultWorkspace',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          id: uuid(),
          name: 'first task',
          description: 'this is a description for the fisrt task',
          user: null,
        },
        {
          id: uuid(),
          name: 'second task',
          description: 'this is a description for the second task',
          user: null,
        },
        {
          id: uuid(),
          name: 'third task',
          description: 'this is a description for the third task',
          user: null,
        },
      ]
    },
    {
      name: 'in progress',
      tasks: [
        {
          id: uuid(),
          name: 'in progress',
          description: 'this is a description for the in progress task',
          user: null,
        },
      ]
    },
    {
      name: 'done',
      tasks: [
        {
          id: uuid(),
          name: 'done task',
          description: 'this is a description for the done task',
          user: null,
        },
      ]
    },
  ]
}
