import {createEvent, createStore, sample} from 'effector'

export const insert = createEvent()
export const change = createEvent()
export const reset = createEvent()
export const $posts = createStore([
   {id: 1, message: "Hello World!", likes: 12},
   {id: 2, message: "Learn React.", likes: 25},
   {id: 3, message: "Wanna eat some burgers.", likes: 9},
   {id: 4, message: "Progress.", likes: 15},
])
export const $input = createStore("")

$input.on(change, (state, value) => value)
$input.on(reset, () => '')
$input.on(insert, () => '')

export const submit = createEvent()
submit.watch(e => e.preventDefault())


sample({
   clock: submit,
   source: $input,
   target: insert,
})