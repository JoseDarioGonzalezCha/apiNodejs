const express = require('express')
const { Sequelize, DataTypes } = require('sequelize')
const task = require('./models/task')
const TaskModel = require('./models/task')

const app = express()
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'my-database.db' })

const tasks = TaskModel(sequelize, DataTypes)

app.set('view engine', 'ejs')


//Create tarefa
app.post('/tarefa', async (req, res) => {
  const createTask = await tasks.create(req.body)
  res.json(createTask)
})

//Listing tarefa
app.get('/tarefa', async (req, res) => {
  const tarefas = await tasks.findAll()
  res.send(tarefas)
})

//Show tarefa
app.get('/tarefa/:id', async (req, res) => {
  const taskId = req.params.id
  const task = await tasks.findByPk(taskId)
  res.json(task)

  //res.render('tarefa', { id: task.id, name: task.name})
})

//Delate tarefa 

app.delete('/tarefa/:id', async (req, res) => {
  const taskId = req.params.id
  const task = await tasks.findByPk(taskId)
  if (task) {
    await task.destroy()
  }
  
  res.json({ ok: 'deleted', task })
})

//Up tarefa
app.put('/tarefa/:id', async (req, res) => {
    const taskId = req.params.id
    const task = await tasks.findByPk(taskId)
    task.update({
      tasks: req.body
    })
   res.send({ ok: 'update', tasks })  
 })


app.listen(8080, () => {
    console.log('Iniciando o servidor express na porta 8080')
})

